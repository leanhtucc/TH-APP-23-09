import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  backgroundColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  backgroundColor = '#ffffff',
}) => {
  const cardBgStyle = { backgroundColor };
  const iconBgStyle = { backgroundColor: `${color}18` };
  const valueColorStyle = { color };

  return (
    <View style={[styles.card, cardBgStyle]}>
      <View style={[styles.iconWrapper, iconBgStyle]}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>

      <Text style={[styles.valueText, valueColorStyle]}>{value}</Text>

      <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 106,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconText: {
    fontSize: 17,
  },
  valueText: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 3,
    letterSpacing: -0.5,
  },
  titleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default StatCard;
