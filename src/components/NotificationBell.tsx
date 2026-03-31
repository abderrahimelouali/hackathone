import { useState } from "react";
import { Bell, X, CalendarCheck, ShoppingBag, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const mockNotifications = [
  { id: "1", icon: CalendarCheck, color: "text-accent", titleAr: "تم تأكيد حجزك", titleFr: "Réservation confirmée", titleEn: "Booking confirmed", timeAr: "منذ 5 دقائق", timeFr: "Il y a 5 min", timeEn: "5 min ago" },
  { id: "2", icon: Star, color: "text-gold", titleAr: "تقييم جديد لنشاطك", titleFr: "Nouvel avis", titleEn: "New review", timeAr: "منذ ساعة", timeFr: "Il y a 1h", timeEn: "1h ago" },
  { id: "3", icon: ShoppingBag, color: "text-primary", titleAr: "طلب جديد من السوق", titleFr: "Nouvelle commande", titleEn: "New order", timeAr: "منذ 3 ساعات", timeFr: "Il y a 3h", timeEn: "3h ago" },
];

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();

  const getTitle = (n: typeof mockNotifications[0]) => lang === "fr" ? n.titleFr : lang === "en" ? n.titleEn : n.titleAr;
  const getTime = (n: typeof mockNotifications[0]) => lang === "fr" ? n.timeFr : lang === "en" ? n.timeEn : n.timeAr;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 rounded-xl bg-muted hover:bg-secondary flex items-center justify-center transition-colors"
      >
        <Bell className="w-4 h-4 text-muted-foreground" />
        <span className="absolute -top-0.5 -end-0.5 w-4 h-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center font-bold">
          3
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="absolute top-full mt-2 end-0 w-72 bg-card rounded-2xl shadow-card-hover border border-border/50 z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <h3 className="font-bold text-sm text-foreground">
                  {lang === "fr" ? "Notifications" : lang === "en" ? "Notifications" : "الإشعارات"}
                </h3>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border/30 last:border-0">
                    <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 ${n.color}`}>
                      <n.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{getTitle(n)}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{getTime(n)}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
