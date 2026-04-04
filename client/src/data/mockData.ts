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
  titleFr?: string;
  titleEn?: string;
  description: string;
  descriptionFr?: string;
  descriptionEn?: string;
  category: string;
  price: number;
  duration: string;
  durationFr?: string;
  durationEn?: string;
  hasGuide: boolean;
  image: string;
  hostId: string;
  rating: number;
  location: string;
  locationFr?: string;
  locationEn?: string;
  lat: number;
  lng: number;
  difficulty?: string;
  color: "violet" | "orange" | "yellow" | "green" | "purple" | "pink";
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
  contentFr?: string;
  contentEn?: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
};

export type MapLocation = {
  id: string;
  name: string;
  nameFr?: string;
  nameEn?: string;
  type: "nature" | "heritage" | "shopping" | "culture" | "adventure";
  lat: number;
  lng: number;
  emoji: string;
  description?: string;
  descriptionFr?: string;
  descriptionEn?: string;
};

export const initialActivities: Activity[] = [
  {
    id: "1",
    title: "تجربة الطبخ المغربي التقليدي",
    titleFr: "Cours de Cuisine Traditionnelle",
    titleEn: "Traditional Cooking Experience",
    description: "اكتشف أسرار المطبخ المغربي الأصيل مع طاهٍ محلي. تعلم تحضير الطاجين والكسكس وأطباق تقليدية أخرى باستخدام مكونات طازجة من السوق المحلي.",
    descriptionFr: "Découvrez les secrets de la cuisine marocaine authentique avec un chef local. Apprenez à préparer le tajine, le couscous et d'autres plats traditionnels.",
    descriptionEn: "Discover the secrets of authentic Moroccan cuisine with a local chef. Learn to prepare tagine, couscous and other traditional dishes.",
    category: "طبخ",
    price: 250,
    duration: "3 ساعات",
    durationFr: "3 heures",
    durationEn: "3 hours",
    hasGuide: true,
    image: cookingImg,
    hostId: "host1",
    rating: 4.8,
    location: "تنغير، المدينة القديمة",
    locationFr: "Vieille ville, Tinghir",
    locationEn: "Old Town, Tinghir",
    lat: 31.5135,
    lng: -5.5295,
    difficulty: "سهل",
    color: "yellow",
  },
  {
    id: "2",
    title: "مغامرة المشي في مضيق تودغا",
    titleFr: "Randonnée dans les Gorges du Todgha",
    titleEn: "Hiking Adventure in Todra Gorge",
    description: "استمتع بمشي رائع عبر مضيق تودغا الشهير. مسار يأخذك عبر جدران صخرية شاهقة يصل ارتفاعها إلى 300 متر.",
    descriptionFr: "Profitez d'une randonnée magnifique à travers les célèbres Gorges du Todgha avec des parois rocheuses de 300 mètres.",
    descriptionEn: "Enjoy a magnificent walk through the famous Todra Gorge. A trail that takes you through towering rock walls up to 300 meters high.",
    category: "مشي",
    price: 220,
    duration: "5 ساعات",
    durationFr: "5 heures",
    durationEn: "5 hours",
    hasGuide: true,
    image: hikingImg,
    hostId: "host1",
    rating: 4.9,
    location: "مضيق تودغا، تنغير",
    locationFr: "Gorges du Todgha, Tinghir",
    locationEn: "Todra Gorge, Tinghir",
    lat: 31.5889,
    lng: -5.5703,
    difficulty: "متوسط",
    color: "green",
  },
  {
    id: "3",
    title: "تسلق جبال الأطلس الكبير",
    titleFr: "Escalade dans le Haut Atlas",
    titleEn: "High Atlas Climbing",
    description: "تحدّ نفسك مع تجربة تسلق مثيرة في جبال الأطلس. مسارات متنوعة تناسب جميع المستويات مع معدات كاملة مخصصة.",
    descriptionFr: "Relevez le défi avec une expérience d'escalade passionnante dans les montagnes de l'Atlas pour tous les niveaux.",
    descriptionEn: "Challenge yourself with an exciting climbing experience in the Atlas Mountains with various levels.",
    category: "تسلق",
    price: 500,
    duration: "يوم كامل",
    durationFr: "Journée complète",
    durationEn: "Full day",
    hasGuide: true,
    image: climbingImg,
    hostId: "host1",
    rating: 4.7,
    location: "جبال الأطلس، تنغير",
    locationFr: "Haut Atlas, Tinghir",
    locationEn: "High Atlas, Tinghir",
    lat: 31.5900,
    lng: -5.5710,
    difficulty: "صعب",
    color: "violet",
  },
  {
    id: "4",
    title: "جولة بالدراجات على ضفاف الواحة",
    titleFr: "Tour à Vélo dans l'Oasis",
    titleEn: "Oasis Bicycle Tour",
    description: "اركب دراجتك واستكشف واحة تنغير الخضراء. مسار مسطح وسهل يمر عبر أشجار النخيل والحقول التقليدية.",
    descriptionFr: "Prenez votre vélo et explorez l'oasis verdoyante de Tinghir à travers les palmiers et les champs traditionnels.",
    descriptionEn: "Ride your bike and explore the green oasis of Tinghir. A flat and easy path through palm trees and traditional fields.",
    category: "دراجات",
    price: 180,
    duration: "4 ساعات",
    durationFr: "4 heures",
    durationEn: "4 hours",
    hasGuide: false,
    image: cyclingImg,
    hostId: "host1",
    rating: 4.6,
    location: "واحة تنغير",
    locationFr: "Oasis de Tinghir",
    locationEn: "Tinghir Oasis",
    lat: 31.5147,
    lng: -5.5328,
    difficulty: "سهل",
    color: "orange",
  },
  {
    id: "6",
    title: "جولة بالدراجات الرباعية (Quad)",
    titleFr: "Excursion en Quad",
    titleEn: "Quad Biking Tour",
    description: "اكتشف الصحراء والمناطق الجبلية على متن دراجة رباعية. مسارات متعددة تأخذك عبر مناظر طبيعية خلابة.",
    descriptionFr: "Découvrez le désert et les zones montagneuses en quad avec des paysages à couper le souffle.",
    descriptionEn: "Discover the desert and mountain areas on a quad bike with multiple trails through stunning landscapes.",
    category: "كواد",
    price: 550,
    duration: "ساعتان",
    durationFr: "2 heures",
    durationEn: "2 hours",
    hasGuide: true,
    image: quadImg,
    hostId: "host1",
    rating: 4.7,
    location: "ضواحي تنغير",
    locationFr: "Environs de Tinghir",
    locationEn: "Tinghir Suburbs",
    lat: 31.5200,
    lng: -5.5400,
    difficulty: "متوسط",
    color: "orange",
  },
  {
    id: "8",
    title: "ركوب الخيل في الواحة",
    titleFr: "Équitation dans l'Oasis",
    titleEn: "Horse Riding in the Oasis",
    description: "استكشف واحة تنغير على ظهر حصان عربي أصيل. جولة هادئة وممتعة عبر مسارات النخيل والقرى التقليدية.",
    descriptionFr: "Explorez l'oasis de Tinghir sur un pur-sang arabe à travers les palmiers et les villages traditionnels.",
    descriptionEn: "Explore the Tinghir oasis on an authentic Arabian horse through palm paths and traditional villages.",
    category: "ركوب الخيل",
    price: 300,
    duration: "ساعتان",
    durationFr: "2 heures",
    durationEn: "2 hours",
    hasGuide: true,
    image: horseImg,
    hostId: "host1",
    rating: 4.6,
    location: "واحة تنغير",
    locationFr: "Oasis de Tinghir",
    locationEn: "Tinghir Oasis",
    lat: 31.5180,
    lng: -5.5350,
    difficulty: "سهل",
    color: "pink",
  },
  {
    id: "9",
    title: "قافلة الجمال عبر الصحراء",
    titleFr: "Caravane de Chameaux",
    titleEn: "Camel Caravan Experience",
    description: "عش تجربة قافلة الجمال الأصيلة عبر الكثبان الرملية. رحلة تأخذك إلى عالم آخر مع مرشد بربري محلي.",
    descriptionFr: "Vivez l'expérience authentique d'une caravane de chameaux à travers les dunes avec un guide local.",
    descriptionEn: "Live the authentic camel caravan experience through the sand dunes with a local Berber guide.",
    category: "ركوب الجمال",
    price: 200,
    duration: "3 ساعات",
    durationFr: "3 heures",
    durationEn: "3 hours",
    hasGuide: true,
    image: camelImg,
    hostId: "host1",
    rating: 4.8,
    location: "صحراء تنغير",
    locationFr: "Désert de Tinghir",
    locationEn: "Tinghir Desert",
    lat: 31.5000,
    lng: -5.4800,
    difficulty: "سهل",
    color: "orange",
  },
  {
    id: "10",
    title: "ورشة الفخار التقليدي",
    titleFr: "Atelier de Poterie Traditionnelle",
    titleEn: "Traditional Pottery Workshop",
    description: "تعلم فن الفخار المغربي التقليدي مع حرفي محلي. اصنع قطعتك الخاصة باستخدام تقنيات موروثة عبر الأجيال.",
    descriptionFr: "Apprenez l'art de la poterie marocaine avec un artisan local et créez votre propre pièce.",
    descriptionEn: "Learn the art of traditional Moroccan pottery with a local artisan using ancestral techniques.",
    category: "فخار",
    price: 150,
    duration: "ساعتان",
    durationFr: "2 heures",
    durationEn: "2 hours",
    hasGuide: true,
    image: potteryImg,
    hostId: "host1",
    rating: 4.5,
    location: "تنغير، حي الحرفيين",
    locationFr: "Quartier des Artisans, Tinghir",
    locationEn: "Artisans Quarter, Tinghir",
    lat: 31.5110,
    lng: -5.5340,
    difficulty: "سهل",
    color: "pink",
  },
  {
    id: "11",
    title: "ورشة النسيج الأمازيغي",
    titleFr: "Atelier de Tissage Amazigh",
    titleEn: "Amazigh Weaving Workshop",
    description: "اكتشف فن النسيج التقليدي الأمازيغي مع نساء التعاونية. تعلم كيف تُنسج الزرابي الملونة بأيدي ماهرة.",
    descriptionFr: "Découvrez l'art du tissage traditionnel amazigh avec les femmes de la coopérative.",
    descriptionEn: "Discover the traditional Amazigh weaving art with the women of the cooperative.",
    category: "نسيج",
    price: 150,
    duration: "3 ساعات",
    durationFr: "3 heures",
    durationEn: "3 hours",
    hasGuide: true,
    image: weavingImg,
    hostId: "host1",
    rating: 4.7,
    location: "تعاونية النسيج، تنغير",
    locationEn: "Weaving Cooperative, Tinghir",
    lat: 31.5120,
    lng: -5.5310,
    difficulty: "سهل",
    color: "purple",
  },
];


