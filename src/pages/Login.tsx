import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mountain, Users, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-tinghir.jpg";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"tourist" | "host">("tourist");
  const { login, register } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (register(name, email, password, role)) {
        toast.success(t("accountCreated"));
        navigate(role === "host" ? "/host" : "/");
      } else {
        toast.error(t("emailExists"));
      }
    } else {
      if (login(email, password)) {
        toast.success(t("welcomeToast"));
      } else {
        toast.error(t("invalidCredentials"));
      }
    }
  };

  const quickLogin = (type: "tourist" | "host") => {
    const creds = type === "tourist"
      ? { email: "tourist@test.com", password: "123456" }
      : { email: "host@test.com", password: "123456" };
    if (login(creds.email, creds.password)) {
      toast.success(t("welcomeToast"));
    }
  };

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Hero Side */}
      <div className="hidden lg:block lg:w-[55%] relative overflow-hidden">
        <img src={heroImg} alt="Tinghir" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 gradient-dark opacity-75" />
        <div className="absolute inset-0 pattern-moroccan opacity-30" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-lg"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground/90 text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              Experiencia Tinghir
            </div>
            <h1 className="font-display text-5xl xl:text-6xl text-primary-foreground mb-6 leading-tight">
              {t("discoverTinghir")}
            </h1>
            <p className="text-primary-foreground/70 text-lg leading-relaxed">
              {t("heroLoginSubtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 flex gap-8 text-primary-foreground/50 text-xs"
          >
            <span>🏔️ Todgha Gorge</span>
            <span>🏜️ Atlas Mountains</span>
            <span>🌴 Palm Oasis</span>
          </motion.div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative bg-background">
        <div className="absolute top-4 end-4 flex items-center gap-2">
          <LanguageSwitcher />
        </div>

        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-4 start-4">
          <span className="font-display text-xl text-gradient">Experiencia</span>
        </div>

        <motion.div
          initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Quick Access Buttons */}
          {!isRegister && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <p className="text-xs font-medium text-muted-foreground mb-3 text-center uppercase tracking-wider">
                {t("demoAccounts")}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => quickLogin("tourist")}
                  className="group relative overflow-hidden flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-border hover:border-primary bg-card hover:shadow-warm transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mountain className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-foreground">{t("tourist")}</span>
                  <span className="text-[10px] text-muted-foreground">tourist@test.com</span>
                </button>
                <button
                  onClick={() => quickLogin("host")}
                  className="group relative overflow-hidden flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-border hover:border-accent bg-card hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-olive-light/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-sm font-bold text-foreground">{t("host")}</span>
                  <span className="text-[10px] text-muted-foreground">host@test.com</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Divider */}
          {!isRegister && (
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 text-xs text-muted-foreground">
                  {isRTL ? "أو سجل الدخول بحسابك" : "or sign in with your account"}
                </span>
              </div>
            </div>
          )}

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-1">
              {isRegister ? t("register") : t("login")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isRegister ? t("joinUs") : t("welcomeBack")}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isRegister ? "register" : "login"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {isRegister && (
                <motion.input
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  type="text"
                  placeholder={t("fullName")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-styled"
                />
              )}

              <input
                type="email"
                placeholder={t("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-styled"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-styled pe-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {isRegister && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <p className="text-sm font-medium text-foreground">{t("accountType")}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole("tourist")}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${role === "tourist" ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-border text-muted-foreground hover:border-primary/40"}`}
                    >
                      <Mountain className="w-4 h-4" />
                      {t("tourist")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("host")}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${role === "host" ? "border-accent bg-accent/5 text-accent shadow-sm" : "border-border text-muted-foreground hover:border-accent/40"}`}
                    >
                      <Users className="w-4 h-4" />
                      {t("host")}
                    </button>
                  </div>
                </motion.div>
              )}

              <button type="submit" className="w-full btn-primary text-lg py-3.5">
                {isRegister ? t("createAccount") : t("enter")}
              </button>
            </motion.form>
          </AnimatePresence>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            {isRegister ? t("hasAccount") : t("noAccount")}{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-primary font-semibold hover:underline underline-offset-4"
            >
              {isRegister ? t("loginLink") : t("registerLink")}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
