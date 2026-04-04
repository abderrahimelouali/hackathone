import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Tag, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "@/components/Footer";

const productColors = [
  { hex: "#FFAF68" },
  { hex: "#A484E9" },
  { hex: "#79D45E" },
  { hex: "#F4889A" },
  { hex: "#F6C843" },
];

// ============================================================
// 🛍️ PRODUCTS — Edit here to change content or images
// Images go in: public/images/shop/
// Change the `image` field to match your filename exactly.
// ============================================================
const PRODUCTS = [
  {
    id: "p1",
    title:       { ar: "زعفران تاليوين", fr: "Safran de Taliouine", en: "Taliouine Saffron" },
    description: { ar: "زعفران حر ممتاز من منطقة تاليوين. منتج طبيعي 100% بجودة استثنائية.", fr: "Safran pur de qualité supérieure de Taliouine. 100% naturel.", en: "Premium saffron from Taliouine. 100% natural, exceptional quality." },
    category:    { ar: "توابل", fr: "Épices", en: "Spices" },
    price: 150,
    image: "/images/shop/safran.jpg",   // ← change filename here
  },
  {
    id: "p2",
    title:       { ar: "زربية أمازيغية", fr: "Tapis Amazigh", en: "Amazigh Carpet" },
    description: { ar: "زربية تقليدية منسوجة يدوياً بصوف طبيعي وألوان نباتية من منطقة دادس.", fr: "Tapis tissé main en laine naturelle, motifs amazighs du Dadès.", en: "Hand-woven carpet in natural wool, Amazigh patterns from Dadès." },
    category:    { ar: "نسيج", fr: "Tissage", en: "Weaving" },
    price: 2500,
    image: "/images/shop/carpet.jpg",   // ← change filename here
  },
  {
    id: "p3",
    title:       { ar: "عسل الجبال", fr: "Miel de Montagne", en: "Mountain Honey" },
    description: { ar: "عسل طبيعي نقي من خلايا النحل الجبلية في تنغير. غني بالفوائد الصحية.", fr: "Miel naturel pur des ruches de montagne de Tinghir. Riche en bienfaits.", en: "Pure natural honey from Tinghir mountain hives. Rich in health benefits." },
    category:    { ar: "غذاء", fr: "Alimentation", en: "Food" },
    price: 80,
    image: "/images/shop/meil.jpg",     // ← change filename here
  },
  {
    id: "p4",
    title:       { ar: "فخار تقليدي", fr: "Poterie Traditionnelle", en: "Traditional Pottery" },
    description: { ar: "أواني فخارية مصنوعة يدوياً بزخارف أمازيغية، مثالية للديكور.", fr: "Poteries façonnées main avec motifs amazighs, idéales pour la déco.", en: "Handcrafted pottery with Amazigh motifs, perfect for decoration." },
    category:    { ar: "حرف يدوية", fr: "Artisanat", en: "Crafts" },
    price: 350,
    image: "/images/shop/fakhar.jpg",   // ← change filename here
  },
  {
    id: "p5",
    title:       { ar: "تمور مجهول تنغيرية", fr: "Dattes Medjool de Tinghir", en: "Tinghir Medjool Dates" },
    description: { ar: "تمور مجهول فاخرة من واحة تنغير. حلوة وطرية، مثالية كهدية أو وجبة صحية.", fr: "Dattes Medjool luxueuses de l'oasis de Tinghir. Douces et moelleuses.", en: "Luxury Medjool dates from Tinghir oasis. Sweet, soft, perfect as a gift." },
    category:    { ar: "فواكه", fr: "Fruits", en: "Fruits" },
    price: 60,
    image: "/images/shop/dates.jpg",    // ← change filename here
  },
];

const Marketplace = () => {
  const { t, lang } = useLanguage();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const getT = (field: any) => field?.[lang] || field?.ar || "";

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleBuy = (title: string) => {
    toast.success(
      lang === "fr" ? `${title} ajouté au panier 🛍️` :
      lang === "en" ? `${title} added to cart 🛍️` :
      `تمت إضافة ${title} للسلة 🛍️`
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-5 text-white"
              style={{ background: "linear-gradient(135deg, #FF6B35 0%, #FFA726 100%)" }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {t("marketplaceTitle")}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-3" style={{ letterSpacing: "-0.02em" }}>
              {lang === "fr" ? "Produits Artisanaux Locaux" : lang === "en" ? "Local Artisan Products" : "المنتجات المحلية"}
            </h1>
            <p className="text-muted-foreground font-medium max-w-md mx-auto">{t("marketplaceSubtitle")}</p>
          </div>
        </motion.div>

        {/* Products Grid — 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS.map((p, i) => {
            const color = productColors[i % productColors.length];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="group glass-card rounded-2xl overflow-hidden border-2 transition-all duration-500 hover:-translate-y-2"
                style={{ borderColor: color.hex + "33" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = color.hex + "99";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.25), 0 0 20px ${color.hex}22`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = color.hex + "33";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                }}
              >
                {/* Image */}
                <div className="relative h-44 md:h-52 overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={getT(p.title)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Category badge */}
                  <div
                    className="absolute top-3 start-3 px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-wider text-white shadow flex items-center gap-1"
                    style={{ background: color.hex }}
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {getT(p.category)}
                  </div>

                  {/* Fav */}
                  <button
                    onClick={() => toggleFav(p.id)}
                    className="absolute top-3 end-3 w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Heart className={`w-3.5 h-3.5 transition-colors ${favorites.has(p.id) ? "fill-red-500 text-red-500" : "text-white"}`} />
                  </button>

                  {/* Price */}
                  <div className="absolute bottom-3 end-3 glass px-2.5 py-1 rounded-lg border border-white/20">
                    <span className="font-black text-white text-sm">{p.price}</span>
                    <span className="text-white/70 text-[10px] ms-1">{t("currency")}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-sm md:text-base font-black text-foreground mb-1 line-clamp-1">
                    {getT(p.title)}
                  </h3>
                  <p className="text-muted-foreground text-xs mb-4 line-clamp-2 leading-relaxed">
                    {getT(p.description)}
                  </p>
                  <button
                    onClick={() => handleBuy(getT(p.title))}
                    className="w-full py-2.5 rounded-xl text-white font-black text-xs uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
                    style={{
                      background: `linear-gradient(135deg, ${color.hex} 0%, ${color.hex}CC 100%)`,
                      boxShadow: `0 3px 12px ${color.hex}44`,
                    }}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {t("buy")}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-2xl p-8 text-center border border-border/30"
          style={{ background: "linear-gradient(135deg, #FF6B3515 0%, #FFA72615 100%)" }}
        >
          <Sparkles className="w-8 h-8 mx-auto mb-4" style={{ color: "#FF6B35" }} />
          <h3 className="text-2xl font-black text-foreground mb-2" style={{ letterSpacing: "-0.02em" }}>
            {lang === "fr" ? "Produits 100% Authentiques" : lang === "en" ? "100% Authentic Products" : "منتجات أصيلة 100%"}
          </h3>
          <p className="text-muted-foreground font-medium max-w-md mx-auto">
            {lang === "fr"
              ? "Tous les produits sont fabriqués à la main par des artisans locaux de Tinghir et de la vallée du Dadès."
              : lang === "en"
              ? "All products are handcrafted by local artisans in Tinghir and the Dadès valley."
              : "جميع المنتجات مصنوعة يدوياً من قبل حرفيين محليين في تنغير وإقليم دادس"}
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace;
