import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Trash2, Star, Clock, Settings, Plus, ShoppingBag, Mountain } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ManageActivities = () => {
  const { activities, deleteActivity, products, deleteProduct } = useData();
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const myActivities = activities.filter((a) => a.hostId === user?.id);
  const myProducts = products.filter((p) => p.hostId === user?.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t("manageTitle")}</h1>
                <p className="text-sm text-muted-foreground">{t("manageSubtitle")}</p>
              </div>
            </div>
            <Link to="/host/add-activity" className="btn-primary text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {t("newActivity")}
            </Link>
          </div>
        </motion.div>

        {/* Activities Section */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Mountain className="w-5 h-5 text-primary" />
            {t("activitiesStat")} <span className="text-sm font-normal text-muted-foreground">({myActivities.length})</span>
          </h2>
          {myActivities.length === 0 ? (
            <div className="card-interactive p-10 text-center">
              <Mountain className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">{t("noActivitiesYet")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myActivities.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card-interactive p-4 flex flex-col md:flex-row gap-4 items-start group"
                >
                  <img src={a.images[0]} alt={a.title} className="w-full md:w-36 h-24 rounded-xl object-cover" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base truncate">{a.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-1">{a.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-xs font-medium">{a.category}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{a.duration}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="w-3 h-3 text-gold fill-gold" />{a.rating}</span>
                      <span className="font-bold text-primary text-sm">{a.price} {t("currency")}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { deleteActivity(a.id); toast.success(t("activityDeleted")); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-destructive hover:bg-destructive/10 text-sm font-medium transition-colors opacity-70 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                    {t("delete")}
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gold" />
            {t("productsStat")} <span className="text-sm font-normal text-muted-foreground">({myProducts.length})</span>
          </h2>
          {myProducts.length === 0 ? (
            <div className="card-interactive p-10 text-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">{t("noProductsYet")}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card-interactive p-4 group"
                >
                  <img src={p.image} alt={p.title} className="w-full h-32 rounded-xl object-cover mb-3" loading="lazy" />
                  <h3 className="font-bold text-foreground">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.category}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <span className="font-bold text-gradient">{p.price} {t("currency")}</span>
                    <button
                      onClick={() => { deleteProduct(p.id); toast.success(t("productDeleted")); }}
                      className="flex items-center gap-1 text-xs text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-lg transition-colors opacity-70 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3 h-3" />
                      {t("delete")}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageActivities;
