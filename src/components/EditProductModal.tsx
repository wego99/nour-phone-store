import React, { useState, useEffect } from 'react';
import { 
  X, Save, Trash2, Upload, Link2, Sparkles, Check, 
  Image as ImageIcon, AlertCircle, Plus, Smartphone, Headphones, 
  Wrench, ShieldCheck, Tag
} from 'lucide-react';
import { ProductItem, PRESET_PRODUCT_IMAGES, PHONE_BRANDS } from '../data/shopData';
import { useAuth } from '../context/AuthContext';

interface EditProductModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveProduct: (updated: ProductItem) => void;
  onDeleteProduct: (id: string, name: string) => void;
}

export function EditProductModal({
  product,
  isOpen,
  onClose,
  onSaveProduct,
  onDeleteProduct
}: EditProductModalProps) {
  const { currentUser } = useAuth();
  const isOwner = currentUser?.role === 'admin';

  const [name, setName] = useState('');
  const [category, setCategory] = useState<'new_phones' | 'accessories'>('new_phones');
  const [brand, setBrand] = useState('apple');
  const [price, setPrice] = useState<number>(0);
  const [condition, setCondition] = useState<'جديد بالضمان' | 'أصلي 100%' | 'جودة فائقة'>('جديد بالضمان');
  const [highlight, setHighlight] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [feature1, setFeature1] = useState('');
  const [feature2, setFeature2] = useState('');
  const [feature3, setFeature3] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setCategory(product.category || 'new_phones');
      setBrand(product.brand || 'apple');
      setPrice(product.price || 0);
      setCondition(product.condition || 'جديد بالضمان');
      setHighlight(product.highlight || '');
      setDescription(product.description || '');
      setImages(product.images && product.images.length > 0 ? product.images : [product.imageUrl]);
      setFeature1(product.features?.[0] || '');
      setFeature2(product.features?.[1] || '');
      setFeature3(product.features?.[2] || '');
      setError('');
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  // Security gate: only store owner can edit
  if (!isOwner) {
    return null;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (file.size > 5 * 1024 * 1024) {
          setError('حجم الصورة كبير، يرجى اختيار صور أقل من 5 ميجابايت');
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImages((prev) => [...prev, reader.result as string]);
            setError('');
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddPreset = (url: string) => {
    if (!images.includes(url)) {
      setImages((prev) => [...prev, url]);
    }
  };

  const handleAddCustomUrl = () => {
    if (customUrlInput.trim()) {
      if (!images.includes(customUrlInput.trim())) {
        setImages((prev) => [...prev, customUrlInput.trim()]);
      }
      setCustomUrlInput('');
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (images.length <= 1) {
      setError('يجب الإبقاء على صورة واحدة على الأقل للمنتج');
      return;
    }
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('يرجى إدخال اسم المنتج أو الهاتف');
      return;
    }

    if (price <= 0) {
      setError('يرجى إدخال سعر صحيح بالجنيه المصري');
      return;
    }

    if (images.length === 0) {
      setError('يرجى إضافة صورة واحدة على الأقل');
      return;
    }

    const categoryLabel = category === 'new_phones' ? 'تلفونات جديدة' : 'إكسسوارات ومستلزمات';

    const featuresList = [feature1, feature2, feature3]
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const updatedProduct: ProductItem = {
      ...product,
      name: name.trim(),
      category,
      categoryLabel,
      brand: category === 'new_phones' ? brand : undefined,
      price,
      priceFormatted: `${price.toLocaleString('ar-EG')} ج.م`,
      imageUrl: images[0],
      images,
      description: description.trim(),
      condition,
      highlight: highlight.trim() || undefined,
      features: featuresList.length > 0 ? featuresList : product.features
    };

    onSaveProduct(updatedProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-zinc-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden my-6"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">تعديل بيانات المنتج في المعرض</h3>
                <span className="text-[10px] bg-amber-400 text-zinc-950 font-black px-2 py-0.5 rounded-full font-mono">
                  صاحب المحل
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                تعديل الاسم والأسعار والتصنيف والصور والوصف وحفظ التغييرات فوراً.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-600 text-rose-300 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Category Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">التصنيف والقسم في المعرض:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCategory('new_phones')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  category === 'new_phones'
                    ? 'bg-amber-500 text-zinc-950 font-black border-amber-400 shadow-md ring-2 ring-amber-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <Smartphone className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs font-bold">📱 تلفونات جديدة بالضمان</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('accessories')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  category === 'accessories'
                    ? 'bg-amber-500 text-zinc-950 font-black border-amber-400 shadow-md ring-2 ring-amber-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <Headphones className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs font-bold">🎧 إكسسوارات وسماعات ومبردات</span>
              </button>
            </div>
          </div>

          {/* 2. Name & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">اسم المنتج أو الموبايل: *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-400 text-white text-xs font-bold outline-none"
                placeholder="مثال: آيفون 15 برو ماكس"
                required
              />
            </div>

            {category === 'new_phones' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">الشركة المصنعة (الماركة):</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-400 text-white text-xs font-bold outline-none cursor-pointer"
                >
                  {PHONE_BRANDS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.english})
                    </option>
                  ))}
                  <option value="other">ماركة أخرى</option>
                </select>
              </div>
            )}
          </div>

          {/* 3. Price & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">السعر بالجملة/القطاعي (ج.م): *</label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  step={10}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-400 text-white font-mono text-sm font-bold outline-none text-left"
                  dir="ltr"
                  required
                />
                <span className="absolute left-3 top-2.5 text-xs text-zinc-500 pointer-events-none">EGP</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">حالة المنتج والضمان:</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-400 text-white text-xs font-bold outline-none cursor-pointer"
              >
                <option value="جديد بالضمان">جديد بالضمان الرسمي</option>
                <option value="أصلي 100%">أصلي 100% معتمد</option>
                <option value="جودة فائقة">جودة فائقة وفحص كامل</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">شارة التميز (Badge):</label>
              <input
                type="text"
                value={highlight}
                onChange={(e) => setHighlight(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-400 text-white text-xs font-bold outline-none"
                placeholder="مثال: الأكثر طلباً / خصم خاص"
              />
            </div>
          </div>

          {/* 4. Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">الوصف التفصيلي والمواصفات:</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-400 text-white text-xs leading-relaxed outline-none"
              placeholder="اكتب مواصفات الجهاز بالتفصيل، المعالج، الذاكرة، الشاشة، البطارية، وحالة الضمان..."
            />
          </div>

          {/* 5. Features Bullets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300">المميزات الرئيسية المشمولة (3 نقاط):</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={feature1}
                onChange={(e) => setFeature1(e.target.value)}
                placeholder="ميزة 1 (مثال: بطارية 100% كسر زيرو)"
                className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none"
              />
              <input
                type="text"
                value={feature2}
                onChange={(e) => setFeature2(e.target.value)}
                placeholder="ميزة 2 (مثال: ضمان 30 يوم استبدال)"
                className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none"
              />
              <input
                type="text"
                value={feature3}
                onChange={(e) => setFeature3(e.target.value)}
                placeholder="ميزة 3 (مثال: شاحن سريع وعلبة كاملة)"
                className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* 6. Product Gallery Images */}
          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-200">
                معرض صور المنتج ({images.length} صور):
              </label>
              <span className="text-[10px] text-amber-400 font-bold">
                الصورة الأولى هي الصورة الرئيسية المعروضة في الكتالوج
              </span>
            </div>

            {/* Current Images Thumbnails */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {images.map((imgUrl, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950 h-20">
                  <img src={imgUrl} alt={`صورة ${idx + 1}`} className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <span className="absolute bottom-1 right-1 text-[9px] bg-amber-400 text-zinc-950 font-bold px-1.5 py-0.2 rounded">
                      رئيسية
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 left-1 p-1 bg-rose-600 hover:bg-rose-500 text-white rounded-md opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="حذف هذه الصورة"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Image Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* File Upload */}
              <label className="p-3 rounded-xl bg-zinc-950 border border-dashed border-zinc-700 hover:border-amber-400 text-center cursor-pointer transition-colors block">
                <Upload className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                <span className="text-xs font-bold text-zinc-300 block">رفع صور من جهازك</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* URL Input */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-800">
                <input
                  type="url"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="أو الصق رابط صورة..."
                  className="flex-1 bg-transparent px-3 py-2 text-xs text-white outline-none"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={handleAddCustomUrl}
                  className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-bold shrink-0 cursor-pointer"
                >
                  إضافة
                </button>
              </div>
            </div>

            {/* Quick Preset Images */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] text-zinc-400">اختر من صور النماذج السريعة:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_PRODUCT_IMAGES.map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => handleAddPreset(preset.url)}
                    className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 text-[10px] text-zinc-300 cursor-pointer"
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                if (confirm(`هل أنت متأكد من حذف المنتج "${product.name}" نهائياً من المعرض؟`)) {
                  onDeleteProduct(product.id, product.name);
                  onClose();
                }
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-700 text-rose-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>حذف هذا المنتج نهائياً</span>
            </button>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
              >
                إلغاء
              </button>

              <button
                type="submit"
                className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>حفظ التعديلات</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
