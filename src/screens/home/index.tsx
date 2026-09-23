/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { HomeScreenProps } from '../../types/navigation';
import THoiTietHientai from '../../components/THoiTietHientai';
import ThoiTietTheoGio from '../../components/ThoiTietTheoGio';
import ThoiTietTheoNgay from '../../components/ThoiTietTheoNgay';
import { weatherData } from '../../data/weather';
import { images } from '../../../assets';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground style={{ flex: 1 }} source={images.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Phần 1: Thời tiết hiện tại */}
          <View style={styles.viewThoiTietHienTai}>
            <THoiTietHientai data={weatherData.current} />
          </View>

          {/* Phần 2: Dự báo theo giờ - Cuộn theo hàng ngang */}
          <View style={styles.viewThoiTietTheoGio}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>🕒 DỰ BÁO THEO GIỜ</Text>
              <Text style={styles.subHint}>Cuộn ngang ›</Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {weatherData.hourly.map((item, index) => (
                <ThoiTietTheoGio key={index} data={item} />
              ))}
            </ScrollView>
          </View>

          {/* Phần 3: Dự báo các ngày tới - Cuộn theo hàng dọc */}
          <View style={styles.viewThoiTietTheoNgay}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>📅 DỰ BÁO 8 NGÀY TỚI</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
                <Text style={styles.accountLink}>👤 Cá nhân</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.verticalScrollContent}
            >
              {weatherData.daily.map((item, index) => (
                <ThoiTietTheoNgay key={index} data={item} />
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    gap: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4b5563',
    letterSpacing: 0.5,
  },
  subHint: {
    fontSize: 12,
    color: '#9ca3af',
  },
  accountLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0068ff',
  },
  viewThoiTietHienTai: {
    // Thời tiết hiện tại hiển thị nổi bật ở đầu
  },
  viewThoiTietTheoGio: {
    // Dự báo theo giờ với Scroll ngang
  },
  horizontalScrollContent: {
    paddingVertical: 4,
    gap: 10,
  },
  viewThoiTietTheoNgay: {
    flex: 1, // Chiếm trọn không gian còn lại để cuộn dọc mượt mà
  },
  verticalScrollContent: {
    gap: 8,
    paddingBottom: 16,
  },
});

export default HomeScreen;
