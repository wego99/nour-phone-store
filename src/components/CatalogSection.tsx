import { useState, useEffect } from 'react';
import { Smartphone, Check, MessageSquare, Plus, Search, Trash2, ArrowUpDown, Sparkles, Headphones, Wrench, Eye, Images, X, Filter, Crown, Lock, CreditCard, RefreshCw } from 'lucide-react';
import { ProductItem, SHOP_INFO, PHONE_BRANDS } from '../data/shopData';
import { ProductDetailsModal } from './ProductDetailsModal';
import { useAuth } from '../context/AuthContext';

type FilterTabType = 'all' | 'phones' | 'accessories' | 'screens';

interface CatalogSectionProps {
  products: ProductItem[];
  onAddProduct: (product: ProductItem) => void;
  onUpdateProduct?: (updatedProduct: ProductItem) => void;
  onDeleteProduct: (id: string, name: string) => void;
  onResetCatalog: () => void;
  onOpenAddModal: () => void;
  onOpenInstallmentForProduct?: (productName: string, productPrice: number) => void;
  onOpenTradeInForProduct?: (productName: string, productPrice: number) => void;
  successMessage?: string;
  onClearSuccessMessage?: () => void;
  activeBrandFilter?: string | null;
  onSelectBrandFilter?: (brandId: string | null) => void;
}

