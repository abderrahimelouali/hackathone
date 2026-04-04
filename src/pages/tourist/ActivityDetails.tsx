import { useParams, useNavigate } from "react-router-dom";
import { useData } from "@/contexts/DataProvider";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Star, Clock, MapPin, Users, Calendar, ArrowRight, ArrowLeft,
  CheckCircle, Shield, Sparkles, Zap, Heart, Share2, Camera,
  ThumbsUp, Waves, Mountain, ChefHat, Bike, Tent, FlameKindling,
  Compass, Scissors, Palette, Car, MountainSnow, MousePointer2, ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import {
  Map, MapMarker, MarkerContent, MarkerTooltip, MapControls,
} from "@/components/ui/map";
import { Edit2, Save, X } from "lucide-react";

const colorStyles: Record<string, { hex: string; light: string; shadow: string }> = {
  violet: { hex: "#4928FD", light: "#4928FD1A", shadow: "0 0 30px rgba(73,40,253,0.25)" },
  orange: { hex: "#FFAF68", light: "#FFAF681A", shadow: "0 0 30px rgba(255,175,104,0.25)" },
  yellow: { hex: "#F6E683", light: "#F6E6831A", shadow: "0 0 30px rgba(246,230,131,0.25)" },
  green:  { hex: "#79D45E", light: "#79D45E1A", shadow: "0 0 30px rgba(121,212,94,0.25)" },
  purple: { hex: "#A484E9", light: "#A484E91A", shadow: "0 0 30px rgba(164,132,233,0.25)" },
  pink:   { hex: "#F4889A", light: "#F4889A1A", shadow: "0 0 30px rgba(244,136,154,0.25)" },
};

// Multilingual included items
const includedItems: Record<string, Record<string, string[]>> = {
  "طبخ": {
    ar: ["وصفات تقليدية", "مكونات طازجة", "دروس مع شيف", "وجبة مشتركة", "قلادة وزيّ مريح"],
    en: ["Traditional recipes", "Fresh ingredients", "Chef lessons", "Shared meal", "Apron & comfortable attire"],
    fr: ["Recettes traditionnelles", "Ingrédients frais", "Cours avec chef", "Repas partagé", "Tablier élégant"]
  },
  "مشي": {
    ar: ["دليل سياحي محلي", "خريطة المسار", "تأمين الرحلة", "ماء ووجبة خفيفة", "معدات السلامة"],
    en: ["Local tour guide", "Trail map", "Trip insurance", "Water & snacks", "Safety equipment"],
    fr: ["Guide touristique local", "Carte du sentier", "Assurance voyage", "Eau et collations", "Équipement de sécurité"]
  },
  "تسلق": {
    ar: ["معدات تسلق كاملة", "دليل متخصص", "تأمين شامل", "شهادة إتمام", "تقييم المستوى"],
    en: ["Full climbing gear", "Specialized guide", "Comprehensive insurance", "Completion certificate", "Level assessment"],
    fr: ["Matériel complet d'escalade", "Guide spécialisé", "Assurance complète", "Certificat de réussite", "Évaluation du niveau"]
  },
  "دراجات": {
    ar: ["دراجة هوائية", "خوذة وواقيات", "خريطة المسار", "مياه شرب", "صيانة ودعم"],
    en: ["Bicycle", "Helmet & pads", "Route map", "Drinking water", "Maintenance support"],
    fr: ["Vélo", "Casque et protections", "Carte de l'itinéraire", "Eau potable", "Assistance technique"]
  },
  "رافتينغ": {
    ar: ["قارب وتجهيزات", "سترة نجاة", "خوذة واقية", "دليل متخصص", "صور تذكارية"],
    en: ["Boat & gear", "Life jacket", "Safety helmet", "Specialized guide", "Souvenir photos"],
    fr: ["Bateau et équipement", "Gilet de sauvetage", "Casque de sécurité", "Guide spécialisé", "Photos souvenirs"]
  },
  "كواد": {
    ar: ["دراجة رباعية", "خوذة ونظارات", "دروس قيادة", "تأمين المركبة", "جولة ببطولة"],
    en: ["Quad bike", "Helmet & goggles", "Driving lessons", "Vehicle insurance", "Guided tour"],
    fr: ["Quad", "Casque et lunettes", "Cours de conduite", "Assurance véhicule", "Visite guidée"]
  },
  "تخييم": {
    ar: ["خيمة فاخرة", "وجبة عشاء", "موسيقى أمازيغية", "مشاهدة النجوم", "فطور صباحي"],
    en: ["Luxury tent", "Dinner", "Amazigh music", "Stargazing", "Morning breakfast"],
    fr: ["Tente de luxe", "Dîner", "Musique amazighe", "Observation des étoiles", "Petit-déjeuner"]
  },
  "ركوب الخيل": {
    ar: ["حصان أصيل", "سرج وتجهيزات", "دليل محترف", "صور الرحلة", "بيئة آمنة"],
    en: ["Purebred horse", "Saddle & gear", "Professional guide", "Trip photos", "Safe environment"],
    fr: ["Cheval pur sang", "Selle et équipement", "Guide professionnel", "Photos du voyage", "Environnement sécurisé"]
  },
  "ركوب الجمال": {
    ar: ["جمل ودود", "زي صحراوي", "دليل محلي", "شاي البادية", "تصوير احترافي"],
    en: ["Friendly camel", "Desert attire", "Local guide", "Desert tea", "Professional photography"],
    fr: ["Chameau amical", "Tenue du désert", "Guide local", "Thé du désert", "Photographie pro"]
  },
  "فخار": {
    ar: ["طين طبيعي", "أدوات الفخار", "النمذجة والرسم", "قطعتك للمنزل", "إرشاد متخصص"],
    en: ["Natural clay", "Pottery tools", "Modeling & painting", "Take home your piece", "Expert guidance"],
    fr: ["Argile naturelle", "Outils de poterie", "Modelage et peinture", "Emportez votre pièce", "Conseils d'experts"]
  },
  "نسيج": {
    ar: ["خيوط ملونة", "نول تقليدي", "أسرار الصنعة", "قطعة جاهزة", "حقيبة تذكارية"],
    en: ["Colorful threads", "Traditional loom", "Trade secrets", "Finished piece", "Souvenir bag"],
    fr: ["Fils colorés", "Métier traditionnel", "Secrets de métier", "Pièce finie", "Sac souvenir"]
  },
};

