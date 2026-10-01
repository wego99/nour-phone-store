import React, { useState, useRef } from 'react';
import { 
  Gift, Sparkles, Award, Check, Copy, MessageSquare, 
  RotateCcw, Trophy, PartyPopper, ArrowDown, ShieldCheck, 
  Clock, Flame, Star, Tag, ChevronLeft
} from 'lucide-react';
import { SHOP_INFO } from '../data/shopData';
import { useAuth } from '../context/AuthContext';

export interface PrizeItem {
  id: string;
  name: string;
  shortName: string;
  desc: string;
  icon: string;
  code: string;
  color: string;
  textColor: string;
  points?: number;
}

const PRIZES: PrizeItem[] = [
  {
    id: 'p1',
    name: 'خصم 50 ج.م على باغات وشاشات الحماية',
    shortName: 'خصم 50 ج.م شاشات',
    desc: 'يطبق الخصم فوراً عند تركيب شاشة أو باغة أصلية لأي نوع هاتف',
    icon: '🛠️',
    code: 'NOUR-SCREEN-50',
    color: '#d97706', // amber-600
    textColor: '#ffffff'
  },
  {
    id: 'p2',
    name: 'هدية جراب حماية سيليكون أو كابل شحن سريع مجاناً',
    shortName: 'كابل أو جراب هدية',
    desc: 'استلم كابل شحن أصلي أو جراب حماية مجاناً عند أول زيارة للمحل',
    icon: '🎁',
    code: 'NOUR-FREE-CABLE',
    color: '#18181b', // zinc-900
    textColor: '#f59e0b'
  },
  {
    id: 'p3',
    name: 'خصم 20% على شواحن أنكر ومبردات الجيمنج',
    shortName: 'خصم 20% إكسسوارات',
    desc: 'وفر 20% على أي شاحن أو باور بانك أو مبرد أصلي متوفر بالمعرض',
    icon: '⚡',
    code: 'NOUR-ACC-20',
    color: '#b45309', // amber-700
    textColor: '#ffffff'
  },
  {
    id: 'p4',
    name: 'فحص فني شامل وتنظيف سوكت الشحن وسماعات الهاتف مجاناً',
    shortName: 'فحص وتنظيف مجاني',
    desc: 'تنظيف بالموجات لسوكت الشحن ومخارج الصوت وفحص البطارية مجاناً فورياً',
    icon: '🧹',
    code: 'NOUR-FREE-CLEAN',
    color: '#27272a', // zinc-800
    textColor: '#fbbf24'
  },
  {
    id: 'p5',
    name: 'كوبون خصم 150 ج.م عند شراء أي هاتف جديد أو كسر زيرو',
    shortName: 'خصم 150 ج.م هاتف',
    desc: 'خصم مباشر 150 جنيه على سعر أي جهاز تختاره من المعرض',
    icon: '📱',
    code: 'NOUR-PHONE-150',
    color: '#f59e0b', // amber-500
    textColor: '#09090b'
  },
  {
    id: 'p6',
    name: '100 نقطة ولاء مجانية تضاف لمحفظتك في سليم النور فون',
    shortName: '100 نقطة ولاء',
    desc: 'نقاط ذهبية تضاف لحسابك لاستبدالها بخصومات حقيقية لاحقاً',
    icon: '💎',
    code: 'NOUR-POINTS-100',
    color: '#1c1917', // stone-900
    textColor: '#fef08a',
    points: 100
  },
  {
    id: 'p7',
    name: 'ضمان كتابي إضافي لمدة 30 يوماً مجاناً على أي صيانة',
    shortName: 'ضمان إضافي شهر',
    desc: 'فترة حماية وضمان ممتدة إضافية من أ. أسامة موسى على قطع الغيار',
    icon: '🛡️',
    code: 'NOUR-EXTRA-WARRANTY',
    color: '#92400e', // amber-800
    textColor: '#ffffff'
  },
  {
    id: 'p8',
    name: 'خصم 10% فوري على إجمالي فاتورة الصيانة أو الشراء',
    shortName: 'خصم 10% شامل',
    desc: 'خصم فوري على أي خدمة صيانة أو إكسسوار تطلبه اليوم',
    icon: '🎉',
    code: 'NOUR-TOTAL-10',
    color: '#fbbf24', // amber-400
    textColor: '#09090b'
  }
];

