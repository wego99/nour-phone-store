import React, { useState } from 'react';
import { 
  X, RefreshCw, Smartphone, Check, ArrowRight, ShieldCheck, 
  MessageSquare, Sparkles, AlertCircle, ChevronDown, Award, Zap
} from 'lucide-react';
import { SHOP_INFO, PRODUCTS_CATALOG, PHONE_BRANDS } from '../data/shopData';

interface TradeInCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetTargetPhoneName?: string;
  presetTargetPhonePrice?: number;
}

const OLD_MODELS_BY_BRAND: Record<string, { model: string; baseValue: number }[]> = {
  apple: [
    { model: 'آيفون 14 برو ماكس (iPhone 14 Pro Max)', baseValue: 34000 },
    { model: 'آيفون 14 برو (iPhone 14 Pro)', baseValue: 29000 },
    { model: 'آيفون 13 برو ماكس (iPhone 13 Pro Max)', baseValue: 27500 },
    { model: 'آيفون 13 عادي (iPhone 13)', baseValue: 21000 },
    { model: 'آيفون 12 برو ماكس (iPhone 12 Pro Max)', baseValue: 21500 },
    { model: 'آيفون 12 عادي (iPhone 12)', baseValue: 15500 },
    { model: 'آيفون 11 عادي (iPhone 11)', baseValue: 12000 },
    { model: 'آيفون XS Max أو X', baseValue: 8500 },
  ],
  samsung: [
    { model: 'سامسونج Galaxy S23 Ultra', baseValue: 31000 },
    { model: 'سامسونج Galaxy S22 Ultra', baseValue: 22000 },
    { model: 'سامسونج Galaxy S21 Ultra', baseValue: 16500 },
    { model: 'سامسونج Galaxy A54 5G', baseValue: 10500 },
    { model: 'سامسونج Galaxy A53 / A52s', baseValue: 7500 },
    { model: 'سامسونج Galaxy A34 / A33', baseValue: 6500 },
    { model: 'سامسونج Galaxy A14 / A13', baseValue: 4000 },
  ],
  xiaomi: [
    { model: 'شاومي 13T Pro', baseValue: 18500 },
    { model: 'شاومي Redmi Note 12 Pro', baseValue: 7500 },
    { model: 'شاومي Redmi Note 11 Pro', baseValue: 5500 },
    { model: 'شاومي Poco X5 Pro / X4 Pro', baseValue: 7000 },
    { model: 'شاومي Redmi 12 / 10C', baseValue: 3800 },
  ],
  oppo: [
    { model: 'أوبو Reno 10 5G', baseValue: 12500 },
    { model: 'أوبو Reno 8T / Reno 7', baseValue: 8000 },
    { model: 'أوبو Reno 6 / Reno 5', baseValue: 6000 },
    { model: 'أوبو A78 / A77s', baseValue: 5500 },
    { model: 'أوبو A58 / A17', baseValue: 4200 },
  ],
  realme: [
    { model: 'ريلمي 11 Pro Plus', baseValue: 11500 },
    { model: 'ريلمي 10 Pro / Realme 10', baseValue: 6800 },
    { model: 'ريلمي 9 Pro / Realme 8', baseValue: 5000 },
    { model: 'ريلمي C55 / C53', baseValue: 4500 },
  ]
};

