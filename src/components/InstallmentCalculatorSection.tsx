import { useState } from 'react';
import { Calculator, CreditCard, Check, Sparkles, Phone, MessageSquare, ShieldCheck, ChevronRight, HelpCircle, FileText, ArrowRight, Zap, BadgePercent } from 'lucide-react';
import { SHOP_INFO, PRODUCTS_CATALOG } from '../data/shopData';

interface InstallmentPlan {
  id: string;
  name: string;
  badge: string;
  interestRateAnnual: number; // e.g. 0.15 for 15%
  minDownPaymentPercent: number; // e.g. 10 for 10%
  requirements: string[];
  maxMonths: number;
}

const PROVIDERS: InstallmentPlan[] = [
  {
    id: 'direct_nour',
    name: 'تقسيط سليم النور فون المباشر',
    badge: 'الأكثر طلباً بالكردي ⭐',
    interestRateAnnual: 0.18,
    minDownPaymentPercent: 20,
    requirements: ['صورة بطاقة الرقم القومي سارية', 'ضامن من الدرجة الأولى', 'إيصال مرافق (كهرباء أو مياه أو غاز)', 'استلام فوري للجهاز بالكرتونة'],
    maxMonths: 24,
  },
  {
    id: 'valu',
    name: 'تقسيط فاليو (valU)',
    badge: 'موافقة فورية ⚡',
    interestRateAnnual: 0.19,
    minDownPaymentPercent: 0,
    requirements: ['حساب فاليو مفعل بالبطاقة', 'بدون مقدم (0% مقدم)', 'إمكانية التقسيط حتى 36 شهر'],
    maxMonths: 36,
  },
  {
    id: 'aman',
    name: 'تقسيط أمان (AMAN)',
    badge: 'تقسيط شبكة أمان',
    interestRateAnnual: 0.20,
    minDownPaymentPercent: 10,
    requirements: ['تطبيق أمان أو الفرع', 'صورة البطاقة فقط', 'أقساط شهرية مريحة'],
    maxMonths: 24,
  },
  {
    id: 'bank_visa',
    name: 'فيزا مشتريات البنوك (0% فوائد)',
    badge: 'بدون فوائد (0%) 🏆',
    interestRateAnnual: 0.0,
    minDownPaymentPercent: 0,
    requirements: ['بطاقة ائتمان (مشتريات) من البنك الأهلي، مصر، CIB، أو QNB', 'تقسيط 6 أو 12 شهر بدون فوائد بنكية', 'الخصم المباشر من رصيد البطاقة'],
    maxMonths: 12,
  },
  {
    id: 'souhoola',
    name: 'تقسيط سهولة (Souhoola)',
    badge: 'تمويل سريع',
    interestRateAnnual: 0.20,
    minDownPaymentPercent: 10,
    requirements: ['حساب سهولة مفعل', 'أقل فائدة للطلاب والموظفين'],
    maxMonths: 24,
  }
];

// Presets for quick calculation
const PRESET_PHONES = [
  { name: 'آيفون 15 برو ماكس (256 جيجا)', price: 54500 },
  { name: 'آيفون 13 عادي كسر زيرو (128 جيجا)', price: 23500 },
  { name: 'سامسونج Galaxy S24 Ultra', price: 47900 },
  { name: 'سامسونج Galaxy A55 5G', price: 16800 },
  { name: 'شاومي Redmi Note 13 Pro', price: 11900 },
  { name: 'ريلمي Realme 12 Pro Plus', price: 15400 },
];

