export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  tag: string;
  gradient: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'new_phones' | 'used_phones' | 'accessories' | 'screens_parts';
  categoryLabel: string;
  brand?: string; // 'apple' | 'samsung' | 'xiaomi' | 'realme' | 'oppo' | 'infinix' | 'huawei' | 'other'
  price: number;
  priceFormatted: string;
  imageUrl: string;
  images?: string[];
  description?: string;
  condition: 'جديد بالضمان' | 'كسر زيرو فحص كامل' | 'أصلي 100%' | 'جودة فائقة';
  features: string[];
  isPopular?: boolean;
  highlight?: string;
  isUserAdded?: boolean;
}

export const PRESET_PRODUCT_IMAGES = [
  {
    label: 'آيفون حديث (iPhone Pro)',
    url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80',
    category: 'new_phones'
  },
  {
    label: 'سامسونج جلاكسي (Samsung Galaxy)',
    url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=80',
    category: 'new_phones'
  },
  {
    label: 'شاومي وريدمي (Xiaomi / Redmi)',
    url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80',
    category: 'new_phones'
  },
  {
    label: 'آيفون كسر زيرو (Used iPhone)',
    url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=700&q=80',
    category: 'used_phones'
  },
  {
    label: 'شاحن GaN وكابل مدرع',
    url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80',
    category: 'accessories'
  },
  {
    label: 'مبرد هواتف للجيمنج (Gaming Cooler)',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80',
    category: 'accessories'
  },
  {
    label: 'سماعات إيربودز لاسلكية',
    url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80',
    category: 'accessories'
  },
  {
    label: 'شاشة حماية وباغة زجاجية',
    url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=700&q=80',
    category: 'screens_parts'
  }
];

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  serviceUsed: string;
  comment: string;
}

