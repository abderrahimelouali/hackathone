import { useParams, useNavigate } from "react-router-dom";
import { useData } from "@/contexts/DataProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Tag, ChevronRight, Share2, Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogPosts, loading } = useData();
  const { lang, isRTL } = useLanguage();

  const post = blogPosts.find((p) => p.id === id);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-bold text-foreground animate-pulse tracking-widest uppercase">
          {lang === "ar" ? "جاري التحميل..." : "Loading Article..."}
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <button onClick={() => navigate("/blog")} className="btn-primary">Back to Blog</button>
        </div>
      </div>
    );
  }

  const getTitle = () => lang === "fr" ? post.titleFr : lang === "en" ? post.titleEn : post.title;
  const getExcerpt = () => lang === "fr" ? post.excerptFr : lang === "en" ? post.excerptEn : post.excerpt;
  const getContent = () => {
    if (lang === "fr" && post.contentFr) return post.contentFr;
    if (lang === "en" && post.contentEn) return post.contentEn;
    return post.content;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={post.image} 
          alt={getTitle()} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {post.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-black uppercase tracking-wider shadow-lg">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1] drop-shadow-2xl">
                {getTitle()}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center font-bold text-sm shadow-glow font-display">
                    {post.author.charAt(0)}
                  </div>
                  <span className="font-bold">{post.author}</span>
                </div>
                <div className="h-4 w-px bg-white/20 hidden sm:block" />
                <span className="flex items-center gap-2 font-medium opacity-80">
                  <Calendar className="w-4 h-4" /> {post.date}
                </span>
                <div className="h-4 w-px bg-white/20 hidden sm:block" />
                <span className="flex items-center gap-2 font-medium opacity-80">
                  <Clock className="w-4 h-4" /> 8 min {lang === "ar" ? "قراءة" : "read"}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Back Button */}
        <button 
          onClick={() => navigate("/blog")}
          className="fixed top-24 left-4 z-40 p-3 rounded-full bg-background/80 backdrop-blur-xl border border-border shadow-xl hover:scale-110 transition-all hover:bg-primary hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </section>

      {/* Article Body */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-[1fr_300px] gap-16 relative">
          {/* Main Content */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto lg:mx-0"
          >
            <p className="text-xl md:text-2xl text-foreground/80 font-medium mb-12 leading-relaxed italic border-l-4 border-primary pl-8 py-4 bg-primary/5 rounded-r-2xl">
              {getExcerpt()}
            </p>

            <div 
              className="prose prose-lg md:prose-xl dark:prose-invert max-w-none text-foreground/90 leading-[1.8] whitespace-pre-wrap font-medium"
            >
              {getContent()}
            </div>

            {/* Social Share */}
            <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{lang === "ar" ? "مشاركة المقال" : "Share Article"}</span>
                <div className="flex gap-2">
                  <button className="p-2 rounded-xl bg-muted hover:bg-primary hover:text-white transition-all"><Facebook className="w-5 h-5" /></button>
                  <button className="p-2 rounded-xl bg-muted hover:bg-primary hover:text-white transition-all"><Twitter className="w-5 h-5" /></button>
                  <button className="p-2 rounded-xl bg-muted hover:bg-primary hover:text-white transition-all"><LinkIcon className="w-5 h-5" /></button>
                </div>
              </div>
              <button 
                onClick={() => navigate("/blog")}
                className="flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all"
              >
                {lang === "ar" ? "العودة للمدونة" : lang === "fr" ? "Retour au blog" : "Back to blog"}
                <Arrow className="w-5 h-5" />
              </button>
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-12 sticky top-32 h-fit">
            {/* Table of Contents Placeholder */}
            <div className="p-6 rounded-3xl bg-muted/30 border border-border/50">
              <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6 flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-primary" />
                {lang === "ar" ? "فهرس المحتوى" : "In this article"}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-2 text-sm font-bold text-primary">
                  <ChevronRight className="w-4 h-4" /> {lang === "ar" ? "مقدمة" : "Introduction"}
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  <ChevronRight className="w-4 h-4" /> {lang === "ar" ? "التاريخ والأصل" : "History & Origins"}
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  <ChevronRight className="w-4 h-4" /> {lang === "ar" ? "الأهمية الثقافية" : "Cultural Impact"}
                </li>
              </ul>
            </div>

            {/* Newsletter Wrapper */}
            <div className="p-6 rounded-3xl gradient-hero text-white shadow-glow">
              <h3 className="font-black text-lg mb-2">{lang === "ar" ? "ابق على اطلاع" : "Stay Updated"}</h3>
              <p className="text-xs opacity-90 mb-4">{lang === "ar" ? "اشترك لتصلك أحدث المقالات عن تنغير" : "Subscribe for latest Tinghir stories"}</p>
              <div className="relative">
                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm placeholder:text-white/60 outline-none focus:bg-white/20 transition-all" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Help icon for Table of Contents
const LayoutDashboard = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);

export default BlogDetail;
