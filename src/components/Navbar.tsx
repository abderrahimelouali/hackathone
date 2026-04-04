import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
// // import NotificationBell from "@/components/NotificationBell";
import { 
  BedDouble, Car, ShoppingBag, CalendarCheck, LogOut, Menu, X, Compass, 
  MapPin, BookOpen, Mountain, User, LayoutDashboard, PlusCircle, ListTodo,
  ShieldCheck, Map as MapIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { t, lang, isRTL } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinks = () => {
    if (!user) return [];

    switch (user.role) {
      case "host":
        return [
          { to: "/host", label: t("dashboard"), icon: LayoutDashboard },
          { to: "/host/manage", label: t("manageActivities"), icon: ListTodo },
          { to: "/host/add-activity", label: t("addActivity"), icon: PlusCircle },
          { to: "/host/add-blog", label: t("addBlogPost"), icon: BookOpen },
          { to: "/host/add-product", label: t("addProduct") || "Add Product", icon: ShoppingBag },
        ];
      case "superAdmin":
        return [
          { to: "/admin", label: t("overview") || "Overview", icon: ShieldCheck },
          { to: "/admin/users", label: t("users") || "Users", icon: User },
        ];
      default: // tourist
        return [
          { to: "/", label: t("activities"), icon: Mountain },
          // { to: "/map", label: lang === "fr" ? "Carte" : lang === "en" ? "Map" : "الخريطة", icon: MapPin },
          { to: "/accommodation", label: t("accommodation"), icon: BedDouble },
          { to: "/transport", label: t("transport"), icon: Car },
          { to: "/marketplace", label: t("marketplace"), icon: ShoppingBag },
          { to: "/blog", label: lang === "fr" ? "Blog" : lang === "en" ? "Blog" : "المدونة", icon: BookOpen },
        ];
    }
  };

  const links = getLinks();
  const activeColor = user?.role === "host" ? "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)" : 
                      user?.role === "superAdmin" ? "linear-gradient(135deg, #D32F2F 0%, #F44336 100%)" :
                      "linear-gradient(135deg, #FF6B35 0%, #FFA726 100%)";

  return (
    <>
      <nav
        dir={isRTL ? "rtl" : "ltr"}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-2xl border-b border-border shadow-sm"
            : "bg-background/80 backdrop-blur-xl border-b border-border/40"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link to={user?.role === "host" ? "/host" : user?.role === "superAdmin" ? "/admin" : "/"} className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-glow transition-all duration-300 group-hover:scale-105"
              style={{ background: activeColor }}
            >
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-foreground leading-none tracking-tight">Experiencia</span>
            </div>
          </Link>

          {/* Desktop Nav - Hidden on Mobile/Tablet */}
          <div className="hidden xl:flex items-center gap-1 bg-muted/40 rounded-2xl p-1.5 border border-border/50 backdrop-blur-sm">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wide transition-all duration-200 ${
                    active
                      ? "text-white shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  style={active ? { background: activeColor } : {}}
                >
                  <l.icon className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">{l.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Universal Actions (Desktop & Mobile) */}
          <div className="flex items-center gap-1.5 md:gap-3">
            <div className="hidden sm:flex items-center gap-1.5">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            
            {user ? (
              <div className="flex items-center gap-1.5 md:gap-3">
                {/* Mobile Quick Actions: Theme/Lang */}
                <div className="xl:hidden flex items-center gap-1.5">
                  <div className="sm:hidden flex items-center gap-1">
                    <ThemeToggle />
                    <LanguageSwitcher />
                  </div>
                </div>

                <div className="w-px h-6 bg-border mx-1 hidden xl:block" />
                
                {/* User Profile / Account */}
                <div className="flex items-center gap-2 hover:bg-muted/50 p-1 md:px-2 md:py-1.5 rounded-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-border/40">
                  <div
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white text-xs font-black shadow-glow uppercase shrink-0 transition-transform group-hover:scale-105"
                    style={{ background: activeColor }}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden md:flex flex-col">
                    <span className="text-xs font-bold text-foreground leading-none">{user.name}</span>
                    <span className="text-[9px] text-muted-foreground uppercase font-black tracking-tighter opacity-60">{user.role}</span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                  title={t("logout")}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="sm:hidden flex items-center gap-1">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
                <Link 
                  to="/login"
                  className="bg-primary text-white text-[11px] font-black uppercase px-4 py-2.5 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                >
                  {t("login")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation - Compact App Tab Bar */}
      <div 
        className="xl:hidden fixed bottom-1 left-3 right-3 z-[60] pb-safe print:hidden"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="bg-background/80 backdrop-blur-3xl border border-border/40 rounded-2xl md:rounded-3xl p-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-around gap-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative flex flex-col items-center justify-center min-w-[54px] py-1.5 rounded-xl transition-all duration-300 ${
                  active
                    ? "text-primary scale-105"
                    : "text-muted-foreground hover:text-foreground active:scale-95"
                }`}
              >
                <l.icon className={`${active ? "w-4.5 h-4.5" : "w-4 h-4"} mb-0.5 transition-all duration-300 ${active ? 'text-primary' : ''}`} />
                <span className={`text-[8.5px] font-black uppercase tracking-tighter text-center leading-none transition-all duration-300 ${active ? 'text-primary' : 'opacity-70'}`}>
                  {l.label}
                </span>
                {active && (
                   <motion.div
                    layoutId="activeTabMobile"
                    className="absolute -bottom-0.5 w-1 h-1 bg-primary rounded-full shadow-primary shadow-sm"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                   />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
