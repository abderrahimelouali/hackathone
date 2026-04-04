import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Compass, Heart, Mail, Phone, MapPin, 
  Shield, Info, Link as LinkIcon 
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();

  const activeColor = user?.role === "host" ? "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)" : 
                      user?.role === "superAdmin" ? "linear-gradient(135deg, #D32F2F 0%, #F44336 100%)" :
                      "linear-gradient(135deg, #FF6B35 0%, #FFA726 100%)";

  return (
    <footer className="bg-foreground text-primary-foreground/80 mt-auto border-t border-border/10 hidden md:block">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Branding */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center shadow-glow ring-1 ring-white/10"
                style={{ background: activeColor }}
              >
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                 <span className="font-black text-xl text-white tracking-tight leading-none block">Experiencia</span>
              </div>
            </div>
          </div>

          {/* Column 2: Discover */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">{t("footerDiscover")}</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "activities", to: "/" },
                { label: "marketplace", to: "/marketplace" },
                { label: "accommodation", to: "/accommodation" },
                { label: "transport", to: "/transport" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm hover:text-primary transition-colors flex items-center gap-2 group">
                    <div className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                    {t(link.label as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">{t("footerCompany")}</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "aboutUs", icon: Info },
                { label: "termsConditions", icon: Shield, to: "/terms" },
                { label: "privacyPolicy", icon: LinkIcon },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to || "#"} className="text-sm hover:text-primary transition-colors flex items-center gap-2 group">
                    <link.icon className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    {t(link.label as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">{t("footerContact")}</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">{t("emailLabel")}</span>
                  <a href="mailto:experience@tinghir.com" className="text-sm hover:text-primary transition-colors">experience@tinghir.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">{t("phoneLabel")}</span>
                  <a href="tel:+212600000000" className="text-sm hover:text-primary transition-colors">+(212) 6XX XX-XXXX</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">{t("addressLabel")}</span>
                  <span className="text-sm font-medium">{t("tinghirMorocco")}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-center">
          <p className="text-[10px] text-white/20 uppercase tracking-widest font-black">
            © 2026 Experiencia Tinghir. {isRTL ? "جميع الحقوق محفوظة" : "All Rights Reserved"}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
