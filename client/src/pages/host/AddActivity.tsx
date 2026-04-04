import { useState, useRef } from "react";
import { useData } from "@/contexts/DataProvider";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Plus, X, ImagePlus, ChefHat, Footprints, MountainSnow, Bike,
  Waves, Car, Tent, FlameKindling, Compass, Scissors, Palette,
  MapPin, Clock, DollarSign, Users, Check, Globe, MousePointer2, Target, Loader2
} from "lucide-react";
import {
  Map, MapMarker, MarkerContent, MapControls,
} from "@/components/ui/map";

const TINGHIR_CENTER: [number, number] = [-5.5340, 31.5125];

const ALL_CATEGORIES = [
  { value: "طبخ",        labelAr: "طبخ",          labelFr: "Cuisine",       labelEn: "Cooking",       icon: ChefHat,      color: "#F6E683", img: "/images/activities/cooking.png"  },
  { value: "مشي",        labelAr: "مشي",          labelFr: "Randonnée",     labelEn: "Hiking",        icon: Footprints,   color: "#79D45E", img: "/images/activities/hiking.png"   },
  { value: "تسلق",       labelAr: "تسلق",         labelFr: "Escalade",      labelEn: "Climbing",      icon: MountainSnow, color: "#4928FD", img: "/images/activities/climbing.jpg" },
  { value: "دراجات",     labelAr: "دراجات",       labelFr: "VTT",           labelEn: "Cycling",       icon: Bike,         color: "#FFAF68", img: "/images/activities/vtt.png"      },
  { value: "رافتينغ",    labelAr: "رافتينغ",      labelFr: "Rafting",       labelEn: "Rafting",       icon: Waves,        color: "#4928FD", img: "/images/activities/rafting.png"  },
  { value: "كواد",       labelAr: "كواد",         labelFr: "Quad",          labelEn: "Quad",          icon: Car,          color: "#FFAF68", img: "/images/activities/quad.png"     },
  { value: "تخييم",      labelAr: "تخييم",        labelFr: "Camping",       labelEn: "Camping",       icon: Tent,         color: "#A484E9", img: "/images/activities/camping.png"  },
  { value: "ركوب الخيل", labelAr: "ركوب الخيل",  labelFr: "Équitation",    labelEn: "Horse Riding",  icon: FlameKindling,color: "#F4889A", img: "/images/activities/horse.jpg"    },
  { value: "ركوب الجمال",labelAr: "ركوب الجمال", labelFr: "Chameau",       labelEn: "Camel Riding",  icon: Compass,      color: "#FFAF68", img: "/images/activities/camel.jpg"    },
  { value: "فخار",       labelAr: "فخار",         labelFr: "Poterie",       labelEn: "Pottery",       icon: Scissors,     color: "#F4889A", img: "/images/activities/pottery.jpg"  },
  { value: "نسيج",       labelAr: "نسيج",         labelFr: "Tissage",       labelEn: "Weaving",       icon: Palette,      color: "#A484E9", img: "/images/activities/weaving.jpg"  },
];

const COLORS = ["violet", "orange", "yellow", "green", "purple", "pink"] as const;

