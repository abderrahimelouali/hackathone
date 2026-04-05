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

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [role, setRole] = useState<"tourist" | "host" | "superAdmin">("tourist");
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  
  const { user, login, register } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initialRole = searchParams.get("role");
    if (initialRole === "host" || initialRole === "tourist") {
      setRole(initialRole as any);
      setIsRegister(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      const path = {
        host: "/host",
        superAdmin: "/admin",
        tourist: "/"
      }[user.role] || "/";
      navigate(path, { replace: true });
    }
  }, [user, navigate]);

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
            navigate(`/verify-email?email=${encodeURIComponent(email)}`);
            return;
        }
        toast.success(t("accountCreated"));
      } else {
        const res = await login(email, password);
        if (res.requiresVerification) {
            navigate(`/verify-email?email=${encodeURIComponent(email)}`);
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
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,107,53,0.3)]">
            <Compass className="w-7 h-7" />
          </div>
          <div className="text-white">
            <span className="font-black text-3xl tracking-tight leading-none block relative top-1">Experiencia</span>
            <span className="block text-[11px] opacity-70 uppercase tracking-[0.3em] font-bold text-primary">Tinghir</span>
          </div>
        </div>

        <div className="flex-1" />

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
          <button
            onClick={() => navigate("/")}
            className="absolute top-8 start-8 p-2 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-primary transition-all group z-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <ArrowLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex flex-col items-center gap-3 mb-10 mx-auto">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30">
              <Compass className="w-7 h-7" />
            </div>
            <div className="text-center">
              <span className="font-black text-2xl tracking-tight leading-none block">Experiencia</span>
              <span className="block text-[10px] opacity-70 uppercase tracking-[0.3em] font-bold text-primary px-0.5">Tinghir</span>
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-black mb-2 text-foreground tracking-tight">
                {isRegister ? t("register") : t("login")}
              </h2>
              <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                {isRegister ? t("joinCommunity") : t("loginSubtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="popLayout">
                {isRegister && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1.5"
                  >
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {t("fullName")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("fullName")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-secondary/30 border border-border/80 rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {t("email")}
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-secondary/30 border border-border/80 rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5 relative group">
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {t("password")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-secondary/30 border border-border/80 rounded-xl ps-4 pe-11 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium"
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

              {isRegister && (
                <div className="flex items-start gap-3 pt-2">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 mt-1 border-border rounded accent-primary cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer font-medium italic">
                    {t("agreeToTerms")} <Link to="/terms" className="text-primary font-bold hover:underline transition-all">{t("termsLink")}</Link>
                  </label>
                </div>
              )}

              <button
                disabled={isLoadingForm}
                type="submit"
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-white rounded-xl py-3 font-black shadow-[0_4px_14px_rgba(255,107,53,0.3)] transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
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

              <p className="text-center text-sm text-muted-foreground font-medium">
                {isRegister ? t("hasAccount") : t("noAccount")}
                {" "}
                <button onClick={() => setIsRegister(!isRegister)} className="text-primary font-black uppercase tracking-wider text-xs hover:underline ms-1">
                  {isRegister ? t("loginLink") : t("registerLink")}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
