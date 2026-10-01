import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Phone, MessageSquare } from 'lucide-react';
import { FAQS, SHOP_INFO } from '../data/shopData';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 sm:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>إجابات واضحة وشفافة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            الأسئلة الشائعة لزبائننا الكرام
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            كل ما تود معرفته عن الضمان، أنظمة التقسيط، فحص وتغيير الشاشات، وخدمات سليم النور فون.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-right font-bold text-sm sm:text-base text-white hover:text-amber-400 transition-colors"
                >
                  <span className="flex-1 pr-1">{faq.q}</span>
                  <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-zinc-400 shrink-0 mr-3">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-850 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra contact box */}
        <div className="mt-12 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center space-y-4">
          <p className="text-sm font-semibold text-zinc-200">
            لديك سؤال آخر أو ترغب في استشارة فورية مع الأستاذ أسامة موسى؟
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>اتصل على {SHOP_INFO.phone}</span>
            </a>
            <a
              href={SHOP_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>محادثة واتساب فورية</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
