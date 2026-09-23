import React, { useMemo, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { HomeScreenProps } from '../../types/navigation';
import {
  mockStudent,
  mockSubjects,
  mockStatistics,
  normalizeVietnamese,
} from '../../data/studentData';
import {
  StudentHeader,
  WelcomeBanner,
  StatCard,
  SearchBar,
  SubjectCard,
  BottomTabBar,
  type TabKey,
} from '../../components/student';

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const filteredSubjects = useMemo(() => {
    const cleanQuery = normalizeVietnamese(searchQuery);
    if (!cleanQuery) {
      return mockSubjects;
    }
    return mockSubjects.filter((subject) => {
      const normalizedName = normalizeVietnamese(subject.name);
      const normalizedDesc = normalizeVietnamese(subject.description);
      return (
        normalizedName.includes(cleanQuery) ||
        normalizedDesc.includes(cleanQuery)
      );
    });
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      <StudentHeader student={mockStudent} />

      <View style={styles.contentWrapper}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <WelcomeBanner />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tổng quan học tập</Text>
              <Text style={styles.sectionSubtitle}>Dữ liệu học kỳ hiện tại</Text>
            </View>

            <View style={styles.statsRow}>
              <StatCard
                title="Tổng số môn"
                value={mockStatistics.totalSubjects}
                icon="📚"
                color="#0068ff"
              />
              <StatCard
                title="Số bài tập"
                value={mockStatistics.totalAssignments}
                icon="📝"
                color="#f59e0b"
              />
              <StatCard
                title="Đã hoàn thành"
                value={mockStatistics.completedSubjects}
                icon="✅"
                color="#10b981"
              />
            </View>

            <View style={styles.subjectsSectionHeader}>
              <View style={styles.titleWithBadge}>
                <Text style={styles.sectionTitle}>Môn học của tôi</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{filteredSubjects.length}</Text>
                </View>
              </View>
              <Text style={styles.sectionSubtitle}>
                {searchQuery.trim()
                  ? `Kết quả tìm kiếm cho "${searchQuery.trim()}"`
                  : 'Theo dõi tiến độ bài học'}
              </Text>
            </View>

            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Tìm kiếm môn học..."
            />

            {filteredSubjects.length > 0 ? (
              <View style={styles.subjectsList}>
                {filteredSubjects.map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} />
                ))}
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyTitle}>Không tìm thấy môn học</Text>
                <Text style={styles.emptyDesc}>
                  Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra lại chính tả.
                </Text>
              </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>

      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
    backgroundColor: '#f8fafc',
    flexGrow: 1,
  },
  sectionHeader: {
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  subjectsSectionHeader: {
    marginTop: 6,
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countBadge: {
    backgroundColor: '#e0edff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0068ff',
  },
  subjectsList: {
    gap: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
    marginTop: 4,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  emptyDesc: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default HomeScreen;
