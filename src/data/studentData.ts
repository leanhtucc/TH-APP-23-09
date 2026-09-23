import type { Student, Subject, StudentStatistics } from '../types/student';

/**
 * Mock data cho sinh viên
 */
export const mockStudent: Student = {
  id: '1',
  fullName: 'Nguyễn Văn An',
  studentCode: 'B21DCCN001',
  greeting: 'Xin chào',
};

/**
 * Mock data cho danh sách môn học
 */
export const mockSubjects: Subject[] = [
  {
    id: 'sub-1',
    name: 'Lập trình React Native',
    description: 'Phát triển ứng dụng di động',
    totalLessons: 24,
    completedLessons: 18,
    assignmentCount: 3,
    icon: 'mobile',
    color: '#6366f1', // Tím xanh
  },
  {
    id: 'sub-2',
    name: 'Cơ sở dữ liệu',
    description: 'SQL và hệ quản trị cơ sở dữ liệu',
    totalLessons: 18,
    completedLessons: 18,
    assignmentCount: 4,
    icon: 'database',
    color: '#10b981', // Xanh lá
  },
  {
    id: 'sub-3',
    name: 'Thiết kế UI/UX',
    description: 'Thiết kế giao diện người dùng',
    totalLessons: 20,
    completedLessons: 9,
    assignmentCount: 2,
    icon: 'design',
    color: '#f97316', // Cam
  },
  {
    id: 'sub-4',
    name: 'Mạng máy tính',
    description: 'Kiến thức về hệ thống mạng',
    totalLessons: 16,
    completedLessons: 8,
    assignmentCount: 3,
    icon: 'network',
    color: '#0068ff', // Xanh dương
  },
];

/**
 * Tính phần trăm hoàn thành bài học an toàn (tránh chia cho 0)
 */
export const calculateProgress = (completedLessons: number, totalLessons: number): number => {
  if (totalLessons <= 0) {
    return 0;
  }
  const progress = Math.round((completedLessons / totalLessons) * 100);
  return Math.min(100, Math.max(0, progress));
};

/**
 * Kiểm tra xem môn học đã hoàn thành hay chưa
 */
export const isSubjectCompleted = (subject: Subject): boolean => {
  return subject.totalLessons > 0 && subject.completedLessons >= subject.totalLessons;
};

/**
 * Tính toán thống kê tổng quan của sinh viên từ danh sách môn học
 */
export const getStudentStatistics = (subjects: Subject[]): StudentStatistics => {
  const totalSubjects = subjects.length;
  const totalAssignments = subjects.reduce((sum, item) => sum + item.assignmentCount, 0);
  const completedSubjects = subjects.filter(isSubjectCompleted).length;

  return {
    totalSubjects,
    totalAssignments,
    completedSubjects,
  };
};

/**
 * Dữ liệu thống kê mặc định tính từ mockSubjects
 */
export const mockStatistics: StudentStatistics = getStudentStatistics(mockSubjects);
