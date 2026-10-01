import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Sparkles, Gift, Trophy, Check, Copy, MessageSquare, 
  RotateCw, ArrowDown, Tag, Flame, Percent, ShieldCheck, 
  ChevronRight, Award, Zap, Smartphone, ExternalLink, RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SHOP_INFO } from '../data/shopData';

interface WheelSector {
  id: string;
  label: string;
  shortLabel: string;
  subText: string;
  code: string;
  color: string;
  textColor: string;
  type: 'discount' | 'gift' | 'points' | 'service' | 'retry';
  value: number; // For points or discount amounts
}

const SECTORS: WheelSector[] = [
  {
    id: 's1',
    label: 'خصم 50 ج.م على الإكسسوارات',
    shortLabel: 'خصم 50 ج.م',
    subText: 'على أي جراب أو شاحن أو سماعة',
    code: 'NOUR-ACC50',
    color: '#f59e0b', // Amber 500
    textColor: '#09090b',
    type: 'discount',
    value: 50
  },
  {
    id: 's2',
    label: 'اسكرينة زجاجية أصلية هدية',
    shortLabel: 'اسكرينة هدية 🎁',
    subText: 'تركيب مجاني مع أي فحص أو صيانة',
    code: 'FREE-GLASS',
    color: '#09090b', // Zinc 950
    textColor: '#fbbf24',
    type: 'gift',
    value: 0
  },
  {
    id: 's3',
    label: '100 نقطة ولاء ذهبية فورية',
    shortLabel: '+100 نقطة ⭐',
    subText: 'تضاف لرصيد حسابك لاستبدالها بخصومات',
    code: 'POINTS100',
    color: '#eab308', // Yellow 500
    textColor: '#09090b',
    type: 'points',
    value: 100
  },
  {
    id: 's4',
    label: 'خصم 15% على كابلات الشحن السريع',
    shortLabel: 'خصم 15% كابلات',
    subText: 'لكابلات تايب سي والآيفون الأصلية',
    code: 'CABLE15',
    color: '#18181b', // Zinc 900
    textColor: '#fef08a',
    type: 'discount',
    value: 15
  },
  {
    id: 's5',
    label: 'فحص فني مجاني للبطارية والموبايل',
    shortLabel: 'فحص مجاني 🔍',
    subText: 'فحص كامل للأداء والحرارة والشحن',
    code: 'FREE-CHECK',
    color: '#d97706', // Amber 600
    textColor: '#ffffff',
    type: 'service',
    value: 0
  },
  {
    id: 's6',
    label: 'خصم 100 ج.م على تغيير الشاشات',
    shortLabel: 'خصم 100 ج.م شاشات 📱',
    subText: 'على أي شاشة أصلية مع ضمان سليم النور فون',
    code: 'SCREEN100',
    color: '#09090b', // Zinc 950
    textColor: '#f59e0b',
    type: 'discount',
    value: 100
  },
  {
    id: 's7',
    label: 'خصم 25 ج.م على الشواحن والسماعات',
    shortLabel: 'خصم 25 ج.م',
    subText: 'خصم فوري مباشر عند الشراء بالمحل',
    code: 'AUDIO25',
    color: '#eab308', // Yellow 500
    textColor: '#09090b',
    type: 'discount',
    value: 25
  },
  {
    id: 's8',
    label: 'فرصة إضافية: لفة حظ ثانية مجانية!',
    shortLabel: 'لفة إضافية 🔄',
    subText: 'مبروك! يمكنك تدوير العجلة مرة أخرى الآن',
    code: 'SPIN-AGAIN',
    color: '#27272a', // Zinc 800
    textColor: '#fbbf24',
    type: 'retry',
    value: 0
  }
];

const LAST_SPIN_KEY = 'selim_nour_phone_last_lucky_spin_v1';
const SAVED_COUPONS_KEY = 'selim_nour_phone_won_coupons_v1';

