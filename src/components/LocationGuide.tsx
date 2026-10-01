import { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Copy, Check, Navigation, Shield, Building2 } from 'lucide-react';
import { SHOP_INFO } from '../data/shopData';

export function LocationGuide() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(SHOP_INFO.address.full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="py-16 sm:py-20 bg-zinc-900/50 border-t border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>الموقع الجغرافي وسهولة الوصول</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            موقع المحل في قلب مدينة الكردي
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            موقع استراتيجي في ميدان المحطة، على بعد خطوات من قسم الشرطة وموقف سيارات الأجرة لخدمة أهالي الكردي وميت سلسيل والرياض والمنزلة ودكرنس.
          </p>
        </div>

        {/* Location Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Detailed Info Card (6 cols) */}
          <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400">سليم النور فون / النور فون</span>
              <h3 className="text-2xl font-black text-white">
                تفاصيل العنوان والمعالم البارزة
              </h3>
            </div>

            {/* Address Display Box */}
            <div className="p-4 rounded-xl bg-zinc-950/90 border border-amber-500/30 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs text-zinc-400">العنوان الكامل والرسمي:</p>
                    <p className="text-base font-bold text-white leading-relaxed">
                      {SHOP_INFO.address.full}
                    </p>
                  </div>
                </div>
              </div>

              {/* Copy Address Button */}
              <button
                type="button"
                onClick={handleCopyAddress}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-300 border border-zinc-800 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">تم نسخ العنوان بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-400" />
                    <span>نسخ العنوان لاستخدامه في تطبيق الخرائط</span>
                  </>
                )}
              </button>
            </div>

            {/* Landmark Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-850 flex items-start gap-3">
                <Building2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">ميدان المحطة</p>
                  <p className="text-zinc-400">المركز الحيوي لمدينة الكردي، ملتقى المواصلات</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-850 flex items-start gap-3">
                <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">بجوار قسم الشرطة</p>
                  <p className="text-zinc-400">موقع أمني ومعلم معروف لجميع السائقين</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-850 flex items-start gap-3 sm:col-span-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <div>
                  <p className="font-bold text-amber-300">أسفل عيادة الدكتور وائل سلامة</p>
                  <p className="text-zinc-400">العلامة الأكثر وضوحاً بالمبنى لسهولة التعرف فور وصولك الميدان</p>
                </div>
              </div>
            </div>

            {/* Management & Direct Phone */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-zinc-400">الإدارة والمسؤول المباشر:</p>
                <p className="text-sm font-bold text-white">{SHOP_INFO.manager} (أبو موسى)</p>
              </div>
              <a
                href={`tel:${SHOP_INFO.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-zinc-950 text-xs font-black hover:bg-amber-400 transition-colors"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5" />
                {SHOP_INFO.phone}
              </a>
            </div>

            {/* Social Media & Instant Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={SHOP_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/40 text-blue-400 hover:text-white transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-blue-300">صفحة فيسبوك الرسمية</p>
                    <p className="text-[10px] text-zinc-400 font-mono" dir="ltr">@osamamousa890</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-400 group-hover:text-white">متابعة ←</span>
              </a>

              <a
                href={SHOP_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:text-white transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#25D366] text-zinc-950 flex items-center justify-center shrink-0 shadow">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-emerald-300">محادثة واتساب مباشرة</p>
                    <p className="text-[10px] text-emerald-400 font-mono font-bold" dir="ltr">{SHOP_INFO.whatsapp}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 group-hover:text-white">محادثة ←</span>
              </a>
            </div>

          </div>

          {/* Map & Working Hours Card (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Visual Schematic Map / Locator */}
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-amber-400" />
                  <h4 className="text-base font-bold text-white">خريطة الإرشاد الميداني</h4>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded">
                  سهل الوصول جداً
                </span>
              </div>

              {/* Visual Landmark Diagram */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 text-center space-y-4">
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400">الدور الأرضي:</span>
                  <div className="p-3 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 font-black text-sm">
                    ✨ محل سليم النور فون لخدمات المحمول (إدارة أسامة موسى)
                  </div>
                </div>

                <div className="text-xs text-zinc-500 font-bold">⬆ يعلوه مباشرة ⬆</div>

                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold">
                  عيادة الدكتور وائل سلامة
                </div>

                <div className="text-xs text-zinc-500 font-bold">📍 على بعد خطوات قليلة 📍</div>

                <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-xs">
                  ميدان المحطة الرئيسي + قسم شرطة مدينة الكردي
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={SHOP_INFO.address.mapsQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-colors shadow-md shadow-amber-500/10"
                >
                  <Navigation className="w-4 h-4" />
                  <span>فتح في Google Maps</span>
                </a>

                <a
                  href={SHOP_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>إرسال موقعك على واتساب</span>
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>مواعيد العمل واستقبال الزبائن:</span>
              </div>

              <div className="space-y-2 text-xs text-zinc-300 pt-1">
                <div className="flex items-center justify-between py-1.5 border-b border-zinc-800">
                  <span className="text-zinc-400">السبت إلى الخميس:</span>
                  <span className="font-bold text-white">من 10:00 صباحاً حتى 11:30 مساءً</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-zinc-800">
                  <span className="text-zinc-400">يوم الجمعة:</span>
                  <span className="font-bold text-amber-300">من 1:30 ظهراً (بعد الصلاة) حتى 11:30 مساءً</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-zinc-400">خدمة الطوارئ والصيانة الهاتفية:</span>
                  <span className="font-bold text-emerald-400">متاحة اتصال وواتساب دائماً</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
