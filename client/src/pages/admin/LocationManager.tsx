import { useState, useCallback, useEffect } from "react";
import { useData } from "@/contexts/DataProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Search, Navigation, Save, X, Activity, 
  Map as MapIcon, CheckCircle2, AlertCircle, Loader2,
  MousePointer2, ChevronRight, Target, ShieldCheck
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MapControls,
} from "@/components/ui/map";

const TINGHIR_CENTER: [number, number] = [-5.5340, 31.5125];

const LocationManager = () => {
  const { lang, t } = useLanguage();
  const { activities, updateActivity, mapLocations, loading } = useData();
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [tempCoords, setTempCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  
  const [viewport, setViewport] = useState({
    center: TINGHIR_CENTER,
    zoom: 12
  });

  const filteredActivities = activities.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.titleFr && a.titleFr.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (a.titleEn && a.titleEn.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedActivity = activities.find(a => a.id === selectedActivityId);

  const handleSelectActivity = useCallback((id: string) => {
    const act = activities.find(a => a.id === id);
    if (act) {
      setSelectedActivityId(id);
      const lat = act.lat || TINGHIR_CENTER[1];
      const lng = act.lng || TINGHIR_CENTER[0];
      setTempCoords({ lat, lng });
      setViewport({
        center: [lng, lat],
        zoom: 15
      });
    }
  }, [activities]);

  const handleMapClick = useCallback((e: any) => {
    if (!selectedActivityId) {
      toast.warning(lang === "fr" ? "Veuillez d'abord sélectionner une activité" : "Please select an activity first");
      return;
    }
    const { lng, lat } = e.lngLat;
    setTempCoords({ lat, lng });
  }, [selectedActivityId, lang]);

  const handleLocate = () => {
    if (!selectedActivityId) return;
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lng: position.coords.longitude,
            lat: position.coords.latitude
          };
          setTempCoords(newLocation);
          setViewport({
            center: [newLocation.lng, newLocation.lat],
            zoom: 17
          });
          setIsLocating(false);
          toast.success(lang === "fr" ? "Position récupérée !" : "Position acquired!");
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
          toast.error(lang === "fr" ? "Impossible de récupérer votre position." : "Could not acquire position.");
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    }
  };

  const handleSave = async () => {
    if (!selectedActivityId || !tempCoords) return;
    setIsSaving(true);
    try {
      // @ts-ignore
      await updateActivity(selectedActivityId, { 
        lat: tempCoords.lat, 
        lng: tempCoords.lng 
      });
      toast.success(lang === "fr" ? "Localisation mise à jour !" : "Location updated successfully!");
    } catch (error) {
      toast.error("Failed to update location");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Loading Tinghir Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-red-500/20 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Tinghir System Control
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
              <div className="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20">
                <MapIcon className="w-7 h-7 text-white" />
              </div>
              Activity Geolocation Hub
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative w-full md:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder={lang === "fr" ? "Rechercher une activité..." : "Search activities..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm text-slate-900"
            />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 h-[750px]">
          {/* Activity Sidebar */}
          <div className="lg:col-span-4 flex flex-col h-full bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
                Inventory ({filteredActivities.length})
              </p>
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredActivities.map((a, idx) => {
                  const isSelected = selectedActivityId === a.id;
                  return (
                    <motion.button
                      key={a.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      onClick={() => handleSelectActivity(a.id)}
                      className={cn(
                        "w-full flex items-center gap-5 p-5 rounded-[2rem] border transition-all text-left relative group",
                        isSelected 
                          ? "bg-slate-900 border-slate-900 shadow-2xl shadow-slate-900/20 translate-x-2" 
                          : "bg-white border-slate-100 hover:border-primary/30 hover:bg-slate-50/80"
                      )}
                    >
                      <div className="relative flex-shrink-0">
                        <img src={a.image} className="w-14 h-14 rounded-2xl object-cover" alt="" />
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 size-6 bg-primary rounded-full flex items-center justify-center border-2 border-slate-900 shadow-lg">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={cn("text-sm font-black truncate mb-1", isSelected ? "text-white" : "text-slate-900")}>
                          {a.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <MapPin className={cn("w-3.5 h-3.5", isSelected ? "text-primary" : "text-slate-300")} />
                          {a.lat ? (
                            <span className={cn("text-[10px] font-bold tracking-wider", isSelected ? "text-slate-400" : "text-slate-400")}>
                              {a.lat.toFixed(4)}, {a.lng.toFixed(4)}
                            </span>
                          ) : (
                            <span className="text-[10px] font-black text-red-500/80 uppercase tracking-widest flex items-center gap-1.5">
                              <AlertCircle className="w-3 h-3" /> Missing Geodata
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className={cn("w-5 h-5 transition-all", isSelected ? "text-primary opacity-100" : "text-slate-200 opacity-0 group-hover:opacity-100")} />
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            {selectedActivity && (
              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                   <div className="size-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                      <Target className="w-6 h-6 text-primary" />
                   </div>
                   <div className="min-w-0">
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Target Platform</p>
                     <p className="text-sm font-black text-slate-900 truncate">{selectedActivity.title}</p>
                   </div>
                </div>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full py-5 rounded-[1.5rem] bg-primary text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Synchronize Location
                </button>
              </div>
            )}
          </div>

          {/* Premium Map Canvas */}
          <div className="lg:col-span-8 relative rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl bg-white group">
            {/* Map UI Overlays */}
            <div className="absolute top-6 left-6 right-6 z-20 pointer-events-none flex justify-between items-start">
               <div className="flex flex-col gap-3">
                  <div className="glass px-5 py-3 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-4 backdrop-blur-md">
                    <div className="size-2 rounded-full bg-primary animate-pulse" />
                    <div>
                      <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Tinghir Satellite Hub</h4>
                      <p className="text-[9px] font-bold text-slate-500 uppercase">Live Spatial Coordinates</p>
                    </div>
                  </div>
                  
                  {selectedActivityId && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 flex items-center gap-3"
                    >
                      <MousePointer2 className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Click map to pinpoint</span>
                    </motion.div>
                  )}
               </div>

               {selectedActivityId && (
                 <button
                   type="button"
                   onClick={handleLocate}
                   disabled={isLocating}
                   className="pointer-events-auto p-4 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl shadow-2xl border border-slate-100 transition-all active:scale-95 group disabled:opacity-50"
                 >
                   <Target className={cn("w-6 h-6 transition-colors group-hover:text-primary text-slate-400", isLocating && "animate-spin text-primary")} />
                 </button>
               )}
            </div>

            {tempCoords && (
              <div className="absolute bottom-8 left-8 z-20 glass px-6 py-4 rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-md">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Latitude</p>
                    <p className="text-sm font-black text-slate-900">{tempCoords.lat.toFixed(6)}</p>
                  </div>
                  <div className="w-px h-8 bg-slate-200/50 my-auto" />
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Longitude</p>
                    <p className="text-sm font-black text-slate-900">{tempCoords.lng.toFixed(6)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* @ts-ignore */}
            <Map
              center={viewport.center}
              zoom={viewport.zoom}
              onViewportChange={(v) => setViewport({ center: [v.longitude, v.latitude], zoom: v.zoom })}
              className={cn("w-full h-full")}
              cursor={selectedActivityId ? "crosshair" : "default"}
              onClick={handleMapClick}
              theme="light"
            >
              <MapControls position="bottom-right" showZoom showLocate={false} />
              
              {/* Context: Landmarks (Light grey theme) */}
              {mapLocations.map((loc: any) => (
                <MapMarker key={loc.id || loc._id} longitude={loc.lng} latitude={loc.lat}>
                  <MarkerContent className="opacity-30 hover:opacity-100 transition-opacity">
                    <div className="size-8 rounded-full bg-slate-100 border border-white flex items-center justify-center text-sm shadow-sm ring-4 ring-slate-100/50">
                      {loc.emoji}
                    </div>
                  </MarkerContent>
                </MapMarker>
              ))}

              {/* Inactive Activities: Selectable Pins */}
              {activities.filter(a => a.id !== selectedActivityId && a.lat).map(a => (
                <MapMarker 
                  key={a.id} 
                  longitude={a.lng} 
                  latitude={a.lat}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectActivity(a.id);
                  }}
                >
                  <MarkerContent className="cursor-pointer group/pin hover:z-50">
                    <div className="relative">
                      <div className="absolute inset-0 size-full rounded-full bg-slate-900/10 animate-ping opacity-20 scale-150" />
                      <div className="relative size-7 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-lg transition-all group-hover/pin:scale-125 group-hover/pin:border-primary group-hover/pin:bg-slate-900 group-hover/pin:text-white">
                        <MapPin className="w-4 h-4 text-slate-300 group-hover/pin:text-white" />
                      </div>
                    </div>
                  </MarkerContent>
                  <MarkerTooltip className="text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white border-none px-3 py-1.5 rounded-xl shadow-2xl">
                    Select: {a.title}
                  </MarkerTooltip>
                </MapMarker>
              ))}

              {/* Active Selection Pin */}
              {tempCoords && (
                <MapMarker longitude={tempCoords.lng} latitude={tempCoords.lat}>
                  <MarkerContent>
                    <div className="relative flex items-center justify-center">
                      <div className="absolute size-24 bg-primary/10 rounded-full animate-ping" />
                      <div className="absolute size-16 bg-primary/20 rounded-full" />
                      <motion.div 
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="relative size-16 bg-white rounded-[1.5rem] shadow-2xl flex items-center justify-center border-4 border-primary ring-8 ring-primary/5 group/main"
                      >
                         <MapPin className="size-8 text-primary group-hover/main:scale-110 transition-transform" fill="currentColor" />
                      </motion.div>
                    </div>
                  </MarkerContent>
                  <MarkerTooltip className="bg-primary text-white font-black text-xs px-4 py-2 rounded-xl shadow-2xl border-none">
                    {selectedActivity?.title || "Target Coordinate"}
                  </MarkerTooltip>
                </MapMarker>
              )}
            </Map>

            {!selectedActivityId && (
              <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none bg-slate-900/5 backdrop-blur-[2px]">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/95 backdrop-blur-xl px-10 py-8 rounded-[3rem] border border-white/20 shadow-premium flex flex-col items-center gap-4"
                >
                  <div className="size-16 rounded-[1.5rem] bg-slate-900 shadow-2xl shadow-slate-900/20 flex items-center justify-center">
                    <MousePointer2 className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-black text-slate-900 tracking-tight leading-none mb-2">
                       Select to Begin
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                       Choose an activity from the sidebar
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
};

export default LocationManager;
