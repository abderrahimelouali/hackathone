import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import heroImg from "@/assets/hero-tinghir.jpg";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"tourist" | "host">("tourist");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (register(name, email, password, role)) {
        toast.success("تم إنشاء الحساب بنجاح!");
        navigate(role === "host" ? "/host" : "/");
      } else {
        toast.error("البريد الإلكتروني مستخدم بالفعل");
      }
    } else {
      if (login(email, password)) {
        toast.success("مرحباً بك!");
      } else {
        toast.error("بيانات الدخول غير صحيحة");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src={heroImg} alt="تنغير" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-foreground/80 to-foreground/40 flex items-center justify-center p-12">
          <div className="text-center">
            <h1 className="font-display text-5xl text-primary-foreground mb-4">Experiencia Tinghir</h1>
            <p className="text-primary-foreground/80 text-lg max-w-md">اكتشف جمال تنغير — مغامرات لا تُنسى في قلب المغرب</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gradient mb-2">
              {isRegister ? "إنشاء حساب جديد" : "تسجيل الدخول"}
            </h2>
            <p className="text-muted-foreground">
              {isRegister ? "انضم إلينا واكتشف تنغير" : "مرحباً بعودتك"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <input
                type="text"
                placeholder="الاسم الكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {isRegister && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">نوع الحساب</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("tourist")}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${role === "tourist" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
                  >
                    🌍 سائح
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("host")}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${role === "host" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
                  >
                    🏡 مقدم خدمة
                  </button>
                </div>
              </div>
            )}

            <button type="submit" className="w-full py-3 rounded-lg gradient-hero text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity">
              {isRegister ? "إنشاء الحساب" : "دخول"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            {isRegister ? "لديك حساب بالفعل؟" : "ليس لديك حساب؟"}{" "}
            <button onClick={() => setIsRegister(!isRegister)} className="text-primary font-medium hover:underline">
              {isRegister ? "تسجيل الدخول" : "إنشاء حساب"}
            </button>
          </p>

          {!isRegister && (
            <div className="mt-8 p-4 rounded-lg bg-muted border border-border">
              <p className="text-xs font-medium text-muted-foreground mb-2">حسابات تجريبية:</p>
              <p className="text-xs text-muted-foreground">سائح: tourist@test.com / 123456</p>
              <p className="text-xs text-muted-foreground">مقدم خدمة: host@test.com / 123456</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
