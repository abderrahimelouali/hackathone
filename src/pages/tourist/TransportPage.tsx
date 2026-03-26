import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Car } from "lucide-react";

const TransportPage = () => {
  const { transport } = useData();
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">{t("transportTitle")}</h1>
      <p className="text-muted-foreground mb-8">{t("transportSubtitle")}</p>

      <div className="grid md:grid-cols-2 gap-8">
        {transport.map((tr, i) => (
          <div key={tr.id} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-warm transition-all animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="relative h-52">
              <img src={tr.image} alt={tr.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute top-3 start-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground flex items-center gap-1">
                <Car className="w-3 h-3" />
                {tr.type}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">{tr.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{tr.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-2xl font-bold text-primary">{tr.price} <span className="text-sm font-normal text-muted-foreground">{t("perDay")}</span></span>
                <button className="px-6 py-2 rounded-lg gradient-hero text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                  {t("bookNow")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportPage;
