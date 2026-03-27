import { useLanguage } from "@/contexts/LanguageContext";
import { Compass, Heart } from "lucide-react";

const Footer = () => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-foreground text-primary-foreground/80 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display text-xl text-primary-foreground">Experiencia Tinghir</span>
              <p className="text-xs text-primary-foreground/50">
                {isRTL ? "اكتشف جمال المغرب" : "Discover Morocco's beauty"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-primary-foreground/50">
            {isRTL ? "صُنع بـ" : "Made with"}
            <Heart className="w-3.5 h-3.5 text-primary fill-primary mx-1" />
            {isRTL ? "في تنغير" : "in Tinghir"}
          </div>

          <p className="text-xs text-primary-foreground/40">
            © 2026 Experiencia Tinghir. {isRTL ? "جميع الحقوق محفوظة" : "All rights reserved"}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