export function TradeInCalculatorModal({
  isOpen,
  onClose,
  presetTargetPhoneName,
  presetTargetPhonePrice,
}: TradeInCalculatorModalProps) {
  const [brand, setBrand] = useState('apple');
  const [modelIndex, setModelIndex] = useState(0);
  const [condition, setCondition] = useState<'like_new' | 'excellent' | 'good' | 'needs_repair'>('excellent');
  const [batteryHealth, setBatteryHealth] = useState<'85_plus' | 'under_85'>('85_plus');
  const [hasBox, setHasBox] = useState(true);

  // Target new phone
  const [targetPhonePrice, setTargetPhonePrice] = useState<number>(presetTargetPhonePrice || 23500);
  const [targetPhoneName, setTargetPhoneName] = useState<string>(presetTargetPhoneName || 'آيفون 13 (128 جيجا)');

  if (!isOpen) return null;

  const currentModels = OLD_MODELS_BY_BRAND[brand] || OLD_MODELS_BY_BRAND.apple;
  const currentModel = currentModels[modelIndex] || currentModels[0];

  // Condition multiplier
  let conditionFactor = 1.0;
  if (condition === 'like_new') conditionFactor = 1.08;
  if (condition === 'excellent') conditionFactor = 1.0;
  if (condition === 'good') conditionFactor = 0.85;
  if (condition === 'needs_repair') conditionFactor = 0.65;

  let batteryFactor = batteryHealth === '85_plus' ? 1.0 : 0.92;
  let boxFactor = hasBox ? 1.03 : 0.97;

  const estimatedOldValue = Math.round(currentModel.baseValue * conditionFactor * batteryFactor * boxFactor);
  const estimatedMin = Math.round(estimatedOldValue * 0.96);
  const estimatedMax = Math.round(estimatedOldValue * 1.04);

  // Price difference
  const differenceToPay = Math.max(0, targetPhonePrice - estimatedOldValue);

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `السلام عليكم أ. أسامة موسى (سليم النور فون)،\nأرغب في استبدال هاتفي القديم بجديد:\n` +
      `- هاتفي القديم: ${currentModel.model}\n` +
      `- حالته: ${condition === 'like_new' ? 'كسر زيرو كالجديد' : condition === 'excellent' ? 'ممتاز بدون خدوش' : condition === 'good' ? 'جيد مستعمل' : 'يحتاج فحص وصيانة'}\n` +
      `- معه الكرتونة الأصلية: ${hasBox ? 'نعم' : 'لا'}\n` +
      `- التقييم التقديري: من ${estimatedMin.toLocaleString('ar-EG')} إلى ${estimatedMax.toLocaleString('ar-EG')} ج.م\n` +
      `- الهاتف الجديد المطلوب: ${targetPhoneName} (${targetPhonePrice.toLocaleString('ar-EG')} ج.م)\n` +
      `- الفرق المطلوب دفعه: حوالي ${differenceToPay.toLocaleString('ar-EG')} ج.م\n` +
      `أود حجز موعد لفحص هاتفي وإتمام الاستبدال بالمحل في مدينة الكردي بميدان المحطة.`
    );
    window.open(`https://wa.me/201003075071?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-zinc-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden my-6"
        dir="rtl"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/90 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 p-0.5 shadow-lg shadow-amber-500/30">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-amber-400">
                <RefreshCw className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">خدمة استبدال وتثمين هاتفك القديم بجديد</h3>
                <span className="text-[10px] text-zinc-950 bg-amber-400 font-bold px-2 py-0.5 rounded-full font-mono">
                  Trade-In
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                هات تليفونك القديم وخد أحدث موبايل وادفع الفرق كاش أو قسط مع سليم النور فون بالكردي!
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

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* Left: Old Phone Specs */}
            <div className="space-y-4 bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800">
              <span className="text-xs font-black text-amber-400 flex items-center gap-1.5 pb-2 border-b border-zinc-850">
                <Smartphone className="w-4 h-4" />
                <span>1. حدد مواصفات هاتفك القديم:</span>
              </span>

              {/* Brand Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-300">ماركة الهاتف القديم:</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {Object.keys(OLD_MODELS_BY_BRAND).map((bKey) => (
                    <button
                      key={bKey}
                      type="button"
                      onClick={() => {
                        setBrand(bKey);
                        setModelIndex(0);
                      }}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                        brand === bKey
                          ? 'bg-amber-500 text-zinc-950 font-black shadow-sm'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      {bKey === 'apple' ? 'آيفون' : bKey === 'samsung' ? 'سامسونج' : bKey === 'xiaomi' ? 'شاومي' : bKey === 'oppo' ? 'أوبو' : 'ريلمي'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-300">موديل الجهاز القديم:</label>
                <select
                  value={modelIndex}
                  onChange={(e) => setModelIndex(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-400 text-white text-xs font-bold outline-none cursor-pointer"
                >
                  {currentModels.map((m, idx) => (
                    <option key={idx} value={idx}>
                      {m.model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-300">حالة الجهاز الخارجية والفنية:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setCondition('like_new')}
                    className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                      condition === 'like_new'
                        ? 'bg-amber-500/15 border-amber-400 text-amber-300 font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <p className="font-bold text-white">✨ كسر زيرو (كالجديد)</p>
                    <p className="text-[10px] text-zinc-400">لا يوجد أي خدش إطلاقاً</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCondition('excellent')}
                    className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                      condition === 'excellent'
                        ? 'bg-amber-500/15 border-amber-400 text-amber-300 font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <p className="font-bold text-white">⭐ ممتاز</p>
                    <p className="text-[10px] text-zinc-400">استخدام نظيف وخدوش لا تذكر</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCondition('good')}
                    className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                      condition === 'good'
                        ? 'bg-amber-500/15 border-amber-400 text-amber-300 font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <p className="font-bold text-white">📱 جيد</p>
                    <p className="text-[10px] text-zinc-400">خدوش استخدام عادية بالشاسيه</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCondition('needs_repair')}
                    className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                      condition === 'needs_repair'
                        ? 'bg-amber-500/15 border-amber-400 text-amber-300 font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <p className="font-bold text-white">⚠️ يحتاج صيانة</p>
                    <p className="text-[10px] text-zinc-400">كسر بالشاشة أو عيب بطارية</p>
                  </button>
                </div>
              </div>

              {/* Accessories & Battery */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <label className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs cursor-pointer">
                  <span className="text-zinc-300">الكرتونة متوفرة:</span>
                  <input
                    type="checkbox"
                    checked={hasBox}
                    onChange={(e) => setHasBox(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                </label>

                <label className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs cursor-pointer">
                  <span className="text-zinc-300">البطارية فوق 85%:</span>
                  <input
                    type="checkbox"
                    checked={batteryHealth === '85_plus'}
                    onChange={(e) => setBatteryHealth(e.target.checked ? '85_plus' : 'under_85')}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                </label>
              </div>

              {/* Instant Valuation of Old Device */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/50 text-center space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase">القيمة التقديرية لجهازك القديم:</span>
                <div className="text-2xl font-black text-white font-mono" dir="ltr">
                  {estimatedMin.toLocaleString('ar-EG')} - {estimatedMax.toLocaleString('ar-EG')} <span className="text-sm font-sans text-amber-300">ج.م</span>
                </div>
                <p className="text-[10px] text-zinc-400">
                  * السعر النهائي يحدد عند فحص الجهاز بفرع المحل بميدان المحطة.
                </p>
              </div>
            </div>

            {/* Right: Target New Phone & Difference */}
            <div className="space-y-4 bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800">
              <span className="text-xs font-black text-amber-400 flex items-center gap-1.5 pb-2 border-b border-zinc-850">
                <Sparkles className="w-4 h-4" />
                <span>2. اختر الهاتف الجديد المراد استبداله:</span>
              </span>

              {/* Target Phone Presets */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-300">اختر من أجهزة المعرض المتوفرة:</label>
                <div className="space-y-2">
                  {PRODUCTS_CATALOG.slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setTargetPhoneName(p.name);
                        setTargetPhonePrice(p.price);
                      }}
                      className={`w-full p-2.5 rounded-xl border text-right flex items-center justify-between text-xs transition-all cursor-pointer ${
                        targetPhoneName === p.name
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-sm'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-white">{p.name}</p>
                        <p className="text-[10px] text-amber-400 font-mono mt-0.5">{p.priceFormatted}</p>
                      </div>
                      {targetPhoneName === p.name && (
                        <Check className="w-4 h-4 text-amber-400 stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Target Phone Inputs */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400">أو اكتب اسم الجهاز:</label>
                  <input
                    type="text"
                    value={targetPhoneName}
                    onChange={(e) => setTargetPhoneName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs font-bold outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400">سعر الجديد (ج.م):</label>
                  <input
                    type="number"
                    value={targetPhonePrice}
                    onChange={(e) => setTargetPhonePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-xs font-bold outline-none text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Difference Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-zinc-950 to-emerald-950 border border-emerald-500/50 text-center space-y-1 shadow-lg">
                <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                  فرق السعر التقريبي المطلوب دفعه:
                </span>
                <div className="text-3xl font-black text-emerald-300 font-mono" dir="ltr">
                  {differenceToPay.toLocaleString('ar-EG')} <span className="text-sm font-sans">ج.م</span>
                </div>
                <p className="text-[11px] text-zinc-300 font-medium">
                  {differenceToPay === 0 ? 'مبروك! هاتفك القديم يغطي قيمة الجهاز الجديد بالكامل' : 'يمكن دفع الفرق كاش فوراً أو تقسيطه على دفعات ميسرة!'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>تأكيد طلب الاستبدال عبر واتساب أسامة موسى</span>
                </button>

                <p className="text-[10px] text-zinc-400 text-center">
                  📍 المعاينة والفحص النهائي بمقر سليم النور فون بميدان المحطة بمدينة الكردي
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
