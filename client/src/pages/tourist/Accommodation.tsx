import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Check, BedDouble, Wifi, Car as CarIcon, Utensils, Wind, TreePine, MapPin, X, ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const amenityIcons: Record<string, any> = {
  "واي فاي": Wifi,
  "مسبح": TreePine,
  "إفطار": Utensils,
  "موقف سيارات": CarIcon,
  "تكييف": Wind,
  "حديقة": TreePine,
};

const Accommodation = () => {
  const { t, isRTL, lang } = useLanguage();
  const navigate = useNavigate();
  const [selectedStay, setSelectedStay] = useState<any | null>(null);

  // Hardcoded for now: 1 Card for Auberge Rachid.
  // When you have more choices, you just add them to this array!
  const stays = [
    {
      id: "auberge-rachid",
      title: { ar: "أوبرج رشيد", fr: "Auberge Rachid", en: "Auberge Rachid" },
      tagline: { ar: "حسن الضيافة", fr: "Hospitalité authentique", en: "Authentic hospitality" },
      desc: {
        ar: "يقدم لك أوبرج رشيد تجربة إقامة لا تُنسى في واحة تنغير. استمتع بغرف تقليدية مصممة بلمسة عصرية، وطعام محلي شهي مع إطلالات بانورامية على جبال الأطلس.",
        fr: "L'Auberge Rachid vous offre une expérience de séjour inoubliable dans l'Oasis de Tinghir. Profitez de chambres avec une touche moderne et d'une cuisine locale.",
        en: "Auberge Rachid offers you an unforgettable stay in the Tinghir Oasis. Enjoy traditional rooms designed with a modern touch and delicious local food."
      },
      price: 450,
      rating: "4.9",
      type: "فندق",
      // MAIN COVER IMAGE (Shown on the Card)
      cover: "/images/stays/rachid-1.jpeg",
      // 3 GALLERY IMAGES (Shown when clicked)
      images: [
        "/images/stays/rachid-1.jpeg",
        "/images/stays/rachid-2.jpeg",
        "/images/stays/rachid-3.jpeg",
      ],
      location: { ar: "تنغير", fr: "Tinghir", en: "Tinghir" },
      amenities: ["واي فاي", "إفطار", "موقف سيارات"]
    }
  ];

  const getTranslated = (field: any) => field?.[lang] || field?.ar || field;

  const handleBook = () => {
    toast.success(lang === "fr" ? "Réservation initiée!" : lang === "en" ? "Booking initiated!" : "تم بدء الحجز!");
    navigate("/login");
  };

  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">

        {/* If a stay is selected, show its DETAIL VIEW with 3 images. Otherwise, show the LIST OF CARDS. */}
        <AnimatePresence mode="wait">
          {!selectedStay ? (
            /* ==================================================
             * VIEW 1: THE LIST OF CARDS (Currently 1 Auberge)
             * ================================================== */
            <motion.div key="list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BedDouble className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{t("accommodationTitle")}</h1>
                  <p className="text-muted-foreground text-sm">{t("accommodationSubtitle")}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stays.map((stay, i) => (
                  <motion.div
                    key={stay.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="card-interactive overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedStay(stay)}
                  >
                    <div className="relative h-72 overflow-hidden rounded-2xl drop-shadow-sm">
                      {/* CARD COVER IMAGE */}
                      <img
                        src={stay.cover}
                        alt="cover"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100" />
                      <div className="absolute top-3 start-3 glass-dark px-3 py-1.5 rounded-lg text-xs font-medium text-white">
                        {stay.type === "فندق" ? t("hotel") : t("home")}
                      </div>
                      <div className="absolute top-3 end-3 glass-dark px-2.5 py-1.5 rounded-lg flex items-center gap-1 text-white">
                        <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                        <span className="text-xs font-bold">{stay.rating}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-1">{getTranslated(stay.title)}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{getTranslated(stay.desc)}</p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {stay.amenities.map(a => {
                          const Icon = amenityIcons[a] || Check;
                          return (
                            <span key={a} className="flex items-center gap-1.5 bg-accent/5 text-accent border border-accent/10 px-2 py-1 rounded-md text-xs font-medium">
                              <Icon className="w-3 h-3" />
                              {a}
                            </span>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div>
                          <span className="text-xl font-bold text-gradient">{stay.price}</span>
                          <span className="text-xs text-muted-foreground ms-1">{t("perNight")}</span>
                        </div>
                        <button className="btn-primary text-sm px-5 py-2">
                          {lang === "fr" ? "Voir Déteils" : lang === "en" ? "View Details" : "عرض التفاصيل"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          ) : (

            /* ==================================================
             * VIEW 2: DETAILED VIEW (WITH 3 IMAGES & SHORT DESC)
             * ================================================== */
            <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button
                onClick={() => setSelectedStay(null)}
                className="mb-6 flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-sm font-bold hover:bg-muted/80 transition-all text-foreground"
              >
                <BackIcon className="w-4 h-4" />
                {t("back")}
              </button>

              <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-5xl font-black text-foreground mb-2">{getTranslated(selectedStay.title)}</h1>
                  <p className="text-muted-foreground flex items-center gap-2 font-medium bg-muted/30 w-fit px-3 py-1.5 rounded-lg border border-border/30">
                    <MapPin className="w-4 h-4 text-primary" />
                    {getTranslated(selectedStay.location)}
                  </p>
                </div>
                <div className="flex items-end gap-2 text-right">
                  <span className="text-3xl font-black text-foreground">{selectedStay.price}</span>
                  <span className="text-muted-foreground font-medium mb-1">{t("perNight")}</span>
                </div>
              </div>

              {/* THE 3 IMAGES SECTION */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Image 1 (Large left) */}
                <div className="flex-1 md:w-2/3">
                  <img
                    src={selectedStay.images[0]}
                    alt="Gallery 1"
                    className="w-full h-auto rounded-2xl shadow-xl"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                {/* Image 2 and 3 (Stacked right) */}
                <div className="flex-1 md:w-1/3 flex flex-col gap-4">
                  <img
                    src={selectedStay.images[1]}
                    alt="Gallery 2"
                    className="w-full h-auto rounded-2xl shadow-xl"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <img
                    src={selectedStay.images[2]}
                    alt="Gallery 3"
                    className="w-full h-auto rounded-2xl shadow-xl"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              </div>

              {/* DESCRIPTION & BOOKING */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div className="p-6 bg-card border border-border rounded-3xl shadow-sm">
                    <h2 className="text-xl font-bold mb-4">{lang === "fr" ? "À propos de ce logement" : lang === "en" ? "About this place" : "عن هذا المكان"}</h2>
                    <p className="text-muted-foreground leading-loose text-base">{getTranslated(selectedStay.desc)}</p>
                  </div>
                  <div className="p-6 bg-card border border-border rounded-3xl shadow-sm">
                    <h3 className="text-lg font-bold mb-4">{lang === "fr" ? "Équipements" : lang === "en" ? "Amenities" : "المرافق"}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStay.amenities.map((a: string) => {
                        const Icon = amenityIcons[a] || Check;
                        return (
                          <span key={a} className="flex items-center gap-1.5 bg-accent/5 text-accent border border-accent/10 px-3 py-1.5 rounded-lg text-sm font-medium">
                            <Icon className="w-4 h-4" />
                            {a}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <div className="sticky top-28 h-fit bg-card border border-border shadow-xl rounded-3xl p-6">
                    <button onClick={handleBook} className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                      {t("book")}
                    </button>
                    <p className="text-center text-xs text-muted-foreground font-medium mt-4">
                      {lang === "fr" ? "Réservation sécurisée" : lang === "en" ? "Secure booking" : "حجز آمن"}
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Accommodation;
