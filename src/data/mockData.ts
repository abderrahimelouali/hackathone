import cookingImg from "@/assets/activity-cooking.jpg";
import hikingImg from "@/assets/activity-hiking.jpg";
import climbingImg from "@/assets/activity-climbing.jpg";
import cyclingImg from "@/assets/activity-cycling.jpg";
import raftingImg from "@/assets/activity-rafting.jpg";
import quadImg from "@/assets/activity-quad.jpg";
import campingImg from "@/assets/activity-camping.jpg";
import horseImg from "@/assets/activity-horse.jpg";
import camelImg from "@/assets/activity-camel.jpg";
import potteryImg from "@/assets/activity-pottery.jpg";
import weavingImg from "@/assets/activity-weaving.jpg";
import hotelImg from "@/assets/hotel.jpg";
import homeImg from "@/assets/home.jpg";
import productsImg from "@/assets/products.jpg";

export type Activity = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  hasGuide: boolean;
  images: string[];
  hostId: string;
  rating: number;
  location: string;
  difficulty?: string;
};

export type Booking = {
  id: string;
  userId: string;
  activityId: string;
  date: string;
  persons: number;
  status: "مؤكد" | "قيد الانتظار" | "ملغى";
};

export type Stay = {
  id: string;
  title: string;
  type: "فندق" | "منزل";
  description: string;
  price: number;
  image: string;
  rating: number;
  amenities: string[];
};

export type Transport = {
  id: string;
  title: string;
  type: "كراء سيارة" | "نقل سياحي";
  description: string;
  price: number;
  image: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  hostId: string;
};

export type BlogPost = {
  id: string;
  title: string;
  titleFr: string;
  titleEn: string;
  excerpt: string;
  excerptFr: string;
  excerptEn: string;
  content: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
};

export const initialActivities: Activity[] = [
  {
    id: "1",
    title: "تجربة الطبخ المغربي التقليدي",
    description: "اكتشف أسرار المطبخ المغربي الأصيل مع طاهٍ محلي. تعلم تحضير الطاجين والكسكس وأطباق تقليدية أخرى باستخدام مكونات طازجة من السوق المحلي.",
    category: "طبخ",
    price: 250,
    duration: "3 ساعات",
    hasGuide: true,
    images: [cookingImg],
    hostId: "host1",
    rating: 4.8,
    location: "تنغير، المدينة القديمة",
    difficulty: "سهل",
  },
  {
    id: "2",
    title: "مغامرة المشي في مضيق تودغا",
    description: "استمتع بمشي رائع عبر مضيق تودغا الشهير. مسار يأخذك عبر جدران صخرية شاهقة يصل ارتفاعها إلى 300 متر.",
    category: "مشي",
    price: 150,
    duration: "5 ساعات",
    hasGuide: true,
    images: [hikingImg],
    hostId: "host1",
    rating: 4.9,
    location: "مضيق تودغا، تنغير",
    difficulty: "متوسط",
  },
  {
    id: "3",
    title: "تسلق جبال الأطلس الكبير",
    description: "تحدّ نفسك مع تجربة تسلق مثيرة في جبال الأطلس. مسارات متنوعة تناسب جميع المستويات.",
    category: "تسلق",
    price: 350,
    duration: "يوم كامل",
    hasGuide: true,
    images: [climbingImg],
    hostId: "host1",
    rating: 4.7,
    location: "جبال الأطلس، تنغير",
    difficulty: "صعب",
  },
  {
    id: "4",
    title: "جولة بالدراجات على ضفاف الواحة",
    description: "اركب دراجتك واستكشف واحة تنغير الخضراء. مسار مسطح وسهل يمر عبر أشجار النخيل والحقول التقليدية.",
    category: "دراجات",
    price: 120,
    duration: "4 ساعات",
    hasGuide: false,
    images: [cyclingImg],
    hostId: "host1",
    rating: 4.6,
    location: "واحة تنغير",
    difficulty: "سهل",
  },
  {
    id: "5",
    title: "رافتينغ في وادي تودغا",
    description: "مغامرة مائية مثيرة في وادي تودغا. استمتع بتجربة الرافتينغ وسط المناظر الخلابة للمضيق مع فريق محترف ومعدات سلامة كاملة.",
    category: "رافتينغ",
    price: 300,
    duration: "3 ساعات",
    hasGuide: true,
    images: [raftingImg],
    hostId: "host1",
    rating: 4.8,
    location: "وادي تودغا، تنغير",
    difficulty: "متوسط",
  },
  {
    id: "6",
    title: "جولة بالدراجات الرباعية (Quad)",
    description: "اكتشف الصحراء والمناطق الجبلية على متن دراجة رباعية. مسارات متعددة تأخذك عبر مناظر طبيعية خلابة.",
    category: "كواد",
    price: 280,
    duration: "2 ساعات",
    hasGuide: true,
    images: [quadImg],
    hostId: "host1",
    rating: 4.7,
    location: "ضواحي تنغير",
    difficulty: "متوسط",
  },
  {
    id: "7",
    title: "تخييم تحت النجوم في الصحراء",
    description: "ليلة ساحرة في مخيم أمازيغي تقليدي. استمتع بالعشاء على ضوء النار، والموسيقى التقليدية، وسماء مليئة بالنجوم.",
    category: "تخييم",
    price: 400,
    duration: "ليلة كاملة",
    hasGuide: true,
    images: [campingImg],
    hostId: "host1",
    rating: 4.9,
    location: "الصحراء قرب تنغير",
    difficulty: "سهل",
  },
  {
    id: "8",
    title: "ركوب الخيل في الواحة",
    description: "استكشف واحة تنغير على ظهر حصان عربي أصيل. جولة هادئة وممتعة عبر مسارات النخيل والقرى التقليدية.",
    category: "ركوب الخيل",
    price: 200,
    duration: "2 ساعات",
    hasGuide: true,
    images: [horseImg],
    hostId: "host1",
    rating: 4.6,
    location: "واحة تنغير",
    difficulty: "سهل",
  },
  {
    id: "9",
    title: "قافلة الجمال عبر الصحراء",
    description: "عش تجربة قافلة الجمال الأصيلة عبر الكثبان الرملية. رحلة تأخذك إلى عالم آخر مع مرشد بربري محلي.",
    category: "ركوب الجمال",
    price: 180,
    duration: "3 ساعات",
    hasGuide: true,
    images: [camelImg],
    hostId: "host1",
    rating: 4.8,
    location: "صحراء تنغير",
    difficulty: "سهل",
  },
  {
    id: "10",
    title: "ورشة الفخار التقليدي",
    description: "تعلم فن الفخار المغربي التقليدي مع حرفي محلي. اصنع قطعتك الخاصة باستخدام تقنيات موروثة عبر الأجيال.",
    category: "فخار",
    price: 150,
    duration: "2 ساعات",
    hasGuide: true,
    images: [potteryImg],
    hostId: "host1",
    rating: 4.5,
    location: "تنغير، حي الحرفيين",
    difficulty: "سهل",
  },
  {
    id: "11",
    title: "ورشة النسيج الأمازيغي",
    description: "اكتشف فن النسيج التقليدي الأمازيغي مع نساء التعاونية. تعلم كيف تُنسج الزرابي الملونة بأيدي ماهرة.",
    category: "نسيج",
    price: 130,
    duration: "3 ساعات",
    hasGuide: true,
    images: [weavingImg],
    hostId: "host1",
    rating: 4.7,
    location: "تعاونية النسيج، تنغير",
    difficulty: "سهل",
  },
];

