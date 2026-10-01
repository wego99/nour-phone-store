import { useState } from 'react';
import { 
  ShieldCheck, Award, CheckCircle2, FileCheck, RefreshCw, 
  Sparkles, Smartphone, HelpCircle, Lock, ArrowRight, Check, Search
} from 'lucide-react';
import { SHOP_INFO } from '../data/shopData';

const WARRANTY_PILLARS = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-amber-400" />,
    title: 'ضمان استبدال فوري 14 يوماً',
    desc: 'حق الاستبدال الفوري للجهاز أو استرجاع القيمة في حال ظهور أي عيب صناعي خلال أول 14 يوماً من الشراء.',
    tag: 'حقوقك محفوظة 100%'
  },
  {
    icon: <FileCheck className="w-7 h-7 text-amber-400" />,
    title: 'فحص فني شامل بـ 45 نقطة فحص',
    desc: 'جميع أجهزة الكسر زيرو والمستعمل تخضع لفحص دقيق يشمل: الشاشة، البطارية، الكاميرات، الشحن، وبصمة الوجه والإصبع.',
    tag: 'مفحوص بدقة 🔬'
  },
  {
    icon: <Award className="w-7 h-7 text-amber-400" />,
    title: 'شاشات وقطع غيار أصلية بالضمان',
    desc: 'نستخدم قطع غيار وكابلات وشاشات أصلية معتمدة فقط مع شهادة ضمان حقيقية مسجلة باسم العميل.',
    tag: 'توكيلات معتمدة'
  },
  {
    icon: <Lock className="w-7 h-7 text-amber-400" />,
    title: 'أمانة تامة وسرية بيانات الزبائن',
    desc: 'الحفاظ على سرية الصور والملفات والحسابات الشخصية عند الصيانة أو نقل البيانات بأعلى معايير الأمانة المهنية.',
    tag: 'أمانة والتزام'
  },
  {
    icon: <RefreshCw className="w-7 h-7 text-amber-400" />,
    title: 'نقل مجاني لكامل بياناتك وصورك',
    desc: 'عند شراء أي هاتف جديد أو مستعمل، نقوم بنقل جهات اتصالك ومحادثات واتساب وصورك مجاناً بالكامل.',
    tag: 'خدمة مجانية 🎁'
  },
  {
    icon: <Sparkles className="w-7 h-7 text-amber-400" />,
    title: 'فاتورة رسمية مختومة من المحل',
    desc: `تسليم فاتورة رسمية موثقة ومعتمدة ومختومة بإدارة أ. ${SHOP_INFO.manager} تضمن حقك في كل مليم تدفعه.`,
    tag: 'سند رسمي مختوم'
  }
];

export function GoldenWarrantySection() {
  const [imeiInput, setImeiInput] = useState('');
  const [imeiResult, setImeiResult] = useState<string | null>(null);

  const handleCheckImei = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imeiInput.trim()) return;

    if (imeiInput.length === 15) {
      setImeiResult(`رقم السيريال (${imeiInput}) متطابق مع المعايير القياسية للهواتف الأصلية المعتمدة في مصر.`);
    } else {
      setImeiResult('رقم السيريال (IMEI) القياسي يتكون من 15 رقماً. يمكنك معرفته بطلب الكود (*#06#) من لوحة الاتصال.');
    }
  };

  return (
    <section id="warranty" className="py-16 sm:py-20 bg-zinc-900/60 border-t border-b border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>وثيقة الضمان الذهبي ومعايير الأمانة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            6 ضمانات ذهبية حقيقية عند تعاملك مع سليم النور فون
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            ثقة أهالي مدينة الكردي ومحافظة الدقهلية هي رأس مالنا الحقيقي، ولذلك نلتزم بأعلى معايير الضمان وحفظ الحقوق.
          </p>
        </div>

        {/* 6 Guarantee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {WARRANTY_PILLARS.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 group space-y-4 hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold text-amber-400 bg-zinc-900 px-2.5 py-1 rounded-full border border-amber-500/30">
                  {item.tag}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ضمان معتمد ومختوم بالفاتورة</span>
              </div>
            </div>
          ))}
        </div>

        {/* IMEI Quick Helper Tool */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-zinc-950 to-amber-950/20 border-2 border-amber-500/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-right">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-zinc-950 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              أداة إرشادية لفحص أصالة الهواتف
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              كيف تتأكد أن هاتفك أصلي ومضمون قبل الشراء؟
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
              اطلب الكود <strong className="text-amber-400 font-mono" dir="ltr">*#06#</strong> من لوحة الاتصال ليظهر لك كود السيريال (IMEI). يمكنك مطابقة السيريال على الكرتونة لضمان عدم التلاعب.
            </p>
          </div>

          <form onSubmit={handleCheckImei} className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                maxLength={15}
                value={imeiInput}
                onChange={(e) => setImeiInput(e.target.value.replace(/\D/g, ''))}
                placeholder="أدخل 15 رقم للسيريال..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-xs font-bold outline-none focus:border-amber-400 text-center"
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20 shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>فحص السيريال</span>
            </button>
          </form>
        </div>

        {imeiResult && (
          <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-amber-500/40 text-xs text-amber-300 font-bold text-center animate-in fade-in">
            {imeiResult}
          </div>
        )}

      </div>
    </section>
  );
}
