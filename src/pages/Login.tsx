import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, EyeOff, Mountain, Users, Shield, 
  CheckCircle2, Compass, LogIn, UserPlus, ChevronRight, Mail, RefreshCw, ArrowLeft
} from "lucide-react";
import heroImg from "@/assets/hero-tinghir.jpg";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const DigitInput = ({ value, onChange, onBack, index, total, isRTL }: { value: string, onChange: (v: string) => void, onBack: () => void, index: number, total: number, isRTL: boolean }) => {
  const inputRef = (el: HTMLInputElement | null) => {
    if (el && value === "" && index > 0 && index === total - 1) {
      // Just a placeholder for ref logic handled in parent
    }
  };

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

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [role, setRole] = useState<"tourist" | "host" | "superAdmin">("tourist");
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  
  const { user, login, register, verifyOTP, resendOTP } = useAuth();
  const { t, isRTL, lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initialRole = searchParams.get("role");
    if (initialRole === "host" || initialRole === "tourist") {
      setRole(initialRole as any);
      // If we come from Welcome with a role, we might want to start on the register tab
      setIsRegister(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (user && !isVerifying) {
      const path = {
        host: "/host",
        superAdmin: "/admin",
        tourist: "/"
      }[user.role] || "/";
      navigate(path, { replace: true });
    }
  }, [user, navigate, isVerifying]);

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

  const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return toast.error(t("invalidEmail"));
    if (isRegister && password.length < 6) return toast.error(t("passwordTooShort"));
    if (isRegister && !acceptTerms) {
      toast.error(t("acceptTermsRequired"));
      return;
    }

    setIsLoadingForm(true);
    try {
      if (isRegister) {
        const res = await register(name, email, password, role);
        if (res.requiresVerification) {
            setIsVerifying(true);
            setResendTimer(30);
            toast.success(t("codeSent"));
            setIsLoadingForm(false);
            return;
        }
        toast.success(t("accountCreated"));
      } else {
        const res = await login(email, password);
        if (res.requiresVerification) {
            setIsVerifying(true);
            setResendTimer(30);
            toast.error(t("otpRequired"));
            setIsLoadingForm(false);
            return;
        }
        toast.success(t("welcomeToast"));
      }
    } catch (err: any) {
      toast.error(err.toString());
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpArray.join("");
    if (otp.length < 6) return toast.error(t("otpRequired"));
    setIsLoadingForm(true);
    try {
      await verifyOTP(email, otp);
      toast.success(t("welcomeToast"));
    } catch (err: any) {
      toast.error(err.toString());
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    try {
        await resendOTP(email);
        setResendTimer(60);
        toast.success(t("codeSent"));
    } catch (err: any) {
        toast.error(err.toString());
    }
  };

  const roles = [
    { id: "tourist", icon: Mountain, color: "text-primary", bg: "bg-primary/10", active: "border-primary ring-1 ring-primary bg-primary/5", labelKey: "tourist" },
    { id: "host", icon: Users, color: "text-primary", bg: "bg-primary/10", active: "border-primary ring-1 ring-primary bg-primary/5", labelKey: "host" },
  ];

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
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-black/40 to-black/80 z-10 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10" />

        {/* Top Logo */}
        <div className="relative z-20 p-12 w-full flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,107,53,0.3)]">
            <Compass className="w-7 h-7" />
          </div>
          <div className="text-white">
            <span className="font-black text-3xl tracking-tight leading-none block relative top-1">Experiencia</span>
            <span className="block text-[11px] opacity-70 uppercase tracking-[0.3em] font-bold text-primary">Tinghir</span>
          </div>
        </div>

        <div className="flex-1" />

        {/* Footer Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative z-20 p-12 flex gap-10 text-white/70 text-[11px] font-bold uppercase tracking-widest"
        >
          <span className="flex items-center gap-2 transition-colors hover:text-white"><CheckCircle2 className="w-4 h-4 text-primary" /> {t("verifiedHosts")}</span>
          <span className="flex items-center gap-2 transition-colors hover:text-white"><CheckCircle2 className="w-4 h-4 text-primary" /> {t("localImpact")}</span>
          <span className="flex items-center gap-2 transition-colors hover:text-white"><CheckCircle2 className="w-4 h-4 text-primary" /> {t("support247")}</span>
        </motion.div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-[480px] xl:w-[560px] min-h-screen flex flex-col relative bg-background/95 backdrop-blur-md shadow-2xl border-s border-border/40 z-30 overflow-y-auto">
        <div className="absolute top-6 end-6 z-40">
          <LanguageSwitcher />
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-10 relative">
          
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-8 start-8 p-2 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-primary transition-all group z-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <ArrowLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${isRTL ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
          </button>

          {/* Always Visible Centered Logo */}
          <div className="flex flex-col items-center gap-3 mb-10 mx-auto transition-all duration-500">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30 shrink-0">
              <Compass className="w-7 h-7" />
            </div>
            <div className="text-center">
              <span className="font-black text-2xl tracking-tight leading-none block">Experiencia</span>
              <span className="block text-[10px] opacity-70 uppercase tracking-[0.3em] font-bold text-primary px-0.5">Tinghir</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isVerifying ? (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-sm mx-auto"
              >
                <button 
                   onClick={() => setIsVerifying(false)}
                   className="mb-8 flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
                >
                   <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                   {t("backToLogin")}
                </button>
                <div className="mb-10 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-black mb-3 text-foreground tracking-tight">{t("verifyEmail")}</h2>
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                    {t("verifySubtitle")} <span className="font-bold text-foreground">{email}</span>.
                  </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-8">
                  <div className="flex justify-between gap-2" dir="ltr">
                    {otpArray.map((v, i) => (
                      <DigitInput
                        key={i}
                        index={i}
                        total={6}
                        value={v}
                        onChange={(val) => handleOtpChange(val, i)}
                        onBack={() => handleOtpBack(i)}
                        isRTL={isRTL}
                      />
                    ))}
                  </div>
                  
                  <button
                    disabled={isLoadingForm || otpArray.join("").length < 6}
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3 font-black shadow-[0_4px_14px_rgba(255,107,53,0.3)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.45)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {isLoadingForm ? (
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
                    onClick={handleResendOTP} 
                    className="text-primary font-bold hover:underline inline-flex items-center gap-1 disabled:opacity-50 disabled:no-underline"
                  >
                    {resendTimer > 0 ? t("resendIn").replace("{s}", resendTimer.toString()) : t("resendCode")}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-sm mx-auto"
              >
                {/* Header */}
                <div className="mb-10">
                  <h2 className="text-3xl font-black mb-2 text-foreground tracking-tight">
                    {isRegister ? t("register") : t("login")}
                  </h2>
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                    {isRegister ? t("joinCommunity") : t("loginSubtitle")}
                  </p>
                </div>

                {/* Role choice removed as requested */}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <AnimatePresence mode="popLayout">
                    {isRegister && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1.5"
                      >
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest ms-1">
                          {t("fullName")}
                        </label>
                        <input
                          type="text"
                          placeholder={t("fullName")}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-secondary/30 border border-border/80 rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-medium"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest ms-1">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-secondary/30 border border-border/80 rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5 relative group">
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest ms-1">
                      {t("password")}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-secondary/30 border border-border/80 rounded-xl ps-4 pe-11 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-medium font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute end-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="popLayout">
                    {isRegister && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-start gap-3 pt-2"
                      >
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            className="w-4 h-4 mt-1 border-border rounded accent-primary cursor-pointer transition-colors"
                          />
                        </div>
                        <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer font-medium selection:bg-primary/20">
                          {t("agreeToTerms")} <Link to="/terms" className="text-primary font-bold hover:underline transition-all">{t("termsLink")}</Link> {t("privacyAnd")}
                        </label>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    disabled={isLoadingForm}
                    type="submit"
                    className="w-full mt-4 bg-primary hover:bg-primary/90 text-white rounded-xl py-3 font-black shadow-[0_4px_14px_rgba(255,107,53,0.3)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.45)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {isLoadingForm ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="tracking-wide uppercase text-sm">
                          {isRegister ? t("createAccount") : t("enter")}
                        </span>
                        <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8">
                  {/* Or Continue With Divider */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border/60" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase">
                      <span className="bg-background px-4 text-muted-foreground tracking-[0.2em] font-bold italic">
                        {t("continueWith")}
                      </span>
                    </div>
                  </div>

                  {/* Social Icons Row - Fixed for LTR order only to prevent brand logo reversal */}
                  <div className="flex items-center justify-center gap-4 mb-10" dir="ltr">
                    {[
                      { 
                        id: 'apple', 
                        icon: (
                          <svg className="w-5 h-5 fill-foreground" viewBox="0 0 24 24">
                            <path d="M17.05 20.28c-.96.95-2.04 1.48-3.17 1.48-1.58 0-2.04-.95-3.87-.95-1.85 0-2.4.93-3.88.93-1.04 0-2.16-.5-3.17-1.48C1.3 18.66.45 15.65.45 12.83c0-4.66 2.87-7.1 5.6-7.1 1.42 0 2.5.87 3.35.87.82 0 2.1-.9 3.75-.9 1.42 0 2.7.53 3.65 1.48-2.65 1.55-2.22 5.2.45 6.45-1 2.37-2.3 4.98-3.2 6.65zM12.03 5.43c-.1-.85.3-2.1 1.07-3.05.8-.95 2.1-1.6 3.1-1.63.1.9-.3 2.12-1.07 3s-2.05 1.67-3.1 1.68z"/>
                          </svg>
                        )
                      },
                      { 
                        id: 'google', 
                        icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        )
                      },
                      { 
                        id: 'facebook', 
                        icon: (
                          <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        )
                      }
                    ].map((s) => (
                      <motion.button
                        key={s.id}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toast.info(`${s.id.charAt(0).toUpperCase() + s.id.slice(1)} login coming soon!`)}
                        className="w-14 h-12 flex items-center justify-center rounded-xl bg-secondary/40 border border-border/60 hover:border-primary/40 hover:bg-secondary/60 transition-all shadow-sm"
                      >
                        {s.icon}
                      </motion.button>
                    ))}
                  </div>

                  <p className="text-center text-sm text-muted-foreground font-medium">
                    {isRegister ? t("hasAccount") : t("noAccount")}
                    {" "}
                    <button onClick={() => setIsRegister(!isRegister)} className="text-primary font-black uppercase tracking-wider text-xs hover:underline transition-all ms-1">
                      {isRegister ? t("loginLink") : t("registerLink")}
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