const RECENT_WINNERS = [
  { name: 'أحمد السعيد', prize: 'خصم 50 ج.م على الشاشة', time: 'منذ 8 دقائق' },
  { name: 'محمود نصر', prize: 'كابل شحن سريع أصلي هدية', time: 'منذ 22 دقيقة' },
  { name: 'إبراهيم من الكردي', prize: '100 نقطة ولاء ذهبية', time: 'منذ 45 دقيقة' },
  { name: 'سارة عبد الله', prize: 'خصم 20% على الإكسسوارات', time: 'منذ ساعة' },
  { name: 'كريم الدسوقي', prize: 'كوبون 150 ج.م لهاتف جديد', time: 'منذ ساعتين' }
];

export function LuckyWheelSection() {
  const { currentUser, updateProfile } = useAuth();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [wonPrize, setWonPrize] = useState<PrizeItem | null>(null);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(3);

  const numSlices = PRIZES.length;
  const sliceAngle = 360 / numSlices;

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonPrize(null);
    setShowPrizeModal(false);

    // Random prize selection
    const randomIndex = Math.floor(Math.random() * numSlices);
    const selectedPrize = PRIZES[randomIndex];

    // Calculate rotation: at least 5-8 full spins (1800 - 2880 deg) + angle to target
    // Arrow is at the top (270 deg in canvas / 0 deg top pointer)
    const extraRotations = (5 + Math.floor(Math.random() * 3)) * 360;
    
    // Top arrow points to angle (270 - sliceCenter)
    const sliceCenter = randomIndex * sliceAngle + sliceAngle / 2;
    // Align with top pointer (at 0/360 degrees or top center):
    const targetDeg = extraRotations + (360 - sliceCenter);

    setRotationAngle((prev) => prev + targetDeg);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedPrize);
      setShowPrizeModal(true);
      setSpinsLeft((prev) => Math.max(0, prev - 1));

      // If points prize and user logged in, credit points
      if (selectedPrize.points && currentUser) {
        const currentPoints = currentUser.loyaltyPoints || 0;
        updateProfile({ loyaltyPoints: currentPoints + selectedPrize.points });
      }
    }, 4500);
  };

  const handleCopyCode = () => {
    if (!wonPrize) return;
    navigator.clipboard.writeText(wonPrize.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleWhatsAppClaim = () => {
    if (!wonPrize) return;
    const userText = currentUser ? `\n- اسم العميل: ${currentUser.name} (${currentUser.phone})` : '';
    const text = encodeURIComponent(
      `السلام عليكم أ. أسامة موسى (سليم النور فون)،\nلقد ربحت في لعبة عجلة الهدايا بالموقع:\n- الهدية/الخصم: ${wonPrize.name}\n- كود الكوبون: ${wonPrize.code}${userText}\nأريد تطبيق الخصم عند زيارتي للمحل بميدان المحطة بمدينة الكردي.`
    );
    window.open(`https://wa.me/201003075071?text=${text}`, '_blank');
  };

  return (
    <section id="lucky-wheel" className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir="rtl">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-950 bg-gradient-to-r from-amber-400 to-yellow-400 px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/20">
            <Gift className="w-4 h-4" />
            <span>لعبة الهدايا والخصومات الفورية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            عجلة الحظ والجوائز الذهبية 🎁
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            دوّر العجلة مجاناً واكسب فوراً خصومات حصرية، هدايا إكسسوارات، ونقاط ولاء مقدمة لزبائن <strong className="text-amber-400">سليم النور فون</strong> بالكردي!
          </p>
        </div>

        {/* Live Winners Ticker */}
        <div className="max-w-4xl mx-auto mb-10 p-3 rounded-2xl bg-zinc-900/90 border border-amber-500/30 flex items-center justify-between gap-4 overflow-hidden shadow-inner">
          <div className="flex items-center gap-2 text-xs font-black text-amber-400 shrink-0 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">
            <Trophy className="w-3.5 h-3.5" />
            <span>آخر الفائزين اليوم:</span>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-xs text-zinc-300 py-0.5">
            {RECENT_WINNERS.map((winner, idx) => (
              <div key={idx} className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-bold text-white">{winner.name}:</span>
                <span className="text-amber-300 font-semibold">{winner.prize}</span>
                <span className="text-[10px] text-zinc-500">({winner.time})</span>
                {idx < RECENT_WINNERS.length - 1 && <span className="text-zinc-700">•</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Wheel & Action Area Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          
          {/* Wheel Graphic Container (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            {/* Pointer / Arrow Indicator at top */}
            <div className="relative z-30 -mb-5 flex flex-col items-center">
              <div className="w-8 h-10 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-b-xl shadow-2xl flex items-center justify-center transform drop-shadow-[0_5px_15px_rgba(245,158,11,0.6)]">
                <ArrowDown className="w-5 h-5 text-zinc-950 stroke-[3] animate-bounce" />
              </div>
            </div>

            {/* Outer Wheel Ring with golden lights */}
            <div className="relative p-4 rounded-full bg-gradient-to-br from-amber-500 via-zinc-800 to-yellow-600 shadow-2xl shadow-amber-500/20 border-4 border-amber-400/80">
              
              {/* Inner SVG Rotating Wheel */}
              <div 
                className="w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-full overflow-hidden relative shadow-inner select-none"
                style={{
                  transform: `rotate(${rotationAngle}deg)`,
                  transition: isSpinning ? 'transform 4.5s cubic-bezier(0.15, 0.9, 0.2, 1.0)' : 'none'
                }}
              >
                <svg viewBox="0 0 400 400" className="w-full h-full transform">
                  {PRIZES.map((prize, index) => {
                    const startAngle = index * sliceAngle;
                    const endAngle = startAngle + sliceAngle;
                    
                    // Coordinates on 400x400 circle with radius 200, center (200, 200)
                    const rad1 = (startAngle - 90) * (Math.PI / 180);
                    const rad2 = (endAngle - 90) * (Math.PI / 180);
                    const x1 = 200 + 200 * Math.cos(rad1);
                    const y1 = 200 + 200 * Math.sin(rad1);
                    const x2 = 200 + 200 * Math.cos(rad2);
                    const y2 = 200 + 200 * Math.sin(rad2);

                    const pathData = `M 200 200 L ${x1} ${y1} A 200 200 0 0 1 ${x2} ${y2} Z`;

                    // Text position angle
                    const midAngle = startAngle + sliceAngle / 2;
                    const textRad = (midAngle - 90) * (Math.PI / 180);
                    const textX = 200 + 130 * Math.cos(textRad);
                    const textY = 200 + 130 * Math.sin(textRad);

                    return (
                      <g key={prize.id}>
                        <path 
                          d={pathData} 
                          fill={prize.color} 
                          stroke="#18181b" 
                          strokeWidth="2" 
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill={prize.textColor}
                          fontSize="11"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                          className="font-sans select-none"
                        >
                          {prize.shortName}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Decorative pegs on the border */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2.5 h-2.5 rounded-full bg-yellow-300 border border-zinc-950 shadow-md"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 22.5}deg) translate(0, -188px)`
                    }}
                  />
                ))}
              </div>

              {/* Center Spin Button Hub */}
              <button
                type="button"
                onClick={handleSpin}
                disabled={isSpinning}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600 text-zinc-950 font-black flex flex-col items-center justify-center shadow-2xl border-4 border-zinc-950 cursor-pointer active:scale-95 disabled:opacity-90 disabled:cursor-not-allowed z-20 group hover:brightness-110 transition-all"
                title="اضغط لتدوير العجلة"
              >
                <Sparkles className={`w-5 h-5 text-zinc-950 ${isSpinning ? 'animate-spin' : 'group-hover:scale-125 transition-transform'}`} />
                <span className="text-xs sm:text-sm font-black leading-tight mt-0.5">
                  {isSpinning ? 'يلف...' : 'دَوّر الآن'}
                </span>
                <span className="text-[9px] text-zinc-900 font-bold">مجاناً</span>
              </button>

            </div>

            {/* Quick status below wheel */}
            <div className="mt-6 flex items-center gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 font-bold text-amber-300">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>لديك اليوم: <strong className="text-white font-mono text-sm">{spinsLeft}</strong> محاولات متبقية</span>
              </span>
              <span>•</span>
              <span>الجوائز حقيقية ومضمونة 100%</span>
            </div>

          </div>

          {/* Right Info & Prize List Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Box Header */}
            <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-2xl border border-amber-500/30">
                  🎁
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">كيف تستلم هديتك أو خصمك؟</h3>
                  <p className="text-xs text-zinc-400">بسيطة جداً في 3 خطوات سهلة وسريعة</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-zinc-950 font-black text-xs flex items-center justify-center shrink-0">1</span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    اضغط على زر <strong className="text-amber-400">"دَوّر الآن"</strong> في منتصف العجلة لتدويرها.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-zinc-950 font-black text-xs flex items-center justify-center shrink-0">2</span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    ستظهر لك هديتك مع <strong className="text-amber-400">كود الخصم الحصري</strong> فور توقف العجلة.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-zinc-950 font-black text-xs flex items-center justify-center shrink-0">3</span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    أرسل الكود عبر واتساب أو أظهره للأستاذ <strong className="text-white">أسامة موسى</strong> بمحل سليم النور فون بالكردي لتطبيق الخصم فوراً!
                  </p>
                </div>
              </div>

              {/* Big CTA to Spin */}
              <button
                type="button"
                onClick={handleSpin}
                disabled={isSpinning}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4 stroke-[3]" />
                <span>{isSpinning ? 'جاري تدوير العجلة...' : 'جرب حظك الآن واكسب هديتك!'}</span>
              </button>
            </div>

            {/* Available Prizes Overview Cards */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-200">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Star className="w-3.5 h-3.5" />
                  <span>جميع الجوائز المتوفرة في العجلة:</span>
                </span>
                <span className="text-[11px] text-zinc-500">8 جوائز مختلفة</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-300">
                {PRIZES.slice(0, 6).map((p) => (
                  <div key={p.id} className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-2">
                    <span className="text-base">{p.icon}</span>
                    <span className="truncate">{p.shortName}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ==========================================================
          WINNING PRIZE CELEBRATION MODAL
      ========================================================== */}
      {showPrizeModal && wonPrize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200" dir="rtl">
          <div className="relative w-full max-w-lg bg-zinc-900 border-2 border-amber-500 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-center space-y-6">
            
            {/* Ambient top glow */}
            <div className="absolute top-0 right-0 left-0 h-32 bg-gradient-to-b from-amber-500/20 to-transparent pointer-events-none" />

            {/* Celebration Icon */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 p-1 mx-auto shadow-2xl shadow-amber-500/40 flex items-center justify-center text-4xl sm:text-5xl animate-bounce">
                {wonPrize.icon}
              </div>
              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black">
                مبروك عليك الفوز! 🎉
              </span>
            </div>

            {/* Prize Title & Description */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {wonPrize.name}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md mx-auto">
                {wonPrize.desc}
              </p>
            </div>

            {/* Coupon Code Box */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/40 space-y-2">
              <span className="text-[11px] font-bold text-zinc-400 block">
                كود الهدية والخصم الخاص بك:
              </span>
              
              <div className="flex items-center justify-between gap-2 bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-base sm:text-lg font-black text-amber-400 font-mono tracking-widest" dir="ltr">
                  {wonPrize.code}
                </span>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ الكود</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-zinc-500">
                صالح للاستخدام الفوري بمحل سليم النور فون - ميدان المحطة بمدينة الكردي
              </p>
            </div>

            {/* Actions: Claim via WhatsApp + Close/Spin Again */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppClaim}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>استلام الهدية وتأكيد الكود عبر واتساب أسامة موسى</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPrizeModal(false);
                    handleSpin();
                  }}
                  className="py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>تدوير العجلة مرة أخرى</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPrizeModal(false)}
                  className="py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  إغلاق واحتفاظ بالكود
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
