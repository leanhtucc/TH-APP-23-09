import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { SearchBarProps } from './types';
import { createStyles } from './styles';
import { IconSize } from '../../theme';
import { useThemedStyles } from '../../context/ThemeContext';
import { Icon } from '../Icon';

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Tìm kiếm...',
  style,
}) => {
  const { styles, colors: Colors } = useThemedStyles(createStyles);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused, style]}>
      <Icon
        name="search"
        size={IconSize.sm}
        color={isFocused ? Colors.primary : Colors.textMuted}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
        accessibilityLabel="Ô tìm kiếm"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          style={styles.clearBtn}
          accessibilityLabel="Xóa tìm kiếm"
        >
          <Icon name="clear" size={12} color={Colors.white} strokeWidth={2.5} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
