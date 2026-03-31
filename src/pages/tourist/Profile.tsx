import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { motion } from "framer-motion";
import { User, Mail, Shield, Calendar, MapPin, Camera, Save, Star, Mountain, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/Footer";

const Profile = () => {
  const { user } = useAuth();
  const { t, lang, isRTL } = useLanguage();
  const { bookings, activities } = useData();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("+212 6XX-XXXXXX");
  const [bio, setBio] = useState(
    lang === "fr" ? "Passionné de voyages et d'aventures" :
    lang === "en" ? "Passionate about travel and adventure" :
    "شغوف بالسفر والمغامرات"
  );

  const userBookings = bookings.filter(b => b.userId === user?.id);
  const stats = [
    { icon: Calendar, label: lang === "fr" ? "Réservations" : lang === "en" ? "Bookings" : "الحجوزات", value: userBookings.length },
    { icon: Star, label: lang === "fr" ? "Avis donnés" : lang === "en" ? "Reviews given" : "التقييمات", value: 3 },
    { icon: Mountain, label: lang === "fr" ? "Activités" : lang === "en" ? "Activities" : "الأنشطة", value: activities.length },
  ];

  const handleSave = () => {
    toast.success(
      lang === "fr" ? "Profil mis à jour !" :
      lang === "en" ? "Profile updated!" :
      "تم تحديث الملف الشخصي!"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative h-48 gradient-hero overflow-hidden">
        <div className="absolute inset-0 pattern-moroccan opacity-20" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Avatar + Name */}
          <div className="card-interactive p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <div className="w-28 h-28 rounded-2xl gradient-hero flex items-center justify-center text-4xl font-bold text-primary-foreground shadow-warm">
                  {user?.name?.charAt(0)}
                </div>
                <button className="absolute -bottom-2 -end-2 w-8 h-8 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center md:text-start flex-1">
                <h1 className="text-2xl font-bold text-foreground">{user?.name}</h1>
                <p className="text-muted-foreground text-sm mt-1 flex items-center justify-center md:justify-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {lang === "fr" ? "Tinghir, Maroc" : lang === "en" ? "Tinghir, Morocco" : "تنغير، المغرب"}
                </p>
                <p className="text-muted-foreground text-sm mt-1 flex items-center justify-center md:justify-start gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-accent" />
                  {user?.role === "host"
                    ? (lang === "fr" ? "Fournisseur vérifié" : lang === "en" ? "Verified Provider" : "مقدم خدمة موثق")
                    : (lang === "fr" ? "Touriste vérifié" : lang === "en" ? "Verified Tourist" : "سائح موثق")}
                </p>
              </div>
              {/* Stats */}
              <div className="flex gap-6">
                {stats.map(s => (
                  <div key={s.label} className="text-center">
                    <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-xl font-bold text-foreground">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="card-interactive p-6 space-y-5">
              <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {lang === "fr" ? "Informations personnelles" : lang === "en" ? "Personal Information" : "المعلومات الشخصية"}
              </h2>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{t("fullName")}</label>
                <input value={name} onChange={e => setName(e.target.value)} className="input-styled" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{t("email")}</label>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{user?.email}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  {lang === "fr" ? "Téléphone" : lang === "en" ? "Phone" : "الهاتف"}
                </label>
                <input value={phone} onChange={e => setPhone(e.target.value)} className="input-styled" dir="ltr" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  {lang === "fr" ? "Bio" : lang === "en" ? "Bio" : "نبذة"}
                </label>
                <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="input-styled resize-none" />
              </div>
              <button onClick={handleSave} className="btn-primary flex items-center gap-2 w-full justify-center">
                <Save className="w-4 h-4" />
                {lang === "fr" ? "Enregistrer" : lang === "en" ? "Save Changes" : "حفظ التغييرات"}
              </button>
            </div>

            {/* Recent Bookings */}
            <div className="card-interactive p-6">
              <h2 className="font-bold text-lg text-foreground flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                {lang === "fr" ? "Réservations récentes" : lang === "en" ? "Recent Bookings" : "آخر الحجوزات"}
              </h2>
              {userBookings.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">{t("noBookings")}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userBookings.slice(0, 5).map(b => {
                    const act = activities.find(a => a.id === b.activityId);
                    return (
                      <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30">
                        {act?.images[0] && (
                          <img src={act.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{act?.title || t("deletedActivity")}</p>
                          <p className="text-xs text-muted-foreground">{b.date} · {b.persons} {t("persons")}</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">{t("confirmed")}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
