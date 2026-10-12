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

export interface BundleAccessoryOption {
  name: string;
  price: number;
  priceFormatted?: string;
  description?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'new_phones' | 'accessories';
  categoryLabel: string;
  brand?: string; // 'apple' | 'samsung' | 'xiaomi' | 'realme' | 'oppo' | 'infinix' | 'huawei' | 'other'
  price: number;
  priceFormatted: string;
  imageUrl: string;
  images?: string[];
  description?: string;
  condition: 'جديد بالضمان' | 'أصلي 100%' | 'جودة فائقة';
  features: string[];
  isPopular?: boolean;
  highlight?: string;
  isUserAdded?: boolean;
  bundleAccessory?: BundleAccessoryOption;
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
    label: 'سماعات جيمنج محيطية احترافية RGB',
    url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=700&q=80',
    category: 'accessories'
  },
  {
    label: 'سماعة رأس جيمنج ميكروفون نقي',
    url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80',
    category: 'accessories'
  },
  {
    label: 'إيربودز برو ANC عزل ضوضاء فائق',
    url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=700&q=80',
    category: 'accessories'
  },
  {
    label: 'إيربودز ساوند كور R50i أصلية',
    url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80',
    category: 'accessories'
  },
  {
    label: 'إيربودز جيمنج إضاءة LED وتأخير منخفض',
    url: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=700&q=80',
    category: 'accessories'
  },
  {
    label: 'مبرد هواتف مغناطيسي ثلجي (Peltier Cooler)',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80',
    category: 'accessories'
  },
  {
    label: 'شاحن GaN سريع 65W/33W وكابل مصفح',
    url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80',
    category: 'accessories'
  },
  {
    label: 'باور بانك 20,000mAh شحن فائق السرعة',
    url: 'https://images.unsplash.com/photo-1609592424367-936d6cf5cfd5?auto=format&fit=crop&w=700&q=80',
    category: 'accessories'
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
  whatsapp: '01003075071',
  whatsappUrl: 'https://wa.me/201003075071',
  facebookUrl: 'https://www.facebook.com/osamamousa890',
  facebookHandle: 'osamamousa890',
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
    title: 'بيع الهواتف الذكية الجديدة كلياً',
    subtitle: 'كاش وبالتقسيط المريح وبأفضل سعر في الكردي',
    description: 'نوفر أحدث الهواتف الذكية الأصلية بالكرتونة والضمان الرسمي المعتمد من كبرى الشركات العالمية (آبل، سامسونج، شاومي، ريلمي، أوبو، إنفينكس) جديدة بتغليف المصنع، كاش وبأنظمة تقسيط ميسرة في مدينة الكردي.',
    icon: 'Smartphone',
    tag: 'جديد بالضمان والتقسيط',
    gradient: 'from-amber-500/20 to-yellow-600/10',
    features: [
      'هواتف جديدة بضمان الوكلاء الرسميين المعتمدين في مصر',
      'تسهيلات بيع مريحة تناسب جميع الفئات كاش وبالتقسيط المريح',
      'جميع الألوان والسعات التخزينية الأصلية متوفرة فوراً',
      'هدايا شواحن وجرابات وحماية شاشة معتمدة مجانية مع كل جهاز جديد'
    ]
  },
  {
    id: 'ntra-taxes-registration',
    title: 'سداد ضريبة ورسوم الأجهزة لدى الجهاز القومي للاتصالات (NTRA)',
    subtitle: 'تسجيل رسمي للأجهزة الواردة من الخارج وسداد الرسوم الجمركية',
    description: 'خدمة تسجيل وسداد رسوم وضريبة تشغيل الهواتف الذكية الواردة من الخارج لدى الجهاز القومي لتنظيم الاتصالات (NTRA)، لمنع إيقاف وتوقف الشبكة وضمان استمرار عمل الجهاز على جميع شبكات المحمول المصرية بأمان وسرعة.',
    icon: 'ShieldCheck',
    tag: 'رسمي معتمد لدى NTRA',
    gradient: 'from-amber-600/20 to-orange-600/10',
    features: [
      'فحص صلاحية السيريال والـ IMEI وتسجيل الهاتف رسمياً بقاعدة بيانات NTRA',
      'سداد الرسوم والضريبة الجمركية المقررة عبر القنوات الرسمية المعتمدة',
      'ضمان استمرار تشغيل الهاتف على شبكات فودافون، أورنج، اتصالات، وي',
      'تسليم إيصال السداد الفوري وتأكيد التفعيل تحت إشراف أ. أسامة موسى'
    ]
  },
  {
    id: 'bills-payments',
    title: 'دفع الفواتير وشحن الرصيد والتحويلات المالية',
    subtitle: 'سداد فوري لكافة الفواتير والمحافظ الإلكترونية',
    description: 'مركزك السريع والموثوق لدفع فواتير الكهرباء، المياه، الغاز، الإنترنت المنزلي الأرضي، فواتير الهاتف المحمول، وشحن رصيد كافة الشبكات وتحويل واستلام الأموال عبر فودافون كاش والمحافظ الرقمية.',
    icon: 'CreditCard',
    tag: 'دفع وشحن فوري',
    gradient: 'from-amber-500/20 to-zinc-800/40',
    features: [
      'سداد فواتير الكهرباء، المياه، الغاز، والإنترنت الأرضي المنزلي (WE / فودافون)',
      'شحن كروت الكهرباء ودفع فواتير خطوط المحمول وباقات الإنترنت',
      'تحويل وسحب الأموال عبر محافظ الكاش فوراً وبأعلى درجات الأمان',
      'شحن رصيد وكروت فكة وباقات لجميع شبكات المحمول المصرية'
    ]
  },
  {
    id: 'original-accessories-gaming',
    title: 'الإكسسوارات الأصلية وسماعات الجيمنج والإيربودز',
    subtitle: 'شواحن GaN، مبردات ثلجية، سماعات احترافية، وباور بانك',
    description: 'تشكيلة ضخمة من أحدث إكسسوارات الهواتف الأصلية، سماعات إيربودز اللاسلكية، سماعات الجيمنج المحيطية 7.1، مبردات الهواتف الثلجية، وشواحن الحماية السريعة المعتمدة لحماية بطارية هاتفك وجهازك.',
    icon: 'Headphones',
    tag: 'أصلي 100% وجيمنج',
    gradient: 'from-yellow-500/20 to-amber-700/10',
    features: [
      'سماعات إيربودز برو وسماعات جيمنج احترافية بميكروفون نقي عازل للضوضاء',
      'مبردات هواتف مغناطيسية ثلجية تمنع ارتفاع الحرارة في الألعاب والبث',
      'شواحن GaN سريعة معتمدة وكابلات شحن مصفحة قماشية ضد القطع',
      'باور بانك وحوامل سيارات وبطاريات أصلية بأعلى جودة وضمان'
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
    highlight: 'الأعلى طلباً',
    features: ['ضمان محلي ودولي رسمي', 'جميع السعات والألوان الأصلية متوفرة', 'كاش وتقسيط مريح بالمحل'],
    bundleAccessory: {
      name: 'شاحن GaN 33W معتمد + كفر ماج سيف ولاصقة 9D',
      price: 450,
      priceFormatted: '450 ج.م',
      description: 'وفر 300 ج.م عند الشراء مع الجهاز'
    }
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
    features: ['شاشات Super AMOLED 120Hz', 'ضمان سامسونج الرسمي في مصر', 'كاش وبالتقسيط المريح'],
    bundleAccessory: {
      name: 'شاحن سامسونج 25W أصلي فائق السرعة + جراب سيليكون',
      price: 350,
      priceFormatted: '350 ج.م',
      description: 'عرض خاص مع الهاتف'
    }
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
    features: ['كاميرات فائقة الدقة 200MP', 'شحن سريع حتى 67W و120W', 'أفضل أداء في الفئة الاقتصادية'],
    bundleAccessory: {
      name: 'سماعة إيربودز رياضية ستيريو + كفر مدرع ضد الصدمات',
      price: 290,
      priceFormatted: '290 ج.م'
    }
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
    features: ['كاميرا تقريب بريسكوب 64MP', 'شحن سريع 67W SuperVOOC', 'ضمان ريلمي الرسمي'],
    bundleAccessory: {
      name: 'مبرد هواتف ثلجي للألعاب + دراعات جيمنج معدنية',
      price: 390,
      priceFormatted: '390 ج.م'
    }
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
    features: ['ميزات الذكاء الاصطناعي AI', 'شحن سوبر فوك 80W', 'ضمان أوبو مصر'],
    bundleAccessory: {
      name: 'سماعة إيربودز أوبو إنكو أصلية عازلة للصوت',
      price: 420,
      priceFormatted: '420 ج.م'
    }
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
    features: ['شحن لاسلكي مغناطيسي MagCharge', 'كاميرا فائقة 108MP مع OIS', 'ضمان محلي معتمد'],
    bundleAccessory: {
      name: 'باور بانك وشاحن مغناطيسي لاسلكي سريع',
      price: 350,
      priceFormatted: '350 ج.م'
    }
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
    features: ['كاميرا بورتريه 108MP عالية الدقة', 'شحن توربو سوبر تشارج 66W', 'ضمان رسمي معتمد'],
    bundleAccessory: {
      name: 'كابل شحن سوبر تشارج قماشي + سماعة أذن أصلية',
      price: 250,
      priceFormatted: '250 ج.م'
    }
  },
  {
    id: 'p14',
    name: 'سماعات جيمنج احترافية محيطية 7.1 RGB مع ميكروفون نقي',
    category: 'accessories',
    categoryLabel: 'سماعات جيمنج',
    price: 890,
    priceFormatted: '890 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'سماعة رأس احترافية لعشاق ألعاب ببجي وفري فاير وكول أوف ديوتي بصوت محيطي مجسم 7.1 لتحديد أماكن الأقدام بدقة فائقة، وسائد أذن جلدية مريحة جداً للاستخدام الطويل، مع إضاءات RGB تفاعلية وميكروفون نقي عازل للضوضاء بنسبة 100%.',
    condition: 'أصلي 100%',
    isPopular: true,
    highlight: 'الأفضل للألعاب 🎮',
    features: ['صوت محيطي 7.1 Surround Sound', 'ميكروفون عازل للضوضاء نقي للمحادثات', 'إضاءات RGB ومفتاح تحكم بالصوت']
  },
  {
    id: 'p8',
    name: 'سماعات إيربودز برو الجيل الثاني ANC الأصلية بعزل الضوضاء',
    category: 'accessories',
    categoryLabel: 'إيربودز وسماعات',
    price: 950,
    priceFormatted: '950 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'أعلى نقاء صوتي مع تقنية العزل النشط للضوضاء المحيطة (ANC) وشفافية الصوت، ميكروفونات متعددة بدقة فائقة للمكالمات الواضحة في الزحام، بطارية تدوم حتى 30 ساعة مع علبة الشحن وتدعم الشحن اللاسلكي السريع.',
    condition: 'أصلي 100%',
    isPopular: true,
    highlight: 'عزل ضوضاء فائق 🎧',
    features: ['تقنية العزل النشط للضوضاء ANC', 'بطارية حتى 30 ساعة مكالمات وموسيقى', 'متوافقة مع الآيفون والأندرويد']
  },
  {
    id: 'p15',
    name: 'إيربودز جيمنج مخصصة للألعاب بتأخير منخفض 40ms وإضاءة LED',
    category: 'accessories',
    categoryLabel: 'إيربودز جيمنج',
    price: 580,
    priceFormatted: '580 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'سماعات إيربودز لاسلكية مخصصة للألعاب بوضع مخصص للألعاب (Gaming Mode) يقلل التأخير الصوتي إلى 40 ميلي ثانية فقط لتزامن تام بين الصوت والصورة في ببجي، مع تصميم مستقبلي بإضاءات LED ساحرة.',
    condition: 'أصلي 100%',
    features: ['وضع الألعاب Ultra Low Latency 40ms', 'إضاءات LED Cyberpunk وتصميم كروي', 'مقاومة للعرق ورذاذ الماء']
  },
  {
    id: 'p7',
    name: 'مبردات الهواتف المغناطيسية الثلجية للجيمنج (Peltier RGB Cooler)',
    category: 'accessories',
    categoryLabel: 'مبردات جيمنج',
    price: 650,
    priceFormatted: '650 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'مروحة تبريد ثلجية بنظام أشباه الموصلات (Peltier) لتخفيض درجة حرارة الهاتف لأكثر من 15 درجة مئوية خلال دقيقة واحدة، مما يمنع انخفاض الفريمات واللاج أثناء لعب ببجي وفري فاير والتصوير والبث المباشر.',
    condition: 'أصلي 100%',
    isPopular: true,
    highlight: 'يمنع اللاج والسخونة ❄️',
    features: ['تبريد ثلجي فوري يمنع تسقيط الفريمات', 'إضاءات RGB ومشبك ومغناطيس لجميع الهواتف', 'صوت هادئ جداً بدون أي تشويش على المايك']
  },
  {
    id: 'p6',
    name: 'شواحن GaN السريعة المعتمدة (Anker / Oraimo / Joyroom 65W/33W)',
    category: 'accessories',
    categoryLabel: 'شواحن وكابلات',
    price: 750,
    priceFormatted: '750 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'شواحن بتقنية GaN المتطورة التي تمنع ارتفاع حرارة الشاحن والهاتف وتوفر سرعة شحن مضاعفة مع حماية ذكية لبطارية هاتفك من زيادة التيار أو الفولت المفاجئ، مع كابلات قماشية مصفحة ضد القطع والشد.',
    condition: 'أصلي 100%',
    highlight: 'حماية فائقة للبطارية ⚡',
    features: ['تقنية الشحن الآمن السريع GaN', 'قدرات من 20W حتى 65W للهواتف واللابتوب', 'كابلات Type-C وLightning مدرعة ضد القطع']
  },
  {
    id: 'p16',
    name: 'باور بانك 20,000mAh شحن سريع فائق مع شاشة رقمية PD 22.5W',
    category: 'accessories',
    categoryLabel: 'باور بانك وشواحن',
    price: 850,
    priceFormatted: '850 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1609592424367-936d6cf5cfd5?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1609592424367-936d6cf5cfd5?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'بطارية متنقلة عملاقة 20,000 مللي أمبير تكفي لشحن هاتفك 4 إلى 5 مرات، تدعم الشحن فائق السرعة PD 22.5W / QC 3.0 مع شاشة ديجيتال لعرض النسبة بدقة ومنافذ متعددة لشحن 3 أجهزة معاً.',
    condition: 'أصلي 100%',
    features: ['سعة عملاقة 20,000mAh تشحن هاتفك 5 مرات', 'شاشة رقمية LED لنسبة الشحن بدقة', 'شحن سريع 22.5W معتمد للآيفون والأندرويد']
  },
  {
    id: 'p17',
    name: 'كابلات شحن قماشية مدرعة ضد القطع Type-C و Lightning (1.5 متر)',
    category: 'accessories',
    categoryLabel: 'شواحن وكابلات',
    price: 150,
    priceFormatted: '150 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'كابلات قماشية مصفحة بطبقات ألياف متينة ضد الانحناء والقطع، تدعم الشحن فائق السرعة حتى 6A ونقل البيانات السريع 480Mbps، مع رؤوس ألومنيوم معززة لا تنكسر.',
    condition: 'أصلي 100%',
    features: ['قماش مضاد للقطع والشد يتحمل 20 ألف انحناء', 'سرعة شحن عالية 6A ونقل بيانات فوري', 'متوفر لجميع الأجهزة Type-C وiPhone']
  },
  {
    id: 'p18',
    name: 'دراعات تحكم ومسكات جيمنج ببجي وفري فاير معدنية للألعاب',
    category: 'accessories',
    categoryLabel: 'مستلزمات جيمنج',
    price: 220,
    priceFormatted: '220 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'أزرار ومسكات ميكانيكية استجابة 0 ثانية لسرعة إطلاق النار والسكوب في ببجي، بتصميم محكم لا يخدش الشاشة ويعمل بدون بطارية أو بلوتوث على جميع أحجام الهواتف.',
    condition: 'أصلي 100%',
    features: ['استجابة ميكانيكية فورية للسكوب والضرب', 'مشبك سيليكون يحمي الشاشة وفريم الهاتف', 'متوافقة مع جميع الهواتف وألعاب الشوتر']
  },
  {
    id: 'p19',
    name: 'سماعات إيربودز أنكر ساوند كور الأصلية (Anker Soundcore R50i TWS)',
    category: 'accessories',
    categoryLabel: 'إيربودز وسماعات',
    price: 850,
    priceFormatted: '850 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'سماعة أنكر الأصلية بصوت نقي للغاية ومضخم بيز BassUp جبار مع مشغلات 10 ملم، ميكروفونين بتقنية الذكاء الاصطناعي لمكالمات فائقة الوضوح، بطارية تدوم حتى 30 ساعة مع الشحن السريع (10 دقائق شحن تعطيك ساعتين تشغيل)، ومقاومة للماء والعرق بمعيار IPX5.',
    condition: 'أصلي 100%',
    isPopular: true,
    highlight: 'الأعلى تقييماً ⭐',
    features: ['تقنية تضخيم البيز BassUp بمشغلات 10mm', 'بطارية تدوم 30 ساعة وشحن سريع', 'مقاومة الماء والتعرق IPX5']
  },
  {
    id: 'p20',
    name: 'سماعة رأس جيمنج احترافية ريدراجون زيوس (Redragon H510 Zeus 7.1 Surround)',
    category: 'accessories',
    categoryLabel: 'سماعات جيمنج',
    price: 1450,
    priceFormatted: '1,450 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'سماعة الجيمنج الأسطورية الأكثر طلباً بصوت محيطي 7.1 كارت صوت خارجي USB متطور، مشغلات 53 ملم لأقصى دقة في تحديد خطوات الأعداء في ببجي وفالورانت وكود، وسائد جلدية فاخرة ميموري فوم مريحة للأذن، وميكروفون نقي قابل للإزالة مع عزل تام للضوضاء.',
    condition: 'أصلي 100%',
    isPopular: true,
    highlight: 'أسطورة الجيمنج 🎮',
    features: ['كارت صوت خارجي 7.1 Surround Sound', 'مشغلات عملاقة 53mm لتحديد الأقدام بدقة', 'ميكروفون نقي قابل للفك مع وسائد ميموري فوم']
  },
  {
    id: 'p21',
    name: 'سماعات جيمنج أونيكوما RGB الاحترافية بمحيط صوتي ستيريو نقي (Onikuma Gaming Headset)',
    category: 'accessories',
    categoryLabel: 'سماعات جيمنج',
    price: 980,
    priceFormatted: '980 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'سماعة رأس متخصصة للألعاب والموسيقى والبثوث المباشرة بإضاءات RGB متعددة الألوان، صوت ستيريو مجسم عميق ومضخم، عزل تام لأصوات الغرفة والشارع، متوافقة مع الهواتف الذكية وأجهزة الكمبيوتر والبلايستيشن.',
    condition: 'أصلي 100%',
    features: ['إضاءات RGB تفاعلية مع الموسيقى والألعاب', 'ميكروفون حساس قابل للتعديل 360 درجة', 'متوافقة مع جميع الهواتف والمشغلات']
  },
  {
    id: 'p22',
    name: 'سماعات إيربودز جويروم برو الأصلية (Joyroom JR-T03S Pro ANC)',
    category: 'accessories',
    categoryLabel: 'إيربودز وسماعات',
    price: 720,
    priceFormatted: '720 ج.م',
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=700&q=80'
    ],
    description: 'السماعة البديلة رقم 1 لآبل إيربودز برو مع شريحة بلوتوث 5.3 مستقرة، كفر سيليكون أصلي هدية داخل العلبة، دعم الشحن اللاسلكي السريع، ومستشعر ذكي لإيقاف الموسيقى عند إزالة السماعة من الأذن.',
    condition: 'أصلي 100%',
    features: ['بلوتوث 5.3 مع استقرار صوتي فائق', 'تدعم الشحن اللاسلكي + كفر هدية', 'ضمان رسمي معتمد لدى المحل']
  }
];

