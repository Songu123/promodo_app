import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { defaultColors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  showAppIcon?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  rightAction,
  showAppIcon = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        {showAppIcon && (
          <Image
            source={require('../../../assets/images/icon.png')}
            style={styles.appIcon}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
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
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    marginRight: Layout.spacing.sm + 4,
    borderWidth: 1,
    borderColor: defaultColors.border,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: defaultColors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: defaultColors.secondaryText,
    marginTop: 2,
  },
  actionContainer: {
    marginLeft: Layout.spacing.md,
  },
});
