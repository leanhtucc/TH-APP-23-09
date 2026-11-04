import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { ref, serverTimestamp, set } from 'firebase/database';
import { auth, db } from './firebase';
import { setOffline } from './presenceService';

/** Chuyển mã lỗi Firebase sang thông báo tiếng Việt */
export const mapAuthError = (error: unknown): string => {
  const code = (error as { code?: string })?.code ?? '';
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
    case 'auth/invalid-login-credentials':
      return 'Sai email hoặc mật khẩu';
    case 'auth/invalid-email':
      return 'Email không hợp lệ';
    case 'auth/email-already-in-use':
      return 'Email này đã được sử dụng';
    case 'auth/weak-password':
      return 'Mật khẩu quá yếu (tối thiểu 6 ký tự)';
    case 'auth/network-request-failed':
      return 'Không có kết nối mạng. Vui lòng thử lại';
    case 'auth/too-many-requests':
      return 'Bạn thử quá nhiều lần. Vui lòng đợi một lát';
    case 'auth/user-disabled':
      return 'Tài khoản đã bị vô hiệu hoá';
    default:
      return 'Đã có lỗi xảy ra. Vui lòng thử lại';
  }
};

export const registerUser = async (name: string, email: string, password: string) => {
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
  await updateProfile(cred.user, { displayName: name.trim() });
  await set(ref(db, `users/${cred.user.uid}`), {
    uid: cred.user.uid,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    createdAt: serverTimestamp(),
  });
  return cred.user;
};

export const loginUser = async (email: string, password: string) => {
  const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
  return cred.user;
};

export const logoutUser = async () => {
  const uid = auth.currentUser?.uid;
  if (uid) {
    // Đánh dấu offline trước khi mất quyền ghi
    await setOffline(uid).catch(() => {});
  }
  await signOut(auth);
};