export const SHOP_SERVICES_ESTIMATOR_CATALOG = [
  {
    id: 'ntra-tax',
    name: 'سداد ضريبة ورسوم الهاتف لدى الجهاز القومي للاتصالات (NTRA)',
    avgTime: 'خلال دقائق بالمحل',
    warranty: 'تسجيل رسمي معتمد وإيصال فوري',
    desc: 'سداد الضريبة والرسوم الجمركية المقررة للأجهزة الواردة من الخارج لضمان تشغيلها الدائم على شبكات مصر'
  },
  {
    id: 'ntra-imei',
    name: 'فحص السيريال والـ IMEI وتسجيل الهاتف بقاعدة بيانات NTRA',
    avgTime: 'فحص فوري مجاني',
    warranty: 'تقرير فحص رسمي',
    desc: 'التأكد من حالة تسجيل الجهاز وهل هو مسجل ومعتمد أو بحاجة لسداد ضريبة قبل الشراء والاستخدام'
  },
  {
    id: 'bills-telecom',
    name: 'دفع فواتير الإنترنت الأرضي المنزلي والمحمول وشحن الباقات',
    avgTime: 'تنفيذ فوري',
    warranty: 'إشعار سداد معتمد',
    desc: 'سداد فواتير WE والإنترنت المنزلي وخطوط فودافون وأورنج واتصالات وشحن الباقات الإضافية'
  },
  {
    id: 'bills-utilities',
    name: 'سداد فواتير الكهرباء، المياه، والغاز وشحن الكروت الذكية',
    avgTime: 'فوري بماكينات الدفع',
    warranty: 'إيصال دفع رسمي',
    desc: 'شحن كروت الكهرباء والمياه الذكية ودفع الفواتير المتأخرة للجهات الحكومية والخدمية'
  },
  {
    id: 'cash-wallets',
    name: 'تحويل وسحب الأموال كاش عبر فودافون كاش والمحافظ الرقمية',
    avgTime: 'خلال دقيقة واحدة',
    warranty: 'أمان وسرية تامة',
    desc: 'خدمات سحب وإيداع الكاش لجميع محافظ المحمول في مصر بأعلى موثوقية'
  }
];

