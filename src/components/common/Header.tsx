import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { defaultColors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  rightAction,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {rightAction && <View style={styles.actionContainer}>{rightAction}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: defaultColors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: defaultColors.secondaryText,
    marginTop: 2,
  },
  actionContainer: {
    marginLeft: Layout.spacing.md,
  },
});