export const initialStays: Stay[] = [
  {
    id: "s1",
    title: "رياض النخيل الفاخر",
    type: "فندق",
    description: "رياض تقليدي مغربي بتصميم أندلسي فاخر. غرف واسعة مزينة بالزليج والنقش على الخشب، مسبح داخلي، وإفطار مغربي أصيل.",
    price: 450,
    image: hotelImg,
    rating: 4.9,
    amenities: ["واي فاي", "مسبح", "إفطار", "موقف سيارات", "تكييف"],
  },
  {
    id: "s2",
    title: "دار الواحة التقليدي",
    type: "منزل",
    description: "منزل تقليدي من الطوب المحلي وسط واحة النخيل. أجواء هادئة وأصيلة مع إطلالة على الجبال.",
    price: 280,
    image: homeImg,
    rating: 4.7,
    amenities: ["واي فاي", "مطبخ", "حديقة", "موقف سيارات"],
  },
];

export const initialTransport: Transport[] = [
  {
    id: "t1",
    title: "كراء سيارة 4x4",
    type: "كراء سيارة",
    description: "سيارات دفع رباعي حديثة مناسبة لاستكشاف المناطق الجبلية والصحراوية. تأمين شامل وكيلومترات غير محدودة.",
    price: 400,
    image: climbingImg,
  },
  {
    id: "t2",
    title: "نقل سياحي مع سائق",
    type: "نقل سياحي",
    description: "خدمة نقل مريحة مع سائق محلي يعرف المنطقة. مثالي لزيارة المعالم والمواقع السياحية.",
    price: 300,
    image: cyclingImg,
  },
];

