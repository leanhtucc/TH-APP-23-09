import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  name: string;
  phoneOrEmail: string;
}

interface AuthContextType {
  user: UserProfile | null;
  /** true khi đã đọc xong phiên đăng nhập đã lưu */
  ready: boolean;
  login: (phoneOrEmail: string, name?: string) => void;
  register: (name: string, phoneOrEmail: string) => void;
  logout: () => void;
}

const STORAGE_KEY = 'auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setUserState(JSON.parse(raw) as UserProfile);
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const setUser = useCallback((next: UserProfile | null) => {
    setUserState(next);
    if (next) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
    } else {
      AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
    }
  }, []);

  const login = useCallback(
    (phoneOrEmail: string, name?: string) => {
      const derivedName =
        name || (phoneOrEmail.includes('@') ? phoneOrEmail.split('@')[0] : phoneOrEmail);
      setUser({ name: derivedName, phoneOrEmail });
    },
    [setUser]
  );

  const register = useCallback(
    (name: string, phoneOrEmail: string) => setUser({ name, phoneOrEmail }),
    [setUser]
  );

  const logout = useCallback(() => setUser(null), [setUser]);

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
