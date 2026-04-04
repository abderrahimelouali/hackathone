import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataProvider";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Star, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
} from "@/components/ui/map";

const TINGHIR_CENTER: [number, number] = [-5.5340, 31.5125];

const ACTIVITY_COLORS: Record<string, string> = {
  violet: "#4928FD",
  orange: "#FFAF68",
  yellow: "#F6E683",
  green: "#79D45E",
  purple: "#A484E9",
  pink: "#F4889A",
};

const MapPage = () => {
  const { lang } = useLanguage();
  const { activities, loading } = useData();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-6">
              <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Loading Map...</p>
          </div>
      </div>
    );
  }

  // Ensure activities have a valid latitude to be displayed on the map
  const validActivities = activities.filter(a => a.lat && a.lng);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="pt-32 pb-12 px-6">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-5 text-white shadow-xl shadow-primary/20" style={{ background: "linear-gradient(135deg, #FF6B35 0%, #FFA726 100%)" }}>
               <Navigation className="w-3.5 h-3.5" />
               {lang === "fr" ? "Carte Interactive" : lang === "en" ? "Interactive Map" : "الخريطة التفاعلية"}
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
              {lang === "fr" ? "Explorer la Carte" : lang === "en" ? "Explore the Map" : "استكشاف الخريطة"}
            </h1>
            <p className="text-lg md:text-xl font-medium text-slate-500 mb-10">
              {lang === "fr" ? "Découvrez toutes nos activités géolocalisées." : lang === "en" ? "Discover all our geolocated activities." : "اكتشف جميع أنشطتنا المحددة جغرافياً."}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl bg-white"
          style={{ height: "70vh", minHeight: "600px" }}
        >
          {/* 
            -- MAP & CARD PROTOTYPE (DISABLED FOR MVP) --
            Uncomment this block for production use.
            
          <Map
            center={TINGHIR_CENTER}
            zoom={12}
            className="w-full h-full"
            theme="light"
          >
            <MapControls position="bottom-right" showZoom showLocate />

            {validActivities.map((a) => {
              const markerColor = ACTIVITY_COLORS[a.color?.toLowerCase()] || "#FF6B35";
              
              return (
                <MapMarker key={a.id} longitude={Number(a.lng)} latitude={Number(a.lat)}>
                   <MarkerContent className="group/act">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 size-full rounded-full animate-ping opacity-20 scale-150" style={{ background: markerColor }} />
                        <div 
                          className="relative size-6 rounded-full bg-white border-2 flex items-center justify-center shadow-xl transition-all group-hover/act:scale-125"
                          style={{ borderColor: markerColor, boxShadow: `0 10px 15px -3px ${markerColor}33` }}
                        >
                          <div className="size-1.5 rounded-full transition-colors group-hover/act:bg-white" style={{ background: markerColor }} />
                        </div>
                      </div>
                   </MarkerContent>
                   <MarkerPopup className="p-0 w-[280px] overflow-hidden rounded-2xl border-none shadow-2xl bg-white">
                      <div className="w-full overflow-hidden bg-white p-0 rounded-2xl" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                        <div className="relative h-44 overflow-hidden rounded-t-2xl">
                          <img src={a.image} className="w-full h-full object-cover" alt={a.title} />
                          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="p-5 space-y-4 -mt-2 relative">
                           <div className="space-y-0.5">
                             <span className="text-[10px] font-bold uppercase tracking-widest leading-none" style={{ color: markerColor }}>
                               {a.category || "ACTIVITY"}
                             </span>
                             <h3 className="text-base font-bold text-slate-900 tracking-tight leading-tight m-0">
                               {a.title}
                             </h3>
                           </div>
                           <div className="space-y-2">
                              <div className="flex items-center gap-2 text-slate-600">
                                <Star className="size-3.5 fill-[#FFA726] text-[#FFA726]" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFA726]">
                                  {a.rating} RATING
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-400">
                                <Clock className="size-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">
                                  {a.duration}
                                </span>
                              </div>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest m-0 flex items-center mt-3">
                                <span className="text-slate-900 text-xs font-black mr-1">{a.price} MAD</span> {lang === 'en' ? 'STARTING PRICE' : lang === 'fr' ? 'PRIX INITIAL' : 'ابتداءا من'}
                              </p>
                           </div>
                           <div className="flex items-center gap-2 pt-2">
                             <Link to={`/activity/${a.id}`} className="flex-1 h-11 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/95 transition-all border-none cursor-pointer">
                               {lang === 'en' ? 'VIEW DEAL' : lang === 'fr' ? 'VOIR L\'OFFRE' : 'عرض الصفقة'}
                             </Link>
                             <a href={`https://www.google.com/maps?q=${a.lat},${a.lng}`} target="_blank" rel="noopener noreferrer" className="size-11 border border-slate-100 bg-slate-50 text-primary rounded-xl flex items-center justify-center hover:bg-slate-100 transition-all p-0 cursor-pointer">
                               <MapPin className="size-5" />
                             </a>
                           </div>
                        </div>
                      </div>
                   </MarkerPopup>
                </MapMarker>
              );
            })}
          </Map>
          */}

          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
             <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#cfd8dc 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.5 }} />
             <div className="z-10 flex flex-col items-center max-w-sm text-center">
                <div className="size-20 rounded-[2rem] bg-white border border-slate-200 shadow-xl flex items-center justify-center mb-6">
                   <Navigation className="size-8 text-primary opacity-50" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Interactive Map Prototype</h3>
                <p className="text-sm font-medium text-slate-500 mb-8 max-w-xs">
                  The live map module and activity cards are currently disabled for this MVP prototype. The code is structured and ready for production.
                </p>
                <div className="px-5 py-2.5 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                  Ready for Integration
                </div>
             </div>
          </div>

          {/* Clean Legend Overlay */}
          <div className="absolute bottom-6 left-6 z-10 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Activity Colors</p>
            <div className="flex gap-3">
               {Object.entries(ACTIVITY_COLORS).map(([name, color]) => (
                  <div key={name} className="size-3 rounded-full shadow-sm" style={{ background: color }} title={name} />
               ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
      <style>{`
        .maplibregl-popup-content {
          padding: 0 !important;
          background: white !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
          border-radius: 16px !important;
        }
        .maplibregl-popup-tip {
          border-top-color: white !important;
        }
      `}</style>
    </div>
  );
};

export default MapPage;