// Multilingual Itinerary
const itineraryItems: Record<string, Record<string, Array<{ time: string; desc: string }>>> = {
  "طبخ": {
    ar: [ { time: "09:00", desc: "لقاء في السوق المحلي" }, { time: "10:30", desc: "بدء تحضير الطاجين" }, { time: "12:00", desc: "تذوق الوجبة المشتركة" } ],
    en: [ { time: "09:00", desc: "Meet at local market" }, { time: "10:30", desc: "Start cooking Tagine" }, { time: "12:00", desc: "Shared tasting meal" } ],
    fr: [ { time: "09:00", desc: "Rencontre au marché" }, { time: "10:30", desc: "Début de préparation du Tagine" }, { time: "12:00", desc: "Dégustation du repas" } ]
  },
  "مشي": {
    ar: [ { time: "08:00", desc: "التجمع عند المدخل" }, { time: "10:30", desc: "توقف للراحة" }, { time: "12:00", desc: "الوصول للصخرة والعودة" } ],
    en: [ { time: "08:00", desc: "Gather at entrance" }, { time: "10:30", desc: "Rest stop" }, { time: "12:00", desc: "Reach the peak & return" } ],
    fr: [ { time: "08:00", desc: "Rassemblement à l'entrée" }, { time: "10:30", desc: "Pause repos" }, { time: "12:00", desc: "Atteindre le sommet et retour" } ]
  },
  "تسلق": {
    ar: [ { time: "08:00", desc: "تسخين ودروس التسلق" }, { time: "09:30", desc: "تسلق المسار الرئيسي" }, { time: "13:00", desc: "الصعود للقمة" } ],
    en: [ { time: "08:00", desc: "Warmup & climbing lessons" }, { time: "09:30", desc: "Climb main route" }, { time: "13:00", desc: "Reach the summit" } ],
    fr: [ { time: "08:00", desc: "Échauffement et leçons d'escalade" }, { time: "09:30", desc: "Escalade de la voie principale" }, { time: "13:00", desc: "Atteindre le sommet" } ]
  },
  "دراجات": {
    ar: [ { time: "09:00", desc: "انطلاق بالدراجات" }, { time: "11:00", desc: "توقف في قرية أمازيغية" }, { time: "13:00", desc: "العودة مع الشاي" } ],
    en: [ { time: "09:00", desc: "Start cycling adventure" }, { time: "11:00", desc: "Stop at Amazigh village" }, { time: "13:00", desc: "Return with tea" } ],
    fr: [ { time: "09:00", desc: "Début de l'aventure à vélo" }, { time: "11:00", desc: "Arrêt au village amazigh" }, { time: "13:00", desc: "Retour avec du thé" } ]
  },
  "تخييم": {
    ar: [ { time: "17:00", desc: "الوصول للمخيم" }, { time: "20:00", desc: "عشاء تقليدي" }, { time: "22:00", desc: "جلسة مشاهدة النجوم" } ],
    en: [ { time: "17:00", desc: "Arrive at camp" }, { time: "20:00", desc: "Traditional dinner" }, { time: "22:00", desc: "Stargazing session" } ],
    fr: [ { time: "17:00", desc: "Arrivée au camp" }, { time: "20:00", desc: "Dîner traditionnel" }, { time: "22:00", desc: "Session d'observation des étoiles" } ]
  },
  "رافتينغ": {
    ar: [ { time: "09:00", desc: "توزيع التجهيزات" }, { time: "10:30", desc: "التحدي الأول" }, { time: "12:00", desc: "إنهاء الرحلة" } ],
    en: [ { time: "09:00", desc: "Equipment distribution" }, { time: "10:30", desc: "First challenge" }, { time: "12:00", desc: "Finish trip" } ],
    fr: [ { time: "09:00", desc: "Distribution d'équipement" }, { time: "10:30", desc: "Premier défi" }, { time: "12:00", desc: "Fin du parcours" } ]
  },
  "كواد": {
    ar: [ { time: "09:20", desc: "جولة تدريبية" }, { time: "09:45", desc: "انطلاق عبر المسالك" }, { time: "11:00", desc: "العودة والتصوير" } ],
    en: [ { time: "09:20", desc: "Training tour" }, { time: "09:45", desc: "Start trails" }, { time: "11:00", desc: "Return & photos" } ],
    fr: [ { time: "09:20", desc: "Tour de formation" }, { time: "09:45", desc: "Départ sur les pistes" }, { time: "11:00", desc: "Retour et photos" } ]
  },
  "ركوب الخيل": {
    ar: [ { time: "09:20", desc: "دروس أساسية" }, { time: "09:45", desc: "جولة عبر الواحة" }, { time: "11:00", desc: "العودة لشرب الشاي" } ],
    en: [ { time: "09:20", desc: "Basic lessons" }, { time: "09:45", desc: "Oasis tour" }, { time: "11:00", desc: "Return for tea" } ],
    fr: [ { time: "09:20", desc: "Leçons de base" }, { time: "09:45", desc: "Tour de l'Oasis" }, { time: "11:00", desc: "Retour pour le thé" } ]
  },
  "ركوب الجمال": {
    ar: [ { time: "16:00", desc: "تقديم الجمال" }, { time: "16:30", desc: "انطلاق عبر الكثبان" }, { time: "18:30", desc: "العودة والشاي" } ],
    en: [ { time: "16:00", desc: "Meet camels" }, { time: "16:30", desc: "Dune trek" }, { time: "18:30", desc: "Return and tea" } ],
    fr: [ { time: "16:00", desc: "Rencontre avec les chameaux" }, { time: "16:30", desc: "Randonnée dans les dunes" }, { time: "18:30", desc: "Retour et thé" } ]
  },
  "فخار": {
    ar: [ { time: "10:00", desc: "زيارة الورشة" }, { time: "10:20", desc: "تعلم تشكيل الطين" }, { time: "11:45", desc: "الرسم وتجفيف القطعة" } ],
    en: [ { time: "10:00", desc: "Visit workshop" }, { time: "10:20", desc: "Learn clay molding" }, { time: "11:45", desc: "Painting and drying" } ],
    fr: [ { time: "10:00", desc: "Visite de l'atelier" }, { time: "10:20", desc: "Apprendre le modelage de l'argile" }, { time: "11:45", desc: "Peinture et séchage" } ]
  },
  "نسيج": {
    ar: [ { time: "10:00", desc: "جولة في الورشة" }, { time: "11:00", desc: "تجربة عملية" }, { time: "12:30", desc: "اختيار قطعة تذكارية" } ],
    en: [ { time: "10:00", desc: "Workshop tour" }, { time: "11:00", desc: "Practical experience" }, { time: "12:30", desc: "Choose a souvenir" } ],
    fr: [ { time: "10:00", desc: "Visite de l'atelier" }, { time: "11:00", desc: "Expérience pratique" }, { time: "12:30", desc: "Choisir un souvenir" } ]
  },
};

