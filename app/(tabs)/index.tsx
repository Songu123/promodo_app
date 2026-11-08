import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaultColors } from '../../src/constants/Colors';
import { Layout } from '../../src/constants/Layout';
import { Header } from '../../src/components/common/Header';
import { Card } from '../../src/components/common/Card';
import { Button } from '../../src/components/common/Button';
import { formatTime } from '../../src/utils/time';
import { Play, Pause, RotateCcw, SkipForward, CheckCircle2, Sparkles } from 'lucide-react-native';

export default function FocusScreen() {
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [completedSessions, setCompletedSessions] = useState(0);

  const handleToggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (mode === 'focus') setSecondsRemaining(25 * 60);
    else if (mode === 'shortBreak') setSecondsRemaining(5 * 60);
    else setSecondsRemaining(15 * 60);
  };

  const handleSelectMode = (newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === 'focus') setSecondsRemaining(25 * 60);
    else if (newMode === 'shortBreak') setSecondsRemaining(5 * 60);
    else setSecondsRemaining(15 * 60);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header
        title="Focus Pomodoro"
        subtitle={`Session ${completedSessions + 1} of 4 • iOS 15.8`}
        showAppIcon={true}
      />

      <View style={styles.content}>
        {/* Live Dev Badge showing the new App Icon */}
        <View style={styles.iconShowcaseBanner}>
          <Image
            source={require('../../assets/images/icon.png')}
            style={styles.showcaseIcon}
          />
          <View style={styles.showcaseTextContainer}>
            <View style={styles.liveBadgeRow}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBadgeText}>LIVE METRO CONNECTED</Text>
            </View>
            <Text style={styles.showcaseTitle}>New Sleek Neon Icon Active</Text>
            <Text style={styles.showcaseSubtitle}>Shake device or press 'r' to reload bundle</Text>
          </View>
        </View>

        {/* Mode Selector */}
        <View style={styles.modeContainer}>
          <Button
            title="Focus"
            size="sm"
            variant={mode === 'focus' ? 'primary' : 'ghost'}
            onPress={() => handleSelectMode('focus')}
            style={styles.modeButton}
          />
          <Button
            title="Short Break"
            size="sm"
            variant={mode === 'shortBreak' ? 'primary' : 'ghost'}
            onPress={() => handleSelectMode('shortBreak')}
            style={styles.modeButton}
          />
          <Button
            title="Long Break"
            size="sm"
            variant={mode === 'longBreak' ? 'primary' : 'ghost'}
            onPress={() => handleSelectMode('longBreak')}
            style={styles.modeButton}
          />
        </View>

        {/* Timer Display Card */}
        <Card style={styles.timerCard}>
          <View style={styles.timerCircle}>
            <Text style={styles.timerDigits}>{formatTime(secondsRemaining)}</Text>
            <Text style={styles.timerModeLabel}>
              {mode === 'focus' ? 'STAY FOCUSED' : 'REST & RECHARGE'}
            </Text>
          </View>
        </Card>

        {/* Active Task Link */}
        <Card style={styles.taskCard} variant="secondary">
          <View style={styles.taskRow}>
            <CheckCircle2 color={defaultColors.primary} size={20} />
            <View style={styles.taskTextContainer}>
              <Text style={styles.taskHeading}>Current Focus</Text>
              <Text style={styles.taskTitle}>Setup Project Foundation</Text>
            </View>
          </View>
        </Card>

        {/* Action Controls */}
        <View style={styles.controlsRow}>
          <Button
            title=""
            icon={<RotateCcw color={defaultColors.secondaryText} size={22} />}
            variant="secondary"
            size="lg"
            onPress={handleReset}
            style={styles.circleButton}
          />

          <Button
            title={isRunning ? 'Pause' : 'Start Focus'}
            icon={
              isRunning ? (
                <Pause color="#0F172A" size={22} />
              ) : (
                <Play color="#0F172A" size={22} />
              )
            }
            variant="primary"
            size="lg"
            onPress={handleToggleTimer}
            style={styles.mainActionButton}
          />

          <Button
            title=""
            icon={<SkipForward color={defaultColors.secondaryText} size={22} />}
            variant="secondary"
            size="lg"
            onPress={handleReset}
            style={styles.circleButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: defaultColors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.md,
    justifyContent: 'space-between',
    paddingBottom: Layout.spacing.lg,
  },
  iconShowcaseBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#162235',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.sm + 2,
    marginBottom: Layout.spacing.sm,
  },
  showcaseIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: defaultColors.primary,
  },
  showcaseTextContainer: {
    marginLeft: Layout.spacing.md,
    flex: 1,
  },
  liveBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: defaultColors.success,
    marginRight: 6,
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: defaultColors.primary,
    letterSpacing: 1,
  },
  showcaseTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: defaultColors.text,
    marginTop: 2,
  },
  showcaseSubtitle: {
    fontSize: 11,
    color: defaultColors.secondaryText,
    marginTop: 1,
  },
  modeContainer: {
    flexDirection: 'row',
    backgroundColor: defaultColors.secondaryBackground,
    borderRadius: Layout.borderRadius.md,
    padding: 4,
    justifyContent: 'space-between',
  },
  modeButton: {
    flex: 1,
    marginHorizontal: 2,
  },
  timerCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.xl,
    borderRadius: Layout.borderRadius.xl,
    backgroundColor: defaultColors.secondaryBackground,
    borderWidth: 1,
    borderColor: defaultColors.border,
  },
  timerCircle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 6,
    borderColor: defaultColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: defaultColors.background,
  },
  timerDigits: {
    fontSize: 54,
    fontWeight: '800',
    color: defaultColors.text,
    letterSpacing: -1,
  },
  timerModeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: defaultColors.primary,
    letterSpacing: 2,
    marginTop: Layout.spacing.xs,
  },
  taskCard: {
    marginVertical: Layout.spacing.sm,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTextContainer: {
    marginLeft: Layout.spacing.md,
  },
  taskHeading: {
    fontSize: 11,
    color: defaultColors.secondaryText,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  taskTitle: {
    fontSize: 15,
    color: defaultColors.text,
    fontWeight: '600',
    marginTop: 2,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: Layout.spacing.md,
  },
  circleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  mainActionButton: {
    flex: 1,
    marginHorizontal: Layout.spacing.md,
    height: 56,
    borderRadius: Layout.borderRadius.full,
  },
});
