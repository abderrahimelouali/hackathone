import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Mountain, BedDouble, Car, ShoppingBag, CalendarCheck, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "الأنشطة", icon: Mountain },
  { to: "/accommodation", label: "الإقامة", icon: BedDouble },
  { to: "/transport", label: "النقل", icon: Car },
  { to: "/marketplace", label: "السوق", icon: ShoppingBag },
  { to: "/my-bookings", label: "حجوزاتي", icon: CalendarCheck },
];

const TouristNav = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center">
            <Home className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-gradient">Experiencia Tinghir</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              >
                <l.icon className="w-4 h-4" />
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="text-sm text-muted-foreground">مرحباً، {user?.name}</span>
          <button onClick={logout} className="flex items-center gap-1 text-sm text-destructive hover:bg-destructive/10 px-3 py-2 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            خروج
          </button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted text-sm font-medium">
              <l.icon className="w-4 h-4" />
              {l.label}
            </Link>
          ))}
          <button onClick={logout} className="flex items-center gap-3 px-3 py-3 rounded-lg text-destructive hover:bg-destructive/10 text-sm w-full">
            <LogOut className="w-4 h-4" />
            خروج
          </button>
        </div>
      )}
    </nav>
  );
};

export default TouristNav;
