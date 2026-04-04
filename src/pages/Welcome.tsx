import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Compass, Users, Mountain, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import heroImg from "@/assets/hero-tinghir.jpg";

const Welcome = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleChoice = (role: "tourist" | "host") => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background overflow-hidden selection:bg-primary/20">
      {/* Floating Language Switcher */}
      <div className="fixed top-6 end-6 z-50">
        <LanguageSwitcher />
      </div>

      {/* Left Content Side */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-16 lg:py-24 z-20 bg-background/80 backdrop-blur-sm lg:backdrop-blur-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto lg:mx-0 w-full"
        >
          {/* Logo Section */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <Compass className="w-7 h-7" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight leading-none block">Experiencia</span>
              <span className="block text-[10px] opacity-70 uppercase tracking-[0.3em] font-bold text-primary">Tinghir</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-black mb-4 text-foreground tracking-tight leading-[1.1]">
            {t("welcomeTitle")}
          </h1>
          <p className="text-muted-foreground text-base mb-10 font-medium leading-relaxed max-w-[340px]">
            {t("welcomeSubtitle")}
          </p>

          {/* Role Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleChoice("tourist")}
              className="w-full group relative flex items-center gap-4 p-4 px-6 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 text-start"
            >
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Mountain className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="block text-base font-black">{t("imTourist")}</span>
              </div>
              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleChoice("host")}
              className="w-full group relative flex items-center gap-4 p-4 px-6 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/80 transition-all text-start"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <span className="block text-base font-black text-foreground">{t("imHost")}</span>
              </div>
              <ArrowRight className={`w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </motion.button>
          </div>

        </motion.div>
      </div>

      {/* Right Hero Image (Laptop only) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="hidden lg:block lg:flex-1 relative overflow-hidden bg-black"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          src={heroImg} 
          alt="Todgha Gorges" 
          className="w-full h-full object-cover opacity-80"
        />
        
        {/* Attribution / Location Overlay */}
        <div className="absolute bottom-12 right-12 z-20 text-white text-end rtl:left-12 rtl:right-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] font-black mb-2 opacity-60">Location</p>
          <h3 className="text-2xl font-black tracking-tight">Todgha Gorges</h3>
          <p className="text-sm font-medium opacity-80 text-primary">Tinghir, Morocco</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;
