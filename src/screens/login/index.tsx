import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoginProps } from './types';
import { createStyles } from './styles';
import { useAuth } from '../../context/AuthContext';
import { useThemedStyles } from '../../context/ThemeContext';
import { Icon } from '../../components/Icon';

export const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  const { login } = useAuth();
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<'phone' | 'password' | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = phoneNumber.trim().length > 0 && password.length > 0 && !loading;

  const validate = (): boolean => {
    let isValid = true;
    const trimmed = phoneNumber.trim();

    if (!trimmed) {
      setPhoneError('Vui lòng nhập số điện thoại');
      isValid = false;
    } else if (trimmed.length < 9) {
      setPhoneError('Số điện thoại không hợp lệ (tối thiểu 9 số)');
      isValid = false;
    } else {
      setPhoneError(null);
    }

    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu tối thiểu 6 ký tự');
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleLogin = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      login(phoneNumber.trim());
      setLoading(false);
      navigation.replace('Main');
    }, 400);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Hero */}
          <View style={[styles.hero, { paddingTop: insets.top + 36 }]}>
            <View style={styles.circleLarge} />
            <View style={styles.circleSmall} />
            <View style={styles.logo}>
              <Icon name="messages" size={36} color={Colors.primary} strokeWidth={2.2} />
            </View>
            <Text style={styles.appName}>Zalo Chat</Text>
            <Text style={styles.tagline}>Kết nối mọi người, mọi lúc mọi nơi</Text>
          </View>

          {/* Form card */}
          <View style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}>
            <Text style={styles.welcome}>Chào mừng trở lại</Text>
            <Text style={styles.welcomeSub}>
              Đăng nhập bằng số điện thoại và mật khẩu của bạn
            </Text>

            {/* Input Phone */}
            <View style={styles.inputGroup}>
              <View
                style={[
                  styles.inputRow,
                  focused === 'phone' && styles.inputRowFocused,
                  !!phoneError && styles.inputRowError,
                ]}
              >
                <TouchableOpacity
                  style={styles.countryCodeButton}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="Chọn mã vùng"
                >
                  <View style={styles.countryCodeBadge}>
                    <Text style={styles.countryCodeBadgeText}>VN</Text>
                  </View>
                  <Text style={styles.countryCodeText}>+84</Text>
                  <Icon name="chevronDown" size={16} color={Colors.textSecondary} />
                </TouchableOpacity>

                <View style={styles.verticalDivider} />

                <TextInput
                  style={styles.inputField}
                  placeholder="Số điện thoại"
                  placeholderTextColor={Colors.textMuted}
                  value={phoneNumber}
                  onChangeText={(val) => {
                    setPhoneNumber(val);
                    if (phoneError) setPhoneError(null);
                  }}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                />

                {phoneNumber.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => setPhoneNumber('')}
                    accessibilityRole="button"
                    accessibilityLabel="Xóa số điện thoại"
                  >
                    <Icon name="clear" size={14} color={Colors.textSecondary} strokeWidth={2.4} />
                  </TouchableOpacity>
                )}
              </View>

              {!!phoneError && (
                <View style={styles.errorRow}>
                  <Icon name="alert" size={13} color={Colors.danger} />
                  <Text style={styles.errorText}>{phoneError}</Text>
                </View>
              )}
            </View>

            {/* Input Password */}
            <View style={styles.inputGroup}>
              <View
                style={[
                  styles.inputRow,
                  focused === 'password' && styles.inputRowFocused,
                  !!passwordError && styles.inputRowError,
                ]}
              >
                <View style={styles.inputIconLeft}>
                  <Icon
                    name="lock"
                    size={18}
                    color={focused === 'password' ? Colors.primary : Colors.textMuted}
                    strokeWidth={2}
                  />
                </View>

                <TextInput
                  style={styles.inputField}
                  placeholder="Mật khẩu"
                  placeholderTextColor={Colors.textMuted}
                  value={password}
                  onChangeText={(val) => {
                    setPassword(val);
                    if (passwordError) setPasswordError(null);
                  }}
                  secureTextEntry={!showPassword}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                />

                <TouchableOpacity
                  style={styles.showHideButton}
                  onPress={() => setShowPassword(!showPassword)}
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  <Icon
                    name={showPassword ? 'eyeOff' : 'eye'}
                    size={20}
                    color={Colors.textSecondary}
                    strokeWidth={2}
                  />
                </TouchableOpacity>
              </View>

              {!!passwordError && (
                <View style={styles.errorRow}>
                  <Icon name="alert" size={13} color={Colors.danger} />
                  <Text style={styles.errorText}>{passwordError}</Text>
                </View>
              )}
            </View>

            {/* Forgot password */}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            {/* Submit button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                canSubmit ? styles.loginButtonActive : styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={!canSubmit}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={Colors.white} size="small" />
              ) : (
                <>
                  <Text style={styles.loginButtonText}>Đăng nhập</Text>
                  <Icon name="arrowRight" size={18} color={Colors.white} strokeWidth={2.4} />
                </>
              )}
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Chưa có tài khoản? </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Register')}
                accessibilityRole="button"
              >
                <Text style={styles.registerLink}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
