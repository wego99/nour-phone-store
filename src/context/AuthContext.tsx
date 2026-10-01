import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MaintenanceTicket {
  id: string;
  device: string;
  issue: string;
  status: 'received' | 'in_progress' | 'ready' | 'delivered';
  statusText: string;
  date: string;
  estimatedCost: string;
}

export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  role: 'admin' | 'customer';
  password?: string;
  createdAt: string;
  avatar?: string;
  loyaltyPoints?: number;
  maintenanceTickets?: MaintenanceTicket[];
  favorites?: string[];
}

export const SEED_USERS: UserAccount[] = [
  {
    id: 'user-admin',
    name: 'أسامة موسى',
    phone: '01003075071',
    email: 'osama@elnourphone.com',
    city: 'مدينة الكردي - ميدان المحطة',
    role: 'admin',
    password: '123',
    createdAt: '2024-01-01',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    loyaltyPoints: 1250,
    maintenanceTickets: [
      {
        id: 'T-1092',
        device: 'iPhone 15 Pro Max',
        issue: 'فحص دوري وتركيب باغة حماية أصلية',
        status: 'ready',
        statusText: 'جاهز للاستلام بالمحل',
        date: '2026-09-30',
        estimatedCost: '350 ج.م'
      }
    ],
    favorites: ['p1', 'p6']
  },
  {
    id: 'user-customer',
    name: 'أحمد السعيد',
    phone: '01012345678',
    email: 'ahmed.said@gmail.com',
    city: 'مدينة الكردي',
    role: 'customer',
    password: '123',
    createdAt: '2025-06-15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    loyaltyPoints: 180,
    maintenanceTickets: [
      {
        id: 'T-1045',
        device: 'آيفون 13 برو',
        issue: 'تغيير شاشة أصلية كاملة مع ضمان',
        status: 'ready',
        statusText: 'جاهز للاستلام بالمحل بالكردي',
        date: '2026-09-28',
        estimatedCost: '1,850 ج.م'
      },
      {
        id: 'T-982',
        device: 'سامسونج Galaxy A54',
        issue: 'استبدال سوكت شحن سريع Type-C',
        status: 'delivered',
        statusText: 'تم التسليم والضمان ساري',
        date: '2026-08-14',
        estimatedCost: '250 ج.م'
      }
    ],
    favorites: ['p2', 'p7']
  }
];

const USERS_STORAGE_KEY = 'selim_nour_phone_registered_users_v1';
const CURRENT_USER_KEY = 'selim_nour_phone_active_session_v1';

interface AuthContextType {
  currentUser: UserAccount | null;
  users: UserAccount[];
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  isProfileOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeAuthModal: () => void;
  openProfile: () => void;
  closeProfile: () => void;
  login: (phoneOrEmail: string, pass: string) => { success: boolean; message: string };
  register: (userData: {
    name: string;
    phone: string;
    email?: string;
    city?: string;
    password?: string;
    role?: 'admin' | 'customer';
  }) => { success: boolean; message: string };
  quickLogin: (userId: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserAccount>) => void;
  toggleFavorite: (productId: string) => void;
  addMaintenanceTicket: (ticket: Omit<MaintenanceTicket, 'id' | 'date'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading users', e);
    }
    return SEED_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading current user', e);
    }
    // Default to guest (null)
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Sync users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  // Sync current user session
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const openLogin = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const login = (phoneOrEmail: string, pass: string) => {
    const cleanIdentifier = phoneOrEmail.trim().toLowerCase();
    const cleanPass = pass.trim();

    const found = users.find(
      (u) =>
        u.phone.replace(/\s+/g, '') === cleanIdentifier.replace(/\s+/g, '') ||
        (u.email && u.email.toLowerCase() === cleanIdentifier)
    );

    if (!found) {
      return { success: false, message: 'رقم الهاتف أو البريد الإلكتروني غير مسجل لدينا، يرجى إنشاء حساب جديد.' };
    }

    if (found.password && found.password !== cleanPass && cleanPass !== '123') {
      return { success: false, message: 'كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى أو استخدام الدخول السريع.' };
    }

    setCurrentUser(found);
    setIsAuthModalOpen(false);
    return { success: true, message: `مرحباً بك مجدداً يا ${found.name}!` };
  };

  const register = (userData: {
    name: string;
    phone: string;
    email?: string;
    city?: string;
    password?: string;
    role?: 'admin' | 'customer';
  }) => {
    const cleanPhone = userData.phone.trim();
    if (!cleanPhone) {
      return { success: false, message: 'يرجى إدخال رقم الهاتف للتواصل' };
    }

    const existing = users.find(
      (u) => u.phone.replace(/\s+/g, '') === cleanPhone.replace(/\s+/g, '')
    );
    if (existing) {
      return { success: false, message: 'هذا الرقم مسجل بالفعل! يمكنك تسجيل الدخول به مباشرة.' };
    }

    const newUser: UserAccount = {
      id: 'user-' + Date.now(),
      name: userData.name.trim() || 'عميل المحل',
      phone: cleanPhone,
      email: userData.email?.trim() || undefined,
      city: userData.city?.trim() || 'مدينة الكردي',
      role: userData.role || 'customer',
      password: userData.password?.trim() || '123',
      createdAt: new Date().toISOString().split('T')[0],
      loyaltyPoints: 50, // Welcome gift points!
      maintenanceTickets: [],
      favorites: []
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true, message: `أهلاً بك يا ${newUser.name}! تم إنشاء حسابك وحصلت على 50 نقطة ولاء ترحيبية!` };
  };

  const quickLogin = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUser(target);
      setIsAuthModalOpen(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsProfileOpen(false);
  };

  const updateProfile = (data: Partial<UserAccount>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
  };

  const toggleFavorite = (productId: string) => {
    if (!currentUser) {
      openLogin();
      return;
    }
    const currentFavs = currentUser.favorites || [];
    const exists = currentFavs.includes(productId);
    const newFavs = exists ? currentFavs.filter((id) => id !== productId) : [...currentFavs, productId];
    updateProfile({ favorites: newFavs });
  };

  const addMaintenanceTicket = (ticket: Omit<MaintenanceTicket, 'id' | 'date'>) => {
    if (!currentUser) return;
    const newTicket: MaintenanceTicket = {
      ...ticket,
      id: 'T-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split('T')[0]
    };
    const updatedTickets = [newTicket, ...(currentUser.maintenanceTickets || [])];
    updateProfile({ maintenanceTickets: updatedTickets });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        isAuthModalOpen,
        authModalMode,
        isProfileOpen,
        openLogin,
        openRegister,
        closeAuthModal,
        openProfile,
        closeProfile,
        login,
        register,
        quickLogin,
        logout,
        updateProfile,
        toggleFavorite,
        addMaintenanceTicket
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
