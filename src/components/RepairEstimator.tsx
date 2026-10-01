import { useState } from 'react';
import { Wrench, Clock, ShieldCheck, MessageSquare, Phone, Check, Smartphone, ArrowDown, ExternalLink } from 'lucide-react';
import { PHONE_BRANDS, REPAIR_SERVICES_CATALOG, SHOP_INFO } from '../data/shopData';
import { useAuth } from '../context/AuthContext';

interface RepairEstimatorProps {
  onSelectBrandAndGoToCatalog?: (brandId: string) => void;
}

export function RepairEstimator({ onSelectBrandAndGoToCatalog }: RepairEstimatorProps) {
  const { currentUser, addMaintenanceTicket } = useAuth();
  const [selectedBrand, setSelectedBrand] = useState('apple');
  const [selectedService, setSelectedService] = useState('screen');
  const [modelName, setModelName] = useState('');

  const currentServiceObj = REPAIR_SERVICES_CATALOG.find((s) => s.id === selectedService) || REPAIR_SERVICES_CATALOG[0];
  const currentBrandObj = PHONE_BRANDS.find((b) => b.id === selectedBrand) || PHONE_BRANDS[0];

  const handleBrandClick = (brandId: string) => {
    setSelectedBrand(brandId);
    if (onSelectBrandAndGoToCatalog) {
      onSelectBrandAndGoToCatalog(brandId);
    }
  };

  const handleWhatsAppBooking = () => {
    if (currentUser) {
      addMaintenanceTicket({
        device: `${currentBrandObj.name.split(' ')[0]} ${modelName.trim() || ''}`.trim(),
        issue: currentServiceObj.name,
        status: 'received',
        statusText: 'تم استلام الطلب وتأكيد الحجز',
        estimatedCost: 'كشف أولي مجاني'
      });
    }

    const customerText = currentUser ? `\n- اسم العميل: ${currentUser.name}\n- الهاتف: ${currentUser.phone}` : '';
    const text = encodeURIComponent(
      `السلام عليكم أ. أسامة موسى (سليم النور فون)،\nأريد الاستفسار عن صيانة:\n- ماركة الهاتف: ${currentBrandObj.name}\n- الموديل: ${modelName.trim() || 'غير محدد'}\n- نوع العطل/الخدمة: ${currentServiceObj.name}\n- الوقت المتوقع: ${currentServiceObj.avgTime}${customerText}\nالعنوان لديكم: ميدان المحطة بمدينة الكردي.`
    );
    window.open(`https://wa.me/201003075071?text=${text}`, '_blank');
  };

  return (
    <section id="repair-estimator" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Wrench className="w-3.5 h-3.5" />
            <span>حاسبة واستعلام الصيانة الفورية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            فحص جهازك وتقدير وقت الصيانة
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            حدد نوع جهازك والعطل المطلوب لمعرفة مدة الصيانة والضمان الممنوح، وحجز دورك مباشرة مع فنيي محل سليم النور فون بالكردي.
          </p>
        </div>

        {/* Diagnostic Tool Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Select Brand */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-sm font-bold text-zinc-200 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>1. اختر الشركة المصنعة للهاتف:</span>
                </label>
                <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  اضغط للتحويل المباشر لهواتف نفس الماركة بالمعرض 👇
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PHONE_BRANDS.map((brand) => (
                  <button
                    key={brand.id}
                    type="button"
                    onClick={() => handleBrandClick(brand.id)}
                    className={`py-3 px-3 text-xs font-bold rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer group ${
                      selectedBrand === brand.id
                        ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-lg shadow-amber-500/25 font-black ring-2 ring-amber-300'
                        : 'bg-zinc-950/80 text-zinc-300 border-zinc-800 hover:border-amber-500/60 hover:text-white hover:bg-zinc-850'
                    }`}
                    title={`اضغط لاختيار ${brand.name} والانتقال المباشر لهواتف هذه الماركة في المعرض`}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">{brand.icon}</span>
                    <span className="leading-tight">{brand.shortName || brand.name.split(' ')[0]}</span>
                    {selectedBrand === brand.id ? (
                      <span className="text-[10px] text-zinc-900 bg-amber-300/80 px-1.5 py-0.2 rounded font-black flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> تم الاختيار
                      </span>
                    ) : (
                      <span className="text-[10px] text-zinc-500 group-hover:text-amber-400">
                        عرض الهواتف 👈
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Quick Jump to Brand Phones in Catalog Action Banner */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-zinc-950 to-amber-950/30 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-2.5 text-xs text-zinc-200 text-center sm:text-right">
                  <span className="text-2xl">{currentBrandObj.icon || '📱'}</span>
                  <div>
                    <p className="font-bold text-white text-xs sm:text-sm">
                      هل تريد شراء أو حجز هاتف <strong className="text-amber-400">{currentBrandObj.name}</strong>؟
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      متوفر لدينا جديد ومستعمل بالأسعار والضمان مع فحص كامل بمدينة الكردي
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectBrandAndGoToCatalog?.(selectedBrand)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/30 cursor-pointer active:scale-95 shrink-0"
                >
                  <span>عرض هواتف {currentBrandObj.shortName || currentBrandObj.name.split(' ')[0]} في المعرض</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Step 2: Specific Model (Optional Input) */}
            <div className="space-y-2">
              <label htmlFor="modelInput" className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>2. موديل الهاتف بالتحديد (اختياري):</span>
              </label>
              <input
                id="modelInput"
                type="text"
                placeholder="مثال: iPhone 13 Pro أو Samsung A54 أو Redmi Note 12..."
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all"
              />
            </div>

            {/* Step 3: Select Service / Issue */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-200">
                3. اختر نوع الخدمة أو المشكلة المطلوبة:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {REPAIR_SERVICES_CATALOG.map((serv) => (
                  <button
                    key={serv.id}
                    type="button"
                    onClick={() => setSelectedService(serv.id)}
                    className={`p-3.5 rounded-xl border text-right transition-all flex flex-col gap-1 ${
                      selectedService === serv.id
                        ? 'bg-amber-500/10 border-amber-500 text-white shadow-sm'
                        : 'bg-zinc-950/80 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{serv.name}</span>
                      {selectedService === serv.id && (
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-400 line-clamp-1">{serv.desc}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results & WhatsApp Booking Column (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="border-b border-zinc-800 pb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                تقرير الكشف الأولي
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {currentServiceObj.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                ماركة الجهاز: <span className="text-amber-300 font-semibold">{currentBrandObj.name}</span>
                {modelName && ` - (${modelName})`}
              </p>
            </div>

            {/* Details Specs */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-zinc-400">الوقت التقريبي للإصلاح</p>
                  <p className="text-sm font-bold text-white">{currentServiceObj.avgTime}</p>
                  <p className="text-[11px] text-zinc-400">صيانة فورية يتم أغلبها أمام العميل</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-zinc-400">الضمان المعتمد</p>
                  <p className="text-sm font-bold text-emerald-300">{currentServiceObj.warranty}</p>
                  <p className="text-[11px] text-zinc-400">ضمان كتابي معتمد ضد عيوب الصناعة</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed">
                <strong>ملاحظة فنية من المحل:</strong> يتم فحص الهاتف بالكامل مجاناً وتحديد السعر النهائي بدقة قبل البدء في أي صيانة للحفاظ على أمانتك وشفافية التعامل.
              </div>
            </div>

            {/* WhatsApp Booking CTA */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-950/50 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>حجز موعد أو استفسار عبر واتساب</span>
              </button>

              <a
                href={`tel:${SHOP_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>أو اتصل مباشرة بالأستاذ أسامة: {SHOP_INFO.phone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
