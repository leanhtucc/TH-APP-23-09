import React from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LogoutScreenProps } from '../../types/navigation';
import { useAuth } from '../../context/AuthContext';

export const LogoutScreen: React.FC<LogoutScreenProps> = ({ navigation }) => {
    const { user, logout } = useAuth();

    const displayName = user?.name || 'Người dùng Zalo';
    const displayAccount = user?.phoneOrEmail || 'zalo_user@example.com';
    const initialLetter = displayName.charAt(0).toUpperCase() || 'Z';

    const handleLogout = () => {
        Alert.alert(
            'Đăng xuất khỏi tài khoản này?',
            'Bạn sẽ cần đăng nhập lại bằng số điện thoại/email và mật khẩu để tiếp tục sử dụng Zalo.',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đăng xuất',
                    style: 'destructive',
                    onPress: () => {
                        logout();
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                {/* Thẻ thông tin cá nhân chuẩn Zalo */}
                <TouchableOpacity
                    style={styles.profileCard}
                    activeOpacity={0.8}
                    onPress={() => Alert.alert('Trang cá nhân', `Xem hồ sơ của ${displayName}`)}
                >
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{initialLetter}</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{displayName}</Text>
                        <Text style={styles.profileAccount}>{displayAccount}</Text>
                        <Text style={styles.viewProfileText}>Xem trang cá nhân</Text>
                    </View>
                    <Text style={styles.chevronRight}>›</Text>
                </TouchableOpacity>

                {/* Danh mục cài đặt phong cách Zalo */}
                <View style={styles.section}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => Alert.alert('Thông báo', 'Mục Tài khoản và bảo mật')}
                    >
                        <Text style={styles.menuIcon}>🛡️</Text>
                        <View style={styles.menuTextContainer}>
                            <Text style={styles.menuTitle}>Tài khoản và bảo mật</Text>
                            <Text style={styles.chevronRight}>›</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.itemDivider} />

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => Alert.alert('Thông báo', 'Mục Quyền riêng tư')}
                    >
                        <Text style={styles.menuIcon}>🔒</Text>
                        <View style={styles.menuTextContainer}>
                            <Text style={styles.menuTitle}>Quyền riêng tư</Text>
                            <Text style={styles.chevronRight}>›</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => Alert.alert('Thông báo', 'Mục Thông báo & Tin nhắn')}
                    >
                        <Text style={styles.menuIcon}>🔔</Text>
                        <View style={styles.menuTextContainer}>
                            <Text style={styles.menuTitle}>Thông báo và âm thanh</Text>
                            <Text style={styles.chevronRight}>›</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.itemDivider} />

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => Alert.alert('Thông báo', 'Mục Dung lượng và dữ liệu')}
                    >
                        <Text style={styles.menuIcon}>☁️</Text>
                        <View style={styles.menuTextContainer}>
                            <Text style={styles.menuTitle}>Dung lượng và dữ liệu</Text>
                            <Text style={styles.chevronRight}>›</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Khu vực Đăng xuất chuẩn phong cách Zalo */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.versionText}>Phiên bản Zalo 24.03.01</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f4f5f7',
    },
    container: {
        flex: 1,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 10,
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0068ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    avatarText: {
        color: '#ffffff',
        fontSize: 26,
        fontWeight: 'bold',
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 2,
    },
    profileAccount: {
        fontSize: 13,
        color: '#6b7280',
        marginBottom: 2,
    },
    viewProfileText: {
        fontSize: 12,
        color: '#9ca3af',
    },
    chevronRight: {
        fontSize: 24,
        color: '#c7c7cc',
        paddingHorizontal: 4,
    },
    section: {
        backgroundColor: '#ffffff',
        marginBottom: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    menuIcon: {
        fontSize: 20,
        marginRight: 14,
        width: 24,
        textAlign: 'center',
    },
    menuTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuTitle: {
        fontSize: 16,
        color: '#1f2937',
    },
    itemDivider: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginLeft: 54,
    },
    logoutButton: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#dc2626',
        fontWeight: '600',
    },
    versionText: {
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: 12,
        marginVertical: 20,
    },
});

export default LogoutScreen;
