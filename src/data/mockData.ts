import cookingImg from "@/assets/activity-cooking.jpg";
import hikingImg from "@/assets/activity-hiking.jpg";
import climbingImg from "@/assets/activity-climbing.jpg";
import cyclingImg from "@/assets/activity-cycling.jpg";
import hotelImg from "@/assets/hotel.jpg";
import homeImg from "@/assets/home.jpg";
import productsImg from "@/assets/products.jpg";

export type Activity = {
  id: string;
  title: string;
  description: string;
  category: "طبخ" | "مشي" | "تسلق" | "دراجات";
  price: number;
  duration: string;
  hasGuide: boolean;
  images: string[];
  hostId: string;
  rating: number;
  location: string;
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

export const initialActivities: Activity[] = [
  {
    id: "1",
    title: "تجربة الطبخ المغربي التقليدي",
    description: "اكتشف أسرار المطبخ المغربي الأصيل مع طاهٍ محلي. تعلم تحضير الطاجين والكسكس وأطباق تقليدية أخرى باستخدام مكونات طازجة من السوق المحلي. تجربة فريدة تجمع بين الثقافة والمذاق الرفيع.",
    category: "طبخ",
    price: 250,
    duration: "3 ساعات",
    hasGuide: true,
    images: [cookingImg],
    hostId: "host1",
    rating: 4.8,
    location: "تنغير، المدينة القديمة",
  },
  {
    id: "2",
    title: "مغامرة المشي في مضيق تودغا",
    description: "استمتع بمشي رائع عبر مضيق تودغا الشهير. مسار يأخذك عبر جدران صخرية شاهقة يصل ارتفاعها إلى 300 متر. مناظر خلابة وطبيعة بكر تنتظرك في هذه التجربة المميزة.",
    category: "مشي",
    price: 150,
    duration: "5 ساعات",
    hasGuide: true,
    images: [hikingImg],
    hostId: "host1",
    rating: 4.9,
    location: "مضيق تودغا، تنغير",
  },
  {
    id: "3",
    title: "تسلق جبال الأطلس الكبير",
    description: "تحدّ نفسك مع تجربة تسلق مثيرة في جبال الأطلس. مسارات متنوعة تناسب جميع المستويات من المبتدئين إلى المحترفين. معدات السلامة مشمولة مع مرشد خبير.",
    category: "تسلق",
    price: 350,
    duration: "يوم كامل",
    hasGuide: true,
    images: [climbingImg],
    hostId: "host1",
    rating: 4.7,
    location: "جبال الأطلس، تنغير",
  },
  {
    id: "4",
    title: "جولة بالدراجات على ضفاف الواحة",
    description: "اركب دراجتك واستكشف واحة تنغير الخضراء. مسار مسطح وسهل يمر عبر أشجار النخيل والحقول التقليدية. استمتع بالهدوء والجمال الطبيعي بعيداً عن صخب المدينة.",
    category: "دراجات",
    price: 120,
    duration: "4 ساعات",
    hasGuide: false,
    images: [cyclingImg],
    hostId: "host1",
    rating: 4.6,
    location: "واحة تنغير",
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
    description: "منزل تقليدي من الطوب المحلي وسط واحة النخيل. أجواء هادئة وأصيلة مع إطلالة على الجبال. مثالي للعائلات والمجموعات.",
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
    description: "خدمة نقل مريحة مع سائق محلي يعرف المنطقة. مثالي لزيارة المعالم والمواقع السياحية بأمان وراحة.",
    price: 300,
    image: cyclingImg,
  },
];

export const initialProducts: Product[] = [
  {
    id: "p1",
    title: "عسل الجبال الطبيعي",
    description: "عسل طبيعي 100% من جبال الأطلس. منتج من تعاونية نسائية محلية. غني بالفوائد الصحية.",
    price: 80,
    image: productsImg,
    category: "عسل",
    hostId: "host1",
  },
  {
    id: "p2",
    title: "زربية أمازيغية يدوية",
    description: "زربية تقليدية منسوجة يدوياً بألوان طبيعية. تصاميم أمازيغية أصيلة تروي قصص المنطقة.",
    price: 1200,
    image: productsImg,
    category: "زرابي",
    hostId: "host1",
  },
  {
    id: "p3",
    title: "زيت أركان العضوي",
    description: "زيت أركان نقي ومعصور على البارد. منتج طبيعي متعدد الاستخدامات للطبخ والتجميل.",
    price: 150,
    image: productsImg,
    category: "منتجات تقليدية",
    hostId: "host1",
  },
];
