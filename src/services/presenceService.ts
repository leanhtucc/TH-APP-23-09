import { AppState } from 'react-native';
import { onDisconnect, onValue, ref, serverTimestamp, set } from 'firebase/database';
import { db } from './firebase';

const statusRef = (uid: string) => ref(db, `status/${uid}`);

export const setOnline = (uid: string) =>
  set(statusRef(uid), { online: true, lastSeen: serverTimestamp() });

export const setOffline = (uid: string) =>
  set(statusRef(uid), { online: false, lastSeen: serverTimestamp() });

/**
 * Bật theo dõi online của chính mình:
 * - onDisconnect: server tự đặt offline khi mất kết nối / tắt app
 * - AppState: nền → offline, quay lại → online
 * Trả về hàm cleanup.
 */
export const startPresence = (uid: string): (() => void) => {
  const connectedRef = ref(db, '.info/connected');
  let appActive = AppState.currentState === 'active';

  const unsubConn = onValue(connectedRef, (snap) => {
    if (snap.val() !== true) return;
    onDisconnect(statusRef(uid))
      .set({ online: false, lastSeen: serverTimestamp() })
      .then(() => (appActive ? setOnline(uid) : undefined))
      .catch(() => {});
  });

  const sub = AppState.addEventListener('change', (state) => {
    appActive = state === 'active';
    (appActive ? setOnline(uid) : setOffline(uid)).catch(() => {});
  });

  return () => {
    unsubConn();
    sub.remove();
  };
};

/** Lắng nghe online của một người */
export const subscribeStatus = (uid: string, cb: (online: boolean) => void): (() => void) =>
  onValue(statusRef(uid), (snap) => cb(!!snap.val()?.online));

/** Lắng nghe online của tất cả người dùng: { uid: boolean } */
export const subscribeAllStatus = (
  cb: (map: Record<string, boolean>) => void
): (() => void) =>
  onValue(ref(db, 'status'), (snap) => {
    const map: Record<string, boolean> = {};
    snap.forEach((child) => {
      map[child.key as string] = !!child.val()?.online;
    });
    cb(map);
  });
