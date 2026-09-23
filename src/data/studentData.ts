import type { Student, Subject, StudentStatistics } from '../types/student';

export const mockStudent: Student = {
  id: '1',
  fullName: 'Nguyễn Trường Giang',
  studentCode: 'B21DCCN001',
  greeting: 'Xin chào',
  avatar: require('../../assets/avatar.png'),
};

export const mockSubjects: Subject[] = [
  {
    id: 'sub-1',
    name: 'Lập trình React Native',
    description: 'Phát triển ứng dụng di động',
    totalLessons: 24,
    completedLessons: 18,
    assignmentCount: 3,
    icon: 'mobile',
    color: '#6366f1',
  },
  {
    id: 'sub-2',
    name: 'Cơ sở dữ liệu',
    description: 'SQL và hệ quản trị cơ sở dữ liệu',
    totalLessons: 18,
    completedLessons: 18,
    assignmentCount: 4,
    icon: 'database',
    color: '#10b981',
  },
  {
    id: 'sub-3',
    name: 'Thiết kế UI/UX',
    description: 'Thiết kế giao diện người dùng',
    totalLessons: 20,
    completedLessons: 9,
    assignmentCount: 2,
    icon: 'design',
    color: '#f97316',
  },
  {
    id: 'sub-4',
    name: 'Mạng máy tính',
    description: 'Kiến thức về hệ thống mạng',
    totalLessons: 16,
    completedLessons: 8,
    assignmentCount: 3,
    icon: 'network',
    color: '#0068ff',
  },
];

export const calculateProgress = (completedLessons: number, totalLessons: number): number => {
  if (totalLessons <= 0) {
    return 0;
  }
  const progress = Math.round((completedLessons / totalLessons) * 100);
  return Math.min(100, Math.max(0, progress));
};

export const isSubjectCompleted = (subject: Subject): boolean => {
  return subject.totalLessons > 0 && subject.completedLessons >= subject.totalLessons;
};

export const normalizeVietnamese = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .trim();
};

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

export const mockStatistics: StudentStatistics = getStudentStatistics(mockSubjects);
