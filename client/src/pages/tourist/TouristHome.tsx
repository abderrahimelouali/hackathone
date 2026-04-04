import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, Clock, MapPin, Filter, ChefHat, Footprints, MountainSnow, Bike, Sparkles, ArrowLeft, ArrowRight, Heart, Waves, Car, Tent, Scissors, FlameKindling, Compass, Palette, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-tinghir.jpg";
import Footer from "@/components/Footer";

const categoryData = [
  { key: "all", arabic: "الكل", icon: Sparkles },
  { key: "cooking", arabic: "طبخ", icon: ChefHat },
  { key: "hiking", arabic: "مشي", icon: Footprints },
  { key: "climbing", arabic: "تسلق", icon: MountainSnow },
  { key: "cycling", arabic: "دراجات", icon: Bike },
  { key: "rafting", arabic: "رافتينغ", icon: Waves },
  { key: "quad", arabic: "كواد", icon: Car },
  { key: "camping", arabic: "تخييم", icon: Tent },
  { key: "horseRiding", arabic: "ركوب الخيل", icon: FlameKindling },
  { key: "camelRiding", arabic: "ركوب الجمال", icon: Compass },
  { key: "pottery", arabic: "فخار", icon: Scissors },
  { key: "weaving", arabic: "نسيج", icon: Palette },
] as const;

const categoryMap: Record<string, string> = {
  all: "الكل", cooking: "طبخ", hiking: "مشي", climbing: "تسلق", cycling: "دراجات",
  rafting: "رافتينغ", quad: "كواد", camping: "تخييم", horseRiding: "ركوب الخيل",
  camelRiding: "ركوب الجمال", pottery: "فخار", weaving: "نسيج",
};

