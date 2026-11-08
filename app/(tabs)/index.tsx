import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { defaultColors } from '../../src/constants/Colors';
import { Layout } from '../../src/constants/Layout';
import { Header } from '../../src/components/common/Header';
import { Card } from '../../src/components/common/Card';
import { Button } from '../../src/components/common/Button';
import { formatTime } from '../../src/utils/time';
import { usePomodoroTimer } from '../../src/hooks/usePomodoroTimer';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  Coffee,
  Flame,
  Award,
} from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DIAL_SIZE = Math.min(SCREEN_WIDTH * 0.72, 270);
const STROKE_WIDTH = 10;
const RADIUS = (DIAL_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function FocusScreen() {
  const {
    mode,
    status,
    remainingSeconds,
    progress,
    completedSessions,
    cycleSessionIndex,
    toggle,
    reset,
    skip,
    selectMode,
  } = usePomodoroTimer({
    onSessionComplete: (completedMode, count) => {
      console.log(`Completed ${completedMode} session #${count}`);
    },
  });

  const isRunning = status === 'running';

  // Dynamic color depending on active mode
  const getThemeColor = () => {
    switch (mode) {
      case 'focus':
        return defaultColors.primary; // Cyan #38BDF8
      case 'shortBreak':
        return defaultColors.success; // Green #22C55E
      case 'longBreak':
        return defaultColors.warning; // Amber #F59E0B
    }
  };

  const themeColor = getThemeColor();
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header
        title="Focus Pomodoro"
        subtitle={`Session ${completedSessions + 1} • Cycle #${Math.floor(completedSessions / 4) + 1}`}
        showAppIcon={true}
      />

      <View style={styles.content}>
        {/* Mode Selector Tabs */}
        <View style={styles.modeContainer}>
          <TouchableOpacity
            style={[
              styles.modeTab,
              mode === 'focus' && [styles.activeTab, { borderColor: defaultColors.primary }],
            ]}
            onPress={() => selectMode('focus')}
            activeOpacity={0.7}
          >
            <Flame
              size={16}
              color={mode === 'focus' ? defaultColors.primary : defaultColors.secondaryText}
            />
            <Text
              style={[
                styles.modeTabText,
                mode === 'focus' && { color: defaultColors.primary, fontWeight: '700' },
              ]}
            >
              Focus
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeTab,
              mode === 'shortBreak' && [styles.activeTab, { borderColor: defaultColors.success }],
            ]}
            onPress={() => selectMode('shortBreak')}
            activeOpacity={0.7}
          >
            <Coffee
              size={16}
              color={mode === 'shortBreak' ? defaultColors.success : defaultColors.secondaryText}
            />
            <Text
              style={[
                styles.modeTabText,
                mode === 'shortBreak' && { color: defaultColors.success, fontWeight: '700' },
              ]}
            >
              Short Break
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeTab,
              mode === 'longBreak' && [styles.activeTab, { borderColor: defaultColors.warning }],
            ]}
            onPress={() => selectMode('longBreak')}
            activeOpacity={0.7}
          >
            <Award
              size={16}
              color={mode === 'longBreak' ? defaultColors.warning : defaultColors.secondaryText}
            />
            <Text
              style={[
                styles.modeTabText,
                mode === 'longBreak' && { color: defaultColors.warning, fontWeight: '700' },
              ]}
            >
              Long Break
            </Text>
          </TouchableOpacity>
        </View>

        {/* 4-Session Cycle Indicator Dots */}
        <View style={styles.cycleProgressContainer}>
          <Text style={styles.cycleLabel}>DAILY CYCLE</Text>
          <View style={styles.dotsRow}>
            {[0, 1, 2, 3].map((index) => {
              const isDone = index < cycleSessionIndex;
              const isCurrent = index === cycleSessionIndex;
              return (
                <View
                  key={index}
                  style={[
                    styles.cycleDot,
                    isDone && { backgroundColor: defaultColors.primary, borderColor: defaultColors.primary },
                    isCurrent && [
                      styles.currentDot,
                      { borderColor: themeColor, backgroundColor: isRunning ? themeColor : 'transparent' },
                    ],
                  ]}
                />
              );
            })}
          </View>
        </View>

        {/* Circular Countdown Dial */}
        <View style={styles.dialContainer}>
          <Svg width={DIAL_SIZE} height={DIAL_SIZE}>
            {/* Background Track Circle */}
            <Circle
              stroke="#1E293B"
              fill="none"
              cx={DIAL_SIZE / 2}
              cy={DIAL_SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE_WIDTH}
            />
            {/* Animated Progress Arc */}
            <Circle
              stroke={themeColor}
              fill="none"
              cx={DIAL_SIZE / 2}
              cy={DIAL_SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${DIAL_SIZE / 2}, ${DIAL_SIZE / 2}`}
            />
          </Svg>

          {/* Central Digits & Status */}
          <View style={styles.dialInnerContent}>
            <Text style={[styles.dialModeLabel, { color: themeColor }]}>
              {mode === 'focus'
                ? 'FOCUS TIME'
                : mode === 'shortBreak'
                ? 'SHORT BREAK'
                : 'LONG BREAK'}
            </Text>
            <Text style={styles.timerDigits}>{formatTime(remainingSeconds)}</Text>
            <View style={styles.statusPill}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: isRunning ? defaultColors.success : defaultColors.secondaryText },
                ]}
              />
              <Text style={styles.statusPillText}>
                {status === 'running'
                  ? 'COUNTING DOWN'
                  : status === 'paused'
                  ? 'PAUSED'
                  : 'READY'}
              </Text>
            </View>
          </View>
        </View>

        {/* Active Task Link */}
        <Card style={styles.taskCard} variant="secondary">
          <View style={styles.taskRow}>
            <CheckCircle2 color={themeColor} size={20} />
            <View style={styles.taskTextContainer}>
              <Text style={styles.taskHeading}>Active Task</Text>
              <Text style={styles.taskTitle}>Build Pomodoro Countdown Engine</Text>
            </View>
          </View>
        </Card>

        {/* Primary Action Controls */}
        <View style={styles.controlsRow}>
          <Button
            title=""
            icon={<RotateCcw color={defaultColors.secondaryText} size={22} />}
            variant="secondary"
            size="lg"
            onPress={reset}
            style={styles.circleButton}
          />

          <TouchableOpacity
            style={[styles.mainActionButton, { backgroundColor: themeColor }]}
            onPress={toggle}
            activeOpacity={0.85}
          >
            {isRunning ? (
              <>
                <Pause color="#0F172A" size={24} />
                <Text style={styles.mainActionText}>Pause</Text>
              </>
            ) : (
              <>
                <Play color="#0F172A" size={24} />
                <Text style={styles.mainActionText}>
                  {status === 'paused' ? 'Resume' : 'Start Focus'}
                </Text>
              </>
            )}
          </TouchableOpacity>

          <Button
            title=""
            icon={<SkipForward color={defaultColors.secondaryText} size={22} />}
            variant="secondary"
            size="lg"
            onPress={skip}
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
  modeContainer: {
    flexDirection: 'row',
    backgroundColor: '#162235',
    borderRadius: Layout.borderRadius.lg,
    padding: 4,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  modeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#1B2638',
  },
  modeTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: defaultColors.secondaryText,
    marginLeft: 6,
  },
  cycleProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Layout.spacing.xs,
  },
  cycleLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: defaultColors.secondaryText,
    letterSpacing: 1,
    marginRight: Layout.spacing.sm,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cycleDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#334155',
    backgroundColor: 'transparent',
    marginHorizontal: 4,
  },
  currentDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  dialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Layout.spacing.sm,
    position: 'relative',
    height: DIAL_SIZE,
  },
  dialInnerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialModeLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  timerDigits: {
    fontSize: 58,
    fontWeight: '800',
    color: defaultColors.text,
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#162235',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.full,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginTop: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: defaultColors.secondaryText,
    letterSpacing: 0.5,
  },
  taskCard: {
    marginVertical: Layout.spacing.xs,
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
    justifyContent: 'space-between',
    marginTop: Layout.spacing.sm,
  },
  circleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainActionButton: {
    flex: 1,
    marginHorizontal: Layout.spacing.md,
    height: 56,
    borderRadius: Layout.borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainActionText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 8,
  },
});
