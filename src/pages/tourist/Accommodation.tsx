import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star, Check } from "lucide-react";

const Accommodation = () => {
  const { stays } = useData();
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">{t("accommodationTitle")}</h1>
      <p className="text-muted-foreground mb-8">{t("accommodationSubtitle")}</p>

      <div className="grid md:grid-cols-2 gap-8">
        {stays.map((stay, i) => (
          <div key={stay.id} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-warm transition-all animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="relative h-64">
              <img src={stay.image} alt={stay.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute top-3 start-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground">
                {stay.type}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-foreground">{stay.title}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="font-medium text-foreground">{stay.rating}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{stay.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {stay.amenities.map((a) => (
                  <span key={a} className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                    <Check className="w-3 h-3 text-accent" />
                    {a}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-2xl font-bold text-primary">{stay.price} <span className="text-sm font-normal text-muted-foreground">{t("perNight")}</span></span>
                <button className="px-6 py-2 rounded-lg gradient-hero text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                  {t("book")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accommodation;
