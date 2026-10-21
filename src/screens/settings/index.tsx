import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO Phase 8: Xây dựng màn hình Cài đặt — thông tin user + đăng xuất
const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>⚙️ Màn hình Cài đặt — TODO</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f5f7' },
  text: { fontSize: 16, color: '#0068ff' },
});

export default SettingsScreen;
