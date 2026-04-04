import { useState } from "react";
import { useData } from "@/contexts/DataProvider";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ShoppingBag, Upload, Droplets, Palette, Package } from "lucide-react";
import productsImg from "@/assets/products.jpg";

const AddProduct = () => {
  const { addProduct } = useData();
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("عسل");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      title, description,
      price: Number(price),
      image: productsImg,
      category,
      hostId: user!.id,
    });
    toast.success(t("productAdded"));
    navigate("/host/manage");
  };

  const categories = [
    { value: "عسل", label: t("honey"), icon: Droplets },
    { value: "زرابي", label: t("carpets"), icon: Palette },
    { value: "منتجات تقليدية", label: t("traditionalProducts"), icon: Package },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t("addNewProduct")}</h1>
              <p className="text-sm text-muted-foreground">{t("addProductSubtitle")}</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="card-interactive p-6 md:p-8 space-y-6"
        >
          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">{t("productName")}</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder={t("productNamePlaceholder")} className="input-styled" />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">{t("description")}</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} placeholder={t("productDescPlaceholder")} className="input-styled resize-none" />
          </div>

          {/* Category Selector */}
          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">{t("category")}</label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((c) => {
                const active = category === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCategory(c.value)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${active ? "border-gold bg-gold/5 text-gold-dark" : "border-border text-muted-foreground hover:border-gold/30"}`}
                  >
                    <c.icon className="w-5 h-5" />
                    <span className="text-xs">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">{t("price")}</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="80" className="input-styled" />
          </div>

          <div className="bg-muted/50 rounded-xl p-6 text-center border-2 border-dashed border-border hover:border-gold/30 transition-colors cursor-pointer">
            <Upload className="w-10 h-10 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">{t("defaultImage")}</p>
          </div>

          {/* Preview */}
          {title && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{isRTL ? "معاينة" : "Preview"}</p>
              <div className="flex items-center gap-3">
                <img src={productsImg} alt="" className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <p className="font-bold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{price && `${price} ${t("currency")}`}</p>
                </div>
              </div>
            </motion.div>
          )}

          <button type="submit" className="w-full btn-primary text-lg py-4">
            {t("addProductBtn")}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default AddProduct;