// Alias for backwards compatibility
export const REPAIR_SERVICES_CATALOG = SHOP_SERVICES_ESTIMATOR_CATALOG;

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
    serviceUsed: 'سداد ضريبة ورسوم الهاتف لدى NTRA',
    comment: 'سددت ضريبة الجهاز الوارد من الخارج لدى الجهاز القومي للاتصالات عند أسامة موسى، العملية تمت في دقائق واستلمت إيصال السداد الفوري المعتمد واشتغلت الشبكة بدون أي مشاكل. خدمة ممتازة ومريحة جداً.'
  },
  {
    id: 't5',
    author: 'د. حسام البدري',
    role: 'طبيب بشري',
    location: 'بالقرب من عيادة د. وائل سلامة',
    rating: 5,
    date: 'منذ 5 أيام',
    serviceUsed: 'شراء إيربودز برو وسماعة أصلية',
    comment: 'سماعة إيربودز برو ممتازة جداً وعزل الصوت نقي للغاية في المكالمات، وتعامل راقٍ وسرعة في الاستجابة. أفضل محل موثوق للإلكترونيات في الكردي.'
  },
  {
    id: 't6',
    author: 'الأستاذ تامر القاضي',
    role: 'محاسب قانوني',
    location: 'الكردي',
    rating: 5,
    date: 'منذ 3 أسابيع',
    serviceUsed: 'دفع فواتير وسماعات جيمنج احترافية',
    comment: 'بدفع كل فواتير الكهرباء والإنترنت الأرضي بانتظام في المحل، واشتريت سماعة رأس جيمنج ريدراجون زيوس صوتها محيطي خيالي في ببجي. أمانة ومصداقية تامة في الكردي.'
  }
];

