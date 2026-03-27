import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Search, Star, Clock, MapPin, Filter, ChefHat, Footprints, MountainSnow, Bike, Sparkles, ArrowLeft, ArrowRight, Heart } from "lucide-react";
import heroImg from "@/assets/hero-tinghir.jpg";
import Footer from "@/components/Footer";

const categoryData = [
  { key: "all", arabic: "الكل", icon: Sparkles },
  { key: "cooking", arabic: "طبخ", icon: ChefHat },
  { key: "hiking", arabic: "مشي", icon: Footprints },
  { key: "climbing", arabic: "تسلق", icon: MountainSnow },
  { key: "cycling", arabic: "دراجات", icon: Bike },
] as const;

const categoryMap: Record<string, string> = {
  all: "الكل", cooking: "طبخ", hiking: "مشي", climbing: "تسلق", cycling: "دراجات",
};

const TouristHome = () => {
  const { activities } = useData();
  const { t, isRTL } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = activities.filter((a) => {
    if (category !== "all" && a.category !== categoryMap[category]) return false;
    if (a.price > maxPrice) return false;
    if (search && !a.title.includes(search) && !a.description.includes(search)) return false;
    return true;
  });

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[480px] overflow-hidden">
        <img src={heroImg} alt="Tinghir" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/10" />
        <div className="absolute inset-0 pattern-moroccan opacity-10" />
        
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground/90 text-sm mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {isRTL ? "تجارب أصيلة" : "Authentic Experiences"}
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-primary-foreground mb-4 leading-tight">{t("discoverTinghir")}</h1>
            <p className="text-primary-foreground/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">{t("heroSubtitle")}</p>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 inset-x-0"
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-8 md:gap-16 py-4 text-primary-foreground/80">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold">{activities.length}+</p>
                <p className="text-xs opacity-70">{t("activitiesStat")}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold">4.8</p>
                <p className="text-xs opacity-70">{t("rating")}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold">500+</p>
                <p className="text-xs opacity-70">{isRTL ? "زائر سعيد" : "Happy visitors"}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search & Filter */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl shadow-card-hover p-5 -mt-8 relative z-10"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute start-4 top-3.5 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-styled ps-12"
              />
            </div>
            <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-2">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">{t("maxPrice")}</span>
              <input
                type="range"
                min={50}
                max={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 md:w-32 accent-primary"
              />
              <span className="text-sm font-bold text-primary whitespace-nowrap">{maxPrice} {t("currency")}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {categoryData.map((c) => {
              const active = category === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${active ? "gradient-hero text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:bg-secondary border border-border/50"}`}
                >
                  <c.icon className="w-4 h-4" />
                  {t(c.key)}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Activities Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link
                to={`/activity/${activity.id}`}
                className="group card-interactive block overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={activity.images[0]}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-3 start-3 glass-dark px-3 py-1.5 rounded-lg text-xs font-medium text-primary-foreground flex items-center gap-1.5">
                    {categoryData.find(c => c.arabic === activity.category) && (
                      <>
                        {(() => {
                          const Icon = categoryData.find(c => c.arabic === activity.category)?.icon || Sparkles;
                          return <Icon className="w-3.5 h-3.5" />;
                        })()}
                      </>
                    )}
                    {activity.category}
                  </div>

                  {activity.hasGuide && (
                    <div className="absolute top-3 end-12 bg-accent/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-xs font-medium text-accent-foreground">
                      {t("withGuide")}
                    </div>
                  )}

                  <button
                    onClick={(e) => { e.preventDefault(); toggleFav(activity.id); }}
                    className="absolute top-3 end-3 w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(activity.id) ? "fill-destructive text-destructive" : "text-foreground/70"}`} />
                  </button>

                  <div className="absolute bottom-3 end-3 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <span className="font-bold text-primary text-lg">{activity.price}</span>
                    <span className="text-muted-foreground text-xs ms-1">{t("currency")}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{activity.description}</p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-gold fill-gold" />
                        <span className="font-medium text-foreground">{activity.rating}</span>
                      </span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{activity.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {activity.location.split("،")[0]}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">{t("noResults")}</p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TouristHome;
