/**
 * Types cho hệ thống Quản lý sinh viên (Bài thực hành 01)
 */

export type SubjectIcon = 'mobile' | 'database' | 'design' | 'network';

export interface Student {
  id: string;
  fullName: string;
  studentCode: string;
  greeting: string;
  avatar?: string;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  assignmentCount: number;
  icon: SubjectIcon;
  color: string;
}

export interface StudentStatistics {
  totalSubjects: number;
  totalAssignments: number;
  completedSubjects: number;
}
