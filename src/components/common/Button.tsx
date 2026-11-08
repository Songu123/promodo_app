import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { defaultColors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  icon,
  style,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      <View style={styles.content}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text
          style={[
            styles.text,
            styles[`text_${variant}`],
            styles[`textSize_${size}`],
            disabled && styles.textDisabled,
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: Layout.spacing.sm,
  },
  // Variants
  primary: {
    backgroundColor: defaultColors.primary,
  },
  secondary: {
    backgroundColor: defaultColors.card,
    borderWidth: 1,
    borderColor: defaultColors.border,
  },
  danger: {
    backgroundColor: defaultColors.danger,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  // Sizes
  size_sm: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.sm,
  },
  size_md: {
    paddingVertical: Layout.spacing.sm + 2,
    paddingHorizontal: Layout.spacing.md,
  },
  size_lg: {
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
  },
  // Text
  text: {
    fontWeight: '600',
  },
  text_primary: {
    color: '#0F172A',
  },
  text_secondary: {
    color: defaultColors.text,
  },
  text_danger: {
    color: '#FFFFFF',
  },
  text_ghost: {
    color: defaultColors.primary,
  },
  textDisabled: {
    color: defaultColors.mutedText,
  },
  textSize_sm: {
    fontSize: 13,
  },
  textSize_md: {
    fontSize: 15,
  },
  textSize_lg: {
    fontSize: 17,
  },
});
