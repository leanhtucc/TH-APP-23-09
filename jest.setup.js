/* eslint-env jest */
// Mock Firebase + native modules để test chạy không cần mạng / thiết bị.
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
  getApps: jest.fn(() => []),
  getApp: jest.fn(() => ({})),
}));

jest.mock('firebase/auth', () => ({
  initializeAuth: jest.fn(() => ({ currentUser: null })),
  getAuth: jest.fn(() => ({ currentUser: null })),
  getReactNativePersistence: jest.fn(),
  onAuthStateChanged: jest.fn((_auth, cb) => {
    cb(null);
    return jest.fn();
  }),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(() => ({})),
  ref: jest.fn(),
  set: jest.fn(() => Promise.resolve()),
  get: jest.fn(() => Promise.resolve({ val: () => null })),
  update: jest.fn(() => Promise.resolve()),
  push: jest.fn(() => ({ key: 'k' })),
  query: jest.fn(),
  orderByKey: jest.fn(),
  onValue: jest.fn(() => jest.fn()),
  onDisconnect: jest.fn(() => ({ set: jest.fn(() => Promise.resolve()) })),
  serverTimestamp: jest.fn(() => ({ '.sv': 'timestamp' })),
  increment: jest.fn((n) => ({ '.sv': { increment: n } })),
}));

// lucide dùng .mjs (ESM) → thay bằng component rỗng khi test
jest.mock(
  'lucide-react-native',
  () =>
    new Proxy(
      {},
      { get: (_t, name) => (name === '__esModule' ? true : () => null) }
    )
);

jest.mock('@react-native-community/geolocation', () => ({
  __esModule: true,
  default: { getCurrentPosition: jest.fn() },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
  },
}));
