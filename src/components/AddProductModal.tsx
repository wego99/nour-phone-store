import React, { useState } from 'react';
import { X, Upload, Link2, Sparkles, Check, Image as ImageIcon, AlertCircle, Plus, Trash2, FileText, Smartphone, Crown, Lock } from 'lucide-react';
import { ProductItem, PRESET_PRODUCT_IMAGES, PHONE_BRANDS } from '../data/shopData';
import { useAuth } from '../context/AuthContext';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: ProductItem) => void;
}

export function AddProductModal({ isOpen, onClose, onAddProduct }: AddProductModalProps) {
  const { currentUser, quickLogin } = useAuth();
  const isOwner = currentUser?.role === 'admin';

  const [name, setName] = useState('');
  const [category, setCategory] = useState<'new_phones' | 'used_phones' | 'accessories' | 'screens_parts'>('new_phones');
  const [brand, setBrand] = useState('apple');
  const [price, setPrice] = useState<string>('');
  const [condition, setCondition] = useState<'جديد بالضمان' | 'كسر زيرو فحص كامل' | 'أصلي 100%' | 'جودة فائقة'>('جديد بالضمان');
  const [highlight, setHighlight] = useState('وصل حديثاً');
  const [description, setDescription] = useState('');
  
  // Multiple images gallery
  const [images, setImages] = useState<string[]>([PRESET_PRODUCT_IMAGES[0].url]);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [imageMode, setImageMode] = useState<'preset' | 'upload' | 'url'>('preset');

  const [feature1, setFeature1] = useState('');
  const [feature2, setFeature2] = useState('');
  const [feature3, setFeature3] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Security gate: only store owner can add products
  if (!isOwner) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in" dir="rtl">
        <div className="relative w-full max-w-md bg-zinc-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white">خاصية مخصصة لصاحب المحل فقط</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              إضافة وتعديل الأجهزة والأسعار في المعرض صلاحية حصرية لمدير ومسؤول المحل <strong className="text-amber-400">أ. أسامة موسى</strong>.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={() => quickLogin('user-admin')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4" />
              <span>دخول سريع كصاحب المحل (أسامة موسى)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
            >
              إلغاء والعودة للمعرض
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (file.size > 5 * 1024 * 1024) {
          setError('حجم إحدى الصور كبير، يرجى اختيار صور أقل من 5 ميجابايت');
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            const base64 = reader.result;
            setImages((prev) => [...prev, base64]);
            setError('');
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddPresetImage = (url: string) => {
    if (!images.includes(url)) {
      setImages((prev) => [...prev, url]);
    }
  };

  const handleAddCustomUrl = () => {
    if (customUrlInput.trim()) {
      setImages((prev) => [...prev, customUrlInput.trim()]);
      setCustomUrlInput('');
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (images.length === 1) {
      setError('يجب الإبقاء على صورة واحدة على الأقل للمنتج');
      return;
    }
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('يرجى كتابة اسم المنتج أو الهاتف');
      return;
    }

    const numPrice = Number(price);
    if (!price || isNaN(numPrice) || numPrice <= 0) {
      setError('يرجى كتابة سعر صحيح للمنتج بالجنيه المصري');
      return;
    }

    if (images.length === 0) {
      setError('يرجى إضافة صورة واحدة على الأقل للمنتج');
      return;
    }

    const categoryLabels: Record<string, string> = {
      new_phones: 'تلفونات جديدة',
      used_phones: 'تلفونات كسر زيرو',
      accessories: 'إكسسوارات ومستلزمات',
      screens_parts: 'شاشات وصيانة'
    };

    const featuresList = [feature1.trim(), feature2.trim(), feature3.trim()].filter(Boolean);
    if (featuresList.length === 0) {
      featuresList.push('مشمول بضمان محل سليم النور فون', 'أعلى جودة وفحص دقيق قبل الاستلام');
    }

    const newProduct: ProductItem = {
      id: 'custom-' + Date.now(),
      name: name.trim(),
      category,
      categoryLabel: categoryLabels[category],
      brand: (category === 'new_phones' || category === 'used_phones') ? brand : undefined,
      price: numPrice,
      priceFormatted: `${numPrice.toLocaleString()} ج.م`,
      imageUrl: images[0],
      images: images,
      description: description.trim() || undefined,
      condition,
      highlight: highlight.trim() || undefined,
      features: featuresList,
      isUserAdded: true,
      isPopular: true
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-3xl bg-zinc-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">إضافة منتج جديد للمعرض</h3>
              <p className="text-xs text-zinc-400">أضف تفاصيل ووصف الجهاز مع إمكانية رفع أكثر من صورة وسعر</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-6 max-h-[82vh] overflow-y-auto">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-200">1. تصنيف المنتج / القائمة:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => {
                  setCategory('new_phones');
                  setCondition('جديد بالضمان');
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                  category === 'new_phones'
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 font-black shadow-md'
                    : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                📱 تلفونات جديدة
              </button>

              <button
                type="button"
                onClick={() => {
                  setCategory('used_phones');
                  setCondition('كسر زيرو فحص كامل');
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                  category === 'used_phones'
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 font-black shadow-md'
                    : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                🔄 تلفونات كسر زيرو
              </button>

              <button
                type="button"
                onClick={() => {
                  setCategory('accessories');
                  setCondition('أصلي 100%');
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                  category === 'accessories'
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 font-black shadow-md'
                    : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                🎧 إكسسوارات ومبردات
              </button>

              <button
                type="button"
                onClick={() => {
                  setCategory('screens_parts');
                  setCondition('جودة فائقة');
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                  category === 'screens_parts'
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 font-black shadow-md'
                    : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                🛠️ شاشات وصيانة
              </button>
            </div>
          </div>

          {/* 1.1 Phone Brand Selection (يظهر عند اختيار تلفونات جديدة أو مستعملة) */}
          {(category === 'new_phones' || category === 'used_phones') && (
            <div className="space-y-2 p-3.5 rounded-xl bg-zinc-950/80 border border-amber-500/30 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>اختر الشركة المصنعة للهاتف (ماركة الهاتف): *</span>
                </label>
                <span className="text-[11px] text-zinc-400">لتصنيفه بدقة في خانة الماركات</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PHONE_BRANDS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBrand(b.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                      brand === b.id
                        ? 'bg-amber-500 text-zinc-950 border-amber-400 font-black shadow-md shadow-amber-500/20'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <span>{b.icon}</span>
                    <span>{b.shortName || b.name.split(' ')[0]}</span>
                    {brand === b.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Name & Price Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-200">2. اسم المنتج / الموديل: *</label>
              <input
                type="text"
                placeholder="مثال: iPhone 15 Pro Max 256GB أو شاحن أنكر 65W"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-200">3. السعر (بالجنيه المصري): *</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="مثال: 18500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all"
                  required
                />
                <span className="absolute left-3 top-2.5 text-xs text-amber-400 font-bold pointer-events-none">
                  ج.م
                </span>
              </div>
            </div>
          </div>

          {/* 3. Description Field (Main feature requested) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>4. وصف الجهاز ومواصفاته الكاملة (خانة الوصف):</span>
              </span>
              <span className="text-[11px] text-amber-400/80 font-normal">يظهر بوضوح عند الضغط على المنتج</span>
            </label>
            <textarea
              rows={4}
              placeholder="اكتب هنا كافة تفاصيل ووصف الجهاز أو الإكسسوار (مثال: سعة التخزين 256 جيجا، الرام 8 جيجا، نسبة البطارية 92%، المشتملات العلبة والوصلة الأصلية، اللون تيتانيوم طبيعي، حالة الجهاز خالي من الخدوش مع ضمان معتمد...)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none leading-relaxed transition-all resize-y"
            />
          </div>

          {/* 4. Multiple Images Gallery Section (Requested: اضافه اكتر من صوره باحتراف) */}
          <div className="space-y-3 p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>5. صور المنتج (يمكنك إضافة أكثر من صورة):</span>
                <span className="text-[11px] text-amber-400 font-normal">({images.length} صور مضافة)</span>
              </label>

              {/* Mode Switcher */}
              <div className="flex items-center gap-1 text-[11px] bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setImageMode('preset')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    imageMode === 'preset' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  صور جاهزة
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('upload')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    imageMode === 'upload' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  رفع من جهازك
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    imageMode === 'url' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  رابط مباشر
                </button>
              </div>
            </div>

            {/* Currently Added Images Thumbnails Bar */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-zinc-400 block">الصور المعتمدة حالياً (الصورة الأولى هي الغلاف الرئيسي):</span>
              <div className="flex flex-wrap items-center gap-2.5 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 min-h-16">
                {images.map((imgUrl, idx) => (
                  <div key={idx} className="relative group/thumb w-16 h-16 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-950 shrink-0">
                    <img src={imgUrl} alt={`صورة ${idx + 1}`} className="w-full h-full object-cover" />
                    {idx === 0 && (
                      <span className="absolute bottom-0 inset-x-0 bg-amber-500 text-zinc-950 text-[9px] font-black text-center py-0.2">
                        الرئيسية
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 left-1 p-0.5 bg-rose-600/90 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                      title="حذف هذه الصورة"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Mode 1: Presets Selection */}
            {imageMode === 'preset' && (
              <div className="space-y-1 pt-1">
                <span className="text-[11px] text-zinc-400">اضغط على أي صورة لإضافتها لمعرض هذا المنتج:</span>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_PRODUCT_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddPresetImage(preset.url)}
                      className="relative rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-400 p-1 group transition-all text-center bg-zinc-900/50"
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-14 object-cover rounded"
                      />
                      <span className="text-[10px] text-zinc-300 block truncate mt-1">
                        + {preset.label.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mode 2: Multi-File Upload */}
            {imageMode === 'upload' && (
              <div className="pt-1">
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-zinc-700 hover:border-amber-400 rounded-xl cursor-pointer bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-2 pb-3">
                    <Upload className="w-6 h-6 text-amber-400 mb-1" />
                    <p className="text-xs text-zinc-300 font-bold">اضغط لاختيار صورة أو عدة صور معاً من جهازك</p>
                    <p className="text-[10px] text-zinc-500">يمكنك تحديد أكثر من صورة مرة واحدة (PNG, JPG)</p>
                  </div>
                  <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            )}

            {/* Mode 3: Direct URL */}
            {imageMode === 'url' && (
              <div className="pt-1 flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="url"
                    placeholder="ضع رابط الصورة هنا (https://...)"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs text-zinc-100 outline-none"
                    dir="ltr"
                  />
                  <Link2 className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400 pointer-events-none" />
                </div>
                <button
                  type="button"
                  onClick={handleAddCustomUrl}
                  className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-xl shrink-0"
                >
                  + إضافة الصورة
                </button>
              </div>
            )}
          </div>

          {/* 5. Condition & Highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-200">6. حالة المنتج والضمان:</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 outline-none cursor-pointer"
              >
                <option value="جديد بالضمان">جديد بالضمان الرسمي</option>
                <option value="كسر زيرو فحص كامل">كسر زيرو فحص كامل وضمان تجربة</option>
                <option value="أصلي 100%">أصلي 100% معتمد</option>
                <option value="جودة فائقة">جودة فائقة وضمان كتابي</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-200">7. شارة مميزة (اختياري):</label>
              <input
                type="text"
                placeholder="مثال: الأكثر طلباً / عرض خاص / لقطة اليوم"
                value={highlight}
                onChange={(e) => setHighlight(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none"
              />
            </div>
          </div>

          {/* 6. Quick Features Bullets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-200">8. نقاط مميزة سريعة (اختياري):</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="ميزة 1 (مثال: بطارية 100%)"
                value={feature1}
                onChange={(e) => setFeature1(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-amber-400"
              />
              <input
                type="text"
                placeholder="ميزة 2 (مثال: شاحن 65W سريع)"
                value={feature2}
                onChange={(e) => setFeature2(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-amber-400"
              />
              <input
                type="text"
                placeholder="ميزة 3 (مثال: ضمان 6 شهور)"
                value={feature3}
                onChange={(e) => setFeature3(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 text-xs font-black transition-transform active:scale-95 shadow-lg shadow-amber-500/20"
            >
              حفظ ونشر في المعرض فوراً
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
