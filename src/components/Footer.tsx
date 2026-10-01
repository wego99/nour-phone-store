import { Smartphone, Phone, MessageSquare, MapPin, Shield, Heart } from 'lucide-react';
import { SHOP_INFO } from '../data/shopData';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 pt-16 pb-24 sm:pb-16 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-850">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-0.5">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-white">سليم النور فون</h3>
                <p className="text-xs text-amber-400 font-semibold">النور فون لخدمات المحمول</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-zinc-400 max-w-md">
              المركز المتخصص لبيع وصيانة الهواتف الذكية (جديد ومستعمل بالضمان كاش وبتقسيط ميسر)، تركيب الشاشات والباغات بأعلى جودة، الإكسسوارات الأصلية ومبردات الهواتف، وخدمات السوفت وير والمدفوعات الإلكترونية بمدينة الكردي.
            </p>

            <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>تحت الإدارة والإشراف المباشر: <strong className="text-amber-300">{SHOP_INFO.manager}</strong></span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              روابط وخدمات سريعة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  بيع الهواتف (كاش وتقسيط)
                </a>
              </li>
              <li>
                <a href="#repair-estimator" className="hover:text-amber-400 transition-colors">
                  تركيب شاشات وباغات أصلية
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-amber-400 transition-colors">
                  الإكسسوارات والشواحن والمبردات
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-amber-400 transition-colors">
                  آراء وتقييمات الزبائن
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  موقع المحل في ميدان المحطة
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Location (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              بيانات التواصل والمقر
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {SHOP_INFO.address.full}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${SHOP_INFO.phone}`}
                  className="font-bold text-white hover:text-amber-400 transition-colors"
                  dir="ltr"
                >
                  {SHOP_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={SHOP_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                  dir="ltr"
                >
                  واتساب: {SHOP_INFO.whatsapp}
                </a>
              </div>

              {/* Social Media Links */}
              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <p className="text-[11px] font-bold text-zinc-300">حسابات التواصل الاجتماعي الرسمية:</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={SHOP_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/40 text-blue-400 hover:text-white transition-all text-xs group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </div>
                      <span className="font-bold">صفحة فيسبوك: osamamousa890</span>
                    </div>
                    <span className="text-[11px] group-hover:translate-x-0.5 transition-transform">متابعة ←</span>
                  </a>

                  <a
                    href={SHOP_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/40 text-emerald-400 hover:text-white transition-all text-xs group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#25D366] text-zinc-950 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold">واتساب: {SHOP_INFO.whatsapp}</span>
                    </div>
                    <span className="text-[11px] group-hover:translate-x-0.5 transition-transform">تواصل ←</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`tel:${SHOP_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>اتصل الآن بأستاذ أسامة موسى</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} سليم النور فون / النور فون لخدمات المحمول - إدارة أسامة موسى.
          </p>
          <p className="flex items-center gap-1 text-zinc-400">
            <span>خدمة متميزة لأهالي مدينة الكردي ومحافظة الدقهلية</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-current inline" />
          </p>
        </div>

      </div>
    </footer>
  );
}
