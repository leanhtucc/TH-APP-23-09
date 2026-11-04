import { onValue, ref } from 'firebase/database';
import { db } from './firebase';
import { AppUser } from '../types/chat';

/** Danh sách người dùng đã đăng ký (không gồm bản thân) */
export const subscribeUsers = (
  myUid: string,
  cb: (users: AppUser[]) => void
): (() => void) =>
  onValue(ref(db, 'users'), (snap) => {
    const list: AppUser[] = [];
    snap.forEach((child) => {
      const v = child.val();
      if (child.key && child.key !== myUid && v) {
        list.push({
          uid: child.key,
          name: v.name ?? 'Người dùng',
          email: v.email ?? '',
          avatar: v.avatar,
        });
      }
    });
    list.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    cb(list);
  });
