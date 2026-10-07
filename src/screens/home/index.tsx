/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { HomeScreenProps } from '../../types/navigation';
import THoiTietHientai from '../../components/THoiTietHientai';
import ThoiTietTheoGio from '../../components/ThoiTietTheoGio';
import ThoiTietTheoNgay from '../../components/ThoiTietTheoNgay';
import { weatherData } from '../../data/weather';
import { images } from '../../../assets';
import { styles } from './style';
export const HomeScreen: React.FC<HomeScreenProps> = ({ }) => {
  return (
    <ImageBackground style={{ flex: 1 }} source={images.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.viewThoiTietHienTai}>
            <THoiTietHientai data={weatherData.current} />
          </View>

          <View style={styles.viewThoiTietTheoGio}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>🕒 DỰ BÁO THEO GIỜ</Text>
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
          <View style={styles.viewThoiTietTheoNgay}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>📅 DỰ BÁO 8 NGÀY TỚI</Text>
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

export default HomeScreen;
