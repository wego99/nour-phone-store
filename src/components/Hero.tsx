import { Phone, MessageSquare, MapPin, ShieldCheck, Wrench, Sparkles, Smartphone, CheckCircle2, ArrowLeft, Plus, User, Gift, Crown, LogIn } from 'lucide-react';
import { SHOP_INFO } from '../data/shopData';
import { useAuth } from '../context/AuthContext';

interface HeroProps {
  onOpenAddModal?: () => void;
}

export function Hero({ onOpenAddModal }: HeroProps) {
  const { currentUser, openLogin, openRegister, openProfile } = useAuth();
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Store Authority & Account Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>محل سليم النور فون</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-300">تحت إدارة: <strong className="text-amber-300 font-bold">{SHOP_INFO.manager}</strong></span>
              </div>

              {/* Interactive Account / Welcome Badge */}
              <button
                type="button"
                onClick={currentUser ? openProfile : openRegister}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-zinc-900 to-amber-950/30 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md active:scale-95 group"
              >
                <Gift className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                {currentUser ? (
                  <span>مرحباً <strong className="text-white">{currentUser.name}</strong> • رصيدك: <strong className="text-amber-400 font-mono">{currentUser.loyaltyPoints || 0}ن</strong> (اضغط لملفك)</span>
                ) : (
                  <span>أنشئ حسابك الآن واحصل على <strong className="text-white underline">50 نقطة ولاء مجانية</strong> 👈</span>
                )}
              </button>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-tight md:leading-tight">
              خدمات المحمول المتكاملة في <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 via-yellow-300 to-amber-500">
                مدينة الكردي
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal">
              نوفر لك أحدث <strong className="text-white">الهواتف الذكية</strong> (جديد ومستعمل بالضمان كاش وبتقسيط مريح)، <strong className="text-white">الإكسسوارات الأصلية</strong> والمبردات، <strong className="text-white">تركيب شاشات الموبايل والباغات</strong> بأعلى دقة، وخدمات <strong className="text-white">السوفت وير والشحن الفوري</strong>.
            </p>

            {/* Key Location Callout */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-zinc-400 font-medium">العنوان وموقع المحل:</p>
                <p className="text-sm font-bold text-zinc-100 leading-snug">
                  {SHOP_INFO.address.full}
                </p>
                <p className="text-xs text-amber-400/90 font-medium">
                  ميدان المحطة الرئيسي - موقع سهل جداً للوصول من الكردي والمراكز المجاورة
                </p>
              </div>
            </div>

            {/* Action Buttons Group */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${SHOP_INFO.phone}`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 font-black text-base hover:brightness-110 transition-all shadow-xl shadow-amber-500/20 active:scale-95"
              >
                <Phone className="w-5 h-5 fill-current" />
                <span>اتصل بنا الآن ({SHOP_INFO.phone})</span>
              </a>

              <a
                href={SHOP_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all shadow-lg shadow-emerald-950/40 active:scale-95"
              >
                <MessageSquare className="w-5 h-5" />
                <span>محادثة واتساب سريعة</span>
              </a>

              <a
                href="#repair-estimator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 text-sm font-bold transition-colors"
              >
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>استعلام تكلفة الصيانة والشاشات</span>
                <ArrowLeft className="w-4 h-4 text-zinc-400" />
              </a>

              {/* Add Product Button (Store Owner only) */}
              {onOpenAddModal && currentUser?.role === 'admin' && (
                <button
                  type="button"
                  onClick={onOpenAddModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border-2 border-amber-400 text-amber-300 font-black text-sm transition-all shadow-lg shadow-amber-500/10 cursor-pointer active:scale-95"
                >
                  <Plus className="w-5 h-5 stroke-[3] text-amber-400" />
                  <span>+ إضافة منتج جديد (صاحب المحل)</span>
                </button>
              )}
            </div>

            {/* Trust Highlights Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>تقسيط كاش وميسر</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>شاشات أصلية بضمان</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>إكسسوارات معتمدة</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>صيانة فورية ومباشرة</span>
              </div>
            </div>

          </div>

          {/* Feature Showcase Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-3xl blur-md opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              
              {/* Inner Card Container */}
              <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-7 shadow-2xl space-y-6">
                
                {/* Header of the Card */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-0.5">
                      مركز معتمد ومتكامل
                    </span>
                    <h3 className="text-xl font-black text-white">
                      النور فون لخدمات المحمول
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 border border-zinc-850">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400">الهواتف والأجهزة</p>
                        <p className="text-sm font-bold text-zinc-100">جديد ومستعمل بالضمان</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-amber-400">كاش & تقسيط</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 border border-zinc-850">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400">شاشات الموبايل والباغات</p>
                        <p className="text-sm font-bold text-zinc-100">تركيب احترافي بمكابس ليزر</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400">ضمان كتابي</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 border border-zinc-850">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400">الإكسسوارات ومبردات الجيمنج</p>
                        <p className="text-sm font-bold text-zinc-100">شواحن وسماعات ومبردات هواتف</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-amber-400">أصلي 100%</span>
                  </div>
                </div>

                {/* Manager Quote / Commitment */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/20 text-xs text-zinc-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300">كلمة إدارة المحل:</span>
                    <span className="text-[11px] text-zinc-400">أ. أسامة موسى</span>
                  </div>
                  <p className="italic text-zinc-300 leading-relaxed">
                    &quot;هدفنا تقديم أفضل خدمة بأمانة تامة وشفافية لجميع أهالي الكردي والمراكز المجاورة، مع التزامنا بأعلى معايير الجودة والضمان الحقيقي في كل جهاز وقطعة صيانة.&quot;
                  </p>
                </div>

                {/* Quick Call Button Card */}
                <a
                  href={`tel:${SHOP_INFO.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>اتصال مباشر: {SHOP_INFO.phone}</span>
                </a>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
