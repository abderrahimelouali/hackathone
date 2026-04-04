import * as React from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { cn } from "@/lib/utils";
import { Maximize, Minimize, Navigation, ZoomIn, ZoomOut } from "lucide-react";

/**
 * Map Context & Custom Hook
 */
interface MapContextType {
  map: maplibregl.Map | null;
  isLoaded: boolean;
}

const MapContext = React.createContext<MapContextType | undefined>(undefined);

export function useMap() {
  const context = React.useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a <Map /> component.");
  }
  return context;
}

/**
 * Map Root Component
 */
interface MapProps extends Omit<maplibregl.MapOptions, "container" | "style"> {
  children?: React.ReactNode;
  className?: string;
  theme?: "light" | "dark";
  styles?: { light?: string | maplibregl.StyleSpecification; dark?: string | maplibregl.StyleSpecification };
  loading?: boolean;
  onViewportChange?: (viewport: { longitude: number; latitude: number; zoom: number }) => void;
  onClick?: (e: any) => void;
  cursor?: string;
}

export const Map = React.forwardRef<HTMLDivElement, MapProps>((props, ref) => {
  const {
    children,
    className,
    theme: propTheme,
    styles,
    loading = false,
    ...mapOptions
  } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<maplibregl.Map | null>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Refs to avoid stale closures in MapLibre events
  const onViewportChangeRef = React.useRef(props.onViewportChange);
  const onClickRef = React.useRef(props.onClick);

  React.useEffect(() => {
    onViewportChangeRef.current = props.onViewportChange;
    onClickRef.current = props.onClick;
  });

  // Detect theme
  const [appTheme, setAppTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || 
                   window.matchMedia("(prefers-color-scheme: dark)").matches;
    setAppTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      setAppTheme(isDarkNow ? "dark" : "light");
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const activeTheme = propTheme || appTheme;

  // Set default basemaps (CARTO)
  const defaultStyles = {
    light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  };

  const activeStyle = (styles?.[activeTheme] || defaultStyles[activeTheme]) as string | maplibregl.StyleSpecification;

  React.useEffect(() => {
    if (!containerRef.current) return;

    const instance = new maplibregl.Map({
      container: containerRef.current,
      style: activeStyle,
      ...mapOptions,
    });

    instance.on("load", () => {
      setMap(instance);
      setIsLoaded(true);
    });

    instance.on("move", () => {
      const center = instance.getCenter();
      onViewportChangeRef.current?.({
        longitude: center.lng,
        latitude: center.lat,
        zoom: instance.getZoom(),
      });
    });

    instance.on("click", (e) => {
      onClickRef.current?.(e);
    });

    return () => {
      instance.remove();
    };
  }, []); // Only init once

  // React to theme change
  React.useEffect(() => {
    if (map && isLoaded) {
      map.setStyle(activeStyle);
    }
  }, [activeStyle, map, isLoaded]);

  // React to cursor change
  React.useEffect(() => {
    if (map && isLoaded && props.cursor) {
      map.getCanvas().style.cursor = props.cursor;
    } else if (map && isLoaded) {
      map.getCanvas().style.cursor = "";
    }
  }, [map, isLoaded, props.cursor]);

  return (
    <MapContext.Provider value={{ map, isLoaded }}>
      <div
        ref={containerRef}
        className={cn("relative h-full w-full overflow-hidden rounded-md", className)}
      >
        {isLoaded && children}
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}
      </div>
    </MapContext.Provider>
  );
});
Map.displayName = "Map";

/**
 * Map Controls Component
 */
interface MapControlsProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showZoom?: boolean;
  showCompass?: boolean;
  showLocate?: boolean;
  showFullscreen?: boolean;
  className?: string;
  onLocate?: (coords: { longitude: number; latitude: number }) => void;
}

export function MapControls({
  position = "bottom-right",
  showZoom = true,
  showCompass = false,
  showLocate = false,
  showFullscreen = false,
  className,
  onLocate,
}: MapControlsProps) {
  const { map } = useMap();

  if (!map) return null;

  const handleZoom = (delta: number) => {
    map.setZoom(map.getZoom() + delta);
  };

  const handleLocate = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = { longitude: pos.coords.longitude, latitude: pos.coords.latitude };
      map.flyTo({ center: [coords.longitude, coords.latitude], zoom: 14 });
      onLocate?.(coords);
    });
  };

  const posClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <div className={cn("absolute z-10 flex flex-col gap-2", posClasses[position], className)}>
      {showZoom && (
        <div className="flex flex-col rounded-md bg-background shadow-md border overflow-hidden">
          <button
            onClick={() => handleZoom(1)}
            className="p-2 hover:bg-muted border-b transition-colors"
          >
            <ZoomIn className="size-4" />
          </button>
          <button onClick={() => handleZoom(-1)} className="p-2 hover:bg-muted transition-colors">
            <ZoomOut className="size-4" />
          </button>
        </div>
      )}
      {showLocate && (
        <button
          onClick={handleLocate}
          className="p-2 rounded-md bg-background shadow-md border hover:bg-muted transition-colors"
        >
          <Navigation className="size-4" />
        </button>
      )}
    </div>
  );
}

