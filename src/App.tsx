/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { RepairEstimator } from './components/RepairEstimator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CatalogSection } from './components/CatalogSection';
import { LocationGuide } from './components/LocationGuide';
import { FaqSection } from './components/FaqSection';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { AddProductModal } from './components/AddProductModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { LuckyWheelModal } from './components/LuckyWheelModal';
import { TradeInCalculatorModal } from './components/TradeInCalculatorModal';
import { GoldenWarrantySection } from './components/GoldenWarrantySection';
import { ShieldCheck, Clock, Award, Lock } from 'lucide-react';
import { SHOP_INFO, PRODUCTS_CATALOG, ProductItem, PHONE_BRANDS } from './data/shopData';

const STORAGE_KEY = 'selim_nour_phone_products_catalog_v3';

export default function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLuckyWheelOpen, setIsLuckyWheelOpen] = useState(false);
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [tradeInTarget, setTradeInTarget] = useState<{ name: string; price: number } | undefined>();
  const [successMessage, setSuccessMessage] = useState('');
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    }
    return PRODUCTS_CATALOG;
  });

  // Save to localStorage when products change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }, [products]);

  const handleAddProduct = (newProduct: ProductItem) => {
    setProducts((prev) => [newProduct, ...prev]);
    setSuccessMessage(`تمت إضافة "${newProduct.name}" بنجاح إلى المعرض!`);
    
    // Scroll smoothly to catalog section so user immediately sees their product
    setTimeout(() => {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);

    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف المنتج "${name}"؟`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleUpdateProduct = (updatedProduct: ProductItem) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const handleResetCatalog = () => {
    if (confirm('هل تريد استعادة قائمة المنتجات الافتراضية الأصلية؟')) {
      setProducts(PRODUCTS_CATALOG);
      localStorage.removeItem(STORAGE_KEY);
      setSuccessMessage('تمت استعادة المعرض الافتراضي بنجاح');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleSelectBrandAndGoToCatalog = (brandId: string) => {
    setBrandFilter(brandId);
    const brandObj = PHONE_BRANDS.find((b) => b.id === brandId);
    setSuccessMessage(`تم تحويلك إلى هواتف ماركة "${brandObj?.name || brandId}" في المعرض! ✨`);
    setTimeout(() => {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setTimeout(() => setSuccessMessage(''), 4500);
  };

  const trustPoints = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: 'ضمان حقيقي ومعتمد',
      desc: 'شهادة ضمان كتابية على جميع الشاشات الأصلية والبطاريات والصيانة لراحة بالك التامة.'
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: 'صيانة فورية وسريعة',
      desc: 'أغلب أعمال الصيانة وتغيير الشاشات والبطاريات تتم خلال 30 دقيقة أمام عينيك.'
    },
    {
      icon: <Lock className="w-6 h-6 text-amber-400" />,
      title: 'أمانة تامة وحماية الخصوصية',
      desc: 'نحافظ على بياناتك وصورك وملفاتك الشخصية بأعلى درجات الأمانة والسرية المهنية.'
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: 'إدارة متخصصة وخبرة طويلة',
      desc: `تحت إدارة وإشراف فني مباشر من أ. ${SHOP_INFO.manager} لتقديم أفضل نصيحة وأنسب سعر.`
    }
  ];

  const handleOpenTradeInForProduct = (name: string, price: number) => {
    setTradeInTarget({ name, price });
    setIsTradeInOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Navigation Header */}
      <Header 
        onOpenAddModal={handleOpenAddModal} 
        onOpenLuckyWheel={() => setIsLuckyWheelOpen(true)}
        onOpenTradeIn={() => {
          setTradeInTarget(undefined);
          setIsTradeInOpen(true);
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenAddModal={handleOpenAddModal} />

        {/* 4 Core Services Grid */}
        <ServicesSection />

        {/* Why Trust Us / Value Props Banner */}
        <section className="py-12 bg-zinc-900/80 border-t border-b border-zinc-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                معايير الأمانة والجودة
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                لماذا يفضلنا أهالي مدينة الكردي والمراكز المجاورة؟
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustPoints.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition-colors space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="text-base font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Repair Diagnostic & Cost Estimator */}
        <RepairEstimator onSelectBrandAndGoToCatalog={handleSelectBrandAndGoToCatalog} />

        {/* Customer Testimonials & Reviews */}
        <TestimonialsSection />

        {/* Product & Accessories Catalog Showcase */}
        <CatalogSection
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetCatalog={handleResetCatalog}
          onOpenAddModal={handleOpenAddModal}
          onOpenInstallmentForProduct={handleOpenInstallmentForProduct}
          onOpenTradeInForProduct={handleOpenTradeInForProduct}
          successMessage={successMessage}
          onClearSuccessMessage={() => setSuccessMessage('')}
          activeBrandFilter={brandFilter}
          onSelectBrandFilter={setBrandFilter}
        />

        {/* Professional Addition: Smart Installment Calculator & Plan Selector */}
        <InstallmentCalculatorSection />

        {/* Professional Addition: 6 Golden Guarantees & IMEI Checker */}
        <GoldenWarrantySection />

        {/* Location & Directions Guide */}
        <LocationGuide />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating & Mobile Action Bars */}
      <FloatingActions 
        onOpenAddModal={handleOpenAddModal} 
        onOpenLuckyWheel={() => setIsLuckyWheelOpen(true)}
      />

      {/* Global Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {/* Global Auth Modal (Login / Sign Up / Forgot Password) */}
      <AuthModal />

      {/* Global User Profile & Account Drawer */}
      <UserProfileModal onOpenAddModal={handleOpenAddModal} />

      {/* Global Lucky Wheel & Discounts Modal */}
      <LuckyWheelModal
        isOpen={isLuckyWheelOpen}
        onClose={() => setIsLuckyWheelOpen(false)}
      />

      {/* Professional Addition: Phone Trade-In & Valuation Modal */}
      <TradeInCalculatorModal
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
        presetTargetPhoneName={tradeInTarget?.name}
        presetTargetPhonePrice={tradeInTarget?.price}
      />
    </div>
  );
}
