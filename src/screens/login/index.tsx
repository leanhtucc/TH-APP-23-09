import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, TextInput } from '../../components/Typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoginProps } from './types';
import { createStyles } from './styles';
import { useAuth } from '../../context/AuthContext';
import { useThemedStyles } from '../../context/ThemeContext';
import { Icon } from '../../components/Icon';
import { isValidEmail } from '../../utils/validation';

export const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  const { login } = useAuth();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !loading;

  const validate = (): boolean => {
    let isValid = true;
    const trimmed = email.trim();

    if (!trimmed) {
      setEmailError('Vui lòng nhập email');
      isValid = false;
    } else if (!isValidEmail(trimmed)) {
      setEmailError('Email không hợp lệ');
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleLogin = async () => {
    setFormError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      await login(email.trim(), password);
      // Thành công: AuthContext cập nhật user → navigator tự chuyển sang Main
    } catch (e) {
      setFormError((e as Error).message);
      setLoading(false);
    }
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
          <View style={[styles.hero, { paddingTop: insets.top + 28 }]}>
            <View style={styles.circleLarge} />
            <View style={styles.circleSmall} />
            <View style={styles.brandRow}>
              <View style={styles.logo}>
                <Icon name="messages" size={28} color={Colors.primary} strokeWidth={2.2} />
              </View>
              <Text style={styles.appName}>Trò chuyện</Text>
            </View>
            <Text style={styles.heroTitle}>{'Chào mừng\ntrở lại'}</Text>
            <Text style={styles.tagline}>Đăng nhập để nhắn tin cùng bạn bè.</Text>
          </View>

          {/* Form card nổi */}
          <View style={styles.sheet}>
            {/* Input Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View
                style={[
                  styles.inputRow,
                  focused === 'email' && styles.inputRowFocused,
                  !!emailError && styles.inputRowError,
                ]}
              >
                <View style={styles.inputIconLeft}>
                  <Icon
                    name="mail"
                    size={18}
                    color={focused === 'email' ? Colors.primary : Colors.textMuted}
                    strokeWidth={2}
                  />
                </View>

                <TextInput
                  style={styles.inputField}
                  placeholder="name@email.com"
                  placeholderTextColor={Colors.textMuted}
                  value={email}
                  onChangeText={(val) => {
                    setEmail(val);
                    if (emailError) setEmailError(null);
                    if (formError) setFormError(null);
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />

                {email.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => setEmail('')}
                    accessibilityRole="button"
                    accessibilityLabel="Xóa email"
                  >
                    <Icon name="clear" size={14} color={Colors.textSecondary} strokeWidth={2.4} />
                  </TouchableOpacity>
                )}
              </View>

              {!!emailError && (
                <View style={styles.errorRow}>
                  <Icon name="alert" size={13} color={Colors.danger} />
                  <Text style={styles.errorText}>{emailError}</Text>
                </View>
              )}
            </View>

            {/* Input Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mật khẩu</Text>
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
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor={Colors.textMuted}
                  value={password}
                  onChangeText={(val) => {
                    setPassword(val);
                    if (passwordError) setPasswordError(null);
                    if (formError) setFormError(null);
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
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

            {/* Lỗi từ Firebase: sai tài khoản / mật khẩu, mất mạng... */}
            {!!formError && (
              <View style={[styles.errorRow, styles.formError]} accessibilityRole="alert">
                <Icon name="alert" size={14} color={Colors.danger} />
                <Text style={styles.errorText}>{formError}</Text>
              </View>
            )}

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
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
            <Text style={styles.footerText}>Chưa có tài khoản? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Register')}
              accessibilityRole="button"
            >
              <Text style={styles.registerLink}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
