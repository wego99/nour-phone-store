import { Star, Quote, CheckCircle2, MessageSquare, Heart, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS, SHOP_INFO } from '../data/shopData';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-zinc-900/60 border-t border-b border-zinc-800/80 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Heart className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>آراء وتجارب زبائننا الكرام</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            ثقة أهالي مدينة الكردي وسام نعتز به
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            انطباعات وتجارب حقيقية لزبائن تعاملوا مع <strong className="text-zinc-200">سليم النور فون</strong> تحت إدارة <strong className="text-amber-300">{SHOP_INFO.manager}</strong> في بيع الهواتف، تركيب الشاشات، واقتناء الإكسسوارات الأصلية.
          </p>

          {/* Rating Summary Pill */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="inline-flex items-center gap-1.5 bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-800 text-zinc-300">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-white pr-1">4.9 / 5.0</span>
              <span className="text-zinc-400">تقييم ممتاز في الكردي</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-800 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-semibold text-zinc-200">100% رضا ومصداقية وضمان كتابي</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid (6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 group"
            >
              <div className="space-y-4">
                
                {/* Card Top: Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-amber-400/60 group-hover:text-amber-400 transition-colors">
                    <Quote className="w-4 h-4" />
                  </div>
                </div>

                {/* Service Tag */}
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>الخدمة: {item.serviceUsed}</span>
                </div>

                {/* Feedback Comment */}
                <p className="text-sm text-zinc-200 leading-relaxed font-normal">
                  &ldquo;{item.comment}&rdquo;
                </p>

              </div>

              {/* Author Info */}
              <div className="pt-5 mt-5 border-t border-zinc-850 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.author}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {item.role} • <span className="text-amber-400/80">{item.location}</span>
                  </p>
                </div>
                <span className="text-[11px] text-zinc-500 font-medium">
                  {item.date}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA for feedback */}
        <div className="mt-12 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-white">
              هل شرفت بزيارة سليم النور فون وتريد مشاركة رأيك؟
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400">
              يسعدنا دائماً سماع رأيك واقتراحاتك لتحسين خدماتنا المستمرة لأهالي الكردي.
            </p>
          </div>

          <a
            href={SHOP_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-950/40 active:scale-95 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>شاركنا تجربتك عبر واتساب المحل</span>
          </a>
        </div>

      </div>
    </section>
  );
}
