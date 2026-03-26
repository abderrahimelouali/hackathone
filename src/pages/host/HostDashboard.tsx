import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart3, Mountain, ShoppingBag, CalendarCheck, TrendingUp } from "lucide-react";

const HostDashboard = () => {
  const { activities, bookings, products } = useData();
  const { user } = useAuth();

  const myActivities = activities.filter((a) => a.hostId === user?.id);
  const myBookings = bookings.filter((b) => myActivities.some((a) => a.id === b.activityId));
  const myProducts = products.filter((p) => p.hostId === user?.id);
  const totalRevenue = myBookings.reduce((sum, b) => {
    const act = activities.find((a) => a.id === b.activityId);
    return sum + (act ? act.price * b.persons : 0);
  }, 0);

  const stats = [
    { label: "الأنشطة", value: myActivities.length, icon: Mountain, color: "text-primary" },
    { label: "الحجوزات", value: myBookings.length, icon: CalendarCheck, color: "text-accent" },
    { label: "المنتجات", value: myProducts.length, icon: ShoppingBag, color: "text-gold" },
    { label: "الإيرادات", value: `${totalRevenue} د.م`, icon: TrendingUp, color: "text-olive" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">مرحباً، {user?.name} 👋</h1>
        <p className="text-muted-foreground mb-8">إليك ملخص نشاطك</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={s.label} className="bg-card rounded-xl shadow-card p-6 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <s.icon className={`w-8 h-8 ${s.color} mb-3`} />
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            آخر الحجوزات
          </h2>
          {myBookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">لا توجد حجوزات بعد</p>
          ) : (
            <div className="space-y-3">
              {myBookings.slice(-5).reverse().map((b) => {
                const act = activities.find((a) => a.id === b.activityId);
                return (
                  <div key={b.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{act?.title}</p>
                      <p className="text-sm text-muted-foreground">{b.date} — {b.persons} أشخاص</p>
                    </div>
                    <span className="text-sm font-medium text-accent">{b.status}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
