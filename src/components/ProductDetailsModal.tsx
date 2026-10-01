import React, { useState } from 'react';
import { X, MessageSquare, Phone, ShieldCheck, Check, Plus, Upload, Image as ImageIcon, Sparkles, ChevronRight, ChevronLeft, FileText, Tag, Edit3, Save, Smartphone, CreditCard, RefreshCw } from 'lucide-react';
import { ProductItem, SHOP_INFO, PRESET_PRODUCT_IMAGES, PHONE_BRANDS } from '../data/shopData';

interface ProductDetailsModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProduct?: (updatedProduct: ProductItem) => void;
  onOpenInstallmentForProduct?: (productName: string, productPrice: number) => void;
  onOpenTradeInForProduct?: (productName: string, productPrice: number) => void;
}

export function ProductDetailsModal({ 
  product, 
  isOpen, 
  onClose, 
  onUpdateProduct,
  onOpenInstallmentForProduct,
  onOpenTradeInForProduct
}: ProductDetailsModalProps) {
  if (!isOpen || !product) return null;

  // Gallery state
  const productImages = (product.images && product.images.length > 0)
    ? product.images
    : [product.imageUrl];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  
  // Inline Description edit mode
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [customDesc, setCustomDesc] = useState(product.description || '');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const newUrl = reader.result;
          const updatedImages = [...productImages, newUrl];
          const updated: ProductItem = {
            ...product,
            images: updatedImages,
            imageUrl: updatedImages[0]
          };
          if (onUpdateProduct) onUpdateProduct(updated);
          setActiveImageIndex(updatedImages.length - 1);
          setShowAddPhoto(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhotoUrl = () => {
    if (newPhotoUrl.trim()) {
      const updatedImages = [...productImages, newPhotoUrl.trim()];
      const updated: ProductItem = {
        ...product,
        images: updatedImages,
        imageUrl: updatedImages[0]
      };
      if (onUpdateProduct) onUpdateProduct(updated);
      setActiveImageIndex(updatedImages.length - 1);
      setNewPhotoUrl('');
      setShowAddPhoto(false);
    }
  };

  const handleSaveDescription = () => {
    const updated: ProductItem = {
      ...product,
      description: customDesc.trim()
    };
    if (onUpdateProduct) onUpdateProduct(updated);
    setIsEditingDesc(false);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `السلام عليكم أ. أسامة موسى (سليم النور فون)،\nأرغب في الاستفسار عن شراء هذا الجهاز:\n- اسم المنتج: ${product.name}\n- التصنيف: ${product.categoryLabel}\n- السعر: ${product.priceFormatted}\n- الحالة: ${product.condition}\nهل هو متوفر حالياً بمحلكم في مدينة الكردي؟`
    );
    window.open(`https://wa.me/201003075071?text=${text}`, '_blank');
  };

  const currentPhoto = productImages[activeImageIndex] || product.imageUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl bg-zinc-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800 bg-zinc-950/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-zinc-950 bg-amber-400 px-3 py-1 rounded-full font-mono">
              {product.categoryLabel}
            </span>

            {product.brand && (
              <span className="text-xs font-bold text-amber-300 bg-zinc-900 border border-amber-500/40 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <span>{PHONE_BRANDS.find((b) => b.id === product.brand)?.icon || '📱'}</span>
                <span>شركة: {PHONE_BRANDS.find((b) => b.id === product.brand)?.name.split(' ')[0] || product.brand}</span>
              </span>
            )}

            {product.highlight && (
              <span className="text-xs font-bold text-amber-300 bg-zinc-900 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                {product.highlight}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-8 max-h-[82vh] overflow-y-auto">
          
          {/* Left/Main Column: Image Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Active Big Image Display */}
            <div className="relative h-72 sm:h-84 w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center shadow-inner group">
              <img
                src={currentPhoto}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PRESET_PRODUCT_IMAGES[0].url;
                }}
              />

              {/* Prev / Next Buttons if multiple images */}
              {productImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : productImages.length - 1))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-950/80 hover:bg-amber-500 text-white hover:text-zinc-950 transition-colors shadow-lg cursor-pointer"
                    aria-label="الصورة السابقة"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev < productImages.length - 1 ? prev + 1 : 0))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-950/80 hover:bg-amber-500 text-white hover:text-zinc-950 transition-colors shadow-lg cursor-pointer"
                    aria-label="الصورة التالية"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-sm text-zinc-300 text-[11px] px-2.5 py-1 rounded-full font-mono border border-zinc-700">
                    صورة {activeImageIndex + 1} من {productImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails Row + Add Photo Button */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105'
                      : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Add Photo Button (Requested: اضافه اكتر من صوره باحتراف) */}
              <button
                type="button"
                onClick={() => setShowAddPhoto(!showAddPhoto)}
                className="w-16 h-16 rounded-xl border-2 border-dashed border-amber-500/50 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 flex flex-col items-center justify-center gap-1 shrink-0 transition-all cursor-pointer"
                title="إضافة صورة أخرى لهذا المنتج"
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
                <span className="text-[9px] font-bold">+ صورة</span>
              </button>
            </div>

            {/* Quick Add Photo Dropdown Box */}
            {showAddPhoto && (
              <div className="p-4 rounded-xl bg-zinc-950 border border-amber-500/30 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>إضافة صورة جديدة لمعرض هذا الجهاز:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddPhoto(false)}
                    className="text-zinc-500 hover:text-white text-xs"
                  >
                    إلغاء
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-xs font-bold text-zinc-200 border border-zinc-700 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-amber-400" />
                    <span>رفع صورة من جهازك</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>

                  <div className="flex-1 flex items-center gap-1.5">
                    <input
                      type="url"
                      placeholder="أو ضع رابط صورة..."
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-xl px-2.5 py-1.5 text-xs text-zinc-100 outline-none"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={handleAddPhotoUrl}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-xl shrink-0"
                    >
                      إضافة
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Title, Price, Description & Specs (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Title & Price Header */}
            <div className="space-y-2 border-b border-zinc-800 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {product.name}
              </h2>

              <div className="flex items-center justify-between gap-4 pt-1">
                <div>
                  <span className="text-xs text-zinc-400 block">السعر المطلوب:</span>
                  <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-yellow-300 font-mono tracking-tight" dir="ltr">
                    {product.priceFormatted}
                  </span>
                </div>

                <div className="text-left">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{product.condition}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Description Box (Requested: وصف الجهاز يظهر فيها) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>وصف وتفاصيل الجهاز الكاملة:</span>
                </span>
                
                <button
                  type="button"
                  onClick={() => {
                    if (isEditingDesc) {
                      handleSaveDescription();
                    } else {
                      setCustomDesc(product.description || '');
                      setIsEditingDesc(true);
                    }
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-amber-400 transition-colors"
                >
                  {isEditingDesc ? (
                    <>
                      <Save className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">حفظ الوصف</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل الوصف</span>
                    </>
                  )}
                </button>
              </div>

              {isEditingDesc ? (
                <div className="space-y-2 pt-1">
                  <textarea
                    rows={4}
                    value={customDesc}
                    onChange={(e) => setCustomDesc(e.target.value)}
                    placeholder="اكتب تفاصيل ومواصفات الجهاز..."
                    className="w-full bg-zinc-900 border border-amber-500/50 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 outline-none leading-relaxed"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingDesc(false)}
                      className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-lg"
                    >
                      إلغاء
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveDescription}
                      className="px-3 py-1 bg-amber-500 text-zinc-950 font-bold text-xs rounded-lg"
                    >
                      تأكيد الحفظ
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal whitespace-pre-line">
                  {product.description || 'جهاز أصلي ومفحوص بدقة عالية، مشمول بضمان محل سليم النور فون لخدمات المحمول في مدينة الكردي تحت إدارة أسامة موسى.'}
                </p>
              )}
            </div>

            {/* Key Features Bullet List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-300">أهم المميزات المشمولة:</span>
              <div className="space-y-1.5">
                {product.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 text-xs text-zinc-300 bg-zinc-950/60 p-2 rounded-xl border border-zinc-850">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Quick Financial Tools */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {onOpenInstallmentForProduct && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenInstallmentForProduct(product.name, product.price);
                  }}
                  className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>احسب القسط لهذا الجهاز</span>
                </button>
              )}

              {onOpenTradeInForProduct && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenTradeInForProduct(product.name, product.price);
                  }}
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <span>بدّل هاتفك القديم به</span>
                </button>
              )}
            </div>

            {/* Action Buttons: WhatsApp Order + Phone Call */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-950/50 active:scale-95 transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>حجز أو استفسار فوري عبر واتساب المحل</span>
              </button>

              <a
                href={`tel:${SHOP_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-amber-500/30 text-amber-400 font-bold text-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>اتصل مباشرة بمدير المحل (أسامة موسى): {SHOP_INFO.phone}</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
