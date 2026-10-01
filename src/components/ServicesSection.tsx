import { Smartphone, Layers, Headphones, Cpu, CheckCircle2, MessageSquare, ArrowLeft, Shield } from 'lucide-react';
import { SERVICES, SHOP_INFO } from '../data/shopData';

export function ServicesSection() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Smartphone':
        return <Smartphone className="w-7 h-7 text-amber-400" />;
      case 'Layers':
        return <Layers className="w-7 h-7 text-amber-400" />;
      case 'Headphones':
        return <Headphones className="w-7 h-7 text-amber-400" />;
      case 'Cpu':
        return <Cpu className="w-7 h-7 text-amber-400" />;
      default:
        return <Smartphone className="w-7 h-7 text-amber-400" />;
    }
  };

  const getServiceWhatsAppUrl = (serviceTitle: string) => {
    const text = encodeURIComponent(
      `السلام عليكم أ. أسامة موسى (سليم النور فون)، أود الاستفسار عن خدمة: ${serviceTitle}`
    );
    return `https://wa.me/201003075071?text=${text}`;
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-zinc-900/40 relative border-t border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Shield className="w-3.5 h-3.5" />
            <span>خدماتنا المتخصصة والمضمونة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            كل ما يلزم هاتفك المحمول تحت سقف واحد
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            في <strong className="text-zinc-200">سليم النور فون</strong> بمدينة الكردي، نجمع لك بين أفضل أسعار البيع كاش وتقسيط، مع أعلى كفاءة فنية لصيانة الهواتف والشاشات بأيدي فنيين محترفين.
          </p>
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="group relative rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col justify-between"
            >
              {/* Corner Index Tag */}
              <div className="absolute top-6 left-6 text-zinc-700 font-black text-2xl group-hover:text-amber-500/30 transition-colors">
                0{index + 1}
              </div>

              <div className="space-y-4">
                {/* Header Icon & Tag */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 via-zinc-900 to-zinc-900 border border-amber-500/30 flex items-center justify-center shadow-md">
                    {getIcon(service.icon)}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 tracking-wider">
                      {service.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Subtitle & Description */}
                <p className="text-xs font-semibold text-amber-400/90">
                  {service.subtitle}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Bullet Points */}
                <div className="space-y-2.5 pt-2 border-t border-zinc-800/80">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Action Links */}
              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={getServiceWhatsAppUrl(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/50 px-3.5 py-2 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>استفسر عن هذه الخدمة</span>
                </a>

                <a
                  href={`tel:${SHOP_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition-colors"
                >
                  <span>اتصال مباشر: {SHOP_INFO.phone}</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Under Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 border border-amber-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <h4 className="text-lg font-bold text-white">
              هل تواجه عطلاً مفاجئاً في هاتفك أو تحتاج صيانة سريعة؟
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400">
              تفضل بزيارة المحل في ميدان المحطة بمدينة الكردي (أسفل عيادة د. وائل سلامة) أو اتصل بالأستاذ أسامة موسى فوراً.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm transition-colors shadow-lg shadow-amber-500/20"
            >
              اتصل: {SHOP_INFO.phone}
            </a>
            <a
              href="#repair-estimator"
              className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm transition-colors"
            >
              حاسبة تكلفة الصيانة
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
