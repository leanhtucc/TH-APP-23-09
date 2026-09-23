import type { ImageSourcePropType } from 'react-native';


export type SubjectIcon = 'mobile' | 'database' | 'design' | 'network';

export interface Student {
  id: string;
  fullName: string;
  studentCode: string;
  greeting: string;
  avatar?: ImageSourcePropType | string;
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
