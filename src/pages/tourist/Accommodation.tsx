import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Star, Check, BedDouble, Wifi, Car as CarIcon, Utensils, Wind, TreePine } from "lucide-react";
import Footer from "@/components/Footer";

const amenityIcons: Record<string, any> = {
  "واي فاي": Wifi,
  "مسبح": TreePine,
  "إفطار": Utensils,
  "موقف سيارات": CarIcon,
  "تكييف": Wind,
  "مطبخ": Utensils,
  "حديقة": TreePine,
};

const Accommodation = () => {
  const { stays } = useData();
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BedDouble className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t("accommodationTitle")}</h1>
              <p className="text-muted-foreground text-sm">{t("accommodationSubtitle")}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {stays.map((stay, i) => (
            <motion.div
              key={stay.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="card-interactive overflow-hidden group"
            >
              <div className="relative h-72 overflow-hidden">
                <img src={stay.image} alt={stay.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 start-3 glass-dark px-3 py-1.5 rounded-lg text-xs font-medium text-primary-foreground">
                  {stay.type === "فندق" ? t("hotel") : t("home")}
                </div>
                <div className="absolute top-3 end-3 glass-dark px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                  <span className="text-xs font-bold text-primary-foreground">{stay.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{stay.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{stay.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {stay.amenities.map((a) => {
                    const Icon = amenityIcons[a] || Check;
                    return (
                      <span key={a} className="flex items-center gap-1.5 bg-accent/5 text-accent border border-accent/10 px-3 py-1.5 rounded-lg text-xs font-medium">
                        <Icon className="w-3 h-3" />
                        {a}
                      </span>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div>
                    <span className="text-2xl font-bold text-gradient">{stay.price}</span>
                    <span className="text-sm text-muted-foreground ms-1">{t("perNight")}</span>
                  </div>
                  <button className="btn-primary text-sm px-6">
                    {t("book")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Accommodation;
