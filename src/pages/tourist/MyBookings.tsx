import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { CalendarCheck, Users, CheckCircle, Clock, XCircle } from "lucide-react";

const MyBookings = () => {
  const { bookings, activities } = useData();
  const { user } = useAuth();
  const { t } = useLanguage();
  const myBookings = bookings.filter((b) => b.userId === user?.id);

  const statusIcons: Record<string, JSX.Element> = {
    "مؤكد": <CheckCircle className="w-4 h-4 text-accent" />,
    "قيد الانتظار": <Clock className="w-4 h-4 text-gold" />,
    "ملغى": <XCircle className="w-4 h-4 text-destructive" />,
  };

  const statusLabels: Record<string, string> = {
    "مؤكد": t("confirmed"),
    "قيد الانتظار": t("pending"),
    "ملغى": t("cancelled"),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">{t("myBookingsTitle")}</h1>
      <p className="text-muted-foreground mb-8">{t("trackBookings")}</p>

      {myBookings.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-xl shadow-card">
          <CalendarCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">{t("noBookings")}</p>
          <p className="text-muted-foreground text-sm mt-2">{t("startExploring")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myBookings.map((booking) => {
            const activity = activities.find((a) => a.id === booking.activityId);
            return (
              <div key={booking.id} className="bg-card rounded-xl shadow-card p-5 flex flex-col md:flex-row gap-4 items-start">
                {activity && (
                  <img src={activity.images[0]} alt={activity.title} className="w-full md:w-32 h-24 rounded-lg object-cover" loading="lazy" />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-lg">{activity?.title || t("deletedActivity")}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarCheck className="w-4 h-4" />{booking.date}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />{booking.persons} {t("persons")}</span>
                    <span className="flex items-center gap-1">
                      {statusIcons[booking.status]}
                      {statusLabels[booking.status] || booking.status}
                    </span>
                  </div>
                </div>
                {activity && (
                  <div className="text-start">
                    <span className="text-xl font-bold text-primary">{activity.price * booking.persons} {t("currency")}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
