import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Compass, ArrowLeft } from "lucide-react";
import heroImg from "@/assets/hero-tinghir.jpg";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const DigitInput = ({ value, onChange, onBack, index }) => {
  return (
    <input
      type="text"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      onKeyDown={(e) => e.key === "Backspace" && !value && onBack()}
      className="w-10 h-12 md:w-12 md:h-14 bg-secondary/30 border border-border/80 rounded-xl text-center text-xl font-black text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all selection:bg-transparent"
      id={`otp-${index}`}
    />
  );
};

const VerifyEmail = () => {
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  
  const { verifyOTP, resendOTP } = useAuth();
  const { t, isRTL, lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (val: string, i: number) => {
    const newOtp = [...otpArray];
    newOtp[i] = val.slice(-1);
    setOtpArray(newOtp);
    if (val && i < 5) {
      document.getElementById(`otp-${i + 1}`)?.focus();
    }
  };

  const handleOtpBack = (i: number) => {
    if (i > 0) {
      document.getElementById(`otp-${i - 1}`)?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpArray.join("");
    if (otp.length < 6) return toast.error(t("otpRequired"));
    
    setIsLoading(true);
    try {
      await verifyOTP(email, otp);
      toast.success(t("welcomeToast"));
      navigate("/");
    } catch (err: any) {
      toast.error(err.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    try {
      await resendOTP(email);
      setResendTimer(60);
      toast.success(t("codeSent"));
    } catch (err: any) {
      toast.error(err.toString());
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background selection:bg-primary/20 overflow-hidden relative">
      {/* Cinematic Hero */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-black flex-col justify-between">
        <motion.div
           initial={{ scale: 1.05 }}
           animate={{ scale: 1 }}
           transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
           className="absolute inset-0 z-0"
        >
          <img src={heroImg} alt="Tinghir" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-black/40 to-black/80 z-10 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10" />

        <div className="relative z-20 p-12 w-full flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white">
            <Compass className="w-7 h-7" />
          </div>
          <div className="text-white">
            <span className="font-black text-3xl tracking-tight leading-none block relative top-1">Experiencia</span>
            <span className="block text-[11px] opacity-70 uppercase tracking-[0.3em] font-bold text-primary">Tinghir</span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-[480px] xl:w-[560px] min-h-screen flex flex-col relative bg-background/95 backdrop-blur-md shadow-2xl border-s border-border/40 z-30">
        <div className="absolute top-6 end-6 z-40">
          <LanguageSwitcher />
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-10 relative">
          <button
            onClick={() => navigate("/login")}
            className="absolute top-8 start-8 p-2 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-primary transition-all group z-50"
          >
            <ArrowLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${isRTL ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
          </button>

          <div className="flex flex-col items-center gap-3 mb-10 mx-auto">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30">
              <Compass className="w-7 h-7" />
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-black mb-3 text-foreground tracking-tight">{t("verifyEmail")}</h2>
            <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-10">
              {t("verifySubtitle")} <span className="font-bold text-foreground">{email}</span>.
            </p>

            <form onSubmit={handleVerify} className="space-y-8">
              <div className="flex justify-between gap-2" dir="ltr">
                {otpArray.map((v, i) => (
                  <DigitInput
                    key={i}
                    index={i}
                    value={v}
                    onChange={(val) => handleOtpChange(val, i)}
                    onBack={() => handleOtpBack(i)}
                  />
                ))}
              </div>
              
              <button
                disabled={isLoading || otpArray.join("").length < 6}
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3 font-black shadow-[0_4px_14px_rgba(255,107,53,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  t("verifyBtn")
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-muted-foreground">
              {lang === "ar" ? "لم يصلك الرمز؟" : lang === "fr" ? "Pas reçu de code ?" : "Didn't receive the code?"}{" "}
              <button 
                disabled={resendTimer > 0}
                onClick={handleResend} 
                className="text-primary font-bold hover:underline disabled:opacity-50"
              >
                {resendTimer > 0 ? t("resendIn").replace("{s}", resendTimer.toString()) : t("resendCode")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