interface LuckyWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LuckyWheelModal({ isOpen, onClose }: LuckyWheelModalProps) {
  const { currentUser, updateProfile, openLogin } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'wheel' | 'coupons'>('wheel');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [winningSector, setWinningSector] = useState<WheelSector | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [spinCountRemaining, setSpinCountRemaining] = useState<number>(1);
  const [savedCoupons, setSavedCoupons] = useState<{
    code: string;
    label: string;
    date: string;
    subText: string;
  }[]>(() => {
    try {
      const saved = localStorage.getItem(SAVED_COUPONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        code: 'WELCOME50',
        label: 'خصم ترحيبي 50 ج.م',
        date: 'كوبون دائم للزبائن الجدد',
        subText: 'على أي فاتورة شراء أو صيانة فوق 300 ج.م'
      },
      {
        code: 'KURDI-VIP',
        label: 'خصم 10% لأهالي مدينة الكردي',
        date: 'عرض مستمر بميدان المحطة',
        subText: 'خصم خاص على إكسسوارات الحماية والجرابات'
      }
    ];
  });

  // Calculate daily spin limit
  useEffect(() => {
    try {
      const lastSpin = localStorage.getItem(LAST_SPIN_KEY);
      if (lastSpin) {
        const lastDate = new Date(lastSpin).toDateString();
        const today = new Date().toDateString();
        if (lastDate === today) {
          setSpinCountRemaining(0);
        } else {
          setSpinCountRemaining(1);
        }
      } else {
        setSpinCountRemaining(1);
      }
    } catch (e) {
      setSpinCountRemaining(1);
    }
  }, [isOpen]);