export const SHOP_INFO = {
  name: 'سليم النور فون',
  subName: 'النور فون لخدمات المحمول',
  fullName: 'سليم النور فون / النور فون لخدمات المحمول',
  manager: 'أسامة موسى',
  managerRole: 'المدير العام والمسؤول الفني',
  phone: '01003075071',
  phoneRaw: '01003075071',
  phoneInternational: '+201003075071',
  whatsappUrl: 'https://wa.me/201003075071',
  address: {
    governorate: 'الدقهلية',
    city: 'مدينة الكردي',
    square: 'ميدان المحطة',
    landmark: 'بجوار قسم الشرطة - أسفل عيادة الدكتور وائل سلامة',
    full: 'مدينة الكردي - ميدان المحطة - بجوار قسم الشرطة (أسفل عيادة الدكتور وائل سلامة)',
    mapsQuery: 'https://www.google.com/maps/search/?api=1&query=مدينة+الكردي+ميدان+المحطة+الدقهلية'
  },
  workingHours: {
    days: 'يومياً طوال أيام الأسبوع',
    hours: 'من 10:00 صباحاً حتى 11:30 مساءً',
    fridayHours: 'الجمعة من 1:30 ظهراً حتى 11:30 مساءً'
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'phones-sales',
    title: 'بيع الهواتف الذكية (جديد ومستعمل)',
    subtitle: 'كاش وبالتقسيط المريح وبأفضل سعر في الكردي',
    description: 'نوفر أحدث الهواتف الذكية الأصلية من كبرى الشركات العالمية (آبل، سامسونج، شاومي، ريلمي، إنفينكس، أوبو) جديدة بالضمان، بالإضافة إلى تشكيلة منتقاة بعناية من الهواتف كسر زيرو المفحوصة بدقة.',
    icon: 'Smartphone',
    tag: 'كاش وتقسيط ميسر',
    gradient: 'from-amber-500/20 to-yellow-600/10',
    features: [
      'هواتف جديدة بضمان الوكلاء المعتمدين في مصر',
      'تسهيلات بيع مريحة تناسب جميع الفئات كاش وبالتقسيط',
      'أجهزة مستعملة كسر زيرو خالية من أي عيوب أو صيانة سابقة',
      'إمكانية استبدال هاتفك القديم بأحدث موديل وبفارق سعر عادل'
    ]
  },
  {
    id: 'screens-repair',
    title: 'تركيب شاشات الموبايل والباغات',
    subtitle: 'أعلى خامات أصلية وضمان كتابي ضد عيوب الصناعة',
    description: 'متخصصون في تغيير وتركيب شاشات الهواتف الأصلية وشاشات التوكيل (OLED, AMOLED, Super Retina, IPS) بدقة بالغة مع الحفاظ الكامل على خاصية الترو تون وبصمة الإصبع ووضوح الألوان الأصلي.',
    icon: 'Layers',
    tag: 'شاشات وكالة وضمان',
    gradient: 'from-amber-600/20 to-orange-600/10',
    features: [
      'تغيير باغات الزجاج الخارجية مع الحفاظ على الشاشة الأصلية لتوفير التكلفة',
      'شاشات أصلية تضمن سلاسة اللمس وسرعة التردد (120Hz/90Hz)',
      'تركيب فوري أمام العميل بأحدث مكابس الشاشات والفاكيوم المطور',
      'ضمان شامل بعد التركيب للتأكد من راحة البال'
    ]
  },
  {
    id: 'original-accessories',
    title: 'الإكسسوارات الأصلية ومستلزمات الجيمنج',
    subtitle: 'شواحن سريعة، مبردات، سماعات، وجوارب حماية',
    description: 'كل ما يحتاجه هاتفك من إكسسوارات أصلية 100% معتمدة لحماية بطارية هاتفك وجهازه من التلف، وتجربة ألعاب لا مثيل لها بدون سخونة أو تقطيع.',
    icon: 'Headphones',
    tag: 'أصلي 100%',
    gradient: 'from-yellow-500/20 to-amber-700/10',
    features: [
      'شواحن سريعة معتمدة (GaN, PD 65W/33W/20W) وكابلات ضد القطع',
      'مبردات هواتف مائية ومغناطيسية للجيمنج والبث المباشر (Fan Coolers)',
      'سماعات لاسلكية وسلكية بأعلى نقاء صوت وعزل ضوضاء',
      'جرابات أصلية ضد الصدمات ولاصقات شاشة حرارية 9D وبنفسجية لحماية العين'
    ]
  },
  {
    id: 'software-services',
    title: 'خدمات السوفت وير وشحن ودفع الفواتير',
    subtitle: 'حلول برمجية رسمية وسريعة للمدفوعات الرقمية',
    description: 'مركزك المعتمد لتحديث أنظمة الهواتف، نقل البيانات والنسخ الاحتياطي بأمان تام وسرية، بالإضافة إلى خدمات الدفع الإلكتروني وشحن الرصيد والتحويلات المالية الفورية.',
    icon: 'Cpu',
    tag: 'برمجيات ودفع فوري',
    gradient: 'from-amber-500/20 to-zinc-800/40',
    features: [
      'تحديث وترقية النظام الرسمي الآمن ونقل الصور والأسماء بسرية تامة',
      'حل مشاكل بطء الأجهزة وتهنيج النظام وإعادة تهيئة الهاتف بكفاءة',
      'خدمات شحن جميع الشبكات (فودافون، أورنج، اتصالات، وي) ودفع الفواتير',
      'تحويل واستقبال الأموال عبر المحافظ الإلكترونية وكاش فوراً'
    ]
  }
];

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'p1',
    name: 'سلسلة آيفون الحديثة (iPhone 16 / 15 Pro Max)',
    category: 'new_phones',
    categoryLabel: 'تلفونات جديدة',
    brand: 'apple',
    price: 48500,
    priceFormatted: '48,500 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'أحدث هواتف آبل بتصميم التيتانيوم فائق المتانة مع معالج A17 Pro الجبار ونظام كاميرات احترافي 48 ميجابكسل وتقريب بصري حتى 5x. الجهاز جديد تماماً بتغليف المصنع الأصلي مع ضمان محلي ودولي، ويدعم الشحن اللاسلكي والشريحة الإلكترونية ومقاومة الماء والغبار بمعيار IP68.',
    condition: 'جديد بالضمان',
    isPopular: true,
    highlight: 'أفضل عروض الاستبدال',
    features: ['ضمان محلي ودولي', 'جميع السعات والألوان الأصلية', 'هدية شاشة حماية + كفر مجاني']
  },
  {
    id: 'p2',
    name: 'سامسونج الفئة A و S (Galaxy S24 / A55 / A35)',
    category: 'new_phones',
    categoryLabel: 'تلفونات جديدة',
    brand: 'samsung',
    price: 21900,
    priceFormatted: '21,900 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'شاشة Super AMOLED بدقة FHD+ ومعدل تحديث سلس 120Hz، بطارية عملاقة 5000 مللي أمبير تدوم ليومين مع شحن فائق السرعة، ومعالج قوي للألعاب والتطبيقات الثقيلة. ضمان سامسونج مصر المعتمد مع استلام فوري من محلنا بمدينة الكردي.',
    condition: 'جديد بالضمان',
    features: ['شاشات Super AMOLED 120Hz', 'ضمان سامسونج الرسمي', 'كاش وبالتقسيط المريح']
  },
  {
    id: 'p3',
    name: 'شاومي وريدمي (Redmi Note 13 Pro / 12)',
    category: 'new_phones',
    categoryLabel: 'تلفونات جديدة',
    brand: 'xiaomi',
    price: 13500,
    priceFormatted: '13,500 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'الهاتف الأقوى في فئته السعرية بكاميرا رئيسية دقتها 200 ميجابكسل مع مثبت بصري OIS، وشاشة AMOLED 1.5K بألوان مذهلة وشاحن صاروخي 67W داخل العلبة مجاناً.',
    condition: 'جديد بالضمان',
    features: ['كاميرات فائقة الدقة 200MP', 'شحن سريع حتى 67W و120W', 'أفضل أداء في الفئة الاقتصادية']
  },
  {
    id: 'p4',
    name: 'آيفون 13 و 12 كسر زيرو (iPhone 13 / 12 Battery +88%)',
    category: 'used_phones',
    categoryLabel: 'تلفونات كسر زيرو',
    brand: 'apple',
    price: 24500,
    priceFormatted: '24,500 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'أجهزة أصلية لم يتم فتحها أو صيانتها نهائياً، بطاريات أصلية بحالة ممتازة تفوق 88%، الشاشات أصلية 100% بدون أي خدش وتدعم الترو تون وبصمة الوجه Face ID، مع تجربة أسبوعين وضمان فحص كامل تحت إشراف أ. أسامة موسى.',
    condition: 'كسر زيرو فحص كامل',
    isPopular: true,
    highlight: 'الأكثر طلباً',
    features: ['نسبة بطارية ممتازة +88%', 'خالي من الخدوش ولم يتم فتح الجهاز', 'ضمان تجربة حقيقي']
  },
  {
    id: 'p5',
    name: 'هواتف سامسونج وريلمي مستعملة بحالة الزيرو',
    category: 'used_phones',
    categoryLabel: 'تلفونات كسر زيرو',
    brand: 'samsung',
    price: 8900,
    priceFormatted: '8,900 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'مجموعة منتقاة بعناية من الهواتف المستعملة بحالة الجديد، تم فحص البوردة والشبكة والشاحن والبطارية فحصاً ميكروسكوبياً للتأكد من سلامتها التامة قبل عرضها للبيع.',
    condition: 'كسر زيرو فحص كامل',
    features: ['مفحوصة بتقرير فني كامل', 'شواحن وعلب أصلية', 'فحص شبكة وبطارية وبوردة']
  },
  {
    id: 'p10',
    name: 'ريلمي 12 برو بلس (Realme 12 Pro+ 5G)',
    category: 'new_phones',
    categoryLabel: 'تلفونات جديدة',
    brand: 'realme',
    price: 17200,
    priceFormatted: '17,200 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'تصميم فخم مستوحى من الساعات السويسرية، كاميرا بريسكوب للتقريب البصري حتى 120x، معالج Snapdragon قوي وشاشة منحنية بدقة 120Hz.',
    condition: 'جديد بالضمان',
    features: ['كاميرا تقريب بريسكوب 64MP', 'شحن سريع 67W SuperVOOC', 'ضمان ريلمي الرسمي']
  },
  {
    id: 'p11',
    name: 'أوبو رينو 12 (Oppo Reno 12 5G)',
    category: 'new_phones',
    categoryLabel: 'تلفونات جديدة',
    brand: 'oppo',
    price: 18500,
    priceFormatted: '18,500 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'هاتف الذكاء الاصطناعي من أوبو مع حماية فائقة ضد الصدمات والكسر وشاشة أموليد تدعم اللمس بالأيدي المبتلة، مع شاحن 80W فائق السرعة.',
    condition: 'جديد بالضمان',
    features: ['ميزات الذكاء الاصطناعي AI', 'شحن سوبر فوك 80W', 'ضمان أوبو مصر']
  },
  {
    id: 'p12',
    name: 'إنفينكس نوت 40 برو (Infinix Note 40 Pro 5G)',
    category: 'new_phones',
    categoryLabel: 'تلفونات جديدة',
    brand: 'infinix',
    price: 11900,
    priceFormatted: '11,900 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'تقنية الشحن اللاسلكي المغناطيسي All-Round FastCharge 2.0 وشاشة منحنية ثلاثية الأبعاد 120Hz AMOLED مع كاميرا 108 ميجابكسل بمثبت بصري OIS وسماعات بصوت JBL.',
    condition: 'جديد بالضمان',
    features: ['شحن لاسلكي مغناطيسي MagCharge', 'كاميرا فائقة 108MP مع OIS', 'ضمان محلي معتمد']
  },
  {
    id: 'p13',
    name: 'هواوي نوفا 12 SE (Huawei Nova 12 SE)',
    category: 'new_phones',
    categoryLabel: 'تلفونات جديدة',
    brand: 'huawei',
    price: 12500,
    priceFormatted: '12,500 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'تصميم فائق النحافة بكاميرا بورتريه 108 ميجابكسل وشحن توربو 66W فائق السرعة وشاشة OLED بمعدل 90Hz مع أحدث أنظمة EMUI المستقرة.',
    condition: 'جديد بالضمان',
    features: ['كاميرا بورتريه 108MP عالية الدقة', 'شحن توربو سوبر تشارج 66W', 'ضمان رسمي معتمد']
  },
  {
    id: 'p6',
    name: 'شواحن GaN السريعة المعتمدة (Anker / Oraimo / Joyroom)',
    category: 'accessories',
    categoryLabel: 'إكسسوارات وشواحن',
    price: 750,
    priceFormatted: '750 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'شواحن بتقنية GaN المتطورة التي تمنع ارتفاع حرارة الشاحن والهاتف وتوفر سرعة شحن مضاعفة مع حماية ذكية لبطارية هاتفك من زيادة التيار أو الفولت المفاجئ، مع كابلات قماشية مصفحة ضد القطع والشد.',
    condition: 'أصلي 100%',
    isPopular: true,
    highlight: 'حماية للبطارية',
    features: ['تقنية الشحن الآمن السريع', 'قدرات من 20W حتى 65W للهاتف واللابتوب', 'كابلات Type-C وLightning مدرعة ضد القطع']
  },
  {
    id: 'p7',
    name: 'مبردات الهواتف المغناطيسية والمائية (Gaming Phone Cooler)',
    category: 'accessories',
    categoryLabel: 'إكسسوارات ومبردات',
    price: 650,
    priceFormatted: '650 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'مروحة تبريد ثلجية بنظام أشباه الموصلات (Peltier) لتخفيض درجة حرارة الهاتف لأكثر من 15 درجة مئوية خلال دقيقة واحدة، مما يمنع انخفاض الفريمات واللاج أثناء لعب ببجي وفري فاير والتصوير والبث المباشر.',
    condition: 'أصلي 100%',
    features: ['تبريد ثلجي فوري يمنع اللاج في الألعاب', 'إضاءات RGB ومشبك محكم لجميع الهواتف', 'صوت هادئ جداً بدون إزعاج المايك']
  },
  {
    id: 'p8',
    name: 'سماعات إيربودز وعزل ضوضاء ANC أصلية',
    category: 'accessories',
    categoryLabel: 'سماعات وإكسسوارات',
    price: 950,
    priceFormatted: '950 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'صوت نقي فائق الجودة مع عزل نشط للضوضاء المحيطة (ANC)، ميكروفونات متعددة لإجراء مكالمات هاتفية شديدة الوضوح حتى في الأماكن المزدحمة، مع علبة شحن تدعم الشحن السريع.',
    condition: 'أصلي 100%',
    features: ['مايك نقي للمكالمات والاجتماعات', 'بطارية تدوم حتى 30 ساعة مع العلبة', 'مقاومة للعرق ورذاذ الماء']
  },
  {
    id: 'p9',
    name: 'شاشات سامسونج وآيفون وريدمي الأصلية والباغات',
    category: 'screens_parts',
    categoryLabel: 'شاشات وصيانة',
    price: 1850,
    priceFormatted: 'يبدأ من 1,850 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'شاشات توكيل وفرز أول أصلية تضمن سرعة استجابة اللمس التامة ونفس تشبع وسطوع الألوان الأصلي، بالإضافة إلى خدمات تغيير باغات الزجاج الخارجي بمكابس حرارية دقيقة مع ضمان كتابي معتمد.',
    condition: 'جودة فائقة',
    isPopular: true,
    highlight: 'ضمان كتابي',
    features: ['شاشات أصلية فرز أول وتوكيل', 'مكابس باغات بالليزر تحافظ على أصل الشاشة', 'أسرع تسليم خلال نصف ساعة']
  }
];

