import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { LayoutDashboard, Plus, List, ShoppingBag, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HostNav = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/host", label: t("dashboard"), icon: LayoutDashboard },
    { to: "/host/add-activity", label: t("addActivity"), icon: Plus },
    { to: "/host/manage", label: t("manageActivities"), icon: List },
    { to: "/host/add-product", label: t("addProduct"), icon: ShoppingBag },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-sidebar/95 backdrop-blur-xl border-b border-sidebar-border/50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/host" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-sm">
            <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-bold text-sm text-sidebar-foreground leading-none">{t("hostPanel")}</span>
            <span className="block text-[10px] text-sidebar-foreground/50 tracking-wider">EXPERIENCIA</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-0.5 bg-sidebar-accent/50 rounded-xl p-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"}`}
              >
                <l.icon className="w-4 h-4" />
                <span className="hidden lg:inline">{l.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <div className="w-px h-6 bg-sidebar-border" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-primary/20 border border-sidebar-primary/30 flex items-center justify-center text-sidebar-primary text-xs font-bold">
              {user?.name?.charAt(0)}
            </div>
            <span className="text-sm text-sidebar-foreground/70 hidden xl:inline">{user?.name}</span>
          </div>
          <button onClick={logout} className="flex items-center gap-1 text-sm text-sidebar-foreground/50 hover:text-destructive px-2 py-1.5 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button className="text-sidebar-foreground p-2 rounded-lg hover:bg-sidebar-accent transition-colors" onClick={() => setOpen(!open)}>
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
            className="md:hidden border-t border-sidebar-border bg-sidebar overflow-hidden"
          >
            <div className="p-3 space-y-1">
              {links.map((l) => {
                const active = location.pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active ? "bg-sidebar-primary/10 text-sidebar-primary" : "text-sidebar-foreground hover:bg-sidebar-accent"}`}
                  >
                    <l.icon className="w-5 h-5" />
                    {l.label}
                  </Link>
                );
              })}
              <div className="border-t border-sidebar-border my-2" />
              <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 text-sm w-full transition-colors">
                <LogOut className="w-4 h-4" />
                {t("logout")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default HostNav;
