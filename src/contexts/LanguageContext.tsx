import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "ar" | "fr" | "en";

const translations = {
  // Nav - Tourist
  activities: { ar: "الأنشطة", fr: "Activités", en: "Activities" },
  accommodation: { ar: "الإقامة", fr: "Hébergement", en: "Accommodation" },
  transport: { ar: "النقل", fr: "Transport", en: "Transport" },
  marketplace: { ar: "السوق", fr: "Marché", en: "Marketplace" },
  myBookings: { ar: "حجوزاتي", fr: "Mes réservations", en: "My Bookings" },
  hello: { ar: "مرحباً،", fr: "Bonjour,", en: "Hello," },
  logout: { ar: "خروج", fr: "Déconnexion", en: "Logout" },

  // Nav - Host
  dashboard: { ar: "لوحة التحكم", fr: "Tableau de bord", en: "Dashboard" },
  addActivity: { ar: "إضافة نشاط", fr: "Ajouter activité", en: "Add Activity" },
  manageActivities: { ar: "إدارة الأنشطة", fr: "Gérer les activités", en: "Manage Activities" },
  addProduct: { ar: "إضافة منتج", fr: "Ajouter produit", en: "Add Product" },
  addBlogPost: { ar: "إضافة مقال", fr: "Ajouter un blog", en: "Add Blog Post" },
  overview: { ar: "نظرة عامة", fr: "Aperçu", en: "Overview" },
  users: { ar: "المستخدمين", fr: "Utilisateurs", en: "Users" },
  hostPanel: { ar: "لوحة مقدم الخدمة", fr: "Panneau hôte", en: "Host Panel" },

  // Tourist Home
  discoverTinghir: { ar: "اكتشف تنغير", fr: "Découvrez Tinghir", en: "Discover Tinghir" },
  heroSubtitle: { ar: "مغامرات أصيلة في قلب مضيق تودغا وجبال الأطلس", fr: "Aventures authentiques au cœur des gorges du Todgha et de l'Atlas", en: "Authentic adventures in the heart of Todgha Gorge and Atlas Mountains" },
  searchPlaceholder: { ar: "ابحث عن نشاط...", fr: "Rechercher une activité...", en: "Search for an activity..." },
  maxPrice: { ar: "الحد الأقصى:", fr: "Prix max:", en: "Max price:" },
  withGuide: { ar: "مع مرشد", fr: "Avec guide", en: "With guide" },
  noResults: { ar: "لا توجد أنشطة مطابقة للبحث", fr: "Aucune activité trouvée", en: "No matching activities found" },
  currency: { ar: "د.م", fr: "MAD", en: "MAD" },
  tryAdjustFilters: { ar: "حاول تعديل فلاتر البحث أو كلمة البحث", fr: "Essayez d'ajuster vos filtres ou votre terme de recherche", en: "Try adjusting your filters or search term" },
  clearFilters: { ar: "مسح الفلاتر", fr: "Effacer les filtres", en: "Clear filters" },
  authenticExperiences: { ar: "تجارب أصيلة 🇲🇦", fr: "Expériences Authentiques 🇲🇦", en: "Authentic Experiences 🇲🇦" },
  visitors: { ar: "زائر", fr: "Visiteurs", en: "Visitors" },

  // Categories
  all: { ar: "الكل", fr: "Tout", en: "All" },
  cooking: { ar: "طبخ", fr: "Cuisine", en: "Cooking" },
  hiking: { ar: "مشي", fr: "Randonnée", en: "Hiking" },
  climbing: { ar: "تسلق", fr: "Escalade", en: "Climbing" },
  cycling: { ar: "دراجات", fr: "Vélo", en: "Cycling" },
  rafting: { ar: "رافتينغ", fr: "Rafting", en: "Rafting" },
  quad: { ar: "كواد", fr: "Quad", en: "Quad" },
  camping: { ar: "تخييم", fr: "Camping", en: "Camping" },
  horseRiding: { ar: "ركوب الخيل", fr: "Équitation", en: "Horse Riding" },
  camelRiding: { ar: "ركوب الجمال", fr: "Promenade à chameau", en: "Camel Riding" },
  pottery: { ar: "فخار", fr: "Poterie", en: "Pottery" },
  weaving: { ar: "نسيج", fr: "Tissage", en: "Weaving" },

  // Activity Details
  activityNotFound: { ar: "النشاط غير موجود", fr: "Activité introuvable", en: "Activity not found" },
  backToHome: { ar: "العودة للرئيسية", fr: "Retour à l'accueil", en: "Back to home" },
  back: { ar: "رجوع", fr: "Retour", en: "Back" },
  withTourGuide: { ar: "مع مرشد سياحي", fr: "Avec guide touristique", en: "With tour guide" },
  rating: { ar: "التقييم", fr: "Note", en: "Rating" },
  duration: { ar: "المدة", fr: "Durée", en: "Duration" },
  location: { ar: "الموقع", fr: "Lieu", en: "Location" },
  guide: { ar: "المرشد", fr: "Guide", en: "Guide" },
  available: { ar: "متوفر", fr: "Disponible", en: "Available" },
  notAvailable: { ar: "غير متوفر", fr: "Non disponible", en: "Not available" },
  perPerson: { ar: "د.م / شخص", fr: "MAD / personne", en: "MAD / person" },
  date: { ar: "التاريخ", fr: "Date", en: "Date" },
  numberOfPersons: { ar: "عدد الأشخاص", fr: "Nombre de personnes", en: "Number of persons" },
  persons: { ar: "أشخاص", fr: "personnes", en: "persons" },
  total: { ar: "المجموع", fr: "Total", en: "Total" },
  bookNow: { ar: "احجز الآن", fr: "Réserver maintenant", en: "Book Now" },
  selectDate: { ar: "يرجى اختيار التاريخ", fr: "Veuillez sélectionner une date", en: "Please select a date" },
  bookingSuccess: { ar: "تم الحجز بنجاح! 🎉", fr: "Réservation réussie ! 🎉", en: "Booking successful! 🎉" },

  // Accommodation
  accommodationTitle: { ar: "الإقامة في تنغير", fr: "Hébergement à Tinghir", en: "Accommodation in Tinghir" },
  accommodationSubtitle: { ar: "اختر من بين فنادق ومنازل تقليدية أصيلة", fr: "Choisissez parmi des hôtels et maisons traditionnelles", en: "Choose from hotels and traditional homes" },
  perNight: { ar: "د.م / ليلة", fr: "MAD / nuit", en: "MAD / night" },
  book: { ar: "احجز", fr: "Réserver", en: "Book" },
  hotel: { ar: "فندق", fr: "Hôtel", en: "Hotel" },
  home: { ar: "منزل", fr: "Maison", en: "Home" },

  // Transport
  transportTitle: { ar: "النقل والتنقل", fr: "Transport et déplacements", en: "Transport & Travel" },
  transportSubtitle: { ar: "خدمات نقل مريحة وآمنة لاستكشاف المنطقة", fr: "Services de transport confortables et sûrs", en: "Comfortable and safe transport services" },
  perDay: { ar: "د.م / يوم", fr: "MAD / jour", en: "MAD / day" },
  carRental: { ar: "كراء سيارة", fr: "Location de voiture", en: "Car Rental" },
  touristTransport: { ar: "نقل سياحي", fr: "Transport touristique", en: "Tourist Transport" },

  // Marketplace
  marketplaceTitle: { ar: "سوق المنتجات المحلية", fr: "Marché des produits locaux", en: "Local Products Market" },
  marketplaceSubtitle: { ar: "منتجات تعاونيات أصيلة من قلب تنغير", fr: "Produits de coopératives authentiques de Tinghir", en: "Authentic cooperative products from Tinghir" },
  buy: { ar: "شراء", fr: "Acheter", en: "Buy" },

  // My Bookings
  myBookingsTitle: { ar: "حجوزاتي", fr: "Mes réservations", en: "My Bookings" },
  trackBookings: { ar: "تتبع جميع حجوزاتك هنا", fr: "Suivez toutes vos réservations ici", en: "Track all your bookings here" },
  noBookings: { ar: "لا توجد حجوزات بعد", fr: "Aucune réservation", en: "No bookings yet" },
  startExploring: { ar: "ابدأ باكتشاف الأنشطة واحجز تجربتك الأولى!", fr: "Explorez les activités et réservez votre première expérience !", en: "Start exploring activities and book your first experience!" },
  deletedActivity: { ar: "نشاط محذوف", fr: "Activité supprimée", en: "Deleted activity" },
  confirmed: { ar: "مؤكد", fr: "Confirmé", en: "Confirmed" },
  pending: { ar: "قيد الانتظار", fr: "En attente", en: "Pending" },
  cancelled: { ar: "ملغى", fr: "Annulé", en: "Cancelled" },

  // Host Dashboard
  welcomeHost: { ar: "مرحباً،", fr: "Bienvenue,", en: "Welcome," },
  activitySummary: { ar: "إليك ملخص نشاطك", fr: "Voici le résumé de votre activité", en: "Here's your activity summary" },
  activitiesStat: { ar: "الأنشطة", fr: "Activités", en: "Activities" },
  bookingsStat: { ar: "الحجوزات", fr: "Réservations", en: "Bookings" },
  productsStat: { ar: "المنتجات", fr: "Produits", en: "Products" },
  revenueStat: { ar: "الإيرادات", fr: "Revenus", en: "Revenue" },
  recentBookings: { ar: "آخر الحجوزات", fr: "Dernières réservations", en: "Recent Bookings" },
  noBookingsYet: { ar: "لا توجد حجوزات بعد", fr: "Aucune réservation", en: "No bookings yet" },

  // Add Activity
  addNewActivity: { ar: "إضافة نشاط جديد", fr: "Ajouter une nouvelle activité", en: "Add New Activity" },
  addActivitySubtitle: { ar: "أضف نشاطاً سياحياً جديداً لعرضه للسياح", fr: "Ajoutez une nouvelle activité touristique", en: "Add a new tourist activity for visitors" },
  activityTitle: { ar: "عنوان النشاط", fr: "Titre de l'activité", en: "Activity Title" },
  activityTitlePlaceholder: { ar: "مثال: جولة في مضيق تودغا", fr: "Ex: Tour des gorges du Todgha", en: "E.g.: Todgha Gorge Tour" },
  description: { ar: "الوصف", fr: "Description", en: "Description" },
  descriptionPlaceholder: { ar: "وصف تفصيلي للنشاط...", fr: "Description détaillée...", en: "Detailed description..." },
  type: { ar: "النوع", fr: "Type", en: "Type" },
  price: { ar: "السعر (د.م)", fr: "Prix (MAD)", en: "Price (MAD)" },
  withTourGuideCheckbox: { ar: "مع مرشد سياحي", fr: "Avec guide touristique", en: "With tour guide" },
  defaultImageNote: { ar: "سيتم استخدام صورة افتراضية حسب النوع", fr: "Une image par défaut sera utilisée selon le type", en: "A default image will be used based on type" },
  addActivityBtn: { ar: "إضافة النشاط", fr: "Ajouter l'activité", en: "Add Activity" },
  activityAdded: { ar: "تم إضافة النشاط بنجاح! ✅", fr: "Activité ajoutée avec succès ! ✅", en: "Activity added successfully! ✅" },

  // Add Product
  addNewProduct: { ar: "إضافة منتج جديد", fr: "Ajouter un nouveau produit", en: "Add New Product" },
  addProductSubtitle: { ar: "أضف منتجاً من منتجات التعاونية", fr: "Ajoutez un produit de la coopérative", en: "Add a cooperative product" },
  productName: { ar: "اسم المنتج", fr: "Nom du produit", en: "Product Name" },
  productNamePlaceholder: { ar: "مثال: عسل الجبال", fr: "Ex: Miel de montagne", en: "E.g.: Mountain Honey" },
  productDescPlaceholder: { ar: "وصف المنتج...", fr: "Description du produit...", en: "Product description..." },
  category: { ar: "الفئة", fr: "Catégorie", en: "Category" },
  honey: { ar: "عسل", fr: "Miel", en: "Honey" },
  carpets: { ar: "زرابي", fr: "Tapis", en: "Carpets" },
  traditionalProducts: { ar: "منتجات تقليدية", fr: "Produits traditionnels", en: "Traditional Products" },
  defaultImage: { ar: "سيتم استخدام صورة افتراضية", fr: "Une image par défaut sera utilisée", en: "A default image will be used" },
  addProductBtn: { ar: "إضافة المنتج", fr: "Ajouter le produit", en: "Add Product" },
  productAdded: { ar: "تم إضافة المنتج بنجاح! ✅", fr: "Produit ajouté avec succès ! ✅", en: "Product added successfully! ✅" },

  // Manage Activities
  manageTitle: { ar: "إدارة الأنشطة والمنتجات", fr: "Gérer les activités et produits", en: "Manage Activities & Products" },
  manageSubtitle: { ar: "تعديل أو حذف الأنشطة والمنتجات الخاصة بك", fr: "Modifier ou supprimer vos activités et produits", en: "Edit or delete your activities and products" },
  newActivity: { ar: "+ نشاط جديد", fr: "+ Nouvelle activité", en: "+ New Activity" },
  noActivitiesYet: { ar: "لا توجد أنشطة بعد. أضف نشاطك الأول!", fr: "Aucune activité. Ajoutez la première !", en: "No activities yet. Add your first!" },
  noProductsYet: { ar: "لا توجد منتجات بعد.", fr: "Aucun produit.", en: "No products yet." },
  delete: { ar: "حذف", fr: "Supprimer", en: "Delete" },
  activityDeleted: { ar: "تم حذف النشاط", fr: "Activité supprimée", en: "Activity deleted" },
  productDeleted: { ar: "تم حذف المنتج", fr: "Produit supprimé", en: "Product deleted" },

  // Login
  login: { ar: "تسجيل الدخول", fr: "Connexion", en: "Login" },
  register: { ar: "إنشاء حساب جديد", fr: "Créer un compte", en: "Create Account" },
  welcomeBack: { ar: "مرحباً بعودتك", fr: "Bon retour !", en: "Welcome back" },
  joinUs: { ar: "انضم إلينا واكتشف تنغير", fr: "Rejoignez-nous et découvrez Tinghir", en: "Join us and discover Tinghir" },
  fullName: { ar: "الاسم الكامل", fr: "Nom complet", en: "Full Name" },
  email: { ar: "البريد الإلكتروني", fr: "Email", en: "Email" },
  password: { ar: "كلمة المرور", fr: "Mot de passe", en: "Password" },
  accountType: { ar: "نوع الحساب", fr: "Type de compte", en: "Account Type" },
  tourist: { ar: "🌍 سائح", fr: "🌍 Touriste", en: "🌍 Tourist" },
  host: { ar: "🏡 مقدم خدمة", fr: "🏡 Hôte", en: "🏡 Host" },
  createAccount: { ar: "إنشاء الحساب", fr: "Créer le compte", en: "Create Account" },
  enter: { ar: "دخول", fr: "Se connecter", en: "Sign In" },
  hasAccount: { ar: "لديك حساب بالفعل؟", fr: "Vous avez déjà un compte ?", en: "Already have an account?" },
  welcomeBackLogin: { ar: "مرحباً بعودتك إلى إكسبرينسيا تنغير", fr: "Ravi de vous revoir sur Experiencia", en: "Welcome back to Experiencia Tinghir" },
  loginSubtitle: { ar: "سجل دخولك لإدارة حجوزاتك وتجاربك الثقافية.", fr: "Connectez-vous pour gérer vos séjours et découvertes.", en: "Sign in to manage your local stays and cultural experiences." },
  noAccount: { ar: "جديد في مجتمعنا؟", fr: "Nouveau parmi nous ?", en: "New to our community?" },
  loginLink: { ar: "سجل دخولك الآن", fr: "Se connecter ici", en: "Sign in now" },
  registerLink: { ar: "إنشاء حساب جديد", fr: "Rejoindre l'aventure", en: "Join the Adventure" },
  alreadyMember: { ar: "لديك حساب بالفعل؟", fr: "Déjà membre ?", en: "Already a member?" },
  demoAccounts: { ar: "حسابات تجريبية:", fr: "Comptes de démonstration :", en: "Demo accounts:" },
  demoTourist: { ar: "سائح: tourist@test.com / 123456", fr: "Touriste : tourist@test.com / 123456", en: "Tourist: tourist@test.com / 123456" },
  demoHost: { ar: "مقدم خدمة: host@test.com / 123456", fr: "Hôte : host@test.com / 123456", en: "Host: host@test.com / 123456" },
  accountCreated: { ar: "تم إنشاء الحساب بنجاح!", fr: "Compte créé avec succès !", en: "Account created successfully!" },
  emailExists: { ar: "البريد الإلكتروني مستخدم بالفعل", fr: "Email déjà utilisé", en: "Email already in use" },
  welcomeToast: { ar: "مرحباً بك!", fr: "Bienvenue !", en: "Welcome!" },
  continueWith: { ar: "أو المتابعة باستخدام", fr: "Ou continuer avec", en: "Or continue with" },
  invalidCredentials: { ar: "بيانات الدخول غير صحيحة", fr: "Identifiants incorrects", en: "Invalid credentials" },
  heroLoginSubtitle: { ar: "اكتشف جمال تنغير — مغامرات لا تُنسى في قلب المغرب", fr: "Découvrez la beauté de Tinghir — aventures inoubliables au cœur du Maroc", en: "Discover the beauty of Tinghir — unforgettable adventures in the heart of Morocco" },
  
  // Auth Redesign Extra
  cooperative: { ar: "🤝 تعاونية", fr: "🤝 Coopérative", en: "🤝 Cooperative" },
  guideRole: { ar: "🗺️ مرشد", fr: "🗺️ Guide", en: "🗺️ Guide" },
  adminRole: { ar: "🛡️ مدير", fr: "🛡️ Admin", en: "🛡️ Admin" },
  acceptTermsRequired: { ar: "يرجى الموافقة على الشروط والأحكام", fr: "Veuillez accepter les conditions générales", en: "Please accept the terms and conditions" },
  joinCommunity: { ar: "انضم إلى أكثر من 1,000 مستكشف محلي", fr: "Rejoignez plus de 1 000 explorateurs locaux", en: "Join 1,000+ local explorers" },
  everyTripStory: { ar: "كل رحلة..", fr: "Chaque voyage...", en: "Every Trip..." },
  hasStory: { ar: "لها حكاية", fr: "a une histoire.", en: "Has a story." },
  heroLivingSubtitle: { ar: "اكتشف الجمال الخفي لجبال الأطلس وروح واحات النخيل من خلال تجارب محلية أصيلة.", fr: "Découvrez la beauté cachée de l'Atlas et l'âme des palmerais à travers des expériences locales.", en: "Discover the hidden beauty of the Atlas and the soul of the palm groves through local experiences." },
  verifiedHosts: { ar: "مضيفون معتمدون", fr: "Hôtes vérifiés", en: "Verified Hosts" },
  support247: { ar: "دعم 24/7", fr: "Support 24/7", en: "24/7 Support" },
  localImpact: { ar: "تأثير محلي", fr: "Impact local", en: "Local Impact" },
  selectRole: { ar: "اختر نوع حسابك", fr: "Sélectionnez votre rôle", en: "Select your role" },
  demoShortcuts: { ar: "اختصارات تجريبية", fr: "Raccourcis démo", en: "Demo Shortcuts" },
  backToLogin: { ar: "العودة لتسجيل الدخول", fr: "Retour à la connexion", en: "Back to Login" },
  fullNamePlaceholder: { ar: "الاسم الكامل", fr: "Nom complet", en: "Full Name" },
  emailPlaceholder: { ar: "عنوان البريد الإلكتروني", fr: "Adresse e-mail", en: "Email working address" },
  passwordPlaceholder: { ar: "كلمة مرور آمنة", fr: "Mot de passe sécurisé", en: "Secure password" },
  agreeToTerms: { ar: "أوافق على", fr: "J'accepte les", en: "I agree to the" },
  termsLink: { ar: "الشروط والأحكام", fr: "Conditions générales", en: "Terms & Conditions" },
  privacyAnd: { ar: "وسياسة الخصوصية لـ Experiencia Tinghir", fr: "et la politique de confidentialité d'Experiencia Tinghir", en: "and the privacy policy of Experiencia Tinghir." },


  loading: { ar: "جاري التحميل...", fr: "Chargement...", en: "Loading..." },

  // Auth Verification
  verifyEmail: { ar: "تأكيد الحساب", fr: "Vérifier l'e-mail", en: "Verify Email" },
  verifySubtitle: { ar: "لقد أرسلنا رمز التأكيد المكون من 6 أرقام إلى", fr: "Nous avons envoyé un code de vérification à 6 chiffres à", en: "We've sent a 6-digit verification code to" },
  enterOtp: { ar: "أدخل رمز التأكيد", fr: "Entrez le code OTP", en: "Enter verification code" },
  verifyBtn: { ar: "تأكيد ومتابعة", fr: "Vérifier et continuer", en: "Verify & Continue" },
  resendCode: { ar: "إعادة إرسال الرمز", fr: "Renvoyer le code", en: "Resend Code" },
  resendIn: { ar: "إعادة الإرسال خلال {s} ثانية", fr: "Renvoyer dans {s}s", en: "Resend in {s}s" },
  codeSent: { ar: "تم إرسال رمز جديد!", fr: "Nouveau code envoyé !", en: "New code sent!" },
  backToLoginOtp: { ar: "العودة لتسجيل الدخول", fr: "Retour à la connexion", en: "Back to login" },
  otpRequired: { ar: "يرجى إدخال رمز التأكيد كاملاً", fr: "Veuillez entrer le code كامل", en: "Please enter a complete code" },
  otpInvalid: { ar: "رمز التأكيد غير صحيح", fr: "Code invalide", en: "Invalid verification code" },

  // Validation & Helpers
  invalidEmail: { ar: "بريد إلكتروني غير صالح", fr: "E-mail invalide", en: "Invalid email" },
  passwordTooShort: { ar: "كلمة المرور قصيرة جداً (6 رموز على الأقل)", fr: "Mot de passe trop court (min 6)", en: "Password too short (min 6 chars)" },
  fieldRequired: { ar: "هذا الحقل مطلوب", fr: "Ce champ est obligatoire", en: "This field is required" },
  accessDemo: { ar: "دخول تجريبي", fr: "Accès démo", en: "Access Demo" },
  quickAccess: { ar: "دخول سريع", fr: "Accès rapide", en: "Quick Access" },

  // Welcome Gate
  welcomeTitle: { ar: "اكتشف جمال تنغير", fr: "Découvrez la beauté de Tinghir", en: "Discover the Beauty of Tinghir" },
  welcomeSubtitle: { ar: "يرجى اختيار نوع الحساب للمتابعة", fr: "Veuillez choisir votre profil pour continuer", en: "Please select your profile to continue" },
  imTourist: { ar: "أنا زائر / مسافر 🌍", fr: "Je suis un voyageur 🌍", en: "I am a traveler 🌍" },
  imHost: { ar: "أنا شريك / مضيف 🏡", fr: "Je suis un hôte local 🏡", en: "I am a local host 🏡" },
  
  // Footer
  footerDiscover: { ar: "اكتشف", fr: "Découvrir", en: "Discover" },
  footerCompany: { ar: "الشركة", fr: "Entreprise", en: "Company" },
  footerContact: { ar: "اتصل بنا", fr: "Contact", en: "Contact" },
  footerTagline: { ar: "تجارب أصيلة في قلب تنغير.", fr: "Expériences authentiques au cœur de Tinghir.", en: "Authentic experiences in the heart of Tinghir." },
  aboutUs: { ar: "من نحن", fr: "À propos", en: "About Us" },
  privacyPolicy: { ar: "سياسة الخصوصية", fr: "Confidentialité", en: "Privacy Policy" },
  termsConditions: { ar: "الشروط والأحكام", fr: "Conditions générales", en: "Terms & Conditions" },
  emailLabel: { ar: "البريد الإلكتروني", fr: "Email", en: "Email" },
  phoneLabel: { ar: "الهاتف", fr: "Téléphone", en: "Phone" },
  addressLabel: { ar: "العنوان", fr: "Adresse", en: "Address" },
  tinghirMorocco: { ar: "تنغير، المغرب", fr: "Tinghir, Maroc", en: "Tinghir, Morocco" },
} as const;

type TranslationKey = keyof typeof translations;

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem("experiencia_lang") as Lang) || "ar";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("experiencia_lang", l);
  };

  const t = (key: TranslationKey): string => {
    return translations[key]?.[lang] || translations[key]?.["ar"] || key;
  };

  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};
