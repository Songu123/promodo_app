import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaultColors } from '../../src/constants/Colors';
import { Layout } from '../../src/constants/Layout';
import { Header } from '../../src/components/common/Header';
import { Card } from '../../src/components/common/Card';
import { UserSettings } from '../../src/types';
import { DEFAULT_SETTINGS } from '../../src/constants/Config';
import {
  Bell,
  Volume2,
  Vibrate,
  Smartphone,
  Info,
} from 'lucide-react-native';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);

  const toggleSetting = (key: keyof UserSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header
        title="Settings"
        subtitle="Customization & Device Preferences"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Timer Intervals Section */}
        <Text style={styles.sectionTitle}>TIMER DURATIONS (MINUTES)</Text>
        <Card style={styles.card} variant="secondary">
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Focus Duration</Text>
            <Text style={styles.settingValue}>{settings.focusDuration} min</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Short Break</Text>
            <Text style={styles.settingValue}>{settings.shortBreakDuration} min</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Long Break</Text>
            <Text style={styles.settingValue}>{settings.longBreakDuration} min</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Long Break Interval</Text>
            <Text style={styles.settingValue}>{settings.longBreakInterval} sessions</Text>
          </View>
        </Card>

        {/* Feedback & Notifications */}
        <Text style={styles.sectionTitle}>ALERTS & FEEDBACK</Text>
        <Card style={styles.card} variant="secondary">
          <View style={styles.settingRow}>
            <View style={styles.iconLabelRow}>
              <Bell color={defaultColors.primary} size={18} />
              <Text style={styles.settingLabelWithIcon}>Notifications</Text>
            </View>
            <Switch
              value={settings.notificationsEnabled}
              onValueChange={() => toggleSetting('notificationsEnabled')}
              trackColor={{ false: defaultColors.border, true: defaultColors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={styles.iconLabelRow}>
              <Volume2 color={defaultColors.primary} size={18} />
              <Text style={styles.settingLabelWithIcon}>Sound Effects</Text>
            </View>
            <Switch
              value={settings.soundEnabled}
              onValueChange={() => toggleSetting('soundEnabled')}
              trackColor={{ false: defaultColors.border, true: defaultColors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={styles.iconLabelRow}>
              <Vibrate color={defaultColors.primary} size={18} />
              <Text style={styles.settingLabelWithIcon}>Haptic Feedback</Text>
            </View>
            <Switch
              value={settings.hapticsEnabled}
              onValueChange={() => toggleSetting('hapticsEnabled')}
              trackColor={{ false: defaultColors.border, true: defaultColors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Card>

        {/* Device Information (AGENT.md requirements) */}
        <Text style={styles.sectionTitle}>DEVICE ENVIRONMENT</Text>
        <Card style={styles.card} variant="secondary">
          <View style={styles.settingRow}>
            <View style={styles.iconLabelRow}>
              <Smartphone color={defaultColors.secondaryText} size={18} />
              <Text style={styles.settingLabelWithIcon}>Target Device</Text>
            </View>
            <Text style={styles.settingValue}>iPhone 8 Plus (iOS 15.8)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={styles.iconLabelRow}>
              <Info color={defaultColors.secondaryText} size={18} />
              <Text style={styles.settingLabelWithIcon}>Installer</Text>
            </View>
            <Text style={styles.settingValue}>TrollStore 2</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={styles.iconLabelRow}>
              <Info color={defaultColors.secondaryText} size={18} />
              <Text style={styles.settingLabelWithIcon}>Expo SDK</Text>
            </View>
            <Text style={styles.settingValue}>SDK 54 (React 19.1)</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: defaultColors.background,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.md,
    paddingBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: defaultColors.secondaryText,
    letterSpacing: 0.8,
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.xs,
    marginLeft: Layout.spacing.xs,
  },
  card: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.lg,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.sm + 2,
  },
  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabelWithIcon: {
    fontSize: 15,
    color: defaultColors.text,
    fontWeight: '500',
    marginLeft: Layout.spacing.sm,
  },
  settingLabel: {
    fontSize: 15,
    color: defaultColors.text,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 14,
    color: defaultColors.primary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: defaultColors.borderLight,
  },
});

