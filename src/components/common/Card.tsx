import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { defaultColors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'accent';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
  ...props
}) => {
  return (
    <View
      style={[
        styles.card,
        variant === 'secondary' && styles.cardSecondary,
        variant === 'accent' && styles.cardAccent,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: defaultColors.card,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    borderWidth: 1,
    borderColor: defaultColors.borderLight,
  },
  cardSecondary: {
    backgroundColor: defaultColors.secondaryBackground,
    borderColor: defaultColors.border,
  },
  cardAccent: {
    backgroundColor: defaultColors.card,
    borderColor: defaultColors.primary,
  },
});
