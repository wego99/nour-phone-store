import { useState } from 'react';
import { Phone, MessageSquare, Menu, X, Shield, Smartphone, Clock, User, Crown, LogIn, ChevronDown, RotateCw, ChevronLeft, Gift } from 'lucide-react';
import { SHOP_INFO } from '../data/shopData';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenAddModal?: () => void;
  onOpenLuckyWheel?: () => void;
  onOpenTradeIn?: () => void;
}

export function Header({ onOpenAddModal, onOpenLuckyWheel, onOpenTradeIn }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, openLogin, openProfile } = useAuth();

  const navLinks = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'المعرض والأجهزة', href: '#catalog' },
    { label: 'حاسبة التقسيط 💳', href: '#installment-calculator' },
    { label: 'استبدال هاتفك 🔄', href: '#trade-in', isTradeIn: true },
    { label: 'تكلفة الصيانة', href: '#repair-estimator' },
    { label: 'الضمان الذهبي 🛡️', href: '#warranty' },
    { label: 'عجلة الحظ 🎡', href: '#lucky-wheel', isWheel: true },
    { label: 'الموقع وساعات العمل', href: '#location' },
    { label: 'الأسئلة الشائعة', href: '#faqs' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
      {/* Top Banner (Clean & Concise) */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-zinc-950 text-xs font-semibold py-1.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="font-black flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-zinc-900" />
              سليم النور فون لخدمات المحمول
            </span>
            <span className="text-zinc-800 hidden sm:inline">•</span>
            <span className="text-zinc-900 hidden sm:inline font-medium">
              إدارة: <strong>{SHOP_INFO.manager}</strong> (مدينة الكردي - ميدان المحطة)
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[11px]">
            <span className="hidden lg:inline-flex items-center gap-1 font-medium text-zinc-900">
              <Clock className="w-3.5 h-3.5" />
              10:00 ص - 11:30 م
            </span>

            {/* Facebook Page Link */}
            <a
              href={SHOP_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 font-bold bg-[#1877F2] hover:bg-blue-600 text-white px-2.5 py-0.5 rounded-full transition-colors shadow-sm text-[11px]"
              title="صفحة فيسبوك أسامة موسى / سليم النور فون"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>فيسبوك</span>
            </a>

            {/* WhatsApp Link with exact number */}
            <a
              href={SHOP_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-black bg-[#25D366] hover:bg-emerald-400 text-zinc-950 px-2.5 py-0.5 rounded-full transition-colors shadow-sm"
              dir="ltr"
              title="واتساب أسامة موسى (01003075071)"
            >
              <MessageSquare className="w-3 h-3" />
              <span>01003075071</span>
            </a>

            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="hidden md:flex items-center gap-1 font-black bg-zinc-950 text-amber-400 px-2.5 py-0.5 rounded-full hover:bg-zinc-900 transition-colors shadow-sm"
              dir="ltr"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{SHOP_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Right Side: Logo & Store Identity */}
          <a href="#hero" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 p-0.5 shadow-lg shadow-amber-500/10 group-hover:shadow-amber-500/25 transition-all duration-300">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  سليم النور فون
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                  الكردي
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-medium">
                تحت إدارة أسامة موسى
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => {
              if (link.isWheel) {
                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={onOpenLuckyWheel}
                    className="text-xs font-black px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/10 border border-amber-400 text-amber-300 hover:text-white hover:border-amber-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/10 active:scale-95 animate-pulse"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>عجلة الحظ 🎡</span>
                  </button>
                );
              }
              if (link.isTradeIn) {
                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={onOpenTradeIn}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-amber-400 hover:border-amber-400 transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                  >
                    <RotateCw className="w-3 h-3 text-amber-400" />
                    <span>استبدال هاتفك 🔄</span>
                  </button>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Left Side: ONE SINGLE UNIFIED BOX FOR LOGIN & SIGN UP */}
          <div className="hidden lg:flex items-center">
            {currentUser ? (
              /* User Logged In Pill */
              <button
                type="button"
                onClick={openProfile}
                className="px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-850 border border-amber-500/40 hover:border-amber-400 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-3 cursor-pointer group"
                title="اضغط لفتح الملف الشخصي وتتبع الصيانة ونقاط الولاء"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black shrink-0">
                  {currentUser.role === 'admin' ? <Crown className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                      {currentUser.name}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      currentUser.role === 'admin' ? 'bg-amber-400 text-zinc-950 font-black' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {currentUser.role === 'admin' ? 'الإدارة' : 'عميل'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-normal">
                    {currentUser.role === 'admin' ? 'لوحة التحكم والصلاحيات' : `رصيدك: ${currentUser.loyaltyPoints || 0} نقطة ولاء`}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors mr-1" />
              </button>
            ) : (
              /* Single Unified Box for Login and Create Account */
              <button
                type="button"
                onClick={openLogin}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer border border-amber-300/50"
                title="تسجيل الدخول أو إنشاء حساب جديد في سليم النور فون"
              >
                <div className="w-6 h-6 rounded-lg bg-zinc-950/20 flex items-center justify-center text-zinc-950">
                  <User className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>تسجيل الدخول / إنشاء حساب</span>
              </button>
            )}
          </div>

          {/* Mobile Right Controls: Single Auth Button + Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {currentUser ? (
              <button
                type="button"
                onClick={openProfile}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {currentUser.role === 'admin' ? <Crown className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                <span className="max-w-[75px] truncate">{currentUser.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={openLogin}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <User className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>دخول / حساب</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 cursor-pointer"
              aria-label="فتح القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Clean & Organized) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-zinc-950 px-4 pt-4 pb-6 space-y-4 shadow-2xl animate-in fade-in duration-200">
          
          {/* Single Unified Box inside Mobile Menu */}
          {currentUser ? (
            <div className="p-4 rounded-2xl bg-zinc-900 border border-amber-500/40 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                  {currentUser.role === 'admin' ? <Crown className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-xs font-black text-white">{currentUser.name}</p>
                  <p className="text-[11px] text-amber-400">
                    {currentUser.role === 'admin' ? '👑 مدير المحل' : `رصيد الولاء: ${currentUser.loyaltyPoints || 0} نقطة`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openProfile();
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-black transition-colors cursor-pointer"
              >
                الملف الشخصي
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openLogin();
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 font-black text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <User className="w-4 h-4 stroke-[2.5]" />
              <span>تسجيل الدخول / إنشاء حساب جديد</span>
            </button>
          )}

          {/* Lucky Wheel & Discounts Card in Mobile Side Menu */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLuckyWheel?.();
            }}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-950/40 border-2 border-amber-400 hover:border-amber-300 text-right transition-all flex items-center justify-between group shadow-lg shadow-amber-500/10 cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 text-zinc-950 flex items-center justify-center font-black shadow-md shadow-amber-500/30 group-hover:rotate-180 transition-transform duration-700">
                <RotateCw className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                    عجلة الحظ والخصومات 🎡
                  </span>
                  <span className="text-[10px] font-bold bg-amber-400 text-zinc-950 px-2 py-0.5 rounded-full font-mono animate-pulse">
                    العب واكسب
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  دوّر العجلة واربح خصومات فورية واسكرينات هدية
                </p>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Trade-In Card in Mobile Side Menu */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTradeIn?.();
            }}
            className="w-full p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 text-right transition-all flex items-center justify-between group shadow-md cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-black">
                <RotateCw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300">
                  استبدال وتثمين هاتفك القديم 🔄
                </p>
                <p className="text-[11px] text-zinc-400">
                  احسب سعر جهازك القديم وادفع الفرق كاش أو قسط
                </p>
              </div>
            </div>
            <ChevronLeft className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Navigation Links */}
          <div className="space-y-1 pt-1 border-t border-zinc-850">
            {navLinks.filter(l => !l.isWheel && !l.isTradeIn).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-zinc-200 hover:bg-zinc-900 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact & Social Shortcuts */}
          <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-2">
            <a
              href={SHOP_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1877F2] hover:bg-blue-600 text-white font-black text-xs transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>صفحة فيسبوك أسامة موسى الرسمية</span>
            </a>

            <a
              href={SHOP_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-emerald-500 text-zinc-950 font-black text-xs transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>محادثة واتساب: {SHOP_INFO.whatsapp}</span>
            </a>

            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-amber-400 font-black text-xs hover:bg-zinc-850"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>اتصال هاتفي مباشر: {SHOP_INFO.phone}</span>
            </a>
          </div>

        </div>
      )}
    </header>
  );
}
