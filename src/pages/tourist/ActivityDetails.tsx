import { useParams, useNavigate } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { toast } from "sonner";
import { Star, Clock, MapPin, Users, Calendar, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

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
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <BackArrow className="w-5 h-5" />
        {t("back")}
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl overflow-hidden shadow-card">
            <img src={activity.images[0]} alt={activity.title} className="w-full h-[400px] object-cover" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">{activity.category}</span>
              {activity.hasGuide && (
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> {t("withTourGuide")}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{activity.title}</h1>
            <p className="text-muted-foreground leading-relaxed text-lg">{activity.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Star, label: t("rating"), value: `${activity.rating}/5`, color: "text-gold" },
              { icon: Clock, label: t("duration"), value: activity.duration, color: "text-primary" },
              { icon: MapPin, label: t("location"), value: activity.location, color: "text-accent" },
              { icon: Users, label: t("guide"), value: activity.hasGuide ? t("available") : t("notAvailable"), color: "text-olive" },
            ].map((item) => (
              <div key={item.label} className="bg-card rounded-xl p-4 shadow-card text-center">
                <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="font-bold text-sm text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl shadow-warm p-6 sticky top-24 space-y-5">
            <div className="text-center">
              <span className="text-4xl font-bold text-gradient">{activity.price}</span>
              <span className="text-muted-foreground text-lg ms-2">{t("perPerson")}</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  <Calendar className="w-4 h-4 inline me-1" />
                  {t("date")}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  <Users className="w-4 h-4 inline me-1" />
                  {t("numberOfPersons")}
                </label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setPersons(Math.max(1, persons - 1))} className="w-10 h-10 rounded-lg bg-muted text-foreground font-bold hover:bg-secondary transition-colors">-</button>
                  <span className="text-xl font-bold text-foreground flex-1 text-center">{persons}</span>
                  <button onClick={() => setPersons(persons + 1)} className="w-10 h-10 rounded-lg bg-muted text-foreground font-bold hover:bg-secondary transition-colors">+</button>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{activity.price} {t("currency")} × {persons} {t("persons")}</span>
                <span>{activity.price * persons} {t("currency")}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-foreground">
                <span>{t("total")}</span>
                <span className="text-primary">{activity.price * persons} {t("currency")}</span>
              </div>
            </div>

            <button onClick={handleBook} className="w-full py-4 rounded-xl gradient-hero text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity">
              {t("bookNow")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
