import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { RegisterScreenProps } from '../../types/navigation';
import { useAuth } from '../../context/AuthContext';

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const { register } = useAuth();
    const [fullName, setFullName] = useState('');
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const canSubmit =
        fullName.trim().length > 0 &&
        account.trim().length > 0 &&
        password.length >= 6 &&
        confirmPassword.length >= 6;

    const handleRegister = () => {
        const trimmedName = fullName.trim();
        const trimmedAccount = account.trim();

        if (!trimmedName) {
            Alert.alert('Thông báo', 'Vui lòng nhập Tên Zalo của bạn');
            return;
        }

        if (!trimmedAccount) {
            Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại hoặc email');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Thông báo', 'Mật khẩu phải có tối thiểu 6 ký tự');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Thông báo', 'Mật khẩu xác nhận không trùng khớp');
            return;
        }

        register(trimmedName, trimmedAccount);

        Alert.alert('Thành công', 'Đăng ký tài khoản Zalo thành công!', [
            {
                text: 'Đăng nhập ngay',
                onPress: () => {
                    navigation.navigate('Login');
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.bannerBar}>
                    <Text style={styles.bannerText}>
                        Sử dụng tên thật và thông tin chính xác để bạn bè dễ dàng tìm thấy bạn trên Zalo
                    </Text>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.formContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Tên Zalo (Ví dụ: Minh Tuấn)"
                                placeholderTextColor="#8e8e93"
                                value={fullName}
                                onChangeText={setFullName}
                            />
                            {fullName.length > 0 && (
                                <TouchableOpacity
                                    style={styles.clearBtn}
                                    onPress={() => setFullName('')}
                                >
                                    <Text style={styles.clearBtnText}>✕</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Số điện thoại hoặc Email"
                                placeholderTextColor="#8e8e93"
                                value={account}
                                onChangeText={setAccount}
                                autoCapitalize="none"
                            />
                            {account.length > 0 && (
                                <TouchableOpacity
                                    style={styles.clearBtn}
                                    onPress={() => setAccount('')}
                                >
                                    <Text style={styles.clearBtnText}>✕</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                                placeholderTextColor="#8e8e93"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeBtn}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Text style={styles.eyeBtnText}>
                                    {showPassword ? 'ẨN' : 'HIỆN'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Nhập lại mật khẩu"
                                placeholderTextColor="#8e8e93"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showPassword}
                            />
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.zaloButton,
                                canSubmit ? styles.zaloButtonActive : styles.zaloButtonDisabled,
                            ]}
                            onPress={handleRegister}
                            disabled={!canSubmit}
                        >
                            <Text
                                style={[
                                    styles.zaloButtonText,
                                    canSubmit ? styles.zaloButtonTextActive : styles.zaloButtonTextDisabled,
                                ]}
                            >
                                Tiếp tục
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.loginRow}>
                            <Text style={styles.loginRowText}>Đã có tài khoản? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.loginLink}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    keyboardView: {
        flex: 1,
    },
    bannerBar: {
        backgroundColor: '#f4f5f7',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    bannerText: {
        fontSize: 13,
        color: '#4b5563',
        textAlign: 'center',
        lineHeight: 18,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 24,
    },
    formContainer: {
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#0068ff',
        marginBottom: 20,
        paddingBottom: 4,
    },
    inputField: {
        flex: 1,
        height: 44,
        fontSize: 16,
        color: '#111827',
        paddingHorizontal: 4,
    },
    clearBtn: {
        padding: 8,
    },
    clearBtnText: {
        fontSize: 14,
        color: '#9ca3af',
        fontWeight: 'bold',
    },
    eyeBtn: {
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    eyeBtnText: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: 'bold',
    },
    termsText: {
        fontSize: 12,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 24,
        marginTop: 8,
    },
    termsHighlight: {
        color: '#0068ff',
        fontWeight: '600',
    },
    zaloButton: {
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    zaloButtonActive: {
        backgroundColor: '#0068ff',
        shadowColor: '#0068ff',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    zaloButtonDisabled: {
        backgroundColor: '#c7dcfc',
    },
    zaloButtonText: {
        fontSize: 16,
        fontWeight: '700',
    },
    zaloButtonTextActive: {
        color: '#ffffff',
    },
    zaloButtonTextDisabled: {
        color: '#ffffff',
    },
    loginRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginRowText: {
        fontSize: 14,
        color: '#4b5563',
    },
    loginLink: {
        fontSize: 14,
        color: '#0068ff',
        fontWeight: '700',
    },
});

export default RegisterScreen;