export const initialProducts: Product[] = [
  {
    id: "p1",
    title: "عسل الجبال الطبيعي",
    description: "عسل طبيعي 100% من جبال الأطلس. منتج من تعاونية نسائية محلية.",
    price: 80,
    image: productsImg,
    category: "عسل",
    hostId: "host1",
  },
  {
    id: "p2",
    title: "زربية أمازيغية يدوية",
    description: "زربية تقليدية منسوجة يدوياً بألوان طبيعية. تصاميم أمازيغية أصيلة.",
    price: 1200,
    image: weavingImg,
    category: "زرابي",
    hostId: "host1",
  },
  {
    id: "p3",
    title: "زيت أركان العضوي",
    description: "زيت أركان نقي ومعصور على البارد. منتج طبيعي متعدد الاستخدامات.",
    price: 150,
    image: productsImg,
    category: "منتجات تقليدية",
    hostId: "host1",
  },
  {
    id: "p4",
    title: "أواني فخارية مزخرفة",
    description: "أواني فخارية مصنوعة يدوياً بزخارف أمازيغية تقليدية.",
    price: 200,
    image: potteryImg,
    category: "منتجات تقليدية",
    hostId: "host1",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "مضيق تودغا: جوهرة الجنوب المغربي",
    titleFr: "Les Gorges du Todgha : Joyau du Sud Marocain",
    titleEn: "Todgha Gorge: Jewel of Southern Morocco",
    excerpt: "اكتشف واحداً من أروع المضايق في العالم، حيث ترتفع الجدران الصخرية 300 متر فوق النهر الكريستالي.",
    excerptFr: "Découvrez l'une des gorges les plus spectaculaires au monde, où les falaises s'élèvent à 300m.",
    excerptEn: "Discover one of the world's most spectacular gorges, where cliff walls rise 300m above the crystal river.",
    content: "",
    image: hikingImg,
    date: "2026-03-15",
    author: "أحمد البربري",
    tags: ["طبيعة", "مغامرة"],
  },
  {
    id: "b2",
    title: "فن الطبخ الأمازيغي: تراث حي",
    titleFr: "L'Art Culinaire Amazigh : Un Patrimoine Vivant",
    titleEn: "Amazigh Culinary Art: A Living Heritage",
    excerpt: "رحلة في عالم المذاقات الأمازيغية الأصيلة، من الطاجين التقليدي إلى الخبز المحلي.",
    excerptFr: "Un voyage dans le monde des saveurs amazighes authentiques, du tajine traditionnel au pain local.",
    excerptEn: "A journey into authentic Amazigh flavors, from traditional tajine to local bread.",
    content: "",
    image: cookingImg,
    date: "2026-03-10",
    author: "فاطمة الزهراء",
    tags: ["ثقافة", "طبخ"],
  },
  {
    id: "b3",
    title: "القصبات: عمارة الطين الخالدة",
    titleFr: "Les Kasbahs : Architecture de Terre Éternelle",
    titleEn: "Kasbahs: Timeless Earth Architecture",
    excerpt: "استكشف عمارة القصبات التقليدية في تنغير، شواهد حية على إبداع الإنسان الأمازيغي.",
    excerptFr: "Explorez l'architecture traditionnelle des kasbahs de Tinghir, témoins vivants du génie amazigh.",
    excerptEn: "Explore traditional kasbah architecture in Tinghir, living witnesses of Amazigh ingenuity.",
    content: "",
    image: homeImg,
    date: "2026-03-05",
    author: "محمد أيت علي",
    tags: ["تاريخ", "عمارة"],
  },
  {
    id: "b4",
    title: "الحرف اليدوية: كنوز تنغير المخفية",
    titleFr: "L'Artisanat : Les Trésors Cachés de Tinghir",
    titleEn: "Handicrafts: Tinghir's Hidden Treasures",
    excerpt: "من النسيج إلى الفخار، اكتشف الحرف التقليدية التي تحافظ على تراث المنطقة.",
    excerptFr: "Du tissage à la poterie, découvrez les métiers traditionnels qui préservent le patrimoine.",
    excerptEn: "From weaving to pottery, discover traditional crafts preserving the region's heritage.",
    content: "",
    image: weavingImg,
    date: "2026-02-28",
    author: "خديجة أمزيل",
    tags: ["حرف", "ثقافة"],
  },
];

export const mapLocations = [
  { id: "m1", name: "مضيق تودغا", nameFr: "Gorges du Todgha", nameEn: "Todgha Gorge", lat: 31.5889, lng: -5.5703, type: "nature", emoji: "🏔️" },
  { id: "m2", name: "واحة تنغير", nameFr: "Oasis de Tinghir", nameEn: "Tinghir Oasis", lat: 31.5147, lng: -5.5328, type: "nature", emoji: "🌴" },
  { id: "m3", name: "قصبة تنغير", nameFr: "Kasbah de Tinghir", nameEn: "Tinghir Kasbah", lat: 31.5125, lng: -5.5312, type: "heritage", emoji: "🏰" },
  { id: "m4", name: "سوق تنغير", nameFr: "Souk de Tinghir", nameEn: "Tinghir Souk", lat: 31.5135, lng: -5.5295, type: "shopping", emoji: "🛍️" },
  { id: "m5", name: "حي الحرفيين", nameFr: "Quartier des Artisans", nameEn: "Artisans Quarter", lat: 31.5110, lng: -5.5340, type: "culture", emoji: "🎨" },
  { id: "m6", name: "جبل صاغرو", nameFr: "Jbel Saghro", nameEn: "Jbel Saghro", lat: 31.3500, lng: -5.8500, type: "adventure", emoji: "⛰️" },
  { id: "m7", name: "بحيرة إيسلي", nameFr: "Lac Isli", nameEn: "Lake Isli", lat: 31.7000, lng: -5.6300, type: "nature", emoji: "💧" },
  { id: "m8", name: "القصر القديم", nameFr: "Ancien Ksar", nameEn: "Old Ksar", lat: 31.5150, lng: -5.5280, type: "heritage", emoji: "🕌" },
];
