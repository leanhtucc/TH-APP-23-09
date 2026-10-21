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
import { RegisterProps } from './types';
import { createStyles } from '../login/styles';
import { useAuth } from '../../context/AuthContext';
import { useThemedStyles } from '../../context/ThemeContext';
import { Icon } from '../../components/Icon';
import { IconName } from '../../components/Icon/types';

type FieldKey = 'name' | 'phone' | 'password';

export const RegisterScreen: React.FC<RegisterProps> = ({ navigation }) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  const { register } = useAuth();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<FieldKey | null>(null);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [loading, setLoading] = useState(false);

  const canSubmit = !!name.trim() && !!phone.trim() && !!password && !loading;

  const validate = () => {
    const next: Partial<Record<FieldKey, string>> = {};
    if (name.trim().length < 2) next.name = 'Vui lòng nhập họ tên';
    if (!/^\d{9,11}$/.test(phone.trim())) next.phone = 'Số điện thoại gồm 9–11 chữ số';
    if (password.length < 6) next.password = 'Mật khẩu tối thiểu 6 ký tự';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      register(name.trim(), phone.trim());
      setLoading(false);
      navigation.replace('Main');
    }, 400);
  };

  const clearError = (key: FieldKey) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

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
          <View style={[styles.hero, { paddingTop: insets.top + 24 }]}>
            <View style={styles.circleLarge} />
            <View style={styles.circleSmall} />
            <View style={styles.logo}>
              <Icon name="userPlus" size={32} color={Colors.primary} strokeWidth={2.2} />
            </View>
            <Text style={styles.appName}>Tạo tài khoản</Text>
            <Text style={styles.tagline}>Tham gia Zalo Chat chỉ với vài bước</Text>
          </View>

          <View style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}>
            {renderField('name', 'user', 'Họ và tên', name, setName, {
              autoCapitalize: 'words',
            })}
            {renderField('phone', 'phone', 'Số điện thoại', phone, setPhone, {
              keyboardType: 'phone-pad',
            })}
            {renderField(
              'password',
              'lock',
              'Mật khẩu (tối thiểu 6 ký tự)',
              password,
              setPassword,
              { secureTextEntry: !showPassword },
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
                />
              </TouchableOpacity>
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
                <>
                  <Text style={styles.loginButtonText}>Đăng ký</Text>
                  <Icon name="arrowRight" size={18} color={Colors.white} strokeWidth={2.4} />
                </>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Đã có tài khoản? </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
                <Text style={styles.registerLink}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;
