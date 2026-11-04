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
import { RegisterProps } from './types';
import { createStyles } from '../login/styles';
import { useAuth } from '../../context/AuthContext';
import { useThemedStyles } from '../../context/ThemeContext';
import { Icon } from '../../components/Icon';
import { IconName } from '../../components/Icon/types';
import { RegisterErrors, validateRegister } from '../../utils/validation';

type FieldKey = 'name' | 'email' | 'password' | 'confirm';

const LABELS: Record<FieldKey, string> = {
  name: 'Họ tên',
  email: 'Email',
  password: 'Mật khẩu',
  confirm: 'Nhập lại mật khẩu',
};

export const RegisterScreen: React.FC<RegisterProps> = ({ navigation }) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  const { register } = useAuth();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<FieldKey | null>(null);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = !!name.trim() && !!email.trim() && !!password && !!confirm && !loading;

  const handleRegister = async () => {
    setFormError(null);
    const next = validateRegister({ name, email, password, confirm });
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    try {
      await register(name, email, password);
      // Thành công: navigator tự chuyển sang Main
    } catch (e) {
      setFormError((e as Error).message);
      setLoading(false);
    }
  };

  const clearError = (key: FieldKey) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (formError) setFormError(null);
  };

  const eyeButton = (
    <TouchableOpacity
      style={styles.showHideButton}
      onPress={() => setShowPassword(!showPassword)}
      accessibilityRole="button"
      accessibilityLabel={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
    >
      <Icon name={showPassword ? 'eyeOff' : 'eye'} size={20} color={Colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderField = (
    key: FieldKey,
    icon: IconName,
    placeholder: string,
    value: string,
    onChange: (v: string) => void,
    extra: React.ComponentProps<typeof TextInput> = {},
    right?: React.ReactNode
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{LABELS[key]}</Text>
      <View
        style={[
          styles.inputRow,
          focused === key && styles.inputRowFocused,
          !!errors[key] && styles.inputRowError,
        ]}
      >
        <View style={styles.inputIconLeft}>
          <Icon
            name={icon}
            size={18}
            color={focused === key ? Colors.primary : Colors.textMuted}
          />
        </View>
        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          value={value}
          onChangeText={(v) => {
            onChange(v);
            clearError(key);
          }}
          onFocus={() => setFocused(key)}
          onBlur={() => setFocused(null)}
          {...extra}
        />
        {right}
      </View>
      {!!errors[key] && (
        <View style={styles.errorRow}>
          <Icon name="alert" size={13} color={Colors.danger} />
          <Text style={styles.errorText}>{errors[key]}</Text>
        </View>
      )}
    </View>
  );

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
          <View style={[styles.hero, { paddingTop: insets.top + 12 }]}>
            <View style={styles.circleLarge} />
            <View style={styles.circleSmall} />
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Quay lại"
            >
              <Icon name="back" size={22} color={Colors.white} strokeWidth={2.4} />
            </TouchableOpacity>
            <Text style={[styles.heroTitle, styles.heroTitleCompact]}>Tạo tài khoản</Text>
            <Text style={styles.tagline}>Chỉ mất một phút để bắt đầu.</Text>
          </View>

          <View style={styles.sheet}>
            {renderField('name', 'user', 'Họ và tên', name, setName, {
              autoCapitalize: 'words',
            })}
            {renderField('email', 'mail', 'Email', email, setEmail, {
              keyboardType: 'email-address',
              autoCapitalize: 'none',
              autoCorrect: false,
            })}
            {renderField(
              'password',
              'lock',
              'Mật khẩu (tối thiểu 6 ký tự)',
              password,
              setPassword,
              { secureTextEntry: !showPassword, autoCapitalize: 'none' },
              eyeButton
            )}
            {renderField('confirm', 'lock', 'Nhập lại mật khẩu', confirm, setConfirm, {
              secureTextEntry: !showPassword,
              autoCapitalize: 'none',
            })}

            {!!formError && (
              <View style={[styles.errorRow, styles.formError]} accessibilityRole="alert">
                <Icon name="alert" size={14} color={Colors.danger} />
                <Text style={styles.errorText}>{formError}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.loginButton,
                canSubmit ? styles.loginButtonActive : styles.loginButtonDisabled,
              ]}
              onPress={handleRegister}
              disabled={!canSubmit}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={Colors.white} size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Đăng ký</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
            <Text style={styles.footerText}>Đã có tài khoản? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <Text style={styles.registerLink}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;
