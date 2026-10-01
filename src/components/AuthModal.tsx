import React, { useState } from 'react';
import { 
  X, User, Lock, Phone, Mail, MapPin, Eye, EyeOff, ShieldCheck, 
  Sparkles, CheckCircle2, AlertCircle, ArrowLeft, KeyRound, 
  Crown, Smartphone, UserPlus, LogIn, HelpCircle, Gift
} from 'lucide-react';
import { useAuth, SEED_USERS } from '../context/AuthContext';
import { SHOP_INFO } from '../data/shopData';

export function AuthModal() {
  const { 
    isAuthModalOpen, 
    authModalMode, 
    closeAuthModal, 
    openLogin, 
    openRegister, 
    login, 
    register, 
    quickLogin 
  } = useAuth();

  // Mode: 'login' | 'register' | 'forgot'
  const [currentTab, setCurrentTab] = useState<'login' | 'register' | 'forgot'>(authModalMode);
  
  // Login fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register fields
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCity, setRegCity] = useState('مدينة الكردي');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regRole, setRegRole] = useState<'customer' | 'admin'>('customer');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);

  // Forgot password field
  const [forgotPhone, setForgotPhone] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Status feedback
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync tab with external trigger
  React.useEffect(() => {
    setCurrentTab(authModalMode);
    setErrorMessage('');
    setSuccessMessage('');
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!loginIdentifier.trim()) {
      setErrorMessage('يرجى إدخال رقم الهاتف أو البريد الإلكتروني');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const res = login(loginIdentifier, loginPassword);
      if (!res.success) {
        setErrorMessage(res.message);
      } else {
        setSuccessMessage(res.message);
        setTimeout(() => closeAuthModal(), 1200);
      }
    }, 400);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regName.trim()) {
      setErrorMessage('يرجى كتابة الاسم بالكامل');
      return;
    }
    if (!regPhone.trim() || regPhone.trim().length < 10) {
      setErrorMessage('يرجى كتابة رقم هاتف مصري صحيح (11 رقماً)');
      return;
    }
    if (regPassword.length < 3) {
      setErrorMessage('كلمة المرور يجب ألا تقل عن 3 أحرف/أرقام');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('كلمتا المرور غير متطابقتين، يرجى التأكد منهما');
      return;
    }
    if (!acceptTerms) {
      setErrorMessage('يرجى الموافقة على شروط وضمانات المحل وسياسة الخصوصية');
      return;
    }
    if (regRole === 'admin' && adminPasscode.trim() !== '01003075071' && adminPasscode.trim() !== '1234') {
      setErrorMessage('كود الصلاحية الإدارية غير صحيح! تواصل مع أسامة موسى للحصول عليه.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const res = register({
        name: regName,
        phone: regPhone,
        email: regEmail,
        city: regCity,
        password: regPassword,
        role: regRole
      });

      if (!res.success) {
        setErrorMessage(res.message);
      } else {
        setSuccessMessage(res.message);
        setTimeout(() => closeAuthModal(), 1500);
      }
    }, 450);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPhone.trim()) {
      setErrorMessage('يرجى إدخال رقم هاتفك المسجل لاستعادة الحساب');
      return;
    }
    setForgotSent(true);
    setSuccessMessage('تم إرسال رابط تأكيد وتعيين كلمة المرور عبر رسائل الواتساب والـ SMS لرقمك بنجاح!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-zinc-900 border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-6 transition-all"
        dir="rtl"
      >
        {/* Glow ambient background element */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/90 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-amber-400">
                {currentTab === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>{currentTab === 'login' ? 'تسجيل الدخول' : currentTab === 'register' ? 'إنشاء حساب جديد' : 'استعادة كلمة المرور'}</span>
                <span className="text-[10px] text-zinc-950 bg-amber-400 font-bold px-2 py-0.5 rounded-full font-mono">
                  سليم النور فون
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                {currentTab === 'login' 
                  ? 'مرحباً بك! سجّل دخولك لمتابعة الصيانة والحصول على العروض والخصومات' 
                  : currentTab === 'register'
                  ? 'انضم لعائلة زبائن سليم النور فون واحصل على 50 نقطة ولاء ترحيبية فوراً'
                  : 'أدخل رقم هاتفك وسنساعدك فوراً لاستعادة حسابك'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeAuthModal}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher (Login vs Register) */}
        {currentTab !== 'forgot' && (
          <div className="p-4 pb-0 bg-zinc-950/60 border-b border-zinc-800/80">
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-zinc-900 border border-zinc-800">
              <button
                type="button"
                onClick={() => {
                  setCurrentTab('login');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  currentTab === 'login'
                    ? 'bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>تسجيل الدخول</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentTab('register');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  currentTab === 'register'
                    ? 'bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>إنشاء حساب جديد</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded-full font-mono">
                  هدية 50ن
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Feedback Alert Banners */}
        <div className="px-6 pt-4">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs font-bold flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* Modal Body Container */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* ========================================================
              TAB 1: LOGIN FORM
          ======================================================== */}
          {currentTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Phone or Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-200 flex items-center justify-between">
                  <span>رقم الهاتف أو البريد الإلكتروني: *</span>
                  <span className="text-[11px] text-amber-400 font-normal">01xxxxxxxxx</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="أدخل رقم هاتفك (مثال: 01003075071)"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl pr-10 pl-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all"
                    required
                  />
                  <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                </div>
              </div>

              {/* Password Input with Show/Hide */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-200">كلمة المرور: *</label>
                  <button
                    type="button"
                    onClick={() => setCurrentTab('forgot')}
                    className="text-xs text-amber-400 hover:text-amber-300 underline cursor-pointer"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="أدخل كلمة المرور"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl pr-10 pl-10 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all"
                    required
                  />
                  <Lock className="absolute right-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-3.5 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me option */}
              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
                  />
                  <span>تذكر بيانات دخولي على هذا الجهاز</span>
                </label>
                <span className="text-[11px] text-zinc-500">حماية مشفرة 100%</span>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>جاري التحقق وتسجيل الدخول...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 stroke-[3]" />
                    <span>تسجيل الدخول الآن</span>
                  </>
                )}
              </button>

              {/* 1-Click Fast Demo Logins Section */}
              <div className="pt-4 border-t border-zinc-800 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>دخول سريع بنقرة واحدة (حسابات تجريبية):</span>
                  </span>
                  <span>دون الحاجة لكتابة كلمة سر</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Osama Mousa Admin Button */}
                  <button
                    type="button"
                    onClick={() => quickLogin('user-admin')}
                    className="p-3 rounded-xl bg-zinc-950 border border-amber-500/40 hover:border-amber-400 hover:bg-zinc-850 text-right transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                        <Crown className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-amber-300">أسامة موسى</p>
                        <p className="text-[10px] text-amber-400">مدير المحل (صلاحيات كاملة)</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                      دخول 👑
                    </span>
                  </button>

                  {/* Customer Demo Button */}
                  <button
                    type="button"
                    onClick={() => quickLogin('user-customer')}
                    className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 text-right transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-zinc-200">أحمد السعيد</p>
                        <p className="text-[10px] text-zinc-400">عميل وزبون المحل</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full font-bold">
                      دخول 👤
                    </span>
                  </button>
                </div>
              </div>

              {/* Switch to Register link */}
              <div className="text-center pt-2 text-xs text-zinc-400">
                <span>ليس لديك حساب بعد؟ </span>
                <button
                  type="button"
                  onClick={() => setCurrentTab('register')}
                  className="font-bold text-amber-400 hover:underline cursor-pointer"
                >
                  أنشئ حسابك الجديد مجاناً واحصل على 50 نقطة هدية
                </button>
              </div>

            </form>
          )}

          {/* ========================================================
              TAB 2: REGISTER FORM
          ======================================================== */}
          {currentTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {/* Role Picker (Customer vs Management) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-200">نوع الحساب:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole('customer')}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex items-center gap-2.5 ${
                      regRole === 'customer'
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <User className={`w-4 h-4 ${regRole === 'customer' ? 'text-amber-400' : 'text-zinc-500'}`} />
                    <div>
                      <p className="text-xs font-bold">عميل / زبون المحل</p>
                      <p className="text-[10px] text-zinc-400">متابعة صيانة وهدايا ولاء</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegRole('admin')}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex items-center gap-2.5 ${
                      regRole === 'admin'
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Crown className={`w-4 h-4 ${regRole === 'admin' ? 'text-amber-400' : 'text-zinc-500'}`} />
                    <div>
                      <p className="text-xs font-bold">إدارة المحل والفنيين</p>
                      <p className="text-[10px] text-zinc-400">إضافة وتعديل المنتجات</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Admin passcode input if admin role is selected */}
              {regRole === 'admin' && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5 animate-in fade-in">
                  <label className="text-xs font-bold text-amber-300 flex items-center justify-between">
                    <span>رمز التفعيل الإداري الخاص بالمحل: *</span>
                    <span className="text-[10px] text-zinc-400">(كود تجريبي: 1234 أو 01003075071)</span>
                  </label>
                  <input
                    type="password"
                    placeholder="أدخل كود الإدارة السري"
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                    className="w-full bg-zinc-950 border border-amber-500/40 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none"
                    required
                  />
                </div>
              )}

              {/* Full Name & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-200">الاسم بالكامل: *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="مثال: محمد أحمد علي"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl pr-9 pl-3 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all"
                      required
                    />
                    <User className="absolute right-3 top-3 w-4 h-4 text-zinc-500" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-200">رقم الهاتف (واتساب): *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="مثال: 01003075071"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl pr-9 pl-3 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all"
                      required
                    />
                    <Phone className="absolute right-3 top-3 w-4 h-4 text-zinc-500" />
                  </div>
                </div>
              </div>

              {/* Email & City Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-200">البريد الإلكتروني (اختياري):</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl pr-9 pl-3 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all"
                    />
                    <Mail className="absolute right-3 top-3 w-4 h-4 text-zinc-500" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-200">المدينة أو المركز:</label>
                  <div className="relative">
                    <select
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl pr-9 pl-3 py-2.5 text-xs sm:text-sm text-zinc-100 outline-none cursor-pointer"
                    >
                      <option value="مدينة الكردي" className="bg-zinc-900">مدينة الكردي</option>
                      <option value="المنية - النصر" className="bg-zinc-900">المنية والنصر</option>
                      <option value="ميت سلسيل" className="bg-zinc-900">ميت سلسيل</option>
                      <option value="دكرنس" className="bg-zinc-900">دكرنس</option>
                      <option value="المنزلة والمطرية" className="bg-zinc-900">المنزلة والمطرية</option>
                      <option value="المنصورة / محافظة الدقهلية" className="bg-zinc-900">المنصورة / أخرى</option>
                    </select>
                    <MapPin className="absolute right-3 top-3 w-4 h-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-200">كلمة المرور: *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="أدخل كلمة المرور"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl pr-9 pl-9 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none"
                      required
                    />
                    <Lock className="absolute right-3 top-3 w-4 h-4 text-zinc-500" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-200">تأكيد كلمة المرور: *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="أعد كتابة كلمة المرور"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl pr-9 pl-3 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none"
                      required
                    />
                    <Lock className="absolute right-3 top-3 w-4 h-4 text-zinc-500" />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 space-y-2">
                <label className="flex items-start gap-2.5 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded accent-amber-500 cursor-pointer shrink-0"
                  />
                  <span className="leading-relaxed">
                    أوافق على شروط وضمانات <strong className="text-amber-400">سليم النور فون</strong> وحماية سرية بيانات الهاتف والخصوصية التامة.
                  </span>
                </label>

                <div className="flex items-center gap-2 text-[11px] text-amber-400 font-bold pr-6">
                  <Gift className="w-3.5 h-3.5" />
                  <span>ستحصل فوراً على 50 نقطة ولاء مجانية في محفظتك لاستخدامها في الخصومات!</span>
                </div>
              </div>

              {/* Register Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>جاري إنشاء الحساب ومنح نقاط الولاء...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 stroke-[3]" />
                    <span>تأكيد وإنشاء الحساب الآن (مجاناً)</span>
                  </>
                )}
              </button>

              {/* Switch to Login */}
              <div className="text-center pt-2 text-xs text-zinc-400">
                <span>لديك حساب بالفعل؟ </span>
                <button
                  type="button"
                  onClick={() => setCurrentTab('login')}
                  className="font-bold text-amber-400 hover:underline cursor-pointer"
                >
                  سجّل دخولك هنا
                </button>
              </div>

            </form>
          )}

          {/* ========================================================
              TAB 3: FORGOT PASSWORD
          ======================================================== */}
          {currentTab === 'forgot' && (
            <div className="space-y-4">
              {!forgotSent ? (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
                    أدخل رقم الهاتف المسجل لدينا في سليم النور فون، وسنرسل لك كود التحقق ورابط إعادة تعيين كلمة المرور فوراً عبر الواتساب ورسائل المحمول.
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-200">رقم الهاتف المسجل: *</label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="01003075071"
                        value={forgotPhone}
                        onChange={(e) => setForgotPhone(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl pr-10 pl-4 py-3 text-sm text-zinc-100 outline-none"
                        required
                      />
                      <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4 stroke-[3]" />
                    <span>إرسال كود الاستعادة</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentTab('login')}
                    className="w-full py-2.5 text-xs text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>العودة لصفحة تسجيل الدخول</span>
                  </button>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-zinc-950 border border-emerald-500/40 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">تم إرسال كود الاستعادة بنجاح!</h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      تفقد رسائل الواتساب أو الرسائل القصيرة على رقم <strong className="text-amber-400" dir="ltr">{forgotPhone}</strong> لإكمال تعيين كلمة المرور الجديدة.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={`https://wa.me/201003075071?text=${encodeURIComponent('السلام عليكم أ. أسامة، أود المساعدة في استعادة كلمة المرور لرقمي: ' + forgotPhone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>تواصل مع الإدارة عبر واتساب للمساعدة الفورية</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setForgotSent(false);
                        setCurrentTab('login');
                      }}
                      className="py-2.5 text-xs text-zinc-400 hover:text-white"
                    >
                      العودة لتسجيل الدخول
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer Note */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 text-center text-[11px] text-zinc-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>بياناتك الشخصية مشفرة ومحفوظة بأعلى درجات الأمانة - سليم النور فون بالكردي</span>
        </div>

      </div>
    </div>
  );
}
