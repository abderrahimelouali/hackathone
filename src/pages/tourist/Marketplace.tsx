import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "@/components/Footer";

const Marketplace = () => {
  const { products } = useData();
  const { t, isRTL } = useLanguage();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t("marketplaceTitle")}</h1>
              <p className="text-muted-foreground text-sm">{t("marketplaceSubtitle")}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-interactive overflow-hidden group"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute top-3 start-3 glass-dark px-3 py-1.5 rounded-lg text-xs font-medium text-primary-foreground">
                  {p.category}
                </div>
                <button
                  onClick={() => toggleFav(p.id)}
                  className="absolute top-3 end-3 w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Heart className={`w-4 h-4 ${favorites.has(p.id) ? "fill-destructive text-destructive" : "text-foreground/70"}`} />
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{p.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div>
                    <span className="text-xl font-bold text-gradient">{p.price}</span>
                    <span className="text-xs text-muted-foreground ms-1">{t("currency")}</span>
                  </div>
                  <button
                    onClick={() => toast.success(isRTL ? "تمت الإضافة للسلة" : "Added to cart")}
                    className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {t("buy")}
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

export default Marketplace;
