import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Navigation, Mountain, ShoppingBag, Landmark, Palette, Droplets, Star, Clock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { mapLocations } from "@/data/mockData";
import mapBg from "@/assets/map-tinghir.jpg";
import Footer from "@/components/Footer";

const typeIcons: Record<string, typeof Mountain> = {
  nature: Mountain,
  heritage: Landmark,
  shopping: ShoppingBag,
  culture: Palette,
  adventure: Navigation,
};

const typeColors: Record<string, string> = {
  nature: "bg-accent text-accent-foreground",
  heritage: "bg-gold text-foreground",
  shopping: "bg-primary text-primary-foreground",
  culture: "bg-terracotta text-primary-foreground",
  adventure: "bg-olive text-primary-foreground",
};

const MapPage = () => {
  const { lang } = useLanguage();
  const { activities } = useData();
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const getName = (loc: typeof mapLocations[0]) =>
    lang === "fr" ? loc.nameFr : lang === "en" ? loc.nameEn : loc.name;

  const types = [
    { key: "all", label: lang === "fr" ? "Tout" : lang === "en" ? "All" : "الكل" },
    { key: "nature", label: lang === "fr" ? "Nature" : lang === "en" ? "Nature" : "طبيعة" },
    { key: "heritage", label: lang === "fr" ? "Patrimoine" : lang === "en" ? "Heritage" : "تراث" },
    { key: "culture", label: lang === "fr" ? "Culture" : lang === "en" ? "Culture" : "ثقافة" },
    { key: "adventure", label: lang === "fr" ? "Aventure" : lang === "en" ? "Adventure" : "مغامرة" },
    { key: "shopping", label: lang === "fr" ? "Shopping" : lang === "en" ? "Shopping" : "تسوق" },
  ];

  const filtered = filter === "all" ? mapLocations : mapLocations.filter(l => l.type === filter);
  const selectedLoc = mapLocations.find(l => l.id === selected);

  // Map pin positions (simulated based on relative lat/lng)
  const getPosition = (loc: typeof mapLocations[0]) => {
    const minLat = 31.3, maxLat = 31.72, minLng = -5.9, maxLng = -5.2;
    const x = ((loc.lng - minLng) / (maxLng - minLng)) * 80 + 10;
    const y = ((maxLat - loc.lat) / (maxLat - minLat)) * 70 + 15;
    return { x: `${x}%`, y: `${y}%` };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Navigation className="w-4 h-4" />
              {lang === "fr" ? "Carte Interactive" : lang === "en" ? "Interactive Map" : "الخريطة التفاعلية"}
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              {lang === "fr" ? "Explorez Tinghir" : lang === "en" ? "Explore Tinghir" : "استكشف تنغير"}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {lang === "fr" ? "Découvrez les meilleurs sites et activités de la région" :
               lang === "en" ? "Discover the best sites and activities in the region" :
               "اكتشف أفضل المواقع والأنشطة في المنطقة"}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {types.map(tp => (
              <button
                key={tp.key}
                onClick={() => setFilter(tp.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === tp.key ? "gradient-hero text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:bg-secondary border border-border/50"}`}
              >
                {tp.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-3xl overflow-hidden shadow-card-hover border border-border/50"
          style={{ height: "500px" }}
        >
          <img src={mapBg} alt="Tinghir Map" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/20" />

          {/* Location Pins */}
          {filtered.map((loc) => {
            const pos = getPosition(loc);
            const isSelected = selected === loc.id;
            return (
              <motion.button
                key={loc.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.3 }}
                onClick={() => setSelected(isSelected ? null : loc.id)}
                className={`absolute z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all ${isSelected ? "z-20" : ""}`}
                style={{ left: pos.x, top: pos.y }}
              >
                <div className={`flex items-center justify-center rounded-full shadow-lg ${isSelected ? "w-14 h-14 ring-4 ring-primary-foreground/50" : "w-11 h-11"} ${typeColors[loc.type] || "bg-primary text-primary-foreground"}`}>
                  <span className="text-lg">{loc.emoji}</span>
                </div>
                {!isSelected && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap glass-dark px-2 py-0.5 rounded text-[10px] text-primary-foreground font-medium">
                    {getName(loc)}
                  </div>
                )}
              </motion.button>
            );
          })}

          {/* Selected Location Panel */}
          <AnimatePresence>
            {selectedLoc && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-4 end-4 w-72 glass rounded-2xl p-5 z-30"
              >
                <button onClick={() => setSelected(null)} className="absolute top-3 end-3 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${typeColors[selectedLoc.type]}`}>
                    {selectedLoc.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{getName(selectedLoc)}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{selectedLoc.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{selectedLoc.lat.toFixed(4)}, {selectedLoc.lng.toFixed(4)}</span>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${selectedLoc.lat},${selectedLoc.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2 flex items-center justify-center gap-2 w-full"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {lang === "fr" ? "Ouvrir dans Google Maps" : lang === "en" ? "Open in Google Maps" : "فتح في خرائط جوجل"}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Nearby Activities */}
        <div className="mt-10 mb-8">
          <h2 className="font-bold text-xl text-foreground mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-gold" />
            {lang === "fr" ? "Activités populaires" : lang === "en" ? "Popular Activities" : "أنشطة مميزة"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activities.slice(0, 6).map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link to={`/activity/${a.id}`} className="flex gap-3 p-3 card-interactive group">
                  <img src={a.images[0]} alt={a.title} className="w-20 h-20 rounded-xl object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">{a.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 text-gold fill-gold" />
                      <span>{a.rating}</span>
                      <Clock className="w-3 h-3 ms-1" />
                      <span>{a.duration}</span>
                    </div>
                    <p className="text-primary font-bold text-sm mt-1">{a.price} {lang === "fr" || lang === "en" ? "MAD" : "د.م"}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;
