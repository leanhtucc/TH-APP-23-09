import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO Phase 6: Xây dựng màn hình Danh bạ
const ContactsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>👥 Màn hình Danh bạ — TODO</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f5f7' },
  text: { fontSize: 16, color: '#0068ff' },
});

export default ContactsScreen;
