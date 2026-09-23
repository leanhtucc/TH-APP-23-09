import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import type { StudentHomeScreenProps } from '../types/navigation';
import {
  mockStudent,
  mockSubjects,
  mockStatistics,
} from '../data/studentData';

/**
 * Skeleton màn hình Trang chủ Quản lý sinh viên (Phase 1)
 * Chuẩn bị kiến trúc và kiểm tra dữ liệu mock trước khi dựng giao diện chi tiết ở Phase 2-5.
 */
export const StudentHomeScreen: React.FC<StudentHomeScreenProps> = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Tiêu đề màn hình */}
        <Text style={styles.screenTitle}>Quản lý sinh viên</Text>
        <Text style={styles.phaseBadge}>Phase 1: Architecture & Data Skeleton</Text>

        {/* Khối kiểm tra thông tin sinh viên */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Thông tin sinh viên (Mock Data)</Text>
          <Text style={styles.infoRow}>
            • Lời chào: <Text style={styles.infoValue}>{mockStudent.greeting}</Text>
          </Text>
          <Text style={styles.infoRow}>
            • Họ và tên: <Text style={styles.infoValue}>{mockStudent.fullName}</Text>
          </Text>
          <Text style={styles.infoRow}>
            • Mã sinh viên: <Text style={styles.infoValue}>{mockStudent.studentCode}</Text>
          </Text>
        </View>

        {/* Khối kiểm tra số liệu môn học & thống kê */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dữ liệu học tập & Thống kê</Text>
          <Text style={styles.infoRow}>
            • Tổng số môn học: <Text style={styles.infoValue}>{mockStatistics.totalSubjects}</Text> môn
          </Text>
          <Text style={styles.infoRow}>
            • Tổng số bài tập: <Text style={styles.infoValue}>{mockStatistics.totalAssignments}</Text> bài
          </Text>
          <Text style={styles.infoRow}>
            • Số môn đã hoàn thành: <Text style={styles.infoValue}>{mockStatistics.completedSubjects}</Text> môn
          </Text>
        </View>

        {/* Danh sách môn học mẫu để kiểm chứng */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Danh sách môn học ({mockSubjects.length} môn)</Text>
          {mockSubjects.map((subject) => (
            <View key={subject.id} style={styles.subjectItem}>
              <Text style={styles.subjectName}>- {subject.name}</Text>
              <Text style={styles.subjectProgress}>
                {subject.completedLessons}/{subject.totalLessons} bài ({subject.assignmentCount} bài tập)
              </Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 14,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  phaseBadge: {
    fontSize: 13,
    color: '#0068ff',
    fontWeight: '600',
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingBottom: 6,
  },
  infoRow: {
    fontSize: 14,
    color: '#4b5563',
  },
  infoValue: {
    fontWeight: '600',
    color: '#111827',
  },
  subjectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  subjectName: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  subjectProgress: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default StudentHomeScreen;
