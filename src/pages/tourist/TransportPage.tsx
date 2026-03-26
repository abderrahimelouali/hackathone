import { useData } from "@/contexts/DataContext";
import { Car, MapPin } from "lucide-react";

const TransportPage = () => {
  const { transport } = useData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">النقل والتنقل</h1>
      <p className="text-muted-foreground mb-8">خدمات نقل مريحة وآمنة لاستكشاف المنطقة</p>

      <div className="grid md:grid-cols-2 gap-8">
        {transport.map((t, i) => (
          <div key={t.id} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-warm transition-all animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="relative h-52">
              <img src={t.image} alt={t.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground flex items-center gap-1">
                <Car className="w-3 h-3" />
                {t.type}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">{t.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{t.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-2xl font-bold text-primary">{t.price} <span className="text-sm font-normal text-muted-foreground">د.م / يوم</span></span>
                <button className="px-6 py-2 rounded-lg gradient-hero text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                  احجز الآن
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
