import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Car, Shield, MapPin, Fuel } from "lucide-react";
import Footer from "@/components/Footer";

const TransportPage = () => {
  const { transport } = useData();
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t("transportTitle")}</h1>
              <p className="text-muted-foreground text-sm">{t("transportSubtitle")}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {transport.map((tr, i) => (
            <motion.div
              key={tr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="card-interactive overflow-hidden group"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={tr.image} alt={tr.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute top-3 start-3 glass-dark px-3 py-1.5 rounded-lg text-xs font-medium text-primary-foreground flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5" />
                  {tr.type === "كراء سيارة" ? t("carRental") : t("touristTransport")}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{tr.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{tr.description}</p>
                
                <div className="flex gap-3 mb-5">
                  {[
                    { icon: Shield, text: isRTL ? "تأمين شامل" : "Full insurance" },
                    { icon: Fuel, text: isRTL ? "وقود مشمول" : "Fuel included" },
                    { icon: MapPin, text: isRTL ? "GPS" : "GPS" },
                  ].map((f) => (
                    <span key={f.text} className="flex items-center gap-1 text-[11px] text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                      <f.icon className="w-3 h-3 text-accent" />
                      {f.text}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div>
                    <span className="text-2xl font-bold text-gradient">{tr.price}</span>
                    <span className="text-sm text-muted-foreground ms-1">{t("perDay")}</span>
                  </div>
                  <button className="btn-primary text-sm px-6">
                    {t("bookNow")}
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

export default TransportPage;
