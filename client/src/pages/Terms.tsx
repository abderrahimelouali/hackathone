import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, FileText, Lock, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Terms = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''} group-hover:${isRTL ? 'translate-x-1' : '-translate-x-1'} transition-transform`} />
          {t("backToLogin")}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border/50 rounded-[2.5rem] p-8 md:p-12 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black text-foreground tracking-tight">{t("termsLink")}</h1>
          </div>

          <div className="prose prose-sm prose-primary max-w-none space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                1. Introduction
              </h2>
              <p>Welcome to Experiencia Tinghir. By accessing our platform, you agree to comply with these terms. Our service connects tourists with local guides, hosts, and artisans in the Tinghir region.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-orange-500" />
                2. Privacy & Data
              </h2>
              <p>We value your privacy. Your personal information is encrypted and stored securely. We only share necessary details with service providers to facilitate your bookings.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <Scale className="w-5 h-5 text-blue-500" />
                3. User Responsibilities
              </h2>
              <p>Users must provide accurate information during registration. Any fraudulent activity or misuse of the platform may lead to account suspension.</p>
            </section>

            <div className="p-6 rounded-2xl bg-muted/50 border border-border/50 italic text-sm">
              Note: This is a placeholder for the official Terms and Conditions of Experiencia Tinghir.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
