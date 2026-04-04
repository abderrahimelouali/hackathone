import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Users, Settings, Database, Activity, FileText, Map as MapIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: "Total Users", value: "1,248", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Bookings", value: "324", icon: BarChart3, color: "text-green-600", bg: "bg-green-50" },
    { label: "Activities", value: "84", icon: Activity, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Revenue", value: "$12.4k", icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-muted/30 pb-20 pt-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 p-10 bg-gradient-to-r from-red-600 to-red-400 rounded-3xl text-white shadow-xl shadow-red-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-black mb-1">SuperAdmin Dashboard</h1>
              <p className="text-white/80 font-medium">System Control & Management Center</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-1">Active User</p>
            <p className="text-xl font-bold">{user?.name}</p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-8 rounded-[2rem] border border-border/50 shadow-sm hover:shadow-card-hover transition-all group"
            >
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Control Center */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-card rounded-[2rem] border border-border/50 p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                <Database className="w-6 h-6 text-red-600" />
                System Maintenance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center gap-4 p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-red-500/50 hover:bg-red-50 transition-all text-left group">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:text-red-500">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">Generate Reports</p>
                    <p className="text-xs text-muted-foreground">Download full data exports</p>
                  </div>
                </button>
                <button className="flex items-center gap-4 p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-red-500/50 hover:bg-red-50 transition-all text-left group">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:text-red-500">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">Manage Roles</p>
                    <p className="text-xs text-muted-foreground">Elevate or restricted users</p>
                  </div>
                </button>
                <button className="flex items-center gap-4 p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-red-500/50 hover:bg-red-50 transition-all text-left group">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:text-red-500">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">Global Settings</p>
                    <p className="text-xs text-muted-foreground">Modify platform parameters</p>
                  </div>
                </button>
                <button 
                  onClick={() => navigate("/admin/locations")}
                  className="flex items-center gap-4 p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-red-500/50 hover:bg-red-50 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:text-red-500">
                    <MapIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">Manage Activity Locations</p>
                    <p className="text-xs text-muted-foreground">Update coordinates on interactive map</p>
                  </div>
                </button>
              </div>
            </section>
          </div>

          <aside>
            <section className="bg-card rounded-[2rem] border border-border/50 p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-3">System Health</h2>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Server Statistics</p>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-bold">API Gateway</span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">99.9% Uptime</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-bold">MongoDB Cluster</span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Low Latency</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-sm font-bold">Storage Bucket</span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">84% Full</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
