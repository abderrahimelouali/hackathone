import { useState, useRef } from "react";
import { useData } from "@/contexts/DataProvider";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Star, Clock, Settings, Plus, ShoppingBag, Mountain, ImagePlus, X, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ManageActivities = () => {
  const { activities, updateActivity, deleteActivity, products, deleteProduct } = useData();
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const myActivities = activities.filter((a) => a.hostId === user?.id);
  const myProducts = products.filter((p) => p.hostId === user?.id);

  const [openImgId, setOpenImgId] = useState<string | null>(null);
  const [newUrlMap, setNewUrlMap] = useState<Record<string, string>>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const addUrlToActivity = (activityId: string, currentImages: string[]) => {
    const url = (newUrlMap[activityId] || "").trim();
    if (!url) return;
    if (currentImages.includes(url)) { toast.error("Already added"); return; }
    updateActivity(activityId, { images: [...currentImages, url] });
    setNewUrlMap(prev => ({ ...prev, [activityId]: "" }));
    toast.success("Image added!");
  };

  const removeImgFromActivity = (activityId: string, currentImages: string[], idx: number) => {
    if (currentImages.length === 1) { toast.error("At least one image required"); return; }
    updateActivity(activityId, { images: currentImages.filter((_, i) => i !== idx) });
  };

  const handleFileUpload = (activityId: string, currentImages: string[], files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const dataUrl = ev.target?.result as string;
        updateActivity(activityId, { images: [...currentImages, dataUrl] });
        toast.success("Photo added!");
      };
      reader.readAsDataURL(file);
    });
  };

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
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="card-interactive overflow-hidden"
                >
                  <div className="p-4 flex flex-col md:flex-row gap-4 items-start group">
                    {/* Thumbnail strip */}
                    <div className="flex gap-2 shrink-0">
                      {a.images.slice(0, 3).map((img, idx) => (
                        <img key={idx} src={img} alt="" className={`h-20 rounded-xl object-cover ${idx === 0 ? "w-32" : "w-16 opacity-70"}`} loading="lazy" />
                      ))}
                      {a.images.length > 3 && (
                        <div className="w-16 h-20 rounded-xl bg-muted flex items-center justify-center text-xs font-black text-muted-foreground">
                          +{a.images.length - 3}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-base truncate">{a.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-1">{a.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-xs font-medium">{a.category}</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{a.duration}</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />{a.rating}</span>
                        <span className="font-bold text-primary text-sm">{a.price} {t("currency")}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setOpenImgId(openImgId === a.id ? null : a.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 text-primary text-xs font-black hover:bg-primary/20 transition-colors"
                      >
                        <ImagePlus className="w-3.5 h-3.5" />
                        Photos ({a.images.length})
                        {openImgId === a.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                      <button
                        onClick={() => { deleteActivity(a.id); toast.success(t("activityDeleted")); }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-destructive hover:bg-destructive/10 text-xs font-black transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        {t("delete")}
                      </button>
                    </div>
                  </div>

                  {/* Image Manager Panel */}
                  <AnimatePresence>
                    {openImgId === a.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-border/50"
                      >
                        <div className="p-5 bg-muted/30 space-y-4">
                          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <ImagePlus className="w-3.5 h-3.5" /> Manage Photos — first image is the cover
                          </p>

                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                            {a.images.map((img, idx) => (
                              <div key={idx} className="relative group/img rounded-xl overflow-hidden border-2 border-border aspect-square">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                                {idx === 0 && (
                                  <div className="absolute top-1 start-1 bg-primary text-white text-[8px] font-black px-1 py-0.5 rounded uppercase">Cover</div>
                                )}
                                <button
                                  onClick={() => removeImgFromActivity(a.id, a.images, idx)}
                                  className="absolute top-1 end-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-destructive"
                                >
                                  <X className="w-3 h-3 text-white" />
                                </button>
                              </div>
                            ))}
                          </div>

                          <input
                            ref={el => { fileRefs.current[a.id] = el; }}
                            type="file" accept="image/*" multiple className="hidden"
                            onChange={e => handleFileUpload(a.id, a.images, e.target.files)}
                          />
                          <button
                            type="button"
                            onClick={() => fileRefs.current[a.id]?.click()}
                            className="w-full py-3 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center gap-2 text-sm font-bold text-primary hover:bg-primary/5 transition-all hover:border-primary"
                          >
                            <ImagePlus className="w-4 h-4" />
                            {isRTL ? "رفع صور من جهازك" : "Upload photos from device"}
                          </button>

                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={newUrlMap[a.id] || ""}
                              onChange={e => setNewUrlMap(prev => ({ ...prev, [a.id]: e.target.value }))}
                              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addUrlToActivity(a.id, a.images))}
                              placeholder="https://... paste image URL"
                              className="input-styled flex-1 text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => addUrlToActivity(a.id, a.images)}
                              className="px-4 py-2 rounded-xl bg-primary text-white font-black text-sm flex items-center gap-1.5 hover:bg-primary/90 transition-colors shrink-0"
                            >
                              <Plus className="w-4 h-4" /> Add
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-yellow-500" />
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
                <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-interactive p-4 group">
                  <img src={p.image} alt={p.title} className="w-full h-32 rounded-xl object-cover mb-3" loading="lazy" />
                  <h3 className="font-bold text-foreground">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.category}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <span className="font-bold text-primary">{p.price} {t("currency")}</span>
                    <button
                      onClick={() => { deleteProduct(p.id); toast.success(t("productDeleted")); }}
                      className="flex items-center gap-1 text-xs text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-lg transition-colors opacity-70 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3 h-3" />{t("delete")}
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