const AddActivity = () => {
  const { addActivity } = useData();
  const { user } = useAuth();
  const { t, lang, isRTL } = useLanguage();
  const navigate = useNavigate();

  // Core fields
  const [title, setTitle] = useState("");
  const [titleFr, setTitleFr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionFr, setDescriptionFr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES[0].value);
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [hasGuide, setHasGuide] = useState(true);
  const [location, setLocation] = useState("تنغير");
  const [difficulty, setDifficulty] = useState("سهل");
  const [color, setColor] = useState<typeof COLORS[number]>("orange");
  const [lat, setLat] = useState("31.5135");
  const [lng, setLng] = useState("-5.5295");

  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const imgInputRef = useRef<HTMLInputElement>(null);
  
  const [isLocating, setIsLocating] = useState(false);
  const [viewport, setViewport] = useState({
    center: TINGHIR_CENTER,
    zoom: 13
  });

  const selectedCat = ALL_CATEGORIES.find(c => c.value === category)!;

  const addImageUrl = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    if (images.includes(url)) { toast.error("Image already added"); return; }
    setImages(prev => [...prev, url]);
    setNewImageUrl("");
  };

  const removeImage = (idx: number) => setImages(prev => prev.filter((_, i) => i !== idx));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const dataUrl = ev.target?.result as string;
        setImages(prev => [...prev, dataUrl]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleLocate = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude.toFixed(6);
          const newLng = position.coords.longitude.toFixed(6);
          setLat(newLat);
          setLng(newLng);
          setViewport({
            center: [Number(newLng), Number(newLat)],
            zoom: 17
          });
          setIsLocating(false);
          toast.success(lang === "fr" ? "Position récupérée !" : "Position acquired!");
        },
        () => {
          setIsLocating(false);
          toast.error(lang === "fr" ? "Impossible de récupérer votre position." : "Could not acquire position.");
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalImages = images.length > 0 ? images : [selectedCat.img];
    await addActivity({
      title, titleFr, titleEn,
      description, descriptionFr, descriptionEn,
      category, price: Number(price), duration, hasGuide,
      images: finalImages,
      hostId: user!.id, rating: 4.5, location,
      difficulty, color,
      lat: Number(lat), lng: Number(lng),
    } as any);
    toast.success(t("activityAdded"));
    navigate("/host/manage");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: selectedCat.color + "33" }}>
              <selectedCat.icon className="w-6 h-6" style={{ color: selectedCat.color }} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground">{t("addNewActivity")}</h1>
              <p className="text-sm text-muted-foreground">{t("addActivitySubtitle")}</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* ── CATEGORY ── */}
          <div className="card-interactive p-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">{t("type")}</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {ALL_CATEGORIES.map(c => {
                const active = category === c.value;
                return (
                  <button
                    key={c.value} type="button"
                    onClick={() => setCategory(c.value)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-xs font-bold transition-all ${active ? "border-transparent text-white" : "border-border text-muted-foreground hover:border-primary/30 bg-muted/30"}`}
                    style={active ? { background: c.color, borderColor: c.color } : {}}
                  >
                    <c.icon className="w-5 h-5" style={active ? { color: "white" } : { color: c.color }} />
                    {lang === "fr" ? c.labelFr : lang === "en" ? c.labelEn : c.labelAr}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── TITLE & TRANSLATIONS ── */}
          <div className="card-interactive p-6 space-y-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Globe className="w-4 h-4" /> Titles (multilingual)
            </h2>
            <div>
              <label className="text-xs font-black text-muted-foreground mb-1.5 block uppercase tracking-wider">🇲🇦 Arabic *</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required
                placeholder="مثال: ورشة الفخار التقليدي" className="input-styled" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-muted-foreground mb-1.5 block uppercase tracking-wider">🇫🇷 French</label>
                <input type="text" value={titleFr} onChange={e => setTitleFr(e.target.value)}
                  placeholder="ex: Atelier de poterie" className="input-styled" />
              </div>
              <div>
                <label className="text-xs font-black text-muted-foreground mb-1.5 block uppercase tracking-wider">🇬🇧 English</label>
                <input type="text" value={titleEn} onChange={e => setTitleEn(e.target.value)}
                  placeholder="ex: Traditional Pottery" className="input-styled" />
              </div>
            </div>
          </div>

          {/* ── DESCRIPTION & TRANSLATIONS ── */}
          <div className="card-interactive p-6 space-y-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Globe className="w-4 h-4" /> Descriptions (multilingual)
            </h2>
            <div>
              <label className="text-xs font-black text-muted-foreground mb-1.5 block uppercase tracking-wider">🇲🇦 Arabic *</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={3}
                placeholder="وصف النشاط بالعربية..." className="input-styled resize-none" />
            </div>
            <div>
              <label className="text-xs font-black text-muted-foreground mb-1.5 block uppercase tracking-wider">🇫🇷 French</label>
              <textarea value={descriptionFr} onChange={e => setDescriptionFr(e.target.value)} rows={3}
                placeholder="Description en français..." className="input-styled resize-none" />
            </div>
            <div>
              <label className="text-xs font-black text-muted-foreground mb-1.5 block uppercase tracking-wider">🇬🇧 English</label>
              <textarea value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)} rows={3}
                placeholder="Description in English..." className="input-styled resize-none" />
            </div>
          </div>

          {/* ── DETAILS ── */}
          <div className="card-interactive p-6 space-y-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-2">Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-muted-foreground mb-1.5 flex items-center gap-1.5 uppercase tracking-wider"><DollarSign className="w-3.5 h-3.5 text-primary" />{t("price")} (MAD) *</label>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} required placeholder="250" className="input-styled" />
              </div>
              <div>
                <label className="text-xs font-black text-muted-foreground mb-1.5 flex items-center gap-1.5 uppercase tracking-wider"><Clock className="w-3.5 h-3.5 text-primary" />{t("duration")} *</label>
                <input type="text" value={duration} onChange={e => setDuration(e.target.value)} required placeholder="3 ساعات" className="input-styled" />
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
                <MapPin className="w-4 h-4 text-primary" />
                {t("location")} & Map Pinpoint
              </label>
              
              <div className="relative mb-6">
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} required 
                  placeholder="e.g. Todra Gorge, Tinghir" className="input-styled pl-12" />
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
              </div>
              
              {/* Premium Mini Map Picker */}
              <div className="relative h-80 rounded-[2.5rem] overflow-hidden border-2 border-slate-100 mb-6 group shadow-2xl shadow-slate-200/50">
                <Map
                  center={viewport.center}
                  zoom={viewport.zoom}
                  onViewportChange={(v) => setViewport({ center: [v.longitude, v.latitude], zoom: v.zoom })}
                  className="w-full h-full"
                  cursor="crosshair"
                  // @ts-ignore
                  onClick={(e: any) => {
                    setLat(e.lngLat.lat.toFixed(6));
                    setLng(e.lngLat.lng.toFixed(6));
                  }}
                >
                  <MapControls position="bottom-right" showZoom />
                  <MapMarker longitude={Number(lng)} latitude={Number(lat)}>
                    <MarkerContent className="pointer-events-none">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute size-16 bg-primary/20 rounded-full animate-ping" />
                        <div className="absolute size-12 bg-primary/30 rounded-full" />
                        <div className="relative size-12 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-primary transition-transform scale-110">
                          {selectedCat.icon ? <selectedCat.icon className="size-6 text-primary" fill="currentColor" /> : <MapPin className="size-6 text-primary" />}
                        </div>
                      </div>
                    </MarkerContent>
                  </MapMarker>
                </Map>

                {/* Overlays */}
                <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none flex justify-between items-start">
                   <div className="glass px-4 py-2 rounded-xl border border-white/20 shadow-xl flex items-center gap-3 backdrop-blur-md">
                      <div className="size-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-800">Tinghir Satellite Hub</span>
                   </div>

                   <button
                    type="button"
                    onClick={handleLocate}
                    disabled={isLocating}
                    className="pointer-events-auto p-3.5 bg-white hover:bg-slate-50 text-slate-900 rounded-[1.25rem] shadow-2xl border border-slate-100 transition-all active:scale-95 group disabled:opacity-50"
                  >
                    <Target className={cn("size-5 transition-colors group-hover:text-primary text-slate-400", isLocating && "animate-spin text-primary")} />
                  </button>
                </div>

                {!lat && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-slate-900/5 backdrop-blur-[2px]">
                    <div className="bg-white/90 px-6 py-4 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3">
                       <MousePointer2 className="w-5 h-5 text-primary" />
                       <span className="text-xs font-black uppercase tracking-widest text-slate-900">Click Map to Choose</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm transition-all focus-within:ring-2 ring-primary/20">
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1 tracking-widest">Latitude</label>
                  <input type="number" step="any" value={lat} onChange={e => setLat(e.target.value)} className="bg-transparent border-none p-0 text-sm font-black w-full focus:outline-none text-slate-900" />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm transition-all focus-within:ring-2 ring-primary/20">
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1 tracking-widest">Longitude</label>
                  <input type="number" step="any" value={lng} onChange={e => setLng(e.target.value)} className="bg-transparent border-none p-0 text-sm font-black w-full focus:outline-none text-slate-900" />
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-muted-foreground mb-1.5 block uppercase tracking-wider">Difficulty</label>
                <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="input-styled">
                  <option value="سهل">سهل — Easy</option>
                  <option value="متوسط">متوسط — Medium</option>
                  <option value="صعب">صعب — Hard</option>
                  <option value="متنوع">متنوع — All levels</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-black text-muted-foreground mb-1.5 block uppercase tracking-wider">Color Theme</label>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map(c => {
                    const hex: Record<string,string> = { violet:"#4928FD", orange:"#FFAF68", yellow:"#F6E683", green:"#79D45E", purple:"#A484E9", pink:"#F4889A" };
                    return (
                      <button key={c} type="button" onClick={() => setColor(c)}
                        className={`w-8 h-8 rounded-full border-4 transition-all ${color === c ? "border-foreground scale-110" : "border-transparent"}`}
                        style={{ background: hex[c] }} title={c} />
                    );
                  })}
                </div>
              </div>
            </div>
            <label className="flex items-center gap-3 p-4 rounded-xl bg-accent/5 border border-accent/10 cursor-pointer hover:bg-accent/10 transition-colors">
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${hasGuide ? "bg-primary border-primary" : "border-border"}`}
                onClick={() => setHasGuide(!hasGuide)}>
                {hasGuide && <Check className="w-4 h-4 text-white" />}
              </div>
              <span className="text-sm font-bold text-foreground flex items-center gap-2"><Users className="w-4 h-4 text-primary" />{t("withTourGuideCheckbox")}</span>
            </label>
          </div>

          {/* ── IMAGES ── */}
          <div className="card-interactive p-6 space-y-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <ImagePlus className="w-4 h-4" /> Activity Images
            </h2>

            {/* Preview grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                <AnimatePresence>
                  {images.map((img, i) => (
                    <motion.div key={img} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                      className="relative group rounded-xl overflow-hidden border-2 border-border aspect-square">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      {i === 0 && (
                        <div className="absolute top-1 start-1 bg-primary text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg uppercase">Cover</div>
                      )}
                      <button type="button" onClick={() => removeImage(i)}
                        className="absolute top-1 end-1 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive">
                        <X className="w-3.5 h-3.5 text-white" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* File upload */}
            <input ref={imgInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
            <button type="button" onClick={() => imgInputRef.current?.click()}
              className="w-full py-4 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center gap-3 text-sm font-bold text-primary hover:bg-primary/5 transition-all hover:border-primary">
              <ImagePlus className="w-5 h-5" />
              {isRTL ? "رفع صور من جهازك" : "Upload photos from your device"}
            </button>

            {/* URL input */}
            <div className="flex gap-2">
              <input type="url" value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addImageUrl())}
                placeholder="https://... paste image URL"
                className="input-styled flex-1 text-sm" />
              <button type="button" onClick={addImageUrl}
                className="px-4 py-2.5 rounded-xl bg-primary text-white font-black text-sm flex items-center gap-1.5 hover:bg-primary/90 transition-colors shrink-0">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {images.length === 0 && (
              <p className="text-xs text-muted-foreground text-center">No images added — default category image will be used</p>
            )}
          </div>

          <button type="submit"
            className="w-full py-4 rounded-xl text-white font-black text-lg uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: `linear-gradient(135deg, #FF6B35 0%, #FFA726 100%)`, boxShadow: "0 8px 30px rgba(255,107,53,0.4)" }}>
            {t("addActivityBtn")} →
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default AddActivity;
