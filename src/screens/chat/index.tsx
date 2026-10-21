import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO Phase 5: Xây dựng màn hình Chat — nội dung trò chuyện
const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>💬 Màn hình Chat — TODO</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f5f7' },
  text: { fontSize: 16, color: '#0068ff' },
});

export default ChatScreen;