export const FAQS = [
  {
    q: 'أين يقع محل سليم النور فون بالتحديد في مدينة الكردي؟',
    a: 'يقع المحل بموقع مميز جداً وسهل الوصول: مدينة الكردي - ميدان المحطة - بجوار قسم الشرطة مباشرة (أسفل عيادة الدكتور وائل سلامة). الموقع قريب جداً من مواقف المواصلات والسيارات بالميدان.'
  },
  {
    q: 'هل يتوفر لديكم تقسيط للهواتف الجديدة؟',
    a: 'نعم بكل تأكيد! نوفر أنظمة وتسهيلات بيع ميسرة ومريحة في الدفع كاش وبالتقسيط لزبائننا الكرام بالتعاون مع فاليو، أمان، سهولة، وبطاقات المشتريات البنكية بأفضل الأسعار المتاحة في مدينة الكردي.'
  },
  {
    q: 'كيف يتم سداد ضريبة ورسوم الهاتف لدى الجهاز القومي لتنظيم الاتصالات (NTRA)؟',
    a: 'نوفر خدمة رسمية معتمدة لفحص السيريال والـ IMEI وتسجيل الهاتف وسداد الضريبة والرسوم الجمركية المقررة لدى الجهاز القومي لتنظيم الاتصالات (NTRA) فوراً لمنع توقف الشبكة وضمان عمل الجهاز على جميع شبكات مصر بأمان.'
  },
  {
    q: 'ما هي الفواتير والمدفوعات التي يمكن سدادها لديكم في المحل؟',
    a: 'نوفر سداد جميع فواتير الكهرباء، شحن الكروت الذكية، فواتير المياه، الغاز الطبيعي، الإنترنت المنزلي الأرضي (WE / فودافون / أورنج / اتصالات)، وشحن الرصيد والتحويل الفوري عبر فودافون كاش والمحافظ الرقمية.'
  },
  {
    q: 'هل سماعات الإيربودز وسماعات الجيمنج ومبردات الهواتف أصلية بالضمان؟',
    a: 'نعم! جميع الإكسسوارات وسماعات الجيمنج والإيربودز والشواحن السريعة GaN ومبردات الهواتف لدينا أصلية 100% مع ضمان حقيقي للتجربة والاستبدال.'
  },
  {
    q: 'كيف يمكنني التواصل المباشر مع الإدارة (أ. أسامة موسى)؟',
    a: 'يمكنك الاتصال هاتفياً مباشرة على الرقم: 01003075071 أو التواصل عبر تطبيق واتساب على نفس الرقم في أي وقت للاستفسار عن جهاز أو سداد ضريبة أو دفع فواتير.'
  }
];
