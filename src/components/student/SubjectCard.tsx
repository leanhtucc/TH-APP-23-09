import React from 'react';
import {
  DimensionValue,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { Subject, SubjectIcon } from '../../types/student';
import {
  calculateProgress,
  isSubjectCompleted,
} from '../../data/studentData';

export interface SubjectCardProps {
  subject: Subject;
  onPress?: () => void;
}

const getSubjectEmoji = (icon: SubjectIcon): string => {
  switch (icon) {
    case 'mobile':
      return '📱';
    case 'database':
      return '💾';
    case 'design':
      return '🎨';
    case 'network':
      return '🌐';
    default:
      return '📚';
  }
};

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onPress }) => {
  const completed = isSubjectCompleted(subject);
  const progress = calculateProgress(subject.completedLessons, subject.totalLessons);
  const progressWidth: DimensionValue = `${progress}%`;
  const iconEmoji = getSubjectEmoji(subject.icon);

  const iconWrapperStyle = { backgroundColor: `${subject.color}15` };
  const percentageStyle = completed
    ? styles.percentageCompleted
    : { color: subject.color };
  const progressFillStyle = {
    width: progressWidth,
    backgroundColor: completed ? '#10b981' : subject.color,
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Môn học ${subject.name}, tiến độ ${progress}%`}
    >
      <View style={styles.headerRow}>
        <View style={[styles.iconWrapper, iconWrapperStyle]}>
          <Text style={styles.iconText}>{iconEmoji}</Text>
        </View>

        <View style={styles.titleWrapper}>
          <Text style={styles.subjectName} numberOfLines={1} ellipsizeMode="tail">
            {subject.name}
          </Text>
          <Text style={styles.subjectDesc} numberOfLines={1} ellipsizeMode="tail">
            {subject.description}
          </Text>
        </View>

        {completed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>✓ Hoàn thành</Text>
          </View>
        )}
      </View>

      <View style={styles.progressInfoRow}>
        <Text style={styles.lessonsCountText}>
          {subject.completedLessons}/{subject.totalLessons} bài học
          <Text style={styles.assignmentCountText}> • {subject.assignmentCount} bài tập</Text>
        </Text>
        <Text style={[styles.percentageText, percentageStyle]}>
          {progress}% hoàn thành
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, progressFillStyle]} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 22,
  },
  titleWrapper: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2,
  },
  subjectDesc: {
    fontSize: 12,
    color: '#64748b',
  },
  completedBadge: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  completedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  progressInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonsCountText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
  assignmentCountText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '400',
  },
  percentageText: {
    fontSize: 13,
    fontWeight: '700',
  },
  percentageCompleted: {
    color: '#059669',
  },
  progressTrack: {
    height: 7,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});

export default SubjectCard;
