// src/components/ScreenHeader/index.tsx — Header xanh bo góc dùng chung cho các tab
import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacing } from '../../theme';
import { useThemedStyles } from '../../context/ThemeContext';
import { ScreenHeaderProps } from './types';
import { createStyles } from './styles';

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  right,
  children,
}) => {
  const { styles } = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.lg }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.circleLarge} pointerEvents="none" />
      <View style={styles.circleSmall} pointerEvents="none" />

      <View style={styles.row}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {right}
      </View>

      {children}
    </View>
  );
};

export default ScreenHeader;
