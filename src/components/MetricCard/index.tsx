import React, { type ReactNode } from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import PressableScale from '../PressableScale';
import { DEFAULT_WEATHER_THEME, type WeatherTheme } from '../../utils/weatherTheme';
import styles from './style';

export interface MetricCardProps {
  icon: string;
  label: string;
  value: string;
  unit?: string;
  description?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  theme?: WeatherTheme;
  onPress?: () => void;
  accessibilityLabel?: string;
  childrenLayout?: 'row' | 'stacked';
}

export default function MetricCard({
  icon,
  label,
  value,
  unit,
  description,
  children,
  style,
  theme = DEFAULT_WEATHER_THEME,
  onPress,
  accessibilityLabel,
  childrenLayout,
}: MetricCardProps): React.JSX.Element {
  const valueContent = (
    <>
      <View style={styles.valueRow}>
        <Text style={[styles.value, { color: theme.textPrimary }]}>{value}</Text>
        {unit ? <Text style={[styles.unit, { color: theme.textSecondary }]}>{unit}</Text> : null}
      </View>
      {description ? <Text maxFontSizeMultiplier={1.3} style={[styles.description, { color: theme.textSecondary }]}>{description}</Text> : null}
    </>
  );
  const card = (
    <View style={[styles.card, onPress ? styles.fillCard : undefined, { backgroundColor: theme.glass }, style]}>
      <View style={styles.heading}>
        <Text style={styles.icon}>{icon}</Text>
        <Text maxFontSizeMultiplier={1.3} style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      </View>
      {childrenLayout ? (
        <View style={[styles.compositeBody, childrenLayout === 'row' ? styles.compositeRow : styles.compositeStacked]}>
          <View style={childrenLayout === 'row' ? styles.compositeText : undefined}>{valueContent}</View>
          {children ? <View style={childrenLayout === 'row' ? styles.compositeTrailing : undefined}>{children}</View> : null}
        </View>
      ) : <>{valueContent}{children}</>}
    </View>
  );
  if (!onPress) return card;
  return (
    <PressableScale accessibilityRole="button" accessibilityLabel={accessibilityLabel ?? label} onPress={onPress} fill style={[style, styles.stretch]}>
      {card}
    </PressableScale>
  );
}
