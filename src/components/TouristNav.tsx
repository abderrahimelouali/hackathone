import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Home, Mountain, BedDouble, Car, ShoppingBag, CalendarCheck, LogOut, Menu, X, Compass } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TouristNav = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("activities"), icon: Mountain },
    { to: "/accommodation", label: t("accommodation"), icon: BedDouble },
    { to: "/transport", label: t("transport"), icon: Car },
    { to: "/marketplace", label: t("marketplace"), icon: ShoppingBag },
    { to: "/my-bookings", label: t("myBookings"), icon: CalendarCheck },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-sm group-hover:shadow-warm transition-shadow">
            <Compass className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-lg text-gradient leading-none">Experiencia</span>
            <span className="block text-[10px] text-muted-foreground -mt-0.5 tracking-wider">TINGHIR</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-0.5 bg-muted/50 rounded-xl p-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <l.icon className="w-4 h-4" />
                <span className="hidden lg:inline">{l.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-primary-foreground text-xs font-bold">
              {user?.name?.charAt(0)}
            </div>
            <span className="text-sm font-medium text-foreground hidden xl:inline">{user?.name}</span>
          </div>
          <button onClick={logout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive px-2 py-1.5 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-muted transition-colors">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-card overflow-hidden"
          >
            <div className="p-3 space-y-1">
              {links.map((l) => {
                const active = location.pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"}`}
                  >
                    <l.icon className="w-5 h-5" />
                    {l.label}
                  </Link>
                );
              })}
              <div className="border-t border-border my-2" />
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <button onClick={logout} className="flex items-center gap-1 text-sm text-destructive hover:bg-destructive/10 px-3 py-2 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                  {t("logout")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default TouristNav;
