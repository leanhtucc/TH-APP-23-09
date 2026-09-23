import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { Student } from '../../types/student';

interface StudentHeaderProps {
  student: Student;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({ student }) => {
  const [imageError, setImageError] = useState(false);

  const handleNotificationPress = () => {
    Alert.alert('Thông báo', 'Bạn không có thông báo mới nào.');
  };

  const initialLetter = student.fullName.charAt(0).toUpperCase() || 'S';

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.greetingText}>{student.greeting},</Text>
        <Text style={styles.fullNameText} numberOfLines={1} ellipsizeMode="tail">
          {student.fullName}
        </Text>
        <View style={styles.codeBadge}>
          <Text style={styles.codeText}>MSSV: {student.studentCode}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.notificationButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleNotificationPress}
          hitSlop={10}
          accessibilityLabel="Thông báo"
          accessibilityRole="button"
        >
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.notificationDot} />
        </Pressable>

        <View style={styles.avatarWrapper}>
          {student.avatar && !imageError ? (
            <Image
              source={
                typeof student.avatar === 'string'
                  ? { uri: student.avatar }
                  : student.avatar
              }
              style={styles.avatarImage}
              resizeMode="cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarFallbackText}>{initialLetter}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  infoContainer: {
    flex: 1,
    paddingRight: 12,
  },
  greetingText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  fullNameText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginVertical: 2,
    letterSpacing: -0.3,
  },
  codeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 2,
  },
  codeText: {
    fontSize: 12,
    color: '#0068ff',
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  notificationIcon: {
    fontSize: 18,
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  avatarWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    borderWidth: 2,
    borderColor: '#0068ff',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0068ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallbackText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default StudentHeader;
