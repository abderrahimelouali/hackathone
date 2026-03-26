import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Trash2, Star, Clock } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ManageActivities = () => {
  const { activities, deleteActivity, products, deleteProduct } = useData();
  const { user } = useAuth();
  const { t } = useLanguage();
  const myActivities = activities.filter((a) => a.hostId === user?.id);
  const myProducts = products.filter((p) => p.hostId === user?.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t("manageTitle")}</h1>
            <p className="text-muted-foreground mt-1">{t("manageSubtitle")}</p>
          </div>
          <Link to="/host/add-activity" className="px-4 py-2 rounded-lg gradient-hero text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
            {t("newActivity")}
          </Link>
        </div>

        <h2 className="text-xl font-bold text-foreground mb-4">{t("activitiesStat")} ({myActivities.length})</h2>
        {myActivities.length === 0 ? (
          <div className="bg-card rounded-xl shadow-card p-8 text-center mb-8">
            <p className="text-muted-foreground">{t("noActivitiesYet")}</p>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {myActivities.map((a) => (
              <div key={a.id} className="bg-card rounded-xl shadow-card p-4 flex flex-col md:flex-row gap-4 items-start">
                <img src={a.images[0]} alt={a.title} className="w-full md:w-40 h-28 rounded-lg object-cover" loading="lazy" />
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-lg">{a.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-1">{a.description}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="bg-muted px-2 py-1 rounded text-xs">{a.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.duration}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-gold" />{a.rating}</span>
                    <span className="font-bold text-primary">{a.price} {t("currency")}</span>
                  </div>
                </div>
                <button
                  onClick={() => { deleteActivity(a.id); toast.success(t("activityDeleted")); }}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 text-sm transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  {t("delete")}
                </button>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-xl font-bold text-foreground mb-4">{t("productsStat")} ({myProducts.length})</h2>
        {myProducts.length === 0 ? (
          <div className="bg-card rounded-xl shadow-card p-8 text-center">
            <p className="text-muted-foreground">{t("noProductsYet")}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myProducts.map((p) => (
              <div key={p.id} className="bg-card rounded-xl shadow-card p-4">
                <img src={p.image} alt={p.title} className="w-full h-32 rounded-lg object-cover mb-3" loading="lazy" />
                <h3 className="font-bold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.price} {t("currency")}</p>
                <button
                  onClick={() => { deleteProduct(p.id); toast.success(t("productDeleted")); }}
                  className="mt-3 flex items-center gap-1 text-sm text-destructive hover:bg-destructive/10 px-3 py-1 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  {t("delete")}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageActivities;