export const initialStays: Stay[] = [
  {
    id: "s1",
    title: "رياض النخيل الفاخر",
    type: "فندق",
    description: "رياض تقليدي مغربي بتصميم أندلسي فاخر. غرف واسعة مزينة بالزليج والنقش على الخشب، مسبح داخلي، وإفطار مغربي أصيل.",
    price: 450,
    image: "/images/stays/hotel.jpg",
    rating: 4.9,
    amenities: ["واي فاي", "مسبح", "إفطار", "موقف سيارات", "تكييف"],
  },
  {
    id: "s2",
    title: "دار الواحة التقليدي",
    type: "منزل",
    description: "منزل تقليدي من الطوب المحلي وسط واحة النخيل. أجواء هادئة وأصيلة مع إطلالة على الجبال.",
    price: 280,
    image: "/images/stays/home.jpg",
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
    image: "/images/transport/minibus.jpg",
  },
];

export const initialProducts: Product[] = [
  {
    id: "p1",
    title: "زعفران تاليوين الأصلي",
    description: "زعفران حر ممتاز من منطقة تاليوين، معروف بجودته العالية ورائحته الفريدة. منتج طبيعي 100%.",
    price: 150,
    image: "/images/shop/products.jpg",
    category: "توابل",
    hostId: "host1",
  },
  {
    id: "p2",
    title: "زربية أمازيغية يدوية",
    description: "زربية تقليدية منسوجة يدوياً بصوف طبيعي وألوان نباتية. تصاميم أمازيغية أصيلة من منطقة دادس.",
    price: 2500,
    image: weavingImg,
    category: "زرابي",
    hostId: "host1",
  },
  {
    id: "p3",
    title: "حلي فضية تقليدية",
    description: "طقم فضة تيزنيت مصنوع يدوياً بمهارة عالية. تعكس التراث العريق للصياغة المغربية.",
    price: 850,
    image: potteryImg,
    category: "حلي",
    hostId: "host1",
  },
  {
    id: "p4",
    title: "زيت أرغان للتجميل",
    description: "زيت أرغان بكر ممتاز مستخرج بآلات تقليدية. غني بالفيتامينات ومثالي للعناية بالبشرة والشعر.",
    price: 120,
    image: "/images/shop/products.jpg",
    category: "تجميل",
    hostId: "host1",
  },
  {
    id: "p5",
    title: "فخار وادي تودغا",
    description: "أواني وحاملات شموع فخارية مزينة بنقوش يدوية تقليدية. قطعة فنية تضفي لمسة عريقة على منزلك.",
    price: 70,
    image: potteryImg,
    category: "فخار",
    hostId: "host1",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "b5",
    title: "نظام الري التقليدي (الخطارات): عبقرية هندسية في قلب الواحة",
    titleFr: "Le Système d'Irrigation Traditionnel (Khettaras) : Génie Hydraulique",
    titleEn: "Traditional Irrigation System (Khettaras): Hydraulic Genius",
    excerpt: "اكتشف كيف استطاعت الخطارات الحفاظ على اخضرار واحات تنغير لقرون من خلال هندسة مياه فريدة.",
    excerptFr: "Découvrez comment les Khettaras ont maintenu les oasis de Tinghir vertes pendant des siècles.",
    excerptEn: "Discover how Khettaras have kept Tinghir's oases green for centuries through unique engineering.",
    content: `تعتبر الخطارات من أقدم وأذكى الأنظمة الهيدروليكية التقليدية في العالم، وهي العمود الفقري للحياة في واحة تنغير والجنوب الشرقي المغربي. تعتمد هذه التقنية على حفر آبار متسلسلة مرتبطة بنفق تحت الأرض يميل بدرجة دقيقة جداً لجلب المياه من الفرشة المائية الجوفية عند سفح الجبال إلى مناطق الفلاحة في الواحة دون الحاجة إلى طاقة ميكانيكية، وبالاعتماد فقط على الجاذبية.

تتميز الخطارات بقدرتها المذهلة على الحفاظ على المياه من التبخر، نظراً لكونها تجري في قنوات تحت أرضية بعيدة عن شمس الصحراء الحارقة. وفي تنغير، لعبت الخطارات دوراً مركزياً في تنظيم المجتمع، حيث كان "أمين الماء" يشرف على توزيع حصص المياه بين الفلاحين بناءً على نظام دقيق يسمى "النوبة"، مما يعكس قيماً اجتماعية قوية للتضامن والعدل.

اليوم، وبينما يواجه العالم تحديات التغير المناخي ونقص المياه، تظل الخطارات درساً حياً في الاستدامة. إنها ليست مجرد قنوات للماء، بل هي تراث ثقافي غير مادي يجسد صمود الإنسان الأمازيغي وذكاءه في طيع الطبيعة القاسية لخدمة الحياة.`,
    contentFr: `Les Khettaras représentent l'un des systèmes hydrauliques traditionnels les plus anciens et les plus ingénieux au monde, constituant l'épine dorsale de la vie dans l'oasis de Tinghir. Cette technique repose sur le creusement d'une série de puits reliés par un tunnel souterrain incliné avec une précision extrême pour acheminer l'eau de la nappe phréatique au pied des montagnes vers les zones agricoles, sans aucune énergie mécanique, uniquement grâce à la gravité.

La particularité des Khettaras réside dans leur capacité phénoménale à protéger l'eau de l'évaporation, car elle coule dans des galeries souterraines à l'abri du soleil brûlant du désert. À Tinghir, les Khettaras ont joué un rôle central dans l'organisation sociale, sous la supervision de l"Amine du Ma" qui gérait la distribution équitable de l'eau selon le système de la "Nouba".

Aujourd'hui, face aux défis climatiques mondiaux, les Khettaras restent une leçon vivante de durabilité. Plus que de simples canaux d'irrigation, elles sont un patrimoine culturel immatériel témoignant du génie de l'homme amazigh pour s'adapter à un environnement aride.`,
    contentEn: `The Khettaras are among the oldest and smartest traditional hydraulic systems in the world, serving as the literal lifeblood of the Tinghir oasis. This technique involves digging a series of vertical shafts connected by a gently sloping underground tunnel that brings water from mountain aquifers to the oasis fields using nothing but gravity.

The genius of the Khettaras lies in their ability to transport water over long distances without evaporation, as the flow occurs deep beneath the scorching desert sun. In Tinghir, this system dictated the social structure of the oasis, with the "Water Master" overseeing the fair distribution of shares through the "Nouba" system, reflecting strong community values of solidarity.

Today, as the world faces climate challenges and water scarcity, the Khettaras stand as a living testament to sustainable resource management. They are not just irrigation canals; they are a piece of intangible cultural heritage representing the ingenuity of the Amazigh people in harmonizing with a harsh environment.`,
    image: "/images/blog/khettara.png",
    date: "2026-04-01",
    author: "Experiencia Group",
    tags: ["هندسة", "تراث"],
  },
  {
    id: "b6",
    title: "دور التعاونيات في الحفاظ على التراث والتمكين الاجتماعي",
    titleFr: "Le Rôle des Coopératives dans la Préservation du Patrimoine",
    titleEn: "The Role of Cooperatives in Heritage Preservation",
    excerpt: "تعرف على كيف تساهم التعاونيات المحلية في تنغير في حماية الحرف التقليدية ودعم الاقتصاد المحلي.",
    excerptFr: "Découvrez comment les coopératives locales protègent les arts traditionnels et l'économie.",
    excerptEn: "Learn how local cooperatives preserve traditional arts and support the local economy.",
    content: `تشكل التعاونيات في منطقة تنغير حلقة الوصل بين التراث الأمازيغي العريق ومتطلبات العصر الحديث. فهي ليست مجرد وحدات إنتاجية، بل هي مؤسسات اجتماعية تهدف بالأساس إلى حماية "الصنعة" التقليدية من الاندثار وتوفير حياة كريمة للصناع التقليديين، وخاصة النساء القرويات.

في قطاع النسيج، نجحت التعاونيات في الحفاظ على رموز الزربية الأمازيغية التي تعد لغة بصرية تحكي قصصاً من تاريخ المنطقة. وفي قطاع الفخار، ساهمت في تطوير تقنيات الإنتاج مع الحفاظ على المواد الطبيعية (الطين المحلي) والأصباغ النباتية. كما تلعب هذه المؤسسات دوراً حيوياً في تعليم الأجيال الصابة "سر المهنة"، مما يضمن استمرارية الذاكرة الثقافية.

إضافة إلى الجانب الثقافي، تساهم التعاونيات في التمكين المادي للمرأة في تنغير، حيث توفر لها منصة لبيع منتجاتها مباشرة للسياح والأسواق الدولية، مما يعزز من مكانتها داخل المجتمع ويساهم في تحقيق تنمية سياحية مستدامة تعود بالنفع المباشر على السكان المحليين.`,
    contentFr: `Les coopératives de Tinghir constituent le lien vital entre l'ancien héritage amazigh et les besoins de l'ère moderne. Plus que de simples unités de production, ce sont des institutions sociales visant à protéger les savoir-faire traditionnels de l'extinction tout en assurant une vie digne aux artisans, en particulier aux femmes rurales.

Dans le secteur du tissage, les coopératives ont réussi à préserver les symboles du tapis amazigh, véritable langage visuel racontant l'histoire de la région. En poterie, elles ont permis de moderniser les outils tout en gardant l'usage exclusif de l'argile locale et des pigments naturels. Ces structures jouent ainsi un rôle de "transmission" crucial pour les jeunes générations.

Au-delà de l'aspect culturel, les coopératives favorisent l'autonomisation économique des femmes à Tinghir, en leur offrant une plateforme pour vendre leurs créations directement aux visiteurs et sur les marchés internationaux, garantissant un tourisme durable et équitable.`,
    contentEn: `Cooperatives in the Tinghir region serve as the bridge between ancient Amazigh heritage and modern-day economic needs. They are more than production units; they are social institutions designed to protect traditional "know-how" from fading away while providing a dignified livelihood for local artisans, especially rural women.

In weaving, cooperatives have successfully preserved the rich symbolism of Amazigh carpets—a visual language that narrates the region's history. In pottery, they have helped refine production techniques while strictly maintaining the use of local clay and natural vegetable dyes. These organizations are vital for teaching the youth the "secrets of the trade."

Beyond culture, cooperatives foster women's economic empowerment in Tinghir. They offer a platform to sell products directly to tourists and international markets, strengthening the social status of artisans and ensuring that tourism results in direct benefits for the local community.`,
    image: "/images/blog/cooperative.png",
    date: "2026-03-28",
    author: "Experiencia Group",
    tags: ["مجتمع", "حرف"],
  },
  {
    id: "b7",
    title: "دليل زيارة Todra Gorge: كل ما يجب معرفته عن مضايق تودغا",
    titleFr: "Guide de Visite de Todra Gorge : Immersion dans le Canyon",
    titleEn: "Todra Gorge Visitor Guide: Essential Tips",
    excerpt: "خطط لرحلتك المثالية إلى واحد من أروع المناظر الطبيعية في المغرب، من التسلق إلى المشي في الواحة.",
    excerptFr: "Préparez votre voyage parfait dans l'un des paysages les plus spectaculaires du Maroc.",
    excerptEn: "Plan your perfect trip to one of Morocco's most breathtaking natural landscapes.",
    content: `يعد مضيق تودغا (Todra Gorge) من أشهر الوجهات السياحية في المغرب، حيث ترتفع الجدران الصخرية الشاهقة من الحجر الجيري إلى أكثر من 300 متر في بعض النقاط، مما يوفر مشهداً مهيباً يأسر الأنفاس. يمر عبر المضيق نهر تودغا الصافي، الذي يروي واحدة من أغنى الواحات في الجنوب.

للحصول على تجربة متكاملة، ننصح الزوار بالقيام بجولة مشي تبدأ من داخل المضيق صعوداً نحو "ممر البغال" القديم، والذي يوفر إطلالات بانورامية مذهلة على القمم الصخرية والواحة الخضراء في الأسفل. كما يعد المضيق وجهة عالمية لعشاق "تسلق الصخور"، مع مسارات تتراوح صعوبتها من المبتدئين إلى المحترفين.

توقيت الزيارة: أفضل وقت للاستمتاع بالهدوء هو في الصباح الباكر قبل وصول الحافلات السياحية الكبيرة. كما ننصح بالزيارة في فصلي الربيع والخريف حيث يكون الجو معتدلاً. تذكر دائماً احترام حرمة المنطقة الطبيعية ودعم المرشدين المحليين الذين يمتلكون معرفة عميقة بتاريخ وأساطير هذه الجدران الصخرية العظيمة.`,
    contentFr: `Les Gorges du Todgha sont une merveille géologique unique au Maroc. Les parois calcaires s'y élèvent verticalement à plus de 300 mètres, créant un corridor spectaculaire où coule l'eau cristalline de l'Oued Todgha, qui irrigue l'oasis luxuriante en contrebas.

Pour une immersion totale, commencez votre randonnée à l'aube par le "sentier des mules", un chemin ancestral offrant des vues panoramiques à couper le souffle sur le canyon et la palmeraie. Les Gorges sont aussi un spot de renommée mondiale pour l'escalade, avec des voies adaptées à tous les niveaux de pratique.

Conseils pratiques : Arrivez tôt pour profiter du silence de la roche avant l'afflux des visiteurs. Le printemps et l'automne sont les saisons idéales pour le climat. Pensez à solliciter des guides locaux pour découvrir les sentiers secrets et l'histoire fascinante de ce lieu sacré pour les tribus de la région.`,
    contentEn: `The Todra Gorge is a geological wonder of Morocco, where limestone cliffs tower more than 300 meters above the canyon floor. Through this massive corridor flows the crystal-clear Todra River, feeding one of the greenest oases in the southern Sahara region.

For the best experience, we recommend a hike starting at the base of the gorge up toward the ancient "mule trail," which offers breathtaking panoramic views of the rock formations and the river valley below. The Gorge is also a world-class destination for rock climbing, featuring hundreds of routes for all skill levels.

When to visit: Early morning is the best time to experience the majesty of the rocks in silence. Spring and Autumn offer the most comfortable weather for trekking. Remember to respect the natural site and consider hiring a local guide to learn the fascinating local legends and find the best hidden viewpoints.`,
    image: "/images/blog/todra.png",
    date: "2026-03-25",
    author: "Experiencia Group",
    tags: ["سياحة", "مغامرة"],
  },
  {
    id: "b4",
    title: "الحرف اليدوية: كنوز تنغير المخفية وجمالية الصنعة",
    titleFr: "L'Artisanat : Les Trésors Cachés de Tinghir",
    titleEn: "Handicrafts: Tinghir's Hidden Treasures",
    excerpt: "استكشف أسرار الصناعة التقليدية في تنغير، من نسيج الزرابي إلى صياغة الفضة والفخار.",
    excerptFr: "Explorez les secrets de l'artisanat local, du tissage à la poterie traditionnelle.",
    excerptEn: "Explore the secrets of local craftsmanship, from carpet weaving to silver and pottery.",
    content: `تعتبر الحرف اليدوية في تنغير مرآة تعكس الروح الإبداعية للأمازيغ وارتباطهم الوثيق بالأرض. في كل شارع ضيق من شوارع القصبات القديمة، يمكنك سماع صوت أدوات الحرفيين الذين يبدعون في تحويل المواد الخام إلى قطع فنية مذهلة.

النسيج هو سيد الحرف هنا، حيث تتفنن النساء في حياكة "أدوار" (الزرابي) بألوان مستخلصة من الحناء والزعفران وقشور الرمان. كل نقشة في الزربية هي رمز له دلالة عميقة تتعلق بالخصوبة، الحماية، أو الهوية. صياغة الفضة أيضاً حرفة عريقة في تنغير، حيث تشتهر المنطقة بـ "تاج" و"الخلالة" المزينة بالأحجار الكريمة المحلية.

زيارة "حي الحرفيين" هي رحلة تعليمية وتثقيفية، حيث يمكنك رؤية معلمي الفخار وهم يشكلون الطين بأيديهم العارية على عجلات دوارة تقليدية. شراء هذه المنتجات ليس مجرد اقتناء لتذكار، بل هو دعم مباشر للحفاظ على مهارات بشرية نادرة لا يمكن تعويضها بالصناعات الآلية الحديثة.`,
    contentFr: `L'artisanat de Tinghir est le miroir de l'âme créatrice amazighe et de son lien profond avec la terre. Dans chaque ruelle des anciennes Kasbahs, résonne le bruit des outils transformant les matières brutes en véritables chefs-d'œuvre.

Le tissage est l'art majeur ici; les tisseuses créent des tapis dont les couleurs sont extraites du henné, du safran ou des écorces de grenade. Chaque motif géométrique est un symbole de fertilité, de protection ou d'identité. L'orfèvrerie d'argent est aussi une spécialité réputée, notamment pour les parures traditionnelles ornées de pierres locales.

Une visite au quartier des artisans est une leçon vivante de culture. Acheter ces produits n'est pas seulement acquérir un souvenir, c'est soutenir directement la survie de savoir-faire ancestraux et humains que les machines modernes ne pourront jamais remplacer.`,
    contentEn: `Craftsmanship in Tinghir is a window into the creative soul of the Amazigh people and their deep connection to the Earth. In the Narrow alleys of the old Kasbahs, the sounds of artisans turning raw materials into art pieces still resonate.

Weaving is the hallmark of the region, where women create intricate carpets using natural dyes from henna, saffron, and pomegranate. Every pattern is a symbol—representing fertility, protection, or tribal identity. Silversmithing is another ancient trade, famous for creating traditional jewelry adorned with local semi-precious stones.

Visiting the "artisan quarter" is an educational journey through time. Buying these handmade products is more than just getting a souvenir; it is a direct contribution to preserving rare human skills that modern machinery can never replicate.`,
    image: "/images/blog/crafts.png",
    date: "2026-03-20",
    author: "Experiencia Group",
    tags: ["فن", "ثقافة"],
  },
];

