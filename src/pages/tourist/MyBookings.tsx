import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { CalendarCheck, Users, CheckCircle, Clock, XCircle } from "lucide-react";

const statusIcons = {
  "مؤكد": <CheckCircle className="w-4 h-4 text-accent" />,
  "قيد الانتظار": <Clock className="w-4 h-4 text-gold" />,
  "ملغى": <XCircle className="w-4 h-4 text-destructive" />,
};

const MyBookings = () => {
  const { bookings, activities } = useData();
  const { user } = useAuth();
  const myBookings = bookings.filter((b) => b.userId === user?.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">حجوزاتي</h1>
      <p className="text-muted-foreground mb-8">تتبع جميع حجوزاتك هنا</p>

      {myBookings.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-xl shadow-card">
          <CalendarCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">لا توجد حجوزات بعد</p>
          <p className="text-muted-foreground text-sm mt-2">ابدأ باكتشاف الأنشطة واحجز تجربتك الأولى!</p>
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
                  <h3 className="font-bold text-foreground text-lg">{activity?.title || "نشاط محذوف"}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarCheck className="w-4 h-4" />{booking.date}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />{booking.persons} أشخاص</span>
                    <span className="flex items-center gap-1">
                      {statusIcons[booking.status]}
                      {booking.status}
                    </span>
                  </div>
                </div>
                {activity && (
                  <div className="text-left">
                    <span className="text-xl font-bold text-primary">{activity.price * booking.persons} د.م</span>
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
