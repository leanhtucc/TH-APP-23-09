import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const WelcomeBanner: React.FC = () => {
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.bannerTitle}>Tiếp tục hành trình học tập</Text>
        <Text style={styles.bannerDescription}>
          Quản lý môn học và theo dõi tiến độ của bạn mỗi ngày.
        </Text>
      </View>
      <View style={styles.illustrationContainer}>
        <Text style={styles.illustrationIcon}>🎓</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#0068ff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0068ff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  bannerDescription: {
    fontSize: 13,
    color: '#e0edff',
    lineHeight: 18,
  },
  illustrationContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationIcon: {
    fontSize: 24,
  },
});

export default WelcomeBanner;
