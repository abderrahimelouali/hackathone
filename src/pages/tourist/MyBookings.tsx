import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { CalendarCheck, Users, CheckCircle, Clock, XCircle, MapPin, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const MyBookings = () => {
  const { bookings, activities } = useData();
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const myBookings = bookings.filter((b) => b.userId === user?.id);

  const statusConfig: Record<string, { icon: any; color: string; bg: string; label: string }> = {
    "مؤكد": { icon: CheckCircle, color: "text-accent", bg: "bg-accent/10", label: t("confirmed") },
    "قيد الانتظار": { icon: Clock, color: "text-gold", bg: "bg-gold/10", label: t("pending") },
    "ملغى": { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", label: t("cancelled") },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t("myBookingsTitle")}</h1>
              <p className="text-muted-foreground text-sm">{t("trackBookings")}</p>
            </div>
          </div>
        </motion.div>

        {myBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 card-interactive p-8"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Compass className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <p className="text-foreground text-lg font-medium mb-2">{t("noBookings")}</p>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">{t("startExploring")}</p>
            <Link to="/" className="btn-primary inline-flex items-center gap-2 text-sm">
              <Compass className="w-4 h-4" />
              {isRTL ? "اكتشف الأنشطة" : "Explore Activities"}
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {myBookings.map((booking, i) => {
              const activity = activities.find((a) => a.id === booking.activityId);
              const status = statusConfig[booking.status] || statusConfig["مؤكد"];
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card-interactive p-4 md:p-5 flex flex-col md:flex-row gap-4 items-start"
                >
                  {activity && (
                    <img src={activity.images[0]} alt={activity.title} className="w-full md:w-36 h-24 rounded-xl object-cover" loading="lazy" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-lg truncate">{activity?.title || t("deletedActivity")}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CalendarCheck className="w-3.5 h-3.5" />{booking.date}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />{booking.persons} {t("persons")}
                      </span>
                      {activity && (
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />{activity.location.split("،")[0]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex md:flex-col items-center md:items-end gap-3">
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {status.label}
                    </span>
                    {activity && (
                      <span className="text-lg font-bold text-gradient">{activity.price * booking.persons} {t("currency")}</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;
