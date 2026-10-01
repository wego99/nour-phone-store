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
                >
                  مراسلة واتساب: 01003075071
                </a>
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
