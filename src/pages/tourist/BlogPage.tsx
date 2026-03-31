import { useLanguage } from "@/contexts/LanguageContext";
import { blogPosts } from "@/data/mockData";
import { motion } from "framer-motion";
import { BookOpen, Calendar, User, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

const BlogPage = () => {
  const { lang, isRTL } = useLanguage();

  const getTitle = (p: typeof blogPosts[0]) => lang === "fr" ? p.titleFr : lang === "en" ? p.titleEn : p.title;
  const getExcerpt = (p: typeof blogPosts[0]) => lang === "fr" ? p.excerptFr : lang === "en" ? p.excerptEn : p.excerpt;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            {lang === "fr" ? "Blog Culturel" : lang === "en" ? "Cultural Blog" : "المدونة الثقافية"}
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            {lang === "fr" ? "Histoires de Tinghir" : lang === "en" ? "Stories of Tinghir" : "حكايات تنغير"}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {lang === "fr" ? "Articles sur la culture, l'histoire et les trésors cachés de la région" :
             lang === "en" ? "Articles about culture, history and hidden treasures of the region" :
             "مقالات عن الثقافة والتاريخ والكنوز المخفية في المنطقة"}
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="card-interactive overflow-hidden mb-8">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto overflow-hidden">
                <img src={blogPosts[0].image} alt={getTitle(blogPosts[0])} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  {blogPosts[0].tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium flex items-center gap-1">
                      <Tag className="w-3 h-3" />{tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{getTitle(blogPosts[0])}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{getExcerpt(blogPosts[0])}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{blogPosts[0].author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{blogPosts[0].date}</span>
                </div>
                <button className="btn-primary self-start flex items-center gap-2 text-sm">
                  {lang === "fr" ? "Lire l'article" : lang === "en" ? "Read article" : "قراءة المقال"}
                  <Arrow className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {blogPosts.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="card-interactive overflow-hidden group"
            >
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={getTitle(post)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-medium">{tag}</span>
                  ))}
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{getTitle(post)}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{getExcerpt(post)}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
