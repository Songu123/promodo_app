import { Image, StyleSheet, Text, View } from 'react-native';
import { defaultColors } from '../src/constants/Colors';
import { Layout } from '../src/constants/Layout';
import { Card } from '../src/components/common/Card';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card} variant="secondary">
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Focus Pomodoro</Text>
        <Text style={styles.version}>Version 1.0.0 (Build 1)</Text>
        <Text style={styles.description}>
          A modern, minimalist, offline-first productivity application built for iPhone 8 Plus (iOS 15.8) running on TrollStore 2.
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.md,
    backgroundColor: defaultColors.background,
  },
  card: {
    width: '100%',
    padding: Layout.spacing.lg,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: Layout.spacing.md,
    shadowColor: defaultColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: defaultColors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: defaultColors.text,
    marginBottom: 2,
  },
  version: {
    fontSize: 12,
    color: defaultColors.primary,
    fontWeight: '600',
    marginBottom: Layout.spacing.md,
  },
  description: {
    fontSize: 14,
    color: defaultColors.secondaryText,
    lineHeight: 20,
    textAlign: 'center',
  },
});
