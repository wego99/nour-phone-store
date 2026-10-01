import React, { useState } from 'react';
import { 
  X, User, Phone, MapPin, Mail, Award, Clock, Wrench, 
  Crown, LogOut, Heart, ShieldCheck, Plus, Sparkles, CheckCircle2,
  AlertCircle, ChevronRight, Edit3, Save, Gift, ShoppingBag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SHOP_INFO } from '../data/shopData';

interface UserProfileModalProps {
  onOpenAddModal?: () => void;
}

export function UserProfileModal({ onOpenAddModal }: UserProfileModalProps) {
  const { currentUser, isProfileOpen, closeProfile, logout, updateProfile } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  React.useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.name);
      setEditCity(currentUser.city || 'مدينة الكردي');
      setEditEmail(currentUser.email || '');
    }
  }, [currentUser]);

  if (!isProfileOpen || !currentUser) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName.trim() || currentUser.name,
      city: editCity.trim() || currentUser.city,
      email: editEmail.trim() || undefined
    });
    setIsEditing(false);
    setStatusMessage('تم تحديث بيانات ملفك الشخصي بنجاح!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const isAdmin = currentUser.role === 'admin';
  const tickets = currentUser.maintenanceTickets || [];
  const points = currentUser.loyaltyPoints || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-zinc-900 border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-6"
        dir="rtl"
      >
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-zinc-950 via-zinc-900 to-amber-950/40 border-b border-zinc-800 relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 p-0.5 shadow-xl shadow-amber-500/20">
                  <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-amber-400 overflow-hidden font-black text-2xl">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      currentUser.name.charAt(0)
                    )}
                  </div>
                </div>
                {isAdmin ? (
                  <span className="absolute -bottom-1 -left-1 p-1 bg-amber-500 text-zinc-950 rounded-full shadow-md" title="مدير المحل">
                    <Crown className="w-4 h-4 fill-zinc-950" />
                  </span>
                ) : (
                  <span className="absolute -bottom-1 -left-1 p-1 bg-emerald-500 text-white rounded-full shadow-md" title="عميل مميز">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h3>
                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                    isAdmin ? 'bg-amber-400 text-zinc-950 shadow-sm' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {isAdmin ? '👑 مدير ومسؤول المحل' : '👤 عميل معتمد'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5" dir="ltr">
                  <span>{currentUser.phone}</span>
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                </p>
                <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{currentUser.city || 'مدينة الكردي'}</span>
                  <span className="text-[10px] text-zinc-500 mr-2">عضو منذ: {currentUser.createdAt}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeProfile}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {statusMessage && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 max-h-[72vh] overflow-y-auto space-y-6">
          
          {/* Loyalty & Rewards Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-zinc-950 to-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
            <div className="space-y-1 text-center sm:text-right">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Gift className="w-4 h-4" />
                <span>رصيد نقاط الولاء والمكافآت:</span>
              </div>
              <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                <span className="text-3xl font-black text-white font-mono">{points}</span>
                <span className="text-xs text-zinc-400">نقطة ذهبية</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                تمنحك كل 100 نقطة خصماً مباشراً بقيمة 30 ج.م على الإكسسوارات أو صيانة الشاشات!
              </p>
            </div>

            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <a
                href={SHOP_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <span>استبدال النقاط في المحل بالكردي</span>
              </a>
            </div>
          </div>

          {/* Admin Management Panel (If admin) */}
          {isAdmin && (
            <div className="p-5 rounded-2xl bg-zinc-950 border border-amber-500/40 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>لوحة التحكم والإدارة (صلاحيات أسامة موسى):</span>
                </h4>
                <span className="text-[11px] text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                  صلاحيات كاملة
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                بصفتك مديراً للمحل، يمكنك إضافة أجهزة جديدة للمعرض، تعديل الأسعار، ومراجعة سجلات الصيانة.
              </p>
              
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {onOpenAddModal && (
                  <button
                    type="button"
                    onClick={() => {
                      closeProfile();
                      onOpenAddModal();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>إضافة منتج أو هاتف للمعرض</span>
                  </button>
                )}

                <a
                  href="#catalog"
                  onClick={closeProfile}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>إدارة منتجات المعرض</span>
                </a>
              </div>
            </div>
          )}

          {/* Maintenance Tickets & Tracked Requests */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>أجهزتك في الصيانة والفحص ({tickets.length}):</span>
              </h4>
              <a
                href="#repair-estimator"
                onClick={closeProfile}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>حجز فحص جهاز جديد</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {tickets.length === 0 ? (
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-2">
                <Clock className="w-8 h-8 text-zinc-600 mx-auto" />
                <p className="text-xs text-zinc-400">لا توجد أجهزة قيد الصيانة حالياً باسمك.</p>
                <a
                  href="#repair-estimator"
                  onClick={closeProfile}
                  className="inline-block text-xs font-bold text-amber-400 hover:underline"
                >
                  افحص جهازك وقدّر وقت الصيانة الآن
                </a>
              </div>
            ) : (
              <div className="space-y-2.5">
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm hover:border-amber-500/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white">{t.device}</span>
                        <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded font-mono">
                          {t.id}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">{t.issue}</p>
                      <p className="text-[10px] text-zinc-500">تاريخ الطلب: {t.date} • التكلفة: {t.estimatedCost}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        t.status === 'ready'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : t.status === 'in_progress'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {t.statusText}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Edit Profile Info Section */}
          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                <span>البيانات الشخصية:</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'إلغاء التعديل' : 'تعديل البيانات'}</span>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-300">الاسم:</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-300">المدينة / المركز:</label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-300">البريد الإلكتروني:</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>حفظ التعديلات</span>
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 space-y-1">
                  <span className="text-zinc-500">رقم الهاتف الأساسي:</span>
                  <p className="font-bold text-white" dir="ltr">{currentUser.phone}</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 space-y-1">
                  <span className="text-zinc-500">المدينة:</span>
                  <p className="font-bold text-white">{currentUser.city || 'مدينة الكردي'}</p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-rose-950/80 border border-zinc-800 hover:border-rose-700 text-zinc-400 hover:text-rose-300 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>

          <button
            type="button"
            onClick={closeProfile}
            className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
}
