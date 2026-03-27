import { useParams, useNavigate } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Star, Clock, MapPin, Users, Calendar, ArrowRight, ArrowLeft, CheckCircle, Shield, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";

const ActivityDetails = () => {
  const { id } = useParams();
  const { activities, addBooking } = useData();
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const activity = activities.find((a) => a.id === id);

  const [date, setDate] = useState("");
  const [persons, setPersons] = useState(1);

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  if (!activity) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground text-lg">{t("activityNotFound")}</p>
        <button onClick={() => navigate("/")} className="mt-4 text-primary hover:underline">{t("backToHome")}</button>
      </div>
    );
  }

  const handleBook = () => {
    if (!date) { toast.error(t("selectDate")); return; }
    addBooking({
      userId: user!.id,
      activityId: activity.id,
      date,
      persons,
      status: "مؤكد",
    });
    toast.success(t("bookingSuccess"));
    navigate("/my-bookings");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[350px] md:h-[450px] overflow-hidden">
        <img src={activity.images[0]} alt={activity.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute top-6 start-6">
          <button
            onClick={() => navigate(-1)}
            className="glass-dark flex items-center gap-2 px-4 py-2.5 rounded-xl text-primary-foreground text-sm font-medium hover:bg-foreground/60 transition-colors"
          >
            <BackArrow className="w-4 h-4" />
            {t("back")}
          </button>
        </div>
        <div className="absolute bottom-6 start-6 end-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-lg text-xs font-medium">{activity.category}</span>
              {activity.hasGuide && (
                <span className="bg-accent/90 backdrop-blur-sm text-accent-foreground px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> {t("withTourGuide")}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground">{activity.title}</h1>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Star, label: t("rating"), value: `${activity.rating}/5`, color: "text-gold", bg: "bg-gold/5" },
                { icon: Clock, label: t("duration"), value: activity.duration, color: "text-primary", bg: "bg-primary/5" },
                { icon: MapPin, label: t("location"), value: activity.location.split("،")[0], color: "text-accent", bg: "bg-accent/5" },
                { icon: Users, label: t("guide"), value: activity.hasGuide ? t("available") : t("notAvailable"), color: "text-olive", bg: "bg-olive/5" },
              ].map((item) => (
                <div key={item.label} className={`${item.bg} rounded-2xl p-4 text-center border border-border/30`}>
                  <item.icon className={`w-5 h-5 mx-auto mb-2 ${item.color}`} />
                  <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-wider">{item.label}</p>
                  <p className="font-bold text-sm text-foreground">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="card-interactive p-6">
              <h2 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                {t("description")}
              </h2>
              <p className="text-muted-foreground leading-loose text-base">{activity.description}</p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Shield, text: isRTL ? "حجز آمن" : "Secure booking" },
                { icon: CheckCircle, text: isRTL ? "تأكيد فوري" : "Instant confirmation" },
                { icon: Star, text: isRTL ? "تقييم ممتاز" : "Excellent rating" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                  <badge.icon className="w-3.5 h-3.5 text-accent" />
                  {badge.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="card-interactive shadow-warm p-6 sticky top-24 space-y-5">
              <div className="text-center pb-4 border-b border-border/50">
                <span className="text-4xl font-bold text-gradient">{activity.price}</span>
                <span className="text-muted-foreground text-sm ms-2">{t("perPerson")}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    {t("date")}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input-styled"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" />
                    {t("numberOfPersons")}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPersons(Math.max(1, persons - 1))}
                      className="w-11 h-11 rounded-xl bg-muted text-foreground font-bold hover:bg-secondary transition-colors text-lg"
                    >−</button>
                    <span className="text-2xl font-bold text-foreground flex-1 text-center">{persons}</span>
                    <button
                      onClick={() => setPersons(persons + 1)}
                      className="w-11 h-11 rounded-xl bg-muted text-foreground font-bold hover:bg-secondary transition-colors text-lg"
                    >+</button>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/50 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{activity.price} {t("currency")} × {persons} {t("persons")}</span>
                  <span>{activity.price * persons} {t("currency")}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-foreground">
                  <span>{t("total")}</span>
                  <span className="text-gradient text-xl">{activity.price * persons} {t("currency")}</span>
                </div>
              </div>

              <button onClick={handleBook} className="w-full btn-primary text-lg py-4 animate-pulse-glow">
                {t("bookNow")}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ActivityDetails;
