import { useData } from "@/contexts/DataProvider";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BarChart3, Mountain, ShoppingBag, CalendarCheck, TrendingUp, ArrowUpRight, Plus, BookOpen, Clock, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const HostDashboard = () => {
  const { activities, bookings, products } = useData();
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const myActivities = activities.filter((a) => a.hostId === user?.id);
  const myBookings = bookings.filter((b) => myActivities.some((a) => a.id === b.activityId));
  const myProducts = products.filter((p) => p.hostId === user?.id);
  const totalRevenue = myBookings.reduce((sum, b) => {
    const act = activities.find((a) => a.id === b.activityId);
    return sum + (act ? act.price * b.persons : 0);
  }, 0);

  const stats = [
    { label: t("activitiesStat"), value: myActivities.length, icon: Mountain, color: "text-primary", bg: "bg-primary/10", change: "+2" },
    { label: t("bookingsStat"), value: myBookings.length, icon: CalendarCheck, color: "text-accent", bg: "bg-accent/10", change: "+5" },
    { label: t("productsStat"), value: myProducts.length, icon: ShoppingBag, color: "text-gold", bg: "bg-gold/10", change: "+1" },
    { label: t("revenueStat"), value: `${totalRevenue}`, icon: TrendingUp, color: "text-olive", bg: "bg-olive/10", change: "+12%" },
  ];

  // Chart data
  const categoryCount = myActivities.reduce((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryCount).map(([name, value]) => ({ name, value }));
  const pieColors = ["hsl(14, 65%, 48%)", "hsl(82, 35%, 38%)", "hsl(36, 75%, 52%)", "hsl(200, 50%, 50%)"];

  const bookingsByActivity = myActivities.map(a => ({
    name: a.title.substring(0, 15) + "...",
    bookings: myBookings.filter(b => b.activityId === a.id).length,
    revenue: myBookings.filter(b => b.activityId === a.id).reduce((sum, b) => sum + a.price * b.persons, 0),
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t("welcomeHost")} {user?.name} 👋</h1>
          <p className="text-muted-foreground mt-1">{t("activitySummary")}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-interactive p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                  {s.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}{s.label === t("revenueStat") && <span className="text-sm ms-1 font-normal text-muted-foreground">{t("currency")}</span>}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 p-6 rounded-3xl bg-primary/5 border border-primary/10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            {isRTL ? "إدارة المحتوى" : "Content Management"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => navigate("/host/add-activity")}
              className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-border hover:border-primary/50 hover:shadow-md transition-all group text-start"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">{t("addActivity")}</p>
                <p className="text-xs text-muted-foreground">Publish a new experience</p>
              </div>
            </button>
            
            <button 
              onClick={() => navigate("/host/add-product")}
              className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-border hover:border-accent/50 hover:shadow-md transition-all group text-start"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">{t("addProduct")}</p>
                <p className="text-xs text-muted-foreground">List a new product</p>
              </div>
            </button>

            {/* Blog publishing removed to maintain 4 canonical articles limit */}
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Bookings Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-interactive p-6"
          >
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              {isRTL ? "الحجوزات حسب النشاط" : "Bookings by Activity"}
            </h2>
            {bookingsByActivity.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={bookingsByActivity}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                  />
                  <Bar dataKey="bookings" fill="hsl(14, 65%, 48%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-muted-foreground text-sm">
                {t("noBookingsYet")}
              </div>
            )}
          </motion.div>

          {/* Category Pie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-interactive p-6"
          >
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Mountain className="w-5 h-5 text-accent" />
              {isRTL ? "توزيع الأنشطة" : "Activity Distribution"}
            </h2>
            {pieData.length > 0 ? (
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="50%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={4} dataKey="value">
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {pieData.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pieColors[i % pieColors.length] }} />
                      <span className="text-sm text-foreground">{item.name}</span>
                      <span className="text-xs text-muted-foreground">({item.value})</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
                {t("noActivitiesYet")}
              </div>
            )}
          </motion.div>
        </div>

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-interactive p-6"
        >
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-primary" />
            {t("recentBookings")}
          </h2>
          {myBookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <p className="text-muted-foreground">{t("noBookingsYet")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myBookings.slice(-5).reverse().map((b, i) => {
                const act = activities.find((a) => a.id === b.activityId);
                return (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-4 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    {act && (
                      <img src={act.image} alt="" className="w-12 h-12 rounded-lg object-cover" loading="lazy" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{act?.title}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.date}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{b.persons}</span>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="text-sm font-bold text-gradient">{act ? act.price * b.persons : 0} {t("currency")}</p>
                      <span className="text-[10px] text-accent font-medium">{b.status}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HostDashboard;
