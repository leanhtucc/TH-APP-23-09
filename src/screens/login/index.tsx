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
import { LoginScreenProps } from '../../types/navigation';
import { useAuth } from '../../context/AuthContext';

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const { login } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const canSubmit = phoneNumber.trim().length > 0 && password.length > 0;

    const handleLogin = () => {
        const trimmedPhone = phoneNumber.trim();
        if (!trimmedPhone) {
            Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại hoặc email');
            return;
        }

        if (!password) {
            Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu');
            return;
        }

        login(trimmedPhone);
        Alert.alert('Thành công', 'Đăng nhập Zalo thành công!', [
            {
                text: 'Bắt đầu',
                onPress: () => {
                    navigation.replace('Logout');
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
                <View style={styles.bannerContainer}>
                    <Text style={styles.bannerText}>
                        Vui lòng nhập số điện thoại và mật khẩu để đăng nhập
                    </Text>
                </View>

                <ScrollView
                    contentContainerStyle={styles.contentContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.formSection}>
                        <View style={styles.inputRow}>
                            <TouchableOpacity
                                style={styles.countryCodeButton}
                                activeOpacity={0.7}
                                onPress={() => Alert.alert('Mã quốc gia', 'Việt Nam (+84)')}
                            >
                                <Text style={styles.countryCodeText}>+84</Text>
                                <Text style={styles.countryCodeArrow}>▾</Text>
                            </TouchableOpacity>

                            <View style={styles.verticalDivider} />

                            <TextInput
                                style={styles.inputField}
                                placeholder="Số điện thoại"
                                placeholderTextColor="#999"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                            />

                            {phoneNumber.length > 0 && (
                                <TouchableOpacity
                                    style={styles.clearButton}
                                    onPress={() => setPhoneNumber('')}
                                >
                                    <Text style={styles.clearButtonText}>✕</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Mật khẩu"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                style={styles.showHideButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Text style={styles.showHideText}>
                                    {showPassword ? 'ẨN' : 'HIỆN'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.forgotPasswordContainer}
                            onPress={() =>
                                Alert.alert(
                                    'Lấy lại mật khẩu',
                                    'Vui lòng liên hệ quản trị viên hoặc sử dụng số điện thoại đăng ký.'
                                )
                            }
                        >
                            <Text style={styles.forgotPasswordText}>Lấy lại mật khẩu</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.loginButton,
                                canSubmit ? styles.loginButtonActive : styles.loginButtonDisabled,
                            ]}
                            onPress={handleLogin}
                            disabled={!canSubmit}
                            activeOpacity={0.8}
                        >
                            <Text
                                style={[
                                    styles.loginButtonText,
                                    canSubmit ? styles.loginButtonTextActive : styles.loginButtonTextDisabled,
                                ]}
                            >
                                Đăng nhập
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.registerPromptContainer}>
                            <Text style={styles.registerPromptText}>Chưa có tài khoản? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.registerLinkText}>Đăng ký ngay</Text>
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
    bannerContainer: {
        backgroundColor: '#f4f5f7',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    bannerText: {
        fontSize: 13,
        color: '#4b5563',
        lineHeight: 18,
    },
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 24,
        justifyContent: 'space-between',
    },
    formSection: {
        width: '100%',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: '#0068ff',
        paddingVertical: 8,
        marginBottom: 20,
    },
    countryCodeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 8,
    },
    countryCodeText: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '600',
    },
    countryCodeArrow: {
        fontSize: 12,
        color: '#6b7280',
        marginLeft: 4,
    },
    verticalDivider: {
        width: 1,
        height: 20,
        backgroundColor: '#d1d5db',
        marginRight: 10,
    },
    inputField: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#111827',
        paddingVertical: 0,
        paddingHorizontal: 4,
    },
    clearButton: {
        padding: 6,
        borderRadius: 12,
        backgroundColor: '#e5e7eb',
        justifyContent: 'center',
        alignItems: 'center',
        width: 22,
        height: 22,
    },
    clearButtonText: {
        fontSize: 10,
        color: '#6b7280',
        fontWeight: 'bold',
    },
    showHideButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    showHideText: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: '700',
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-start',
        marginBottom: 28,
    },
    forgotPasswordText: {
        color: '#0068ff',
        fontSize: 14,
        fontWeight: '600',
    },
    loginButton: {
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonActive: {
        backgroundColor: '#0068ff',
        shadowColor: '#0068ff',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 3,
    },
    loginButtonDisabled: {
        backgroundColor: '#c7dcfc',
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: '700',
    },
    loginButtonTextActive: {
        color: '#ffffff',
    },
    loginButtonTextDisabled: {
        color: '#ffffff',
    },
    registerPromptContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    registerPromptText: {
        fontSize: 14,
        color: '#4b5563',
    },
    registerLinkText: {
        fontSize: 14,
        color: '#0068ff',
        fontWeight: '700',
    },
    footerSection: {
        alignItems: 'center',
        gap: 8,
        marginTop: 40,
        paddingVertical: 12,
    },
    faqLink: {
        fontSize: 13,
        color: '#6b7280',
        textDecorationLine: 'underline',
    },
    languageText: {
        fontSize: 12,
        color: '#9ca3af',
    },
});

export default LoginScreen;