const TouristHome = () => {
  const { activities, loading } = useData();
  const { t, lang, isRTL } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTitle = (a: any) => lang === "fr" ? (a.titleFr || a.title) : lang === "en" ? (a.titleEn || a.title) : a.title;
  const getDesc = (a: any) => lang === "fr" ? (a.descriptionFr || a.description) : lang === "en" ? (a.descriptionEn || a.description) : a.description;
  const getDuration = (a: any) => lang === "fr" ? (a.durationFr || a.duration) : lang === "en" ? (a.durationEn || a.duration) : a.duration;
  const getLocation = (a: any) => lang === "fr" ? (a.locationFr || a.location) : lang === "en" ? (a.locationEn || a.location) : a.location;

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getCategoryKey = (cat: string) => {
    return Object.keys(categoryMap).find(k => categoryMap[k] === cat) || "all";
  };

  const filtered = activities.filter((a) => {
    if (category !== "all" && a.category !== categoryMap[category]) return false;
    const searchTarget = `${a.title} ${a.titleFr || ''} ${a.titleEn || ''} ${a.description} ${a.descriptionFr || ''} ${a.descriptionEn || ''}`;
    if (search && !searchTarget.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-bold text-foreground animate-pulse tracking-widest uppercase">
          {t("loading") || "Experiencia Tinghir..."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[540px] md:h-[620px] overflow-hidden">
        <img
          src={heroImg}
          alt="Tinghir"
          className="absolute inset-0 w-full h-full object-cover scale-[1.08] transition-transform duration-700"
          loading="lazy"
        />
        {/* Multi-layer gradient for cinema feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

        {/* Centered Hero Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style={{ paddingBottom: '80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 backdrop-blur-md text-white/90 text-xs font-bold uppercase tracking-widest mb-8"
              style={{ background: 'rgba(255,107,53,0.2)' }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: '#FF6B35' }} />
              {t("authenticExperiences")}
            </motion.div>

            <h1
              className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.0]"
              style={{ letterSpacing: '-0.03em' }}
            >
              {t("discoverTinghir")}
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-medium">
              {t("heroSubtitle")}
            </p>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-0 inset-x-0 pb-8"
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-6 md:gap-16">
              {[
                { value: `${activities.length}+`, label: t("activitiesStat"), color: '#FF6B35' },
                { value: '4.8★', label: t("rating"), color: '#F6E683' },
                { value: '500+', label: t("visitors"), color: '#79D45E' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-black text-white" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-xs text-white/60 mt-1 uppercase tracking-widest font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search & Filter — Floating Glass Card */}
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-2 md:p-3 mt-6 relative z-10 shadow-premium"
        >
          {/* Responsive Search + Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full ps-10 pe-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-200 font-medium text-xs md:text-sm"
              />
            </div>

            {/* Custom Category Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between ps-10 pe-4 py-2 rounded-lg bg-secondary border border-border text-foreground transition-all duration-300 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Filter className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <span className="font-black text-xs uppercase tracking-widest truncate">
                    {t(category as any)}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full inset-x-0 mt-2 p-2 bg-background/90 backdrop-blur-2xl border border-border shadow-2xl rounded-2xl z-[100] max-h-80 overflow-y-auto scrollbar-hide"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {categoryData.map((c) => {
                        const active = category === c.key;
                        return (
                          <button
                            key={c.key}
                            onClick={() => {
                              setCategory(c.key);
                              setIsDropdownOpen(false);
                            }}
                            className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 group/item ${
                              active 
                                ? 'bg-primary/10 border border-primary/20' 
                                : 'hover:bg-muted border border-transparent'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                              active ? 'bg-primary text-white' : 'bg-muted text-muted-foreground group-hover/item:text-primary'
                            }`}>
                              <c.icon className="w-4.5 h-4.5" />
                            </div>
                            <span className={`text-[11px] font-black uppercase tracking-wider ${
                              active ? 'text-primary' : 'text-muted-foreground group-hover/item:text-foreground'
                            }`}>
                              {t(c.key)}
                            </span>
                            {active && (
                              <motion.div 
                                layoutId="activeCheck"
                                className="ms-auto w-1.5 h-1.5 rounded-full bg-primary shadow-glow shadow-primary"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Activities Grid */}
      <div className="container mx-auto px-2 md:px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {filtered.map((activity, i) => {
            const colorClasses = {
              violet: "text-brand-violet bg-brand-violet-light border-brand-violet/30 hover:shadow-glow-violet",
              orange: "text-brand-orange bg-brand-orange-light border-brand-orange/30 hover:shadow-glow-orange",
              yellow: "text-brand-yellow bg-brand-yellow-light border-brand-yellow/30 hover:shadow-glow-yellow",
              green: "text-brand-green bg-brand-green-light border-brand-green/30 hover:shadow-glow-green",
              purple: "text-brand-purple bg-brand-purple-light border-brand-purple/30 hover:shadow-glow-purple",
              pink: "text-brand-pink bg-brand-pink-light border-brand-pink/30 hover:shadow-glow-pink",
            }[activity.color];

            const badgeColor = {
              violet: "bg-brand-violet text-white",
              orange: "bg-brand-orange text-white",
              yellow: "bg-brand-yellow text-primary",
              green: "bg-brand-green text-white",
              purple: "bg-brand-purple text-white",
              pink: "bg-brand-pink text-white",
            }[activity.color];

            return (
              <motion.div 
                key={activity.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link 
                  to={`/activity/${activity.id}`} 
                  className={`group card-interactive block overflow-hidden border transition-all duration-500 ${colorClasses}`}
                >
                  <div className="relative h-40 md:h-64 overflow-hidden">
                    <img 
                      src={activity.image} 
                      alt={getTitle(activity)} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    <div className={`absolute top-2 md:top-4 start-2 md:start-4 px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[8px] md:text-[10px] font-bold uppercase tracking-widest shadow-lg ${badgeColor}`}>
                      {t(getCategoryKey(activity.category) as any)}
                    </div>



                    <button
                      onClick={(e) => { e.preventDefault(); toggleFav(activity.id); }}
                      className="absolute top-2 md:top-4 end-2 md:end-4 w-7 h-7 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-all duration-300 group/fav shadow-[0_4px_16px_rgba(0,0,0,0.25)] z-10"
                    >
                      <Heart className={`w-3.5 h-3.5 md:w-5 md:h-5 transition-colors ${favorites.has(activity.id) ? "fill-destructive text-destructive" : "text-black/20 group-hover/fav:text-destructive group-hover/fav:fill-destructive/20"}`} />
                    </button>

                    <div className="absolute bottom-2 md:bottom-4 end-2 md:end-4 bg-primary px-2.5 md:px-4 py-1 md:py-2 rounded-lg md:rounded-xl shadow-[0_6px_20px_rgba(255,107,53,0.4)] z-10">
                      <span className="font-black text-white text-base md:text-xl tracking-tight">{activity.price}</span>
                      <span className="text-white/80 text-[8px] md:text-[10px] ms-1 font-bold uppercase tracking-widest">{t("currency")}</span>
                    </div>
                  </div>

                  <div className="p-3 md:p-5">
                    <h3 className="font-black text-foreground text-sm md:text-xl mb-1 md:mb-2 group-hover:translate-x-1 transition-transform duration-300 line-clamp-1">
                      {getTitle(activity)}
                    </h3>
                    <p className="text-muted-foreground text-[10px] md:text-sm mb-4 md:mb-6 line-clamp-1 md:line-clamp-2 leading-relaxed font-medium">
                      {getDesc(activity)}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <span className="flex items-center gap-1 md:gap-1.5">
                          <Star className="w-3 md:w-4 h-3 md:h-4 text-brand-orange fill-brand-orange" />
                          <span className="text-foreground">{activity.rating}</span>
                        </span>
                        <span className="flex items-center gap-1 md:gap-1.5">
                          <Clock className="w-3 md:w-4 h-3 md:h-4" />
                          {getDuration(activity)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[8px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest truncate max-w-[40%]">
                        <MapPin className="w-3 md:w-3.5 h-3 md:h-3.5" />
                        {getLocation(activity).split(/[،,]/)[0]}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24 col-span-full">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ background: '#FF6B3520' }}>
              <Search className="w-9 h-9" style={{ color: '#FF6B35' }} />
            </div>
            <h3 className="text-2xl font-black text-foreground mb-2">{t("noResults")}</h3>
            <p className="text-muted-foreground mb-6 font-medium">{t("tryAdjustFilters")}</p>
            <button
              onClick={() => { setSearch(""); setCategory("all"); }}
              className="px-6 py-3 rounded-xl text-white font-black text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FFA726 100%)' }}
            >
              {t("clearFilters")}
            </button>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TouristHome;