export const REPAIR_SERVICES_CATALOG = [
  {
    id: 'screen',
    name: 'تغيير شاشة أو باغة خارجية',
    avgTime: '30 - 45 دقيقة',
    warranty: 'ضمان 30 إلى 90 يوماً',
    desc: 'حل مشكلة الكسر، الخطوط، الخط الأسود، أو عدم استجابة اللمس'
  },
  {
    id: 'battery',
    name: 'استبدال بطارية أصلية',
    avgTime: '20 - 30 دقيقة',
    warranty: 'ضمان 6 شهور',
    desc: 'علاج النفخ، النفاذ السريع للشحن، أو الإغلاق المفاجئ للجهاز'
  },
  {
    id: 'charging',
    name: 'صيانة وتغيير سوكت الشحن (Type-C / Lightning)',
    avgTime: '25 دقيقة',
    warranty: 'ضمان فوري',
    desc: 'إصلاح بطء الشحن أو تذبذب التوصيل وتنظيف ميكانيكي آمن'
  },
  {
    id: 'software',
    name: 'تحديث الأنظمة الرسمية ونقل البيانات',
    avgTime: '15 - 30 دقيقة',
    warranty: 'دعم فني معتمد',
    desc: 'تحديث وترقية النظام الرسمي، نقل الأسماء والصور باحترافية وسرية'
  },
  {
    id: 'board',
    name: 'صيانة ميكروسكوبية للبوردة والآيسيهات',
    avgTime: 'خلال 24 ساعة',
    warranty: 'ضمان فحص معتمد',
    desc: 'إصلاح مشاكل الباور، الشورت، انقطاع الصوت أو الشبكة'
  },
  {
    id: 'camera_mic',
    name: 'صيانة الكاميرات والميكروفون وسماعة المكالمات',
    avgTime: '30 دقيقة',
    warranty: 'ضمان جودة الصوت والعدسة',
    desc: 'تنظيف وتغيير فلاتر السماعة واستبدال عدسات الكاميرا المكسورة'
  }
];