const categoryEmojiMap: Record<string, string> = {
  "طبخ": "🍲", "مشي": "🥾", "تسلق": "🧗", "دراجات": "🚵",
  "رافتينغ": "🚣", "كواد": "🏍️", "تخييم": "⛺", "ركوب الخيل": "🐎",
  "ركوب الجمال": "🐪", "فخار": "🏺", "نسيج": "🧶",
};

const ActivityDetails = () => {
  const { id } = useParams();
  const { activities, addBooking, loading } = useData();
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const activity = activities.find((a) => a.id === id);

  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [tempCoords, setTempCoords] = useState<{ lat: number; lng: number } | null>(null);

  const getTitle = (a: any) => lang === "fr" ? (a.titleFr || a.title) : lang === "en" ? (a.titleEn || a.title) : a.title;
  const getDesc = (a: any) => lang === "fr" ? (a.descriptionFr || a.description) : lang === "en" ? (a.descriptionEn || a.description) : a.description;

  const [date, setDate] = useState("");
  const [persons, setPersons] = useState(1);
  const [liked, setLiked] = useState(false);

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground animate-pulse">{t("loading") || "Loading..."}</p>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏔️</div>
          <p className="text-muted-foreground text-lg mb-4">{t("activityNotFound")}</p>
          <button onClick={() => navigate("/")} className="btn-primary">{t("backToHome")}</button>
        </div>
      </div>
    );
  }

  const categoryTranslations: Record<string, Record<string, string>> = {
    "طبخ": { en: "Cooking", fr: "Cuisine" },
    "مشي": { en: "Hiking", fr: "Randonnée" },
    "تسلق": { en: "Climbing", fr: "Escalade" },
    "دراجات": { en: "Cycling", fr: "Vélo" },
    "رافتينغ": { en: "Rafting", fr: "Rafting" },
    "كواد": { en: "Quad", fr: "Quad" },
    "تخييم": { en: "Camping", fr: "Camping" },
    "ركوب الخيل": { en: "Horse Riding", fr: "Équitation" },
    "ركوب الجمال": { en: "Camel Riding", fr: "Balade à dos de chameau" },
    "فخار": { en: "Pottery", fr: "Poterie" },
    "نسيج": { en: "Weaving", fr: "Tissage" }
  };
  const getCatName = (cat: string) => categoryTranslations[cat]?.[lang] || cat;

  const difficultyMap: Record<string, Record<string, string>> = {
    "سهل": { en: "Easy", fr: "Facile" },
    "متوسط": { en: "Medium", fr: "Moyen" },
    "صعب": { en: "Hard", fr: "Difficile" }
  };
  const getDiffName = (diff: string) => difficultyMap[diff]?.[lang] || diff;

  const getDuration = (dur: string) => {
    if (!dur) return dur;
    let text = dur;
    text = text.replace("ساعات", lang === "fr" ? "heures" : lang === "en" ? "hours" : "ساعات");
    text = text.replace("ساعة", lang === "fr" ? "heure" : lang === "en" ? "hour" : "ساعة");
    text = text.replace("أيام", lang === "fr" ? "jours" : lang === "en" ? "days" : "أيام");
    text = text.replace("يومين", lang === "fr" ? "2 jours" : lang === "en" ? "2 days" : "يومين");
    text = text.replace("نصف يوم", lang === "fr" ? "Demi-journée" : lang === "en" ? "Half day" : "نصف يوم");
    text = text.replace("يوم", lang === "fr" ? "jour" : lang === "en" ? "day" : "يوم");
    text = text.replace("نصف", lang === "fr" ? "demi" : lang === "en" ? "half" : "نصف");
    text = text.replace("دقائق", lang === "fr" ? "minutes" : lang === "en" ? "mins" : "دقائق");
    text = text.replace("دقيقة", lang === "fr" ? "minute" : lang === "en" ? "min" : "دقيقة");
    return lang === "ar" ? dur : text;
  };

  const getLocation = (loc: string) => {
    if (!loc) return loc;
    let text = loc;
    text = text.replace("مضيق تودغا", lang === "fr" ? "Gorges du Todra" : "Todra Gorge");
    text = text.replace("واحة تنغير", lang === "fr" ? "Oasis de Tinghir" : "Tinghir Oasis");
    text = text.replace("واحة", lang === "fr" ? "Oasis de" : "Oasis");
    text = text.replace("جبل", lang === "fr" ? "Mont" : "Mount");
    text = text.replace("تعاونية النسيج", lang === "fr" ? "Coopérative de Tissage" : "Weaving Cooperative");
    text = text.replace("تعاونية الفخار", lang === "fr" ? "Coopérative de Poterie" : "Pottery Cooperative");
    text = text.replace("تعاونية", lang === "fr" ? "Coopérative" : "Cooperative");
    text = text.replace("سوق", lang === "fr" ? "Marché de" : "Market");
    text = text.replace("الأسبوعي", lang === "fr" ? "hebdomadaire" : "weekly");
    text = text.replace("قرية", lang === "fr" ? "Village de" : "Village");
    return lang === "ar" ? loc : text;
  };

  const cs = colorStyles[activity.color] ?? colorStyles.orange;
  const emoji = categoryEmojiMap[activity.category] ?? "🌟";
  
  const defaultIncluded = lang === "fr" ? ["Équipement complet", "Guide professionnel", "Assurance voyage"] : lang === "en" ? ["Complete equipment", "Professional guide", "Trip insurance"] : ["معدات متكاملة", "دليل محترف", "تأمين الرحلة"];
  const included = includedItems[activity.category]?.[lang] ?? defaultIncluded;
  const itinerary = itineraryItems[activity.category]?.[lang] ?? [];
  const relatedActivities = activities.filter(a => a.id !== activity.id && a.color === activity.color).slice(0, 3);

  const handleBook = () => {
    if (!date) { toast.error(t("selectDate")); return; }
    addBooking({ userId: user!.id, activityId: activity.id, date, persons, status: "مؤكد" });
    toast.success(t("bookingSuccess"));
    navigate("/my-bookings");
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ====== HERO ====== */}
      <div className="relative h-[420px] md:h-[560px] overflow-hidden">
        <img
          src={activity.image}
          alt={getTitle(activity)}
          className="absolute inset-0 w-full h-full object-cover scale-[1.05] transition-all duration-700"
          loading="lazy"
        />

        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at bottom left, ${cs.hex} 0%, transparent 70%)` }}
        />

        {/* Top bar */}
        <div className="absolute top-6 inset-x-6 flex items-center justify-between z-10">
          <button
            onClick={() => navigate(-1)}
            className="glass flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-bold uppercase tracking-wider hover:bg-white/20 transition-all"
          >
            <BackArrow className="w-4 h-4" />
            {t("back")}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-all hover:scale-110 ${liked ? "bg-red-500/30" : ""}`}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-red-400 text-red-400" : "text-white"}`} />
            </button>
            <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-all">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Bottom hero info */}
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest text-white shadow-lg flex items-center gap-1.5"
                style={{ background: cs.hex }}
              >
                <span className="text-sm">{emoji}</span>
                {getCatName(activity.category)}
              </span>
              {activity.hasGuide && (
                <span className="glass px-3 py-1.5 rounded-lg text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" style={{ color: cs.hex }} />
                  {t("withTourGuide")}
                </span>
              )}
              {activity.difficulty && (
                <span className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white/90 bg-white/10 backdrop-blur-sm">
                  {getDiffName(activity.difficulty)}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05]" style={{ letterSpacing: "-0.025em" }}>
              {getTitle(activity)}
            </h1>
            {/* Rating row */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(activity.rating) ? "fill-[#FFAF68] text-[#FFAF68]" : "text-white/30"}`} />
                ))}
                <span className="text-white font-black text-sm ms-1">{activity.rating}</span>
              </div>
              <span className="text-white/60 text-sm font-medium">•</span>
              <span className="text-white/70 text-sm font-medium flex items-center gap-1.5">
                <Clock className="w-4 h-4" style={{ color: cs.hex }} />
                {getDuration(activity.duration)}
              </span>
              <span className="text-white/60 text-sm font-medium">•</span>
              <span className="text-white/70 text-sm font-medium flex items-center gap-1.5">
                <MapPin className="w-4 h-4" style={{ color: cs.hex }} />
                {getLocation(activity.location.split("،")[0])}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ====== MAIN CONTENT ====== */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ===== LEFT: CONTENT ===== */}
          <div className="lg:col-span-2 space-y-8">

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { icon: Star,     label: t("rating"),   value: `${activity.rating} / 5`, hex: "#FFAF68", light: "#FFAF681A" },
                { icon: Clock,    label: t("duration"),  value: getDuration(activity.duration),         hex: cs.hex,    light: cs.light },
                { icon: MapPin,   label: t("location"),  value: getLocation(activity.location.split("،")[0]), hex: "#4928FD", light: "#4928FD1A" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="rounded-2xl p-4 text-center border border-border/40 hover:-translate-y-1 transition-all duration-300"
                  style={{ background: item.light }}
                >
                  <item.icon className="w-5 h-5 mx-auto mb-2" style={{ color: item.hex }} />
                  <p className="text-[9px] text-muted-foreground mb-1 uppercase tracking-[0.15em] font-black">{item.label}</p>
                  <p className="font-black text-sm text-foreground leading-tight">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="rounded-2xl p-7 border"
              style={{ background: cs.light, borderColor: cs.hex + "30" }}
            >
              <h2 className="font-black text-xl text-foreground mb-4 flex items-center gap-2" style={{ letterSpacing: "-0.02em" }}>
                <Sparkles className="w-5 h-5" style={{ color: cs.hex }} />
                {t("description")}
              </h2>
              <p className="text-foreground/80 leading-loose text-base font-medium">{getDesc(activity)}</p>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="rounded-2xl p-7 border border-border/40 bg-card"
            >
              <h2 className="font-black text-xl text-foreground mb-5 flex items-center gap-2" style={{ letterSpacing: "-0.02em" }}>
                <ThumbsUp className="w-5 h-5" style={{ color: cs.hex }} />
                {lang === "fr" ? "Ce qui est inclus" : lang === "en" ? "What's included" : "ما يشمله النشاط"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {included.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-muted/30"
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: cs.light }}>
                      <CheckCircle className="w-4 h-4" style={{ color: cs.hex }} />
                    </div>
                    <span className="text-sm font-bold text-foreground/90">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Itinerary (if available) */}
            {itinerary.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="rounded-2xl p-7 border border-border/40 bg-card"
              >
                <h2 className="font-black text-xl text-foreground mb-6 flex items-center gap-2" style={{ letterSpacing: "-0.02em" }}>
                  <Calendar className="w-5 h-5" style={{ color: cs.hex }} />
                  {lang === "fr" ? "Programme de l'activité" : lang === "en" ? "Activity Schedule" : "برنامج النشاط"}
                </h2>
                <div className="relative">
                  {/* Timeline line */}
                  <div
                    className="absolute start-[22px] top-4 bottom-4 w-0.5"
                    style={{ background: `linear-gradient(to bottom, ${cs.hex}, transparent)` }}
                  />
                  <div className="space-y-5">
                    {itinerary.map((step, i) => (
                      <motion.div
                        key={step.time}
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex gap-5 items-start"
                      >
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-white font-black text-white text-xs shadow-lg"
                          style={{ background: cs.hex, boxShadow: cs.shadow }}
                        >
                          {i + 1}
                        </div>
                        <div className="flex-1 pb-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-black uppercase tracking-widest" style={{ color: cs.hex }}>{step.time}</span>
                          </div>
                          <p className="text-sm font-semibold text-foreground/85 leading-relaxed">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Location Map (Disabled for MVP) */}
            {false && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl bg-white"
              style={{ height: "460px" }}
            >
              <div className="flex items-center justify-between p-6 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{t("location")}</p>
                    <h3 className="text-sm font-black text-slate-900">{isEditingLocation ? "Precision Pinpoint" : getLocation(activity.location)}</h3>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!isEditingLocation && (
                    <a
                      href={`https://www.google.com/maps?q=${activity.lat},${activity.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all text-[10px] font-black uppercase tracking-widest shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View on G-Maps
                    </a>
                  )}
                  {(user?.role === "superAdmin" || (user?.role === "host" && user.id === activity.hostId)) && (
                    <div className="flex gap-2">
                      {!isEditingLocation ? (
                        <button
                          onClick={() => {
                            setIsEditingLocation(true);
                            setTempCoords({ lat: activity.lat || 31.5125, lng: activity.lng || -5.5340 });
                          }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-primary transition-all text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/20"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Adjust Position
                        </button>
                      ) : (
                      <>
                        <button
                          onClick={async () => {
                            if (tempCoords) {
                              // @ts-ignore
                              await updateActivity(activity.id, { lat: tempCoords.lat, lng: tempCoords.lng });
                              setIsEditingLocation(false);
                              toast.success("Location synchronized!");
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white hover:scale-105 transition-all text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20"
                        >
                          <Save className="w-3.5 h-3.5" />
                          Save
                        </button>
                        <button
                          onClick={() => setIsEditingLocation(false)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 transition-all text-[10px] font-black uppercase tracking-widest"
                        >
                          <X className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="relative h-[calc(100%-88px)]">
                {/* 
                  -- MAP PROTOTYPE (DISABLED FOR MVP) --
                  Uncomment this block for production use.
                  
                <Map 
                  center={[tempCoords?.lng || activity.lng || -5.5340, tempCoords?.lat || activity.lat || 31.5125]} 
                  zoom={isEditingLocation ? 16 : 14} 
                  className={`w-full h-full ${isEditingLocation ? "cursor-crosshair" : ""}`} 
                  theme="light"
                  onClick={(e: any) => {
                    if (isEditingLocation) setTempCoords({ lat: e.lngLat.lat, lng: e.lngLat.lng });
                  }}
                >
                  <MapControls position="bottom-right" showZoom showLocate />
                  <MapMarker 
                    longitude={tempCoords?.lng || activity.lng || -5.5340} 
                    latitude={tempCoords?.lat || activity.lat || 31.5125}
                  >
                    <MarkerContent>
                      <div className="relative flex items-center justify-center">
                        {isEditingLocation && <div className="absolute size-24 bg-primary/20 rounded-full animate-ping" />}
                        <div className={`absolute ${isEditingLocation ? 'size-16 bg-primary/30' : 'size-14 bg-primary/10'} rounded-full`} />
                        <div
                          className={`relative size-14 rounded-[1.25rem] border-4 border-white shadow-2xl flex items-center justify-center text-3xl transform transition-transform hover:scale-110 ${isEditingLocation ? "animate-bounce ring-8 ring-primary/5" : ""}`}
                          style={{ background: cs.hex, boxShadow: cs.shadow }}
                        >
                          {emoji}
                        </div>
                      </div>
                    </MarkerContent>
                    {!isEditingLocation && (
                      <MarkerTooltip className="bg-slate-900 text-white border-none px-4 py-2 rounded-xl text-xs font-black shadow-2xl">
                        {activity.title}
                      </MarkerTooltip>
                    )}
                  </MapMarker>
                </Map>
                {!isEditingLocation && (
                  <div className="absolute top-6 left-6 z-10 glass px-5 py-3 rounded-2xl border border-white/20 shadow-2xl pointer-events-none backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="size-2 rounded-full bg-primary animate-pulse" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Tinghir Satellite Hub</p>
                        <p className="text-xs font-black text-slate-900 leading-none">Live Pinpoint</p>
                      </div>
                    </div>
                  </div>
                )}
                {isEditingLocation && (
                  <div className="absolute bottom-6 inset-x-6 z-10 flex justify-center pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-100 shadow-2xl flex items-center gap-3 animate-bounce">
                      <MousePointer2 className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Click map to set new location</span>
                    </div>
                  </div>
                )}
                */}
                
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
                   <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.5 }} />
                   <div className="z-10 flex flex-col items-center max-w-[250px] text-center">
                      <div className="size-16 rounded-[1.5rem] bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4">
                         <MapPin className="size-6 text-slate-300" />
                      </div>
                      <h3 className="text-sm font-black text-slate-900 mb-1">Activity Location Prototype</h3>
                      <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed">
                        Live Map Disabled<br/>(MVP Phase)
                      </p>
                   </div>
                </div>
              </div>
            </motion.div>
            )}

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: Shield,       text: lang === "fr" ? "Réservation sécurisée" : lang === "en" ? "Secure & guaranteed" : "حجز آمن ومضمون", color: "#79D45E" },
                { icon: CheckCircle,  text: lang === "fr" ? "Confirmation immédiate" : lang === "en" ? "Instant confirmation" : "تأكيد فوري", color: "#4928FD" },
                { icon: Star,         text: lang === "fr" ? `Noté ${activity.rating}/5` : lang === "en" ? `Rated ${activity.rating}/5` : `تقييم ${activity.rating}/5`, color: "#FFAF68" },
                { icon: Zap,          text: lang === "fr" ? "Support 24/7" : lang === "en" ? "24/7 support" : "دعم 24/7", color: "#A484E9" },
                { icon: Camera,       text: lang === "fr" ? "Photos souvenirs" : lang === "en" ? "Photo memories" : "صور تذكارية", color: "#F4889A" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-muted/50 px-4 py-2.5 rounded-xl border border-border/40 hover:bg-muted hover:-translate-y-0.5 transition-all duration-200"
                >
                  <badge.icon className="w-4 h-4" style={{ color: badge.color }} />
                  {badge.text}
                </div>
              ))}
            </motion.div>

            {/* Related Activities */}
            {relatedActivities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              >
                <h2 className="font-black text-xl text-foreground mb-5 flex items-center gap-2" style={{ letterSpacing: "-0.02em" }}>
                  <Sparkles className="w-5 h-5" style={{ color: cs.hex }} />
                  {isRTL ? "قد يعجبك أيضاً" : "You might also like"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedActivities.map((ra, i) => (
                    <motion.div
                      key={ra.id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
                    >
                      <Link
                        to={`/activity/${ra.id}`}
                        className="group block glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 border-2"
                        style={{ borderColor: cs.hex + "30" }}
                      >
                        <div className="relative h-36 overflow-hidden">
                          <img src={ra.image} alt={getTitle(ra)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-2 end-2 glass px-2 py-1 rounded-lg">
                            <span className="font-black text-white text-sm">{ra.price}</span>
                            <span className="text-white/70 text-[10px] ms-1">{t("currency")}</span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-black text-sm text-foreground line-clamp-1 mb-1">{ra.title}</h3>
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
                            <Star className="w-3 h-3 fill-[#FFAF68] text-[#FFAF68]" />
                            {ra.rating} · {ra.duration}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ===== RIGHT: BOOKING CARD ===== */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="sticky top-24"
            >
              <div
                className="rounded-2xl overflow-hidden border shadow-premium"
                style={{ borderColor: cs.hex + "44", boxShadow: cs.shadow }}
              >
                {/* Colored header strip */}
                <div
                  className="px-6 py-4 flex items-center gap-3"
                  style={{ background: `linear-gradient(135deg, ${cs.hex} 0%, ${cs.hex}CC 100%)` }}
                >
                  <div className="text-3xl">{emoji}</div>
                  <div>
                    <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">{activity.category}</p>
                    <p className="text-white font-black text-sm leading-tight line-clamp-1">{activity.title}</p>
                  </div>
                </div>

                <div className="p-6 space-y-6 bg-card">
                  {/* Price */}
                  <div className="text-center pb-5 border-b border-border/50">
                    <div className="text-5xl font-black mb-1" style={{ color: cs.hex }}>
                      {activity.price}
                    </div>
                    <div className="text-muted-foreground text-sm font-medium">{t("perPerson")} · {t("currency")}</div>
                  </div>

                  <div className="space-y-4">
                    {/* Date */}
                    <div>
                      <label className="text-xs font-black text-foreground mb-2 flex items-center gap-1.5 uppercase tracking-widest">
                        <Calendar className="w-4 h-4" style={{ color: cs.hex }} />
                        {t("date")}
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 text-foreground focus:outline-none focus:ring-2 transition-all duration-200 font-medium"
                        style={{ borderColor: date ? cs.hex + "60" : undefined }}
                      />
                    </div>

                    {/* Persons */}
                    <div>
                      <label className="text-xs font-black text-foreground mb-2 flex items-center gap-1.5 uppercase tracking-widest">
                        <Users className="w-4 h-4" style={{ color: cs.hex }} />
                        {t("numberOfPersons")}
                      </label>
                      <div className="flex items-center gap-3 bg-muted/30 rounded-xl p-2 border border-border/40">
                        <button
                          onClick={() => setPersons(Math.max(1, persons - 1))}
                          className="w-11 h-11 rounded-xl bg-muted text-foreground font-black text-xl hover:bg-secondary transition-all hover:scale-105"
                        >−</button>
                        <span className="text-2xl font-black text-foreground flex-1 text-center">{persons}</span>
                        <button
                          onClick={() => setPersons(persons + 1)}
                          className="w-11 h-11 rounded-xl font-black text-xl text-white transition-all hover:scale-105"
                          style={{ background: cs.hex }}
                        >+</button>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="rounded-xl p-4 space-y-2 border border-border/30" style={{ background: cs.light }}>
                    <div className="flex justify-between text-sm text-muted-foreground font-medium">
                      <span>{activity.price} {t("currency")} × {persons} {t("persons")}</span>
                      <span>{activity.price * persons} {t("currency")}</span>
                    </div>
                    <div className="flex justify-between font-black text-xl text-foreground border-t border-border/40 pt-2 mt-2">
                      <span>{t("total")}</span>
                      <span style={{ color: cs.hex }}>{activity.price * persons} {t("currency")}</span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={handleBook}
                    className="w-full py-4 rounded-xl text-white font-black text-lg uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: `linear-gradient(135deg, ${cs.hex} 0%, ${cs.hex}BB 100%)`,
                      boxShadow: cs.shadow,
                    }}
                  >
                    {t("bookNow")} →
                  </button>

                  {/* Micro-trust line */}
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
                    <Shield className="w-3.5 h-3.5 text-green-500" />
                    {isRTL ? "حجز آمن · إلغاء مجاني" : "Secure booking · Free cancellation"}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ActivityDetails;
