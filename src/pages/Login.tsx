import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import heroImg from "@/assets/hero-tinghir.jpg";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"tourist" | "host">("tourist");
  const { login, register } = useAuth();
  const { t } = useLanguage();
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

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src={heroImg} alt="Tinghir" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-foreground/80 to-foreground/40 flex items-center justify-center p-12">
          <div className="text-center">
            <h1 className="font-display text-5xl text-primary-foreground mb-4">Experiencia Tinghir</h1>
            <p className="text-primary-foreground/80 text-lg max-w-md">{t("heroLoginSubtitle")}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute top-4 end-4">
          <LanguageSwitcher />
        </div>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gradient mb-2">
              {isRegister ? t("register") : t("login")}
            </h2>
            <p className="text-muted-foreground">
              {isRegister ? t("joinUs") : t("welcomeBack")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <input
                type="text"
                placeholder={t("fullName")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
            <input
              type="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {isRegister && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">{t("accountType")}</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("tourist")}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${role === "tourist" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
                  >
                    {t("tourist")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("host")}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${role === "host" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
                  >
                    {t("host")}
                  </button>
                </div>
              </div>
            )}

            <button type="submit" className="w-full py-3 rounded-lg gradient-hero text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity">
              {isRegister ? t("createAccount") : t("enter")}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            {isRegister ? t("hasAccount") : t("noAccount")}{" "}
            <button onClick={() => setIsRegister(!isRegister)} className="text-primary font-medium hover:underline">
              {isRegister ? t("loginLink") : t("registerLink")}
            </button>
          </p>

          {!isRegister && (
            <div className="mt-8 p-4 rounded-lg bg-muted border border-border">
              <p className="text-xs font-medium text-muted-foreground mb-2">{t("demoAccounts")}</p>
              <p className="text-xs text-muted-foreground">{t("demoTourist")}</p>
              <p className="text-xs text-muted-foreground">{t("demoHost")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