export const PHONE_BRANDS = [
  { id: 'apple', name: 'آبل (Apple iPhone)', shortName: 'آبل (iPhone)', icon: '🍎', english: 'Apple' },
  { id: 'samsung', name: 'سامسونج (Samsung)', shortName: 'سامسونج', icon: '📱', english: 'Samsung' },
  { id: 'xiaomi', name: 'شاومي وريدمي (Xiaomi)', shortName: 'شاومي', icon: '⚡', english: 'Xiaomi' },
  { id: 'realme', name: 'ريلمي (Realme)', shortName: 'ريلمي', icon: '🟡', english: 'Realme' },
  { id: 'oppo', name: 'أوبو (Oppo)', shortName: 'أوبو', icon: '🟢', english: 'Oppo' },
  { id: 'infinix', name: 'إنفينكس وتكنو (Infinix)', shortName: 'إنفينكس', icon: '🚀', english: 'Infinix' },
  { id: 'huawei', name: 'هواوي وهونر (Huawei)', shortName: 'هواوي', icon: '💠', english: 'Huawei' },
  { id: 'other', name: 'ماركة أخرى', shortName: 'أخرى', icon: '📲', english: 'Other' }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    author: 'المهندس أحمد السعيد',
    role: 'مهندس مدني',
    location: 'مدينة الكردي',
    rating: 5,
    date: 'منذ يومين',
    serviceUsed: 'تركيب شاشة آيفون أصلية',
    comment: 'ركبت شاشة أصلية لآيفون 13 عند أسامة موسى، ما شاء الله الشاشة ممتازة جداً ونفس ألوان وسرعة لمس الوكالة بالضبط، والأهم أمانة التعامل والشغل النظيف أمام الزبون.'
  },
  {
    id: 't2',
    author: 'الأستاذ محمود الدسوقي',
    role: 'معلم أول',
    location: 'ميدان المحطة - الكردي',
    rating: 5,
    date: 'منذ أسبوع',
    serviceUsed: 'شراء هاتف جديد كاش وتقسيط',
    comment: 'اشتريت هاتف سامسونج جديد من سليم النور فون، المعاملة راقية جداً والأسعار أفضل من المحلات الثانية بكثير، ونقلوا لي كل البيانات والصور في دقائق بدون أي تعب.'
  },
  {
    id: 't3',
    author: 'كابتن إسلام نصر',
    role: 'مدرب رياضي',
    location: 'الكردي',
    rating: 5,
    date: 'منذ 4 أيام',
    serviceUsed: 'شاحن GaN سريع ومبرد جيمنج',
    comment: 'أفضل مكان في الكردي للإكسسوارات الأصلية 100%. أخذت مبرد مائي للجيمنج وشاحن سريع أصلي، شغالين بكفاءة عالية بدون ما يسخن الجهاز في الألعاب.'
  },
  {
    id: 't4',
    author: 'الحاج سيد عبد الرحمن',
    role: 'تاجر',
    location: 'مدينة الكردي',
    rating: 5,
    date: 'منذ أسبوعين',
    serviceUsed: 'تغيير باغة خارجية لجهاز سامسونج',
    comment: 'وفروا عليّ مبلغ شاشة جديدة كاملة، غيروا الباغة الخارجية فقط بمكبس حراري حديث ورجعت الشاشة وكأنها جديدة تماماً بضمان معتمد. راجل محترم وأمين يا أسامة.'
  },
  {
    id: 't5',
    author: 'د. حسام البدري',
    role: 'طبيب بشري',
    location: 'بالقرب من عيادة د. وائل سلامة',
    rating: 5,
    date: 'منذ 5 أيام',
    serviceUsed: 'صيانة سوكت الشحن وتنظيف السماعة',
    comment: 'صيانة فورية ومتقنة جداً، تم حل مشكلة الشحن واستبدال السوكت وتنظيف الفلاتر خلال أقل من نصف ساعة. سرعة وإتقان وراحة بال.'
  },
  {
    id: 't6',
    author: 'الأستاذ تامر القاضي',
    role: 'محاسب قانوني',
    location: 'الكردي',
    rating: 5,
    date: 'منذ 3 أسابيع',
    serviceUsed: 'شراء هاتف كسر زيرو فحص كامل',
    comment: 'أخذت هاتف مستعمل كسر زيرو بحالة المصنع والبطارية فوق 90%. فحصوه أمامي بالكامل وأعطوني ضمان تجربة، المحل قمة في المصداقية والأمانة.'
  }
];

