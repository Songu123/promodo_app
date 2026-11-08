import { StyleSheet, Text, View } from 'react-native';
import { defaultColors } from '../src/constants/Colors';
import { Layout } from '../src/constants/Layout';
import { Card } from '../src/components/common/Card';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card} variant="secondary">
        <Text style={styles.title}>About Focus Pomodoro</Text>
        <Text style={styles.description}>
          A modern, minimalist, offline-first productivity application built for iPhone 8 Plus (iOS 15.8) installed via TrollStore 2.
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
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: defaultColors.text,
    marginBottom: Layout.spacing.sm,
  },
  description: {
    fontSize: 14,
    color: defaultColors.secondaryText,
    lineHeight: 20,
  },
});
