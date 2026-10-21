// src/screens/settings/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAuth } from '../../context/AuthContext';
import { currentUser } from '../../data/mockData';
import { useTheme, useThemedStyles } from '../../context/ThemeContext';
import Avatar from '../../components/Avatar';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Icon, IconBadge } from '../../components/Icon';
import { SettingSwitchRowProps, InfoRowProps, NavRowProps } from './types';
import { createStyles } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SettingSwitchRow: React.FC<SettingSwitchRowProps> = ({
  icon,
  iconBgColor,
  iconColor,
  title,
  subtitle,
  value,
  onValueChange,
}) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  return (
    <View style={styles.row}>
      <IconBadge
        name={icon}
        size={38}
        iconSize={18}
        backgroundColor={iconBgColor ?? Colors.primaryLight}
        iconColor={iconColor ?? Colors.primary}
      />
      <View style={styles.labelBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: Colors.textDisabled, true: Colors.primaryMid }}
        thumbColor={value ? Colors.primary : '#f4f3f4'}
      />
    </View>
  );
};

const InfoRow: React.FC<InfoRowProps> = ({
  icon,
  iconBgColor,
  iconColor,
  label,
  value,
}) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  return (
    <View style={styles.row}>
      <IconBadge
        name={icon}
        size={38}
        iconSize={18}
        backgroundColor={iconBgColor ?? Colors.primaryLight}
        iconColor={iconColor ?? Colors.primary}
      />
      <View style={styles.labelBox}>
        <Text style={styles.title}>{label}</Text>
      </View>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};

const NavRow: React.FC<NavRowProps> = ({
  icon,
  iconBgColor,
  iconColor,
  title,
  subtitle,
  onPress,
}) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={onPress}>
      <IconBadge
        name={icon}
        size={38}
        iconSize={18}
        backgroundColor={iconBgColor ?? Colors.primaryLight}
        iconColor={iconColor ?? Colors.primary}
      />
      <View style={styles.labelBox}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Icon name="chevronRight" size={18} color={Colors.textMuted} />
    </TouchableOpacity>
  );
};

export const SettingsScreen: React.FC = () => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  const { isDark, setDarkMode } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { user, logout } = useAuth();

  const [isNotifEnabled, setIsNotifEnabled] = useState(true);
  const [isActiveStatus, setIsActiveStatus] = useState(true);

  const displayName = user?.name || currentUser.name;
  const displayContact = user?.phoneOrEmail || currentUser.phone;

  const handleLogout = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header + Profile Card */}
        <ScreenHeader title="Cài đặt" subtitle="Quản lý tài khoản & tùy chọn">
          <View style={styles.profileCard}>
            <Avatar
              uri={currentUser.avatar}
              name={displayName}
              size={64}
              showOnlineDot
              isOnline={isActiveStatus}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName} numberOfLines={1}>{displayName}</Text>
              <Text style={styles.profileContact} numberOfLines={1}>{displayContact}</Text>
              <View style={[styles.statusBadge, !isActiveStatus && styles.statusBadgeOff]}>
                <Text style={[styles.statusBadgeText, !isActiveStatus && styles.statusBadgeTextOff]}>
                  {isActiveStatus ? '● Đang hoạt động' : '● Ẩn trạng thái'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.editBtn}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Chỉnh sửa hồ sơ"
            >
              <Icon name="edit" size={18} color={Colors.primary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </ScreenHeader>

        {/* Khối: Thông tin tài khoản */}
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>THÔNG TIN TÀI KHOẢN</Text>
        </View>
        <View style={styles.section}>
          <InfoRow
            icon="user"
            iconBgColor="#e0f2fe"
            iconColor="#0284c7"
            label="Tên tài khoản"
            value={displayName}
          />
          <InfoRow
            icon="phone"
            iconBgColor="#f0fdf4"
            iconColor="#16a34a"
            label="Số điện thoại"
            value={displayContact}
          />
          <InfoRow
            icon="idCard"
            iconBgColor="#fef3c7"
            iconColor="#d97706"
            label="ID người dùng"
            value="#20261014"
          />
        </View>

        {/* Khối: Cài đặt & quyền riêng tư */}
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>CÀI ĐẶT & QUYỀN RIÊNG TƯ</Text>
        </View>
        <View style={styles.section}>
          <SettingSwitchRow
            icon="notifications"
            iconBgColor="#fef2f2"
            iconColor="#dc2626"
            title="Thông báo tin nhắn"
            subtitle="Nhận chuông và rung khi có tin"
            value={isNotifEnabled}
            onValueChange={setIsNotifEnabled}
          />
          <SettingSwitchRow
            icon="eyeStatus"
            iconBgColor="#f5f3ff"
            iconColor="#7c3aed"
            title="Trạng thái hoạt động"
            subtitle="Hiển thị khi bạn đang online"
            value={isActiveStatus}
            onValueChange={setIsActiveStatus}
          />
          <SettingSwitchRow
            icon="moon"
            iconBgColor="#e0e7ff"
            iconColor="#4338ca"
            title="Chế độ tối"
            subtitle="Giao diện tối giúp dịu mắt"
            value={isDark}
            onValueChange={setDarkMode}
          />
        </View>

        {/* Khối: Tùy chọn nâng cao */}
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>TÙY CHỌN NÂNG CAO</Text>
        </View>
        <View style={styles.section}>
          <NavRow
            icon="key"
            iconBgColor="#ede9fe"
            iconColor="#6d28d9"
            title="Đổi mật khẩu"
            subtitle="Cập nhật mật khẩu định kỳ"
            onPress={() => Alert.alert('Đổi mật khẩu', 'Tính năng đang được phát triển')}
          />
          <NavRow
            icon="globe"
            iconBgColor="#ecfdf5"
            iconColor="#059669"
            title="Ngôn ngữ"
            subtitle="Tiếng Việt (Mặc định)"
            onPress={() => Alert.alert('Ngôn ngữ', 'Hỗ trợ Tiếng Việt & English')}
          />
          <NavRow
            icon="info"
            iconBgColor="#f3f4f6"
            iconColor="#4b5563"
            title="Về Zalo Chat"
            subtitle="Phiên bản 2.5.0 • Bản dựng 2026"
            onPress={() => Alert.alert('Về ứng dụng', 'Zalo Chat App v2.5.0')}
          />
        </View>

        {/* Nút đăng xuất */}
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.8}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Đăng xuất khỏi tài khoản"
        >
          <Icon name="logout" size={20} color={Colors.danger} strokeWidth={2.4} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
