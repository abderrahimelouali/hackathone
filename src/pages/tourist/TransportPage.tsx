import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Car, Shield, MapPin, Fuel, Users, Clock } from "lucide-react";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const TransportPage = () => {
  const { t, lang, isRTL } = useLanguage();
  const navigate = useNavigate();

  // Multilingual transport options
  // To add your images: drop files in public/images/transport/
  // and update the `image` field below (e.g. "/images/transport/4x4.jpeg")
  const transports = [
    {
      id: "t1",
      title: { ar: "كراء سيارة 4x4", fr: "Location 4x4", en: "4x4 Car Rental" },
      type: "كراء سيارة",
      desc: {
        ar: "سيارات دفع رباعي حديثة مناسبة لاستكشاف المناطق الجبلية والصحراوية. تأمين شامل وكيلومترات غير محدودة.",
        fr: "Véhicules 4x4 modernes adaptés à l'exploration des zones montagneuses et désertiques. Assurance complète et kilométrage illimité.",
        en: "Modern 4x4 vehicles ideal for exploring mountain and desert areas. Full insurance and unlimited mileage included."
      },
      price: 400,
      // IMAGE: /public/images/transport/4x4.jpeg (or .jpg, .png)
      image: "/images/transport/4x4.jpg",
      features: {
        ar: ["تأمين شامل", "كيلومترات غير محدودة", "GPS"],
        fr: ["Assurance complète", "Kilométrage illimité", "GPS"],
        en: ["Full insurance", "Unlimited mileage", "GPS"],
      },
      featureIcons: [Shield, Fuel, MapPin],
      seats: "5",
    },
    {
      id: "t2",
      title: { ar: "نقل سياحي مع سائق", fr: "Navette avec chauffeur", en: "Tourist Transfer with Driver" },
      type: "نقل سياحي",
      desc: {
        ar: "خدمة نقل مريحة مع سائق محلي يعرف المنطقة جيداً. مثالي لزيارة المعالم والمواقع السياحية.",
        fr: "Service de transport confortable avec un chauffeur local qui connaît bien la région. Idéal pour visiter les sites touristiques.",
        en: "Comfortable transport service with a local driver who knows the region well. Ideal for visiting landmarks and tourist sites."
      },
      price: 300,
      // IMAGE: /public/images/transport/minibus.jpeg (or .jpg, .png)
      image: "/images/transport/minibus.jpg",
      features: {
        ar: ["سائق محلي", "مكيف هواء", "راحة تامة"],
        fr: ["Chauffeur local", "Climatisation", "Tout confort"],
        en: ["Local driver", "Air conditioning", "Full comfort"],
      },
      featureIcons: [Users, Clock, Shield],
      seats: "8",
    },
  ];

  const getTranslated = (field: any) => field?.[lang] || field?.ar || field;

  const handleBook = () => {
    toast.success(
      lang === "fr" ? "Réservation initiée !" :
      lang === "en" ? "Booking initiated!" :
      "تم بدء الحجز!"
    );
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t("transportTitle")}</h1>
              <p className="text-muted-foreground text-sm">{t("transportSubtitle")}</p>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {transports.map((tr, i) => (
            <motion.div
              key={tr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="card-interactive overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden bg-muted">
                <img
                  src={tr.image}
                  alt={getTranslated(tr.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-3 start-3 glass-dark px-3 py-1.5 rounded-lg text-xs font-medium text-white flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5" />
                  {tr.type === "كراء سيارة" ? t("carRental") : t("touristTransport")}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {getTranslated(tr.title)}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {getTranslated(tr.desc)}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {getTranslated(tr.features).map((feat: string, idx: number) => {
                    const Icon = tr.featureIcons[idx] || Shield;
                    return (
                      <span key={feat} className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border border-border/40">
                        <Icon className="w-3 h-3 text-primary" />
                        {feat}
                      </span>
                    );
                  })}
                </div>

                {/* Price + Book */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div>
                    <span className="text-2xl font-bold text-gradient">{tr.price}</span>
                    <span className="text-sm text-muted-foreground ms-1">{t("perDay")}</span>
                  </div>
                  <button onClick={handleBook} className="btn-primary text-sm px-6">
                    {t("bookNow")}
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

export default TransportPage;
