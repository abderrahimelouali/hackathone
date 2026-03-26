import { useData } from "@/contexts/DataContext";
import { ShoppingBag } from "lucide-react";

const Marketplace = () => {
  const { products } = useData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">سوق المنتجات المحلية</h1>
      <p className="text-muted-foreground mb-8">منتجات تعاونيات أصيلة من قلب تنغير</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <div key={p.id} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-warm transition-all animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="relative h-48">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground">
                {p.category}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{p.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">{p.price} د.م</span>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-hero text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                  <ShoppingBag className="w-4 h-4" />
                  شراء
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