export const FAQS = [
  {
    q: 'أين يقع محل سليم النور فون بالتحديد في مدينة الكردي؟',
    a: 'يقع المحل بموقع مميز جداً وسهل الوصول: مدينة الكردي - ميدان المحطة - بجوار قسم الشرطة مباشرة (أسفل عيادة الدكتور وائل سلامة). الموقع قريب جداً من مواقف المواصلات والسيارات بالميدان.'
  },
  {
    q: 'هل يتوفر لديكم تقسيط للهواتف الجديدة والمستعملة؟',
    a: 'نعم بكل تأكيد! نوفر أنظمة وتسهيلات بيع ميسرة ومريحة في الدفع كاش وبالتقسيط لزبائننا الكرام بأفضل الأسعار المتاحة في مدينة الكردي.'
  },
  {
    q: 'ما هو الضمان المقدم على تركيب الشاشات وقطع الغيار؟',
    a: 'نحن نضمن كل قطعة غيار أو شاشة يتم تركيبها في محلنا. يحصل العميل على فترة ضمان كتابي للتجربة ضد أي عيوب صناعة أو لمس، ونعتمد دائماً قطع الغيار الأصلية والفرز الأول.'
  },
  {
    q: 'هل يمكنني تغيير باغة الشاشة الخارجية فقط دون تغيير الشاشة كاملة؟',
    a: 'نعم! إذا كانت الشاشة الداخلية تعمل بصورة طبيعية ولا يوجد خطوط أو بقع سوداء واللمس يعمل بشكل سليم، نقوم بتغيير الزجاج الخارجي (الباغة) فقط بمكابس حرارية دقيقة، مما يوفر عليك أكثر من 60% من تكلفة الشاشة الأصلية.'
  },
  {
    q: 'هل توفرون خدمات الدفع الإلكتروني وشحن الرصيد؟',
    a: 'نعم، نوفر كافة خدمات المدفوعات والشحن لجميع الشبكات (فودافون، أورانج، اتصالات، وي)، بالإضافة إلى خدمات إيداع وسحب المحافظ الإلكترونية وكاش على مدار ساعات العمل.'
  },
  {
    q: 'كيف يمكنني التواصل المباشر مع الإدارة (أ. أسامة موسى)؟',
    a: 'يمكنك الاتصال هاتفياً مباشرة على الرقم: 01003075071 أو التواصل عبر تطبيق واتساب على نفس الرقم في أي وقت للاستفسار عن جهاز أو حجز صيانة أو أسعار اليوم.'
  }
];
