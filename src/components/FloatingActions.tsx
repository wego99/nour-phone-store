import { Phone, MessageSquare, MapPin, Star, ArrowUp, Plus, Sparkles, User, Crown, LogIn, RotateCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SHOP_INFO } from '../data/shopData';
import { useAuth } from '../context/AuthContext';

interface FloatingActionsProps {
  onOpenAddModal?: () => void;
  onOpenLuckyWheel?: () => void;
}

export function FloatingActions({ onOpenAddModal, onOpenLuckyWheel }: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { currentUser, openLogin, openProfile } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Floating Actions (Bottom Right/Left in RTL) */}
      <div className="hidden sm:flex fixed bottom-6 left-6 z-40 flex-col gap-3">
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 flex items-center justify-center shadow-lg border border-zinc-700 transition-all duration-300"
            aria-label="الرجوع للأعلى"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Quick Add Product Floating Button (Store Owner only) */}
        {onOpenAddModal && currentUser?.role === 'admin' && (
          <button
            type="button"
            onClick={onOpenAddModal}
            className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 shadow-xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer animate-bounce border-2 border-amber-300"
            aria-label="إضافة منتج جديد (صاحب المحل)"
          >
            <Plus className="w-7 h-7 stroke-[3]" />
            <span className="absolute left-16 opacity-0 group-hover:opacity-100 bg-zinc-900 text-amber-400 border border-amber-500/40 text-xs font-black py-1.5 px-3 rounded-xl whitespace-nowrap shadow-2xl transition-all pointer-events-none">
              👑 + إضافة منتج (صاحب المحل)
            </span>
          </button>
        )}

        {/* Lucky Wheel Floating Button */}
        {onOpenLuckyWheel && (
          <button
            type="button"
            onClick={onOpenLuckyWheel}
            className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-zinc-950 shadow-xl shadow-amber-500/40 hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-amber-300"
            aria-label="عجلة الحظ والخصومات"
          >
            <RotateCw className="w-6 h-6 stroke-[2.5] group-hover:rotate-180 transition-transform duration-700" />
            <span className="absolute left-16 opacity-0 group-hover:opacity-100 bg-zinc-900 text-amber-400 border border-amber-500/40 text-xs font-black py-1.5 px-3 rounded-xl whitespace-nowrap shadow-2xl transition-all pointer-events-none">
              🎡 عجلة الحظ والخصومات (العب واكسب)
            </span>
          </button>
        )}

        <a
          href={`tel:${SHOP_INFO.phone}`}
          className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-xl shadow-amber-500/30 transition-all active:scale-95"
          aria-label="اتصال هاتفي"
        >
          <Phone className="w-6 h-6 animate-pulse" />
          <span className="absolute left-16 opacity-0 group-hover:opacity-100 bg-zinc-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg border border-zinc-700 whitespace-nowrap shadow-xl transition-all pointer-events-none">
            اتصل بنا: {SHOP_INFO.phone}
          </span>
        </a>

        {/* Facebook Page Button */}
        <a
          href={SHOP_INFO.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white shadow-xl shadow-blue-950/50 transition-all active:scale-95 border border-blue-400/40"
          aria-label="صفحة فيسبوك أسامة موسى"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          <span className="absolute left-16 opacity-0 group-hover:opacity-100 bg-zinc-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg border border-zinc-700 whitespace-nowrap shadow-xl transition-all pointer-events-none">
            صفحتنا على فيسبوك
          </span>
        </a>

        <a
          href={SHOP_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/50 transition-all active:scale-95 glow-amber"
          aria-label="محادثة واتساب"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute left-16 opacity-0 group-hover:opacity-100 bg-zinc-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg border border-zinc-700 whitespace-nowrap shadow-xl transition-all pointer-events-none">
            محادثة واتساب: {SHOP_INFO.whatsapp}
          </span>
        </a>
      </div>

      {/* Mobile Floating Lucky Wheel Pill */}
      {onOpenLuckyWheel && (
        <button
          type="button"
          onClick={onOpenLuckyWheel}
          className="sm:hidden fixed bottom-18 left-3 z-40 px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-zinc-950 font-black text-xs shadow-xl shadow-amber-500/40 border border-amber-300 flex items-center gap-1.5 active:scale-95 animate-bounce"
        >
          <RotateCw className="w-3.5 h-3.5 stroke-[3]" />
          <span>عجلة الحظ 🎡</span>
        </button>
      )}

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 px-3 py-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          
          {/* 1. Item 1: If Owner => Add Product (+ منتج), Else => Location */}
          {currentUser?.role === 'admin' && onOpenAddModal ? (
            <button
              type="button"
              onClick={onOpenAddModal}
              className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-gradient-to-t from-amber-500 to-yellow-400 text-zinc-950 font-black shadow-md active:scale-95 cursor-pointer"
            >
              <Plus className="w-5 h-5 mb-0.5 stroke-[3]" />
              <span className="text-[10px] font-black">+ منتج</span>
            </button>
          ) : (
            <a
              href="#location"
              className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-zinc-900 text-zinc-200 font-bold border border-zinc-800"
            >
              <MapPin className="w-4 h-4 mb-0.5 text-amber-400" />
              <span className="text-[10px]">الموقع</span>
            </a>
          )}

          {/* 2. Direct Call */}
          <a
            href={`tel:${SHOP_INFO.phone}`}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-zinc-900 text-amber-400 font-bold border border-zinc-800"
          >
            <Phone className="w-4 h-4 mb-0.5 fill-current" />
            <span className="text-[10px] font-bold">اتصال</span>
          </a>

          {/* 3. WhatsApp */}
          <a
            href={SHOP_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-emerald-600 text-white font-bold"
          >
            <MessageSquare className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">واتساب</span>
          </a>

          {/* 4. Catalog */}
          <a
            href="#catalog"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-zinc-900 text-zinc-200 font-bold border border-zinc-800"
          >
            <Sparkles className="w-4 h-4 mb-0.5 text-amber-400" />
            <span className="text-[10px]">المعرض</span>
          </a>

          {/* 5. Account / Profile */}
          <button
            type="button"
            onClick={currentUser ? openProfile : openLogin}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-zinc-900 text-zinc-200 font-bold border border-zinc-800 cursor-pointer active:scale-95"
          >
            {currentUser?.role === 'admin' ? (
              <Crown className="w-4 h-4 mb-0.5 text-amber-400" />
            ) : currentUser ? (
              <User className="w-4 h-4 mb-0.5 text-emerald-400" />
            ) : (
              <LogIn className="w-4 h-4 mb-0.5 text-amber-400" />
            )}
            <span className="text-[10px]">{currentUser ? 'حسابي' : 'دخول'}</span>
          </button>

        </div>
      </div>
    </>
  );
}
