import { useState } from "react";
import { useData } from "@/contexts/DataProvider";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Plus, BookOpen, Tag, Calendar, User, Layout, Globe, FileText } from "lucide-react";
const K_IMAGE = "/images/blog/khettara.png";
const C_IMAGE = "/images/blog/cooperative.png";
const T_IMAGE = "/images/blog/todra.png";
const A_IMAGE = "/images/blog/crafts.png";

const AddBlogPost = () => {
  const { addBlogPost } = useData();
  const { user } = useAuth();
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [titleFr, setTitleFr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [excerptFr, setExcerptFr] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(K_IMAGE);
  
  const [contentFr, setContentFr] = useState("");
  const [contentEn, setContentEn] = useState("");

  const images = [
    { src: K_IMAGE, label: "Irrigation" },
    { src: C_IMAGE, label: "Cooperatives" },
    { src: T_IMAGE, label: "Nature" },
    { src: A_IMAGE, label: "Artisan" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      toast.error("Please fill in the required fields");
      return;
    }

    const toastId = toast.loading(lang === "ar" ? "جاري النشر..." : "Publishing...");

    try {
      await addBlogPost({
        title,
        titleFr: titleFr || title,
        titleEn: titleEn || title,
        excerpt,
        excerptFr: excerptFr || excerpt,
        excerptEn: excerptEn || excerpt,
        content,
        contentFr: contentFr || content,
        contentEn: contentEn || content,
        image,
        date: new Date().toISOString().split('T')[0],
        author: user?.name || "Anonymous",
        tags: tags.split(",").map(t => t.trim()).filter(t => t !== ""),
      });

      toast.success(lang === "fr" ? "Article publié !" : lang === "en" ? "Article published!" : "تم نشر المقال بنجاح!", { id: toastId });
      navigate("/blog");
    } catch (error) {
      toast.error("Failed to publish", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {lang === "fr" ? "Publier un Article" : lang === "en" ? "Publish an Article" : "نشر مقال ثقافي"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {lang === "fr" ? "Partagez l'histoire et la culture de Tinghir" : lang === "en" ? "Share the history and culture of Tinghir" : "شارك تاريخ وثقافة تنغير مع العالم"}
              </p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Content (Arabic/Main) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-interactive p-6 space-y-6"
          >
            <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-3 border-border">
              <Layout className="w-5 h-5 text-primary" />
              {lang === "fr" ? "Contenu Principal (Arabe)" : lang === "en" ? "Main Content (Arabic)" : "المحتوى الأساسي (العربية)"}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">{lang === "fr" ? "Titre" : lang === "en" ? "Title" : "العنوان"}</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                  className="input-styled" 
                  placeholder="مثال: واحة تنغير: جنة خضراء"
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold mb-2 block">{lang === "fr" ? "Résumé" : lang === "en" ? "Excerpt" : "خلاصة المقال"}</label>
                <textarea 
                  value={excerpt} 
                  onChange={(e) => setExcerpt(e.target.value)} 
                  required 
                  rows={2}
                  className="input-styled" 
                  placeholder="وصف قصير يظهر في قائمة المقالات..."
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">{lang === "fr" ? "Contenu Complet" : lang === "en" ? "Full Content" : "المقال الكامل"}</label>
                <textarea 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  required 
                  rows={10}
                  className="input-styled" 
                  placeholder="اكتب تفاصيل مقالك هنا..."
                />
              </div>
            </div>
          </motion.div>

          {/* Translations (Optional but recommended) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-interactive p-6 space-y-6"
          >
            <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-3 border-border">
              <Globe className="w-5 h-5 text-accent" />
              {lang === "fr" ? "Traductions (Optionnel)" : lang === "en" ? "Translations (Optional)" : "الترجمات (اختياري)"}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-muted-foreground tracking-widest border-b pb-1">Français</p>
                <div>
                  <label className="text-xs font-bold mb-1 block">Titre (FR)</label>
                  <input type="text" value={titleFr} onChange={(e) => setTitleFr(e.target.value)} className="input-styled text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold mb-1 block">Résumé (FR)</label>
                  <textarea value={excerptFr} onChange={(e) => setExcerptFr(e.target.value)} rows={2} className="input-styled text-sm" />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-muted-foreground tracking-widest border-b pb-1">English</p>
                <div>
                  <label className="text-xs font-bold mb-1 block">Title (EN)</label>
                  <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className="input-styled text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold mb-1 block">Excerpt (EN)</label>
                  <textarea value={excerptEn} onChange={(e) => setExcerptEn(e.target.value)} rows={2} className="input-styled text-sm" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Media and Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-interactive p-6 space-y-6"
          >
            <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-3 border-border">
              <Tag className="w-5 h-5 text-gold" />
              {lang === "fr" ? "Média & Tags" : lang === "en" ? "Media & Tags" : "الوسائط والوسوم"}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="text-sm font-semibold mb-4 block">{lang === "fr" ? "Image de Couverture" : lang === "en" ? "Cover Image" : "صورة الغلاف"}</label>
                <div className="grid grid-cols-2 gap-2">
                  {images.map((img) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setImage(img.src)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${image === img.src ? "border-primary ring-2 ring-primary/20 scale-95" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-[10px] py-0.5 text-center">{img.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">{lang === "fr" ? "Tags (séparés par virgule)" : lang === "en" ? "Tags (comma separated)" : "الوسوم (مفصولة بفاصلة)"}</label>
                  <input 
                    type="text" 
                    value={tags} 
                    onChange={(e) => setTags(e.target.value)} 
                    className="input-styled" 
                    placeholder="ثقافة, تاريخ, واحة"
                  />
                </div>
                
                <div className="p-4 rounded-xl bg-muted/30 border border-dashed border-border space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="w-3 h-3" /> {lang === "fr" ? "Auteur" : lang === "en" ? "Author" : "الكاتب"}: <b>{user?.name}</b>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" /> {lang === "fr" ? "Date" : lang === "en" ? "Date" : "التاريخ"}: <b>{new Date().toLocaleDateString(lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-FR" : "en-US")}</b>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/blog")}
              className="flex-1 px-8 py-4 rounded-2xl border border-border font-bold hover:bg-muted transition-colors"
            >
              {lang === "fr" ? "Annuler" : lang === "en" ? "Cancel" : "إلغاء"}
            </button>
            <button
              type="submit"
              className="flex-[2] btn-primary py-4 text-lg"
            >
              <FileText className="w-5 h-5 mr-2" />
              {lang === "fr" ? "Publier l'Article" : lang === "en" ? "Publish Article" : "نشر المقال"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPost;