export function CatalogSection({
  products,
  onUpdateProduct,
  onDeleteProduct,
  onResetCatalog,
  onOpenAddModal,
  onOpenInstallmentForProduct,
  onOpenTradeInForProduct,
  successMessage,
  onClearSuccessMessage,
  activeBrandFilter,
  onSelectBrandFilter
}: CatalogSectionProps) {
  const { currentUser, openLogin } = useAuth();
  const isOwner = currentUser?.role === 'admin';

  const [activeTab, setActiveTab] = useState<FilterTabType>('all');
  const [localBrandFilter, setLocalBrandFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc'>('default');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Sync external brand filter if provided
  const currentBrandFilter = activeBrandFilter !== undefined ? activeBrandFilter : localBrandFilter;

  const handleSetBrandFilter = (brandId: string | null) => {
    setLocalBrandFilter(brandId);
    if (onSelectBrandFilter) {
      onSelectBrandFilter(brandId);
    }
    if (brandId) {
      setActiveTab('phones');
    }
  };

  const activeBrandObj = PHONE_BRANDS.find((b) => b.id === currentBrandFilter);

  // Filter products based on active tab, brand, and search query
  const filteredProducts = products.filter((product) => {
    // If brand filter is active, only show phones matching that brand
    if (currentBrandFilter) {
      const isPhone = product.category === 'new_phones' || product.category === 'used_phones';
      if (!isPhone) return false;

      const brandObj = PHONE_BRANDS.find((b) => b.id === currentBrandFilter);
      const brandEnglish = brandObj?.english?.toLowerCase() || currentBrandFilter.toLowerCase();
      const brandArabicShort = brandObj ? brandObj.name.split(' ')[0] : '';

      const matchesBrand =
        product.brand === currentBrandFilter ||
        (!product.brand &&
          (product.name.toLowerCase().includes(brandEnglish) ||
            product.name.includes(brandArabicShort) ||
            (product.description && product.description.toLowerCase().includes(brandEnglish))));

      if (!matchesBrand) {
        return false;
      }
    } else {
      // Normal Category filtering when no specific brand is locked
      if (activeTab === 'phones') {
        if (product.category !== 'new_phones' && product.category !== 'used_phones') {
          return false;
        }
      } else if (activeTab === 'accessories') {
        if (product.category !== 'accessories') {
          return false;
        }
      } else if (activeTab === 'screens') {
        if (product.category !== 'screens_parts') {
          return false;
        }
      }
    }

    // Search query filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCategory = product.categoryLabel.toLowerCase().includes(q);
      const matchFeatures = product.features.some((f) => f.toLowerCase().includes(q));
      const matchDesc = product.description ? product.description.toLowerCase().includes(q) : false;
      return matchName || matchCategory || matchFeatures || matchDesc;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price_desc') {
      return b.price - a.price;
    }
    return 0;
  });

  // Calculate counts
  const phonesCount = products.filter((p) => p.category === 'new_phones' || p.category === 'used_phones').length;
  const accessoriesCount = products.filter((p) => p.category === 'accessories').length;
  const screensCount = products.filter((p) => p.category === 'screens_parts').length;

  const handleWhatsAppProduct = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const text = encodeURIComponent(
      `السلام عليكم أ. أسامة موسى (سليم النور فون)،\nأود الاستفسار عن شراء أو حجز:\n- المنتج: ${product.name}\n- التصنيف: ${product.categoryLabel}\n- السعر: ${product.priceFormatted}\nهل هو متوفر حالياً بالمحل في الكردي؟`
    );
    window.open(`https://wa.me/201003075071?text=${text}`, '_blank');
  };

  const handleProductCardClick = (product: ProductItem) => {
    setSelectedProduct(product);
  };

  const handleUpdateCurrentProduct = (updated: ProductItem) => {
    setSelectedProduct(updated);
    if (onUpdateProduct) {
      onUpdateProduct(updated);
    }
  };

  return (
    <section id="catalog" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Smartphone className="w-3.5 h-3.5" />
            <span>معرض الأجهزة وقائمة الإكسسوارات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            معرض التلفونات والإكسسوارات مع الأسعار
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            اضغط على أي جهاز لعرض <strong className="text-amber-400">كامل الصور والوصف التفصيلي</strong>، أو أضف هاتفاً جديداً بالصور والمواصفات الكاملة.
          </p>
        </div>

        {/* Big Radiant Add-Product Action Box (Visible ONLY to Store Owner / Osama Mousa) */}
        {isOwner && (
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-zinc-900 to-amber-950/30 border-2 border-amber-400 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden animate-in fade-in">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-1.5 text-center md:text-right">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-400 bg-zinc-950 px-3 py-1 rounded-full border border-amber-500/40">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>لوحة تحكم صاحب المحل (أ. أسامة موسى)</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white">
                إضافة هاتف أو إكسسوار جديد للمعرض بالصور والأسعار
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                بصفتك صاحب المحل، يمكنك إدراج هواتف جديدة أو مستعملة وتعديل أسعارها ووصفها ورفع صورها لتظهر للزبائن فوراً.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenAddModal}
              className="w-full md:w-auto px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center justify-center gap-2.5 cursor-pointer ring-4 ring-amber-500/20"
            >
              <Plus className="w-6 h-6 stroke-[3]" />
              <span>+ إضافة منتج جديد للمعرض</span>
            </button>
          </div>
        )}

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-sm font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
            {onClearSuccessMessage && (
              <button
                type="button"
                onClick={onClearSuccessMessage}
                className="text-xs text-emerald-400 hover:text-white"
              >
                إغلاق
              </button>
            )}
          </div>
        )}

        {/* Toolbar: Category Tabs + Search */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 mb-8 space-y-4 shadow-lg">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'all'
                    ? 'bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span>جميع المعروضات</span>
                <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
                  {products.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('phones')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'phones'
                    ? 'bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>قائمة التلفونات</span>
                <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
                  {phonesCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('accessories')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'accessories'
                    ? 'bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <Headphones className="w-4 h-4" />
                <span>قائمة الإكسسوارات والمبردات</span>
                <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
                  {accessoriesCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('screens')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'screens'
                    ? 'bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>شاشات وصيانة</span>
                <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
                  {screensCount}
                </span>
              </button>
            </div>

            {/* Quick Add Product Button in Toolbar (Visible ONLY to Store Owner) */}
            {isOwner && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenAddModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
                >
                  <Crown className="w-4 h-4 text-zinc-950" />
                  <span>+ إضافة منتج (صاحب المحل)</span>
                </button>
              </div>
            )}

          </div>

          {/* Dedicated Phone Brands Bar (خانة ماركات الهواتف - اختر الشركة المصنعة) */}
          <div className="pt-3.5 pb-1 border-t border-zinc-800 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-400 flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>خانة ماركات الهواتف (اختر الشركة المصنعة):</span>
                </span>
                <span className="text-[11px] text-zinc-400 hidden sm:inline">
                  اضغط على أي ماركة لعرض أجهزتها فقط بالأسعار
                </span>
              </div>

              {currentBrandFilter && (
                <button
                  type="button"
                  onClick={() => handleSetBrandFilter(null)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-zinc-950 px-2.5 py-1 rounded-lg border border-amber-500/30 cursor-pointer self-start sm:self-auto"
                >
                  <span>عرض جميع الماركات (إلغاء التصفية)</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* All Brands Pill */}
              <button
                type="button"
                onClick={() => handleSetBrandFilter(null)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  !currentBrandFilter
                    ? 'bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span>🌐 جميع الشركات</span>
                <span className="text-[10px] px-1 rounded-md bg-black/20 font-mono">
                  {phonesCount}
                </span>
              </button>

              {/* Individual Brand Buttons */}
              {PHONE_BRANDS.map((brand) => {
                const brandPhonesCount = products.filter(
                  (p) =>
                    (p.category === 'new_phones' || p.category === 'used_phones') &&
                    (p.brand === brand.id ||
                      (!p.brand &&
                        (p.name.toLowerCase().includes(brand.english?.toLowerCase() || '') ||
                          p.name.includes(brand.name.split(' ')[0]))))
                ).length;

                const isSelected = currentBrandFilter === brand.id;

                return (
                  <button
                    key={brand.id}
                    type="button"
                    onClick={() => handleSetBrandFilter(isSelected ? null : brand.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-zinc-950 font-black shadow-lg shadow-amber-500/30 ring-2 ring-amber-300 scale-105'
                        : 'bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-amber-500/50 hover:text-white'
                    }`}
                  >
                    <span>{brand.icon}</span>
                    <span>{brand.shortName || brand.name.split(' ')[0]}</span>
                    {brandPhonesCount > 0 && (
                      <span
                        className={`text-[10px] px-1 rounded-md font-mono ${
                          isSelected ? 'bg-zinc-950 text-amber-400 font-bold' : 'bg-zinc-850 text-zinc-400'
                        }`}
                      >
                        {brandPhonesCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar & Sort Controls */}
          <div className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="ابحث بالاسم أو الوصف (مثال: آيفون، 256 جيجا، شاحن، بطارية...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl pr-9 pl-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 outline-none"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-zinc-500 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-2.5 text-xs text-zinc-400 hover:text-white"
                >
                  مسح
                </button>
              )}
            </div>

            {/* Sort & Reset */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">ترتيب:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-zinc-200 outline-none cursor-pointer"
                >
                  <option value="default" className="bg-zinc-900">المميز أولاً</option>
                  <option value="price_asc" className="bg-zinc-900">السعر: من الأقل للأعلى</option>
                  <option value="price_desc" className="bg-zinc-900">السعر: من الأعلى للأقل</option>
                </select>
              </div>

              <button
                type="button"
                onClick={onResetCatalog}
                className="text-xs text-zinc-400 hover:text-amber-400 underline px-2 cursor-pointer"
                title="استعادة المعرض الأصلي"
              >
                استعادة الافتراضي
              </button>
            </div>

          </div>
        </div>

        {/* Active Brand Filter Banner Notification */}
        {currentBrandFilter && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-zinc-900 to-amber-950/20 border-2 border-amber-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
                {activeBrandObj?.icon || '📱'}
              </div>
              <div>
                <p className="text-sm font-black text-white">
                  يتم الآن تصفية وعرض هواتف ماركة: <span className="text-amber-400 font-black">{activeBrandObj?.name || currentBrandFilter}</span>
                </p>
                <p className="text-xs text-zinc-300">
                  تم العثور على <strong className="text-amber-300 font-mono text-sm">{sortedProducts.length}</strong> هاتف متوفر بهذه الماركة
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSetBrandFilter(null)}
              className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-amber-300 hover:text-white border border-amber-500/40 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <X className="w-4 h-4" />
              <span>إلغاء التصفية وعرض كافة الهواتف</span>
            </button>
          </div>
        )}

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="p-12 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center space-y-3">
            <Smartphone className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-white">
              {currentBrandFilter
                ? `لا توجد هواتف مضافة حالياً لماركة ${activeBrandObj?.name || currentBrandFilter}`
                : 'لم يتم العثور على منتجات مطابقة للبحث'}
            </h3>
            <p className="text-xs text-zinc-400">
              {currentBrandFilter
                ? 'يمكنك إضافة هاتف جديد لهذه الماركة بالصور والسعر والوصف، وسيظهر فوراً في المعرض!'
                : 'جرب تغيير كلمات البحث أو اختر تبويب تصنيف آخر.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  handleSetBrandFilter(null);
                  setActiveTab('all');
                }}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-amber-400 transition-colors cursor-pointer"
              >
                عرض جميع المعروضات
              </button>
              {isOwner && (
                <button
                  type="button"
                  onClick={onOpenAddModal}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-black transition-colors cursor-pointer shadow-md shadow-amber-500/20"
                >
                  + إضافة هاتف لهذه الماركة الآن (صاحب المحل)
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => {
              const imagesCount = product.images?.length || 1;
              return (
                <div
                  key={product.id}
                  onClick={() => handleProductCardClick(product)}
                  className="rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden cursor-pointer"
                >
                  <div>
                    
                    {/* Product Image Container */}
                    <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80';
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

                      {/* Category Tag on top right */}
                      <div className="absolute top-3 right-3 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-bold text-zinc-950 bg-amber-400 px-2.5 py-1 rounded-lg shadow-md font-mono">
                          {product.categoryLabel}
                        </span>

                        {product.brand && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetBrandFilter(product.brand!);
                            }}
                            className="text-[10px] font-bold text-amber-300 bg-zinc-950/90 hover:bg-amber-400 hover:text-zinc-950 border border-amber-500/40 px-2 py-0.5 rounded-lg shadow-md backdrop-blur-sm transition-colors cursor-pointer flex items-center gap-1"
                            title={`تصفية هواتف ماركة ${product.brand}`}
                          >
                            <span>{PHONE_BRANDS.find((b) => b.id === product.brand)?.icon || '📱'}</span>
                            <span>{PHONE_BRANDS.find((b) => b.id === product.brand)?.shortName || product.brand}</span>
                          </button>
                        )}

                        {product.highlight && (
                          <span className="text-[11px] font-bold text-white bg-zinc-900/90 border border-amber-500/40 px-2 py-0.5 rounded-lg shadow-md backdrop-blur-sm">
                            {product.highlight}
                          </span>
                        )}
                      </div>

                      {/* Multiple Photos Badge Indicator */}
                      {imagesCount > 1 && (
                        <div className="absolute top-3 left-12 flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-zinc-950/80 px-2 py-0.5 rounded-md border border-amber-500/30">
                          <Images className="w-3 h-3" />
                          <span>{imagesCount} صور</span>
                        </div>
                      )}

                      {/* Delete button (Visible ONLY to Store Owner) */}
                      {isOwner && product.isUserAdded && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteProduct(product.id, product.name);
                          }}
                          className="absolute top-3 left-3 p-1.5 rounded-lg bg-zinc-900/90 hover:bg-rose-600 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                          title="حذف هذا المنتج (صاحب المحل)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      {/* Condition badge on bottom right over image */}
                      <div className="absolute bottom-3 right-3">
                        <span className="text-[11px] font-semibold text-emerald-300 bg-zinc-950/90 border border-emerald-500/30 px-2.5 py-1 rounded-md backdrop-blur-sm">
                          {product.condition}
                        </span>
                      </div>

                      {/* Price Banner on Bottom Left over image */}
                      <div className="absolute bottom-3 left-3">
                        <div className="px-3 py-1 rounded-xl bg-gradient-to-l from-amber-500 to-yellow-500 text-zinc-950 font-black text-sm shadow-xl font-mono" dir="ltr">
                          {product.priceFormatted}
                        </div>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 sm:p-6 space-y-3">
                      
                      {/* Product Name */}
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {product.name}
                      </h3>

                      {/* Description preview snippet */}
                      {product.description && (
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      )}

                      {/* Features list */}
                      <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                        {product.features.slice(0, 2).map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-2 text-xs text-zinc-300">
                            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="line-clamp-1">{feature}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Actions Bar: View Details + Installment + WhatsApp */}
                  <div className="p-5 pt-0 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleProductCardClick(product)}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-750 text-amber-400 hover:text-amber-300 text-xs font-bold border border-zinc-700/60 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>التفاصيل ({imagesCount})</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenInstallmentForProduct) {
                            onOpenInstallmentForProduct(product.name, product.price);
                          } else {
                            const el = document.getElementById('installment-calculator');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors"
                        title="احسب القسط الشهري لهذا الجهاز"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                        <span>احسب القسط</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleWhatsAppProduct(product, e)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800 hover:bg-emerald-600 text-zinc-100 hover:text-white font-bold text-xs transition-colors group-hover:bg-emerald-600 shadow-md cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>طلب أو استفسار عبر واتساب</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Extra notice & Direct call */}
        <div className="mt-12 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            <h4 className="text-sm font-bold text-white">
              هل تبحث عن جهاز أو إكسسوار غير معروض هنا؟
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              نوفر جميع الأجهزة الأصلية والشواحن فوراً عند الطلب من توكيلات مصر المعتمدة.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 shrink-0">
            {isOwner ? (
              <button
                type="button"
                onClick={onOpenAddModal}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ إضافة منتج جديد (صاحب المحل)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={openLogin}
                className="text-[11px] text-zinc-500 hover:text-amber-400 underline transition-colors cursor-pointer"
                title="تسجيل دخول صاحب المحل (أسامة موسى) لإدارة المنتجات"
              >
                تسجيل دخول صاحب المحل
              </button>
            )}

            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <span>اتصال مباشر: {SHOP_INFO.phone}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Product Details & Multi-Image Gallery Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onUpdateProduct={handleUpdateCurrentProduct}
        onOpenInstallmentForProduct={onOpenInstallmentForProduct}
        onOpenTradeInForProduct={onOpenTradeInForProduct}
      />
    </section>
  );
}
