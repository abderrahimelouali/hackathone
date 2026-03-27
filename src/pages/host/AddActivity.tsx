import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Plus, Upload, ChefHat, Footprints, MountainSnow, Bike, MapPin, Clock, DollarSign } from "lucide-react";
import cookingImg from "@/assets/activity-cooking.jpg";
import hikingImg from "@/assets/activity-hiking.jpg";
import climbingImg from "@/assets/activity-climbing.jpg";
import cyclingImg from "@/assets/activity-cycling.jpg";

const categoryImages: Record<string, string> = {
  "طبخ": cookingImg, "مشي": hikingImg, "تسلق": climbingImg, "دراجات": cyclingImg,
};

const categoryIcons: Record<string, any> = {
  "طبخ": ChefHat, "مشي": Footprints, "تسلق": MountainSnow, "دراجات": Bike,
};

const AddActivity = () => {
  const { addActivity } = useData();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"طبخ" | "مشي" | "تسلق" | "دراجات">("طبخ");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [hasGuide, setHasGuide] = useState(true);
  const [location, setLocation] = useState("تنغير");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity({
      title, description, category,
      price: Number(price), duration, hasGuide,
      images: [categoryImages[category]],
      hostId: user!.id, rating: 4.5, location,
    });
    toast.success(t("activityAdded"));
    navigate("/host/manage");
  };

  const categories = [
    { value: "طبخ", label: t("cooking"), icon: ChefHat },
    { value: "مشي", label: t("hiking"), icon: Footprints },
    { value: "تسلق", label: t("climbing"), icon: MountainSnow },
    { value: "دراجات", label: t("cycling"), icon: Bike },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t("addNewActivity")}</h1>
              <p className="text-sm text-muted-foreground">{t("addActivitySubtitle")}</p>
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
            <label className="text-sm font-semibold text-foreground block mb-2">{t("activityTitle")}</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder={t("activityTitlePlaceholder")} className="input-styled" />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">{t("description")}</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} placeholder={t("descriptionPlaceholder")} className="input-styled resize-none" />
          </div>

          {/* Category Selector */}
          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">{t("type")}</label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((c) => {
                const active = category === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCategory(c.value as any)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${active ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`}
                  >
                    <c.icon className="w-5 h-5" />
                    <span className="text-xs">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-primary" />
                {t("price")}
              </label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="250" className="input-styled" />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                {t("duration")}
              </label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required placeholder="3h" className="input-styled" />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground block mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              {t("location")}
            </label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="input-styled" />
          </div>

          <label className="flex items-center gap-3 p-4 rounded-xl bg-accent/5 border border-accent/10 cursor-pointer hover:bg-accent/10 transition-colors">
            <input type="checkbox" checked={hasGuide} onChange={(e) => setHasGuide(e.target.checked)} className="w-5 h-5 accent-primary rounded" />
            <span className="text-sm font-medium text-foreground">{t("withTourGuideCheckbox")}</span>
          </label>

          <div className="bg-muted/50 rounded-xl p-6 text-center border-2 border-dashed border-border hover:border-primary/30 transition-colors cursor-pointer">
            <Upload className="w-10 h-10 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">{t("defaultImageNote")}</p>
          </div>

          {/* Preview */}
          {title && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{isRTL ? "معاينة" : "Preview"}</p>
              <div className="flex items-center gap-3">
                <img src={categoryImages[category]} alt="" className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <p className="font-bold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{price && `${price} ${t("currency")}`} {duration && `• ${duration}`}</p>
                </div>
              </div>
            </motion.div>
          )}

          <button type="submit" className="w-full btn-primary text-lg py-4">
            {t("addActivityBtn")}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default AddActivity;
