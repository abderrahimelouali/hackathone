import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Upload } from "lucide-react";
import cookingImg from "@/assets/activity-cooking.jpg";
import hikingImg from "@/assets/activity-hiking.jpg";
import climbingImg from "@/assets/activity-climbing.jpg";
import cyclingImg from "@/assets/activity-cycling.jpg";

const categoryImages: Record<string, string> = {
  "طبخ": cookingImg,
  "مشي": hikingImg,
  "تسلق": climbingImg,
  "دراجات": cyclingImg,
};

const AddActivity = () => {
  const { addActivity } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"طبخ" | "مشي" | "تسلق" | "دراجات">("طبخ");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [hasGuide, setHasGuide] = useState(true);
  const [location, setLocation] = useState("تنغير");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity({
      title,
      description,
      category,
      price: Number(price),
      duration,
      hasGuide,
      images: [categoryImages[category]],
      hostId: user!.id,
      rating: 4.5,
      location,
    });
    toast.success("تم إضافة النشاط بنجاح! ✅");
    navigate("/host/manage");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Plus className="w-8 h-8 text-primary" />
          إضافة نشاط جديد
        </h1>
        <p className="text-muted-foreground mb-8">أضف نشاطاً سياحياً جديداً لعرضه للسياح</p>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-card p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">عنوان النشاط</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="مثال: جولة في مضيق تودغا" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1">الوصف</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} placeholder="وصف تفصيلي للنشاط..." className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">النوع</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="طبخ">طبخ</option>
                <option value="مشي">مشي</option>
                <option value="تسلق">تسلق</option>
                <option value="دراجات">دراجات</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">السعر (د.م)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="250" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">المدة</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required placeholder="3 ساعات" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">الموقع</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="guide" checked={hasGuide} onChange={(e) => setHasGuide(e.target.checked)} className="w-5 h-5 accent-primary" />
            <label htmlFor="guide" className="text-sm font-medium text-foreground">مع مرشد سياحي</label>
          </div>

          <div className="bg-muted rounded-lg p-4 text-center border-2 border-dashed border-border">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">سيتم استخدام صورة افتراضية حسب النوع</p>
          </div>

          <button type="submit" className="w-full py-4 rounded-xl gradient-hero text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity">
            إضافة النشاط
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddActivity;
