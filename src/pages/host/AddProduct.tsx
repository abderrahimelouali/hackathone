import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ShoppingBag, Upload } from "lucide-react";
import productsImg from "@/assets/products.jpg";

const AddProduct = () => {
  const { addProduct } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("عسل");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      title,
      description,
      price: Number(price),
      image: productsImg,
      category,
      hostId: user!.id,
    });
    toast.success("تم إضافة المنتج بنجاح! ✅");
    navigate("/host/manage");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <ShoppingBag className="w-8 h-8 text-gold" />
          إضافة منتج جديد
        </h1>
        <p className="text-muted-foreground mb-8">أضف منتجاً من منتجات التعاونية</p>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-card p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">اسم المنتج</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="مثال: عسل الجبال" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1">الوصف</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} placeholder="وصف المنتج..." className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">السعر (د.م)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="80" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">الفئة</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="عسل">عسل</option>
                <option value="زرابي">زرابي</option>
                <option value="منتجات تقليدية">منتجات تقليدية</option>
              </select>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4 text-center border-2 border-dashed border-border">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">سيتم استخدام صورة افتراضية</p>
          </div>

          <button type="submit" className="w-full py-4 rounded-xl gradient-hero text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity">
            إضافة المنتج
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