/**
 * Map Marker Component
 */
interface MapMarkerProps {
  longitude: number;
  latitude: number;
  children?: React.ReactNode;
  onClick?: (e: MouseEvent) => void;
  // Simplified for React implementation
  draggable?: boolean;
}

const MarkerContext = React.createContext<{ marker: maplibregl.Marker | null }>({ marker: null });

export function MapMarker({ longitude, latitude, children, onClick, draggable }: MapMarkerProps) {
  const { map } = useMap();
  const [marker, setMarker] = React.useState<maplibregl.Marker | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const onClickRef = React.useRef(onClick);
  React.useEffect(() => {
    onClickRef.current = onClick;
  });

  React.useEffect(() => {
    if (!map) return;

    const el = document.createElement("div");
    const m = new maplibregl.Marker({ element: el, draggable })
      .setLngLat([longitude, latitude])
      .addTo(map);

    const handleClick = (e: MouseEvent) => {
      onClickRef.current?.(e);
    };

    el.addEventListener("click", handleClick);

    setMarker(m);

    return () => {
      el.removeEventListener("click", handleClick);
      m.remove();
    };
  }, [map, longitude, latitude, draggable]);

  return (
    <MarkerContext.Provider value={{ marker }}>
      {marker && containerRef.current && (
        <Portal container={marker.getElement()}>
          <div ref={containerRef}>{children}</div>
        </Portal>
      )}
      {/* If no children, use MarkerContent to render default */}
      {!children && <MarkerContent />}
    </MarkerContext.Provider>
  );
}

/**
 * Marker Content Component
 */
export function MarkerContent({ children, className }: { children?: React.ReactNode; className?: string }) {
  const { marker } = React.useContext(MarkerContext);
  const [isRendered, setIsRendered] = React.useState(false);

  React.useEffect(() => {
    if (marker) setIsRendered(true);
  }, [marker]);

  if (!marker) return null;

  return (
    <Portal container={marker.getElement()}>
      <div className={cn("cursor-pointer drop-shadow-sm", className)}>
        {children || (
          <div className="size-4 rounded-full bg-primary border-2 border-primary-foreground shadow-sm" />
        )}
      </div>
    </Portal>
  );
}

/**
 * Marker Popup Component
 */
export function MarkerPopup({ children, className, closeButton = false }: { children: React.ReactNode; className?: string; closeButton?: boolean }) {
  const { map } = useMap();
  const { marker } = React.useContext(MarkerContext);

  React.useEffect(() => {
    if (!map || !marker) return;

    const popupContainer = document.createElement("div");
    const popup = new maplibregl.Popup({
      offset: 25,
      closeButton,
      className: cn("mapcn-popup", className),
    }).setDOMContent(popupContainer);

    marker.setPopup(popup);

    const root = createPortal(children, popupContainer);
    // Note: React 18 createPortal works here
  }, [map, marker, children, className, closeButton]);

  return null;
}

/**
 * Marker Tooltip Component
 */
export function MarkerTooltip({ children, className }: { children: React.ReactNode; className?: string }) {
  const { map } = useMap();
  const { marker } = React.useContext(MarkerContext);

  React.useEffect(() => {
    if (!map || !marker) return;

    const tooltipContainer = document.createElement("div");
    const tooltip = new maplibregl.Popup({
      offset: 15,
      closeButton: false,
      closeOnClick: false,
      className: cn("mapcn-tooltip", className),
    }).setDOMContent(tooltipContainer);

    const el = marker.getElement();
    const handleIn = () => {
      tooltip.setLngLat(marker.getLngLat()).addTo(map);
    };
    const handleOut = () => {
      tooltip.remove();
    };

    el.addEventListener("mouseenter", handleIn);
    el.addEventListener("mouseleave", handleOut);

    return () => {
      el.removeEventListener("mouseenter", handleIn);
      el.removeEventListener("mouseleave", handleOut);
      tooltip.remove();
    };
  }, [map, marker, children]);

  return null;
}

/**
 * Helper: Portal for MapLibre Elements
 */
import { createPortal } from "react-dom";

function Portal({ children, container }: { children: React.ReactNode; container: HTMLElement }) {
  return createPortal(children, container);
}

/**
 * Add CSS for MapLibre Popups to match Shadcn
 */
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    .mapcn-popup .maplibregl-popup-content {
      padding: 1rem;
      border-radius: var(--radius);
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      border: 1px border border-border;
      box-shadow: var(--shadow-md);
      font-family: inherit;
    }
    .mapcn-popup .maplibregl-popup-tip {
      border-top-color: hsl(var(--background));
    }
    .mapcn-tooltip .maplibregl-popup-content {
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius);
      background: hsl(var(--popover));
      color: hsl(var(--popover-foreground));
      border: 1px solid border-border;
      font-size: 0.75rem;
      box-shadow: var(--shadow-sm);
    }
    .mapcn-tooltip .maplibregl-popup-tip {
      display: none;
    }
  `;
  document.head.appendChild(style);
}
