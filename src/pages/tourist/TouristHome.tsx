import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { Search, Star, Clock, MapPin, Filter } from "lucide-react";
import heroImg from "@/assets/hero-tinghir.jpg";

const categories = ["الكل", "طبخ", "مشي", "تسلق", "دراجات"] as const;

const TouristHome = () => {
  const { activities } = useData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("الكل");
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const filtered = activities.filter((a) => {
    if (category !== "الكل" && a.category !== category) return false;
    if (a.price > maxPrice) return false;
    if (search && !a.title.includes(search) && !a.description.includes(search)) return false;
    return true;
  });

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[400px] -mt-0 overflow-hidden">
        <img src={heroImg} alt="تنغير" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-foreground/20" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <div className="animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl text-primary-foreground mb-3">اكتشف تنغير</h1>
            <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto">مغامرات أصيلة في قلب مضيق تودغا وجبال الأطلس</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="bg-card rounded-xl shadow-card p-4 mb-8 -mt-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="ابحث عن نشاط..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">الحد الأقصى:</span>
              <input
                type="range"
                min={50}
                max={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32 accent-primary"
              />
              <span className="text-sm font-medium text-foreground">{maxPrice} د.م</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === c ? "gradient-hero text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((activity, i) => (
            <Link
              key={activity.id}
              to={`/activity/${activity.id}`}
              className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-warm transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={activity.images[0]} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground">
                  {activity.category}
                </div>
                {activity.hasGuide && (
                  <div className="absolute top-3 right-3 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-accent-foreground">
                    مع مرشد
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">{activity.title}</h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{activity.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gold fill-gold" />{activity.rating}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{activity.duration}</span>
                  </div>
                  <span className="font-bold text-primary text-lg">{activity.price} د.م</span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {activity.location}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">لا توجد أنشطة مطابقة للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TouristHome;