export function InstallmentCalculatorSection() {
  const [devicePrice, setDevicePrice] = useState<number>(23500);
  const [selectedProviderId, setSelectedProviderId] = useState<string>('direct_nour');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [months, setMonths] = useState<number>(12);
  const [customDeviceName, setCustomDeviceName] = useState<string>('آيفون 13 كسر زيرو');

  const selectedProvider = PROVIDERS.find(p => p.id === selectedProviderId) || PROVIDERS[0];

  // Adjust down payment if below provider minimum
  const effectiveDownPercent = Math.max(downPaymentPercent, selectedProvider.minDownPaymentPercent);

  // Financial calculations
  const downPaymentAmount = Math.round((devicePrice * effectiveDownPercent) / 100);
  const financedAmount = devicePrice - downPaymentAmount;

  // Simple monthly installment calculation (Financed * (1 + annual_rate * years)) / months
  const years = months / 12;
  const totalInterest = Math.round(financedAmount * (selectedProvider.interestRateAnnual * years));
  const totalRepayment = financedAmount + totalInterest;
  const monthlyInstallment = Math.round(totalRepayment / months);

  const handleSelectPreset = (phone: { name: string; price: number }) => {
    setDevicePrice(phone.price);
    setCustomDeviceName(phone.name);
  };

  const getWhatsAppMessage = () => {
    const text = encodeURIComponent(
      `السلام عليكم أ. أسامة موسى (سليم النور فون)،\nأود تقديم طلب تقسيط لهاتف بالمحل:\n` +
      `- اسم الجهاز: ${customDeviceName}\n` +
      `- سعر الكاش: ${devicePrice.toLocaleString('ar-EG')} ج.م\n` +
      `- نظام التقسيط: ${selectedProvider.name}\n` +
      `- المقدم المطلوب: ${downPaymentAmount.toLocaleString('ar-EG')} ج.م (${effectiveDownPercent}%)\n` +
      `- مدة التقسيط: ${months} شهر\n` +
      `- القسط الشهري التقريبي: ${monthlyInstallment.toLocaleString('ar-EG')} ج.م / شهر\n` +
      `برجاء إفادتي بالأوراق المطلوبة لحجز الجهاز والاستلام في فرع الكردي.`
    );
    return `https://wa.me/201003075071?text=${text}`;
  };

  return (
    <section id="installment-calculator" className="py-16 sm:py-20 bg-zinc-950 relative overflow-hidden border-t border-zinc-800">
      {/* Background Glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            <Calculator className="w-3.5 h-3.5" />
            <span>حاسبة ومخطط التقسيط الذكي - سليم النور فون</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            احسب قسط موبايلك الشهري في ثوانٍ معدودة!
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            أنظمة تقسيط ميسرة تناسب جميع أهالي مدينة الكردي والمراكز المجاورة، إما مباشرة مع المحل بصورة البطاقة وضامن، أو عبر فوري، فاليو، أمان، والفيزا البنكية بدون فوائد.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Left in RTL = Right in standard) */}
          <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            
            {/* 1. Quick Presets */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                <span>اختر جهازاً شائعاً أو حدد السعر يدوياً:</span>
                <span className="text-[11px] text-amber-400 font-mono">الأسعار كاش</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PRESET_PHONES.map((phone, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(phone)}
                    className={`p-2.5 rounded-xl text-right transition-all text-xs border cursor-pointer ${
                      devicePrice === phone.price
                        ? 'bg-amber-500/15 border-amber-400 text-amber-300 font-bold shadow-md'
                        : 'bg-zinc-950/80 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <p className="font-bold line-clamp-1">{phone.name}</p>
                    <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                      {phone.price.toLocaleString('ar-EG')} ج.م
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Device Name & Price Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">اسم الموبايل أو الجهاز:</label>
                <input
                  type="text"
                  value={customDeviceName}
                  onChange={(e) => setCustomDeviceName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-400 text-white text-xs font-bold outline-none"
                  placeholder="مثال: آيفون 13 أو سامسونج A55"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">سعر الجهاز الإجمالي (ج.م):</label>
                <div className="relative">
                  <input
                    type="number"
                    min={2000}
                    max={150000}
                    step={500}
                    value={devicePrice}
                    onChange={(e) => setDevicePrice(Math.max(1000, Number(e.target.value)))}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-400 text-white font-mono text-sm font-bold outline-none text-left"
                    dir="ltr"
                  />
                  <span className="absolute left-3 top-2.5 text-xs text-zinc-500 pointer-events-none">EGP</span>
                </div>
              </div>
            </div>

            {/* 3. Choose Installment Provider */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>اختر جهة ونظام التقسيط:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PROVIDERS.map((provider) => (
                  <button
                    key={provider.id}
                    type="button"
                    onClick={() => {
                      setSelectedProviderId(provider.id);
                      if (months > provider.maxMonths) {
                        setMonths(provider.maxMonths);
                      }
                    }}
                    className={`p-3 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                      selectedProviderId === provider.id
                        ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                        : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-black text-white">{provider.name}</p>
                      <span className="text-[10px] text-amber-400 font-bold inline-block mt-0.5">
                        {provider.badge}
                      </span>
                    </div>
                    {selectedProviderId === provider.id && (
                      <Check className="w-4 h-4 text-amber-400 stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Down Payment Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-300">نسبة المقدم المدفوع:</span>
                <span className="font-mono text-amber-400 font-bold">
                  {effectiveDownPercent}% = {downPaymentAmount.toLocaleString('ar-EG')} ج.م
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {[0, 10, 20, 30, 50].map((pct) => {
                  const isDisabled = pct < selectedProvider.minDownPaymentPercent;
                  return (
                    <button
                      key={pct}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => setDownPaymentPercent(pct)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                        effectiveDownPercent === pct
                          ? 'bg-amber-500 text-zinc-950 font-black'
                          : 'bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      {pct === 0 ? 'بدون مقدم' : `${pct}%`}
                    </button>
                  );
                })}
              </div>
              {selectedProvider.minDownPaymentPercent > 0 && (
                <p className="text-[11px] text-zinc-400">
                  * هذا النظام يتطلب حداً أدنى للمقدم {selectedProvider.minDownPaymentPercent}%
                </p>
              )}
            </div>

            {/* 5. Duration (Months) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-300">مدة التقسيط:</span>
                <span className="font-mono text-amber-400 font-bold">{months} شهراً</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {[6, 12, 18, 24, 36].map((m) => {
                  const isExceeded = m > selectedProvider.maxMonths;
                  return (
                    <button
                      key={m}
                      type="button"
                      disabled={isExceeded}
                      onClick={() => setMonths(m)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                        months === m
                          ? 'bg-amber-500 text-zinc-950 font-black'
                          : 'bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      {m} شهر
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Result Card Column (Right in RTL = Left in standard) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                  ملخص خطة السداد المقترحة
                </span>
                <h3 className="text-lg font-black text-white mt-1">{customDeviceName}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Zap className="w-5 h-5 fill-amber-400" />
              </div>
            </div>

            {/* Radiant Monthly Installment Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 text-center space-y-1 shadow-lg shadow-amber-500/30">
              <span className="text-xs font-bold uppercase tracking-wider">القسط الشهري التقريبي</span>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight" dir="ltr">
                {monthlyInstallment.toLocaleString('ar-EG')} <span className="text-sm font-sans">ج.م / شهر</span>
              </div>
              <p className="text-[11px] font-bold text-zinc-900">
                لمدة {months} شهراً بمقدم {downPaymentAmount.toLocaleString('ar-EG')} ج.م
              </p>
            </div>

            {/* Financial Details Table */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-2 border-b border-zinc-800 text-zinc-300">
                <span>سعر الكاش للجهاز:</span>
                <span className="font-mono font-bold text-white">{devicePrice.toLocaleString('ar-EG')} ج.م</span>
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-800 text-zinc-300">
                <span>المقدم المدفوع عند الاستلام:</span>
                <span className="font-mono font-bold text-amber-400">{downPaymentAmount.toLocaleString('ar-EG')} ج.م</span>
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-800 text-zinc-300">
                <span>المبلغ المتبقي للتقسيط:</span>
                <span className="font-mono font-bold text-zinc-200">{financedAmount.toLocaleString('ar-EG')} ج.م</span>
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-800 text-zinc-300">
                <span>جهة ونظام التمويل:</span>
                <span className="font-bold text-amber-300">{selectedProvider.name}</span>
              </div>
            </div>

            {/* Required Documents Checklist */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <h4 className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>الأوراق والشروط المطلوبة للاستلام:</span>
              </h4>
              <ul className="space-y-1.5 text-[11px] text-zinc-300">
                {selectedProvider.requirements.map((req, rIdx) => (
                  <li key={rIdx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <a
                href={getWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>إرسال طلب التقسيط لأ. أسامة موسى عبر واتساب</span>
              </a>

              <a
                href={`tel:${SHOP_INFO.phone}`}
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-amber-400 font-bold text-xs flex items-center justify-center gap-2 border border-zinc-700/80 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>استفسار هاتفي فوري: {SHOP_INFO.phone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
