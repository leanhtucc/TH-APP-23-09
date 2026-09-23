import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TabKey = 'home' | 'subjects' | 'assignments' | 'profile';

export interface BottomTabBarProps {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
}

interface TabItem {
  key: TabKey;
  label: string;
  icon: string;
}

const TABS: TabItem[] = [
  { key: 'home', label: 'Trang chủ', icon: '🏠' },
  { key: 'subjects', label: 'Môn học', icon: '📚' },
  { key: 'assignments', label: 'Bài tập', icon: '📝' },
  { key: 'profile', label: 'Cá nhân', icon: '👤' },
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  const insets = useSafeAreaInsets();
  const safeBottomStyle = {
    paddingBottom: Math.max(insets.bottom, 8),
  };

  return (
    <View style={[styles.container, safeBottomStyle]}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            style={({ pressed }) => [
              styles.tabButton,
              pressed && styles.tabButtonPressed,
            ]}
            onPress={() => onTabPress(tab.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
          >
            <View
              style={[
                styles.activeIndicator,
                isActive ? styles.activeIndicatorVisible : styles.activeIndicatorHidden,
              ]}
            />

            <Text style={[styles.tabIcon, isActive ? styles.tabIconActive : styles.tabIconInactive]}>
              {tab.icon}
            </Text>

            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  activeIndicator: {
    width: 20,
    height: 3,
    borderRadius: 2,
    marginBottom: 4,
  },
  activeIndicatorVisible: {
    backgroundColor: '#0068ff',
  },
  activeIndicatorHidden: {
    backgroundColor: 'transparent',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabIconActive: {
    transform: [{ scale: 1.05 }],
  },
  tabIconInactive: {
    opacity: 0.65,
  },
  tabLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  tabLabelActive: {
    color: '#0068ff',
    fontWeight: '700',
  },
  tabLabelInactive: {
    color: '#64748b',
    fontWeight: '500',
  },
});

export default BottomTabBar;