  // Save coupons to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_COUPONS_KEY, JSON.stringify(savedCoupons));
    } catch (e) {
      console.error(e);
    }
  }, [savedCoupons]);

  if (!isOpen) return null;

  const numSectors = SECTORS.length;
  const sectorAngle = 360 / numSectors;

  const handleSpin = () => {
    if (isSpinning) return;

    // Pick a winning index (favor great discounts for real joy!)
    const winningIndex = Math.floor(Math.random() * numSectors);
    const chosenSector = SECTORS[winningIndex];

    // Minimum 5 full rotations (1800 deg) + offset to align winning sector at the top pointer (90 or 270 deg)
    // The top pointer is at 270 degrees in SVG coordinates (or 0 at top depending on orientation)
    // We want the chosen sector center to land at the top pointer (0 degrees)
    const extraRotations = 360 * 6; // 6 full spins
    const sectorCenter = winningIndex * sectorAngle + sectorAngle / 2;
    // To land at top (0 deg):
    const targetDegree = extraRotations + (360 - sectorCenter);

    setIsSpinning(true);
    setWinningSector(null);
    setHasCopied(false);

    // Apply rotation
    setRotationDegrees((prev) => prev + targetDegree);

    setTimeout(() => {
      setIsSpinning(false);
      setWinningSector(chosenSector);

      // Decrement spin unless it's a retry
      if (chosenSector.type === 'retry') {
        setSpinCountRemaining(1);
      } else {
        setSpinCountRemaining(0);
        try {
          localStorage.setItem(LAST_SPIN_KEY, new Date().toISOString());
        } catch (e) {}
      }

      // Add to saved coupons
      if (chosenSector.type !== 'retry') {
        const newCoupon = {
          code: chosenSector.code,
          label: chosenSector.label,
          date: new Date().toLocaleDateString('ar-EG'),
          subText: chosenSector.subText
        };
        setSavedCoupons((prev) => [newCoupon, ...prev.filter(c => c.code !== chosenSector.code)]);

        // If won points and logged in, credit immediately!
        if (chosenSector.type === 'points' && currentUser) {
          const updatedPoints = (currentUser.loyaltyPoints || 0) + chosenSector.value;
          updateProfile({ loyaltyPoints: updatedPoints });
        }
      }
    }, 4500);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  const getWhatsAppRedeemUrl = (sector: WheelSector) => {
    const text = encodeURIComponent(
      `السلام عليكم أ. أسامة موسى (سليم النور فون)،\nفزت في عجلة الحظ بعرض:\n- الجائزة: ${sector.label}\n- كود الكوبون: ${sector.code}\nأود استخدامه لديكم في المحل بميدان المحطة بمدينة الكردي.`
    );
    return `https://wa.me/201003075071?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-zinc-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden my-6"
        dir="rtl"
      >
        {/* Glow ambient effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/90 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 p-0.5 shadow-lg shadow-amber-500/30">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-amber-400">
                <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">عجلة الحظ والخصومات اليومية</h3>
                <span className="text-[10px] text-zinc-950 bg-amber-400 font-bold px-2 py-0.5 rounded-full font-mono">
                  سليم النور فون
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                دوّر العجلة واربح كوبونات خصم فورية، اسكرينات هدية، ونقاط ولاء في المحل بالكردي!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-4 pb-0 bg-zinc-950/60 border-b border-zinc-800/80">
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-zinc-900 border border-zinc-800">
            <button
              type="button"
              onClick={() => setActiveTab('wheel')}
              className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'wheel'
                  ? 'bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <RotateCw className="w-4 h-4" />
              <span>عجلة الحظ (العب واكسب)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('coupons')}
              className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'coupons'
                  ? 'bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>كوبونات وخصومات اليوم ({savedCoupons.length})</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">

          {/* ========================================================
              TAB 1: LUCKY SPIN WHEEL
          ======================================================== */}
          {activeTab === 'wheel' && (
            <div className="flex flex-col items-center justify-center space-y-6">
              
              {/* Daily status banner */}
              <div className="w-full p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <span className="text-amber-300 font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>لك لفة حظ يومية مجانية لجميع زبائن الكردي والمحل!</span>
                </span>
                <span className="text-[11px] font-mono bg-zinc-950 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                  {spinCountRemaining > 0 ? '✓ متاح لك لفة الآن' : 'تم تدوير العجلة اليوم'}
                </span>
              </div>

              {/* The Wheel Visual Container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                
                {/* Pointer / Needle Indicator at Top */}
                <div className="absolute -top-3 z-30 flex flex-col items-center">
                  <div className="w-6 h-7 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-sm shadow-2xl clip-triangle drop-shadow-[0_4px_10px_rgba(245,158,11,0.8)] animate-pulse" 
                       style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }} />
                  <div className="w-3 h-3 rounded-full bg-amber-200 border-2 border-zinc-950 shadow -mt-7" />
                </div>

                {/* Outer Glow Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-amber-500/60 shadow-[0_0_40px_rgba(245,158,11,0.25)] pointer-events-none" />

                {/* The Rotating Wheel SVG */}
                <div 
                  className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-zinc-800"
                  style={{
                    transform: `rotate(${rotationDegrees}deg)`,
                    transition: isSpinning ? 'transform 4.5s cubic-bezier(0.12, 0.85, 0.25, 1)' : 'none'
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {SECTORS.map((sector, index) => {
                      const startAngle = (index * 360) / numSectors;
                      const endAngle = ((index + 1) * 360) / numSectors;
                      const startRad = (startAngle * Math.PI) / 180;
                      const endRad = (endAngle * Math.PI) / 180;

                      // Coordinates for pie slice
                      const x1 = 50 + 50 * Math.cos(startRad);
                      const y1 = 50 + 50 * Math.sin(startRad);
                      const x2 = 50 + 50 * Math.cos(endRad);
                      const y2 = 50 + 50 * Math.sin(endRad);

                      const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                      // Mid-angle for text placement
                      const midAngle = startAngle + sectorAngle / 2;
                      const midRad = (midAngle * Math.PI) / 180;
                      const textX = 50 + 33 * Math.cos(midRad);
                      const textY = 50 + 33 * Math.sin(midRad);

                      return (
                        <g key={sector.id}>
                          <path
                            d={pathData}
                            fill={sector.color}
                            stroke="#27272a"
                            strokeWidth="0.8"
                          />
                          <text
                            x={textX}
                            y={textY}
                            fill={sector.textColor}
                            fontSize="3.6"
                            fontWeight="900"
                            textAnchor="middle"
                            dominantBaseline="central"
                            transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                            style={{ userSelect: 'none', fontFamily: 'sans-serif' }}
                          >
                            {sector.shortLabel}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Center Spin Hub / Button */}
                <button
                  type="button"
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="absolute z-20 w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-zinc-950 font-black shadow-2xl flex flex-col items-center justify-center p-1 border-4 border-zinc-950 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
                  aria-label="تدوير العجلة"
                >
                  <Sparkles className="w-5 h-5 mb-0.5 fill-zinc-950" />
                  <span className="text-[11px] font-black leading-tight">
                    {isSpinning ? 'جاري اللف...' : 'اضغط للّف'}
                  </span>
                </button>
              </div>

              {/* Spin Action Button Below Wheel */}
              <div className="w-full flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="w-full max-w-sm py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-sm shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all disabled:opacity-50"
                >
                  <RotateCw className={`w-4 h-4 stroke-[3] ${isSpinning ? 'animate-spin' : ''}`} />
                  <span>
                    {isSpinning 
                      ? 'العجلة تدور الآن... ترقب جائزتك!' 
                      : spinCountRemaining > 0 
                      ? 'دوّر العجلة الآن مجاناً 🎁' 
                      : 'تدوير العجلة لفة إضافية'}
                  </span>
                </button>

                <p className="text-[11px] text-zinc-400">
                  جميع الجوائز والكوبونات معتمدة وسارية للاستخدام لدى <strong>أ. أسامة موسى</strong> في المحل.
                </p>
              </div>

              {/* Winning Celebration Card */}
              {winningSector && (
                <div className="w-full p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-zinc-950 to-amber-950/30 border-2 border-amber-400 shadow-2xl space-y-3 animate-in zoom-in-95 duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-zinc-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/30">
                      <Trophy className="w-6 h-6 fill-zinc-950" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        🎉 مبروك! فزت معنا بجائزة:
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-white mt-0.5">
                        {winningSector.label}
                      </h4>
                      <p className="text-xs text-zinc-300">{winningSector.subText}</p>
                    </div>
                  </div>

                  {winningSector.type === 'points' ? (
                    <div className="p-3 rounded-xl bg-zinc-900 border border-amber-500/30 text-xs flex items-center justify-between">
                      <span className="text-amber-300 font-bold">
                        {currentUser ? `تمت إضافة 100 نقطة لرصيدك بنجاح! رصيدك الآن: ${currentUser.loyaltyPoints}ن` : 'سجّل حسابك الآن لتحفظ الـ 100 نقطة في محفظتك!'}
                      </span>
                      {!currentUser && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            openLogin();
                          }}
                          className="px-3 py-1 rounded-lg bg-amber-500 text-zinc-950 font-black text-[11px] hover:bg-amber-400"
                        >
                          تسجيل الدخول لحفظ النقاط
                        </button>
                      )}
                    </div>
                  ) : winningSector.type !== 'retry' ? (
                    <div className="p-3.5 rounded-xl bg-zinc-900 border border-dashed border-amber-500/60 flex flex-wrap items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-zinc-400">كود الخصم الحصري الخاص بك:</span>
                        <div className="text-sm font-black text-amber-400 font-mono tracking-widest" dir="ltr">
                          {winningSector.code}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyCode(winningSector.code)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          {hasCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">تم النسخ!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-amber-400" />
                              <span>نسخ الكود</span>
                            </>
                          )}
                        </button>

                        <a
                          href={getWhatsAppRedeemUrl(winningSector)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>تفعيل عبر واتساب أسامة</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-amber-300 font-bold bg-zinc-900 p-2.5 rounded-xl text-center">
                      حظ سعيد! يمكنك الآن تدوير العجلة لفة أخرى مجاناً للحصول على خصم أكبر!
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* ========================================================
              TAB 2: SAVED & ACTIVE STORE COUPONS
          ======================================================== */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
                هذه قائمة بكوبونات الخصم التي ربحتها في عجلة الحظ والعروض الحصرية النشطة في محل سليم النور فون بالكردي. يمكنك نسخ أي كود وإظهاره للفني أو إرساله عبر الواتساب للاستفادة من الخصم مباشرة.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedCoupons.map((coupon, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3 shadow-md"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-white">{coupon.label}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">{coupon.date}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">{coupon.subText}</p>
                    </div>

                    <div className="pt-2 border-t border-zinc-850 flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-black text-amber-400 bg-zinc-900 px-2.5 py-1 rounded-lg border border-amber-500/30" dir="ltr">
                        {coupon.code}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopyCode(coupon.code)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                          title="نسخ الكود"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={`https://wa.me/201003075071?text=${encodeURIComponent(`السلام عليكم أ. أسامة، أود استخدام كوبون (${coupon.code}) للحصول على: ${coupon.label}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>تفعيل</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reset / Daily message */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-2">
                <Gift className="w-6 h-6 text-amber-400 mx-auto" />
                <h5 className="text-xs font-bold text-white">تريد كوبونات وخصومات أكثر؟</h5>
                <p className="text-[11px] text-zinc-400">
                  ارجع يومياً لتدوير عجلة الحظ مجاناً أو أنشئ حسابك لتجميع نقاط الولاء واستبدالها بخصومات نقدية فورية!
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('wheel')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-colors cursor-pointer mt-1"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>تدوير عجلة الحظ الآن</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>كافة الخصومات والكوبونات مضمونة ومسجلة لدى إدارة المحل</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
}
