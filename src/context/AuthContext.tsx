import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import {
  loginUser,
  logoutUser,
  mapAuthError,
  registerUser,
} from '../services/authService';
import { startPresence } from '../services/presenceService';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: UserProfile | null;
  /** true khi Firebase đã khôi phục xong phiên đăng nhập */
  ready: boolean;
  /** Ném Error với thông báo tiếng Việt khi thất bại */
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const email = fbUser.email ?? '';
        setUser({
          uid: fbUser.uid,
          email,
          name: fbUser.displayName || email.split('@')[0],
        });
      } else {
        setUser(null);
      }
      setReady(true);
    });
    return unsub;
  }, []);

  // Báo online/offline khi đã đăng nhập
  const uid = user?.uid;
  useEffect(() => {
    if (!uid) return;
    return startPresence(uid);
  }, [uid]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      await loginUser(email, password);
    } catch (e) {
      throw new Error(mapAuthError(e));
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const fbUser = await registerUser(name, email, password);
      // displayName chỉ có sau updateProfile → cập nhật lại state
      setUser({ uid: fbUser.uid, email: fbUser.email ?? email, name: name.trim() });
    } catch (e) {
      throw new Error(mapAuthError(e));
    }
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
  }, []);

  const value = useMemo(
    () => ({ user, ready, login, register, logout }),
    [user, ready, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