export const mapLocations: MapLocation[] = [
  { id: "m1", name: "مضيق تودغا", nameFr: "Gorges du Todgha", nameEn: "Todgha Gorge", lat: 31.5889, lng: -5.5703, type: "nature", emoji: "🏔️" },
  { id: "m2", name: "واحة تنغير", nameFr: "Oasis de Tinghir", nameEn: "Tinghir Oasis", lat: 31.5147, lng: -5.5328, type: "nature", emoji: "🌴" },
  { id: "m3", name: "قصبة تنغير", nameFr: "Kasbah de Tinghir", nameEn: "Tinghir Kasbah", lat: 31.5125, lng: -5.5312, type: "heritage", emoji: "🏰" },
  { id: "m4", name: "سوق تنغير", nameFr: "Souk de Tinghir", nameEn: "Tinghir Souk", lat: 31.5135, lng: -5.5295, type: "shopping", emoji: "🛍️" },
  { id: "m5", name: "حي الحرفيين", nameFr: "Quartier des Artisans", nameEn: "Artisans Quarter", lat: 31.5110, lng: -5.5340, type: "culture", emoji: "🎨" },
  { id: "m6", name: "جبل صاغرو", nameFr: "Jbel Saghro", nameEn: "Jbel Saghro", lat: 31.3500, lng: -5.8500, type: "adventure", emoji: "⛰️" },
  { id: "m7", name: "بحيرة إيسلي", nameFr: "Lac Isli", nameEn: "Lake Isli", lat: 31.7000, lng: -5.6300, type: "nature", emoji: "💧" },
  { id: "m8", name: "القصر القديم", nameFr: "Ancien Ksar", nameEn: "Old Ksar", lat: 31.5150, lng: -5.5280, type: "heritage", emoji: "🕌" },
];
