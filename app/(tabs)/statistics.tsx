import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaultColors } from '../../src/constants/Colors';
import { Layout } from '../../src/constants/Layout';
import { Header } from '../../src/components/common/Header';
import { Card } from '../../src/components/common/Card';
import { Clock, CheckSquare, Flame, Trophy } from 'lucide-react-native';

export default function StatisticsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header
        title="Statistics"
        subtitle="Review your focus performance"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Metric Cards Grid */}
        <View style={styles.grid}>
          <Card style={styles.metricCard} variant="secondary">
            <View style={styles.iconBadge}>
              <Clock color={defaultColors.primary} size={20} />
            </View>
            <Text style={styles.metricValue}>12h 30m</Text>
            <Text style={styles.metricLabel}>Total Focus Time</Text>
          </Card>

          <Card style={styles.metricCard} variant="secondary">
            <View style={[styles.iconBadge, { backgroundColor: defaultColors.successMuted }]}>
              <Trophy color={defaultColors.success} size={20} />
            </View>
            <Text style={styles.metricValue}>28</Text>
            <Text style={styles.metricLabel}>Sessions Finished</Text>
          </Card>

          <Card style={styles.metricCard} variant="secondary">
            <View style={[styles.iconBadge, { backgroundColor: defaultColors.warningMuted }]}>
              <Flame color={defaultColors.warning} size={20} />
            </View>
            <Text style={styles.metricValue}>5 Days</Text>
            <Text style={styles.metricLabel}>Current Streak</Text>
          </Card>

          <Card style={styles.metricCard} variant="secondary">
            <View style={styles.iconBadge}>
              <CheckSquare color={defaultColors.primary} size={20} />
            </View>
            <Text style={styles.metricValue}>14</Text>
            <Text style={styles.metricLabel}>Tasks Completed</Text>
          </Card>
        </View>

        {/* Weekly Productivity Breakdown */}
        <Card style={styles.chartCard} variant="secondary">
          <Text style={styles.cardHeading}>Weekly Overview</Text>
          <Text style={styles.cardSubheading}>Focus sessions completed per day</Text>

          <View style={styles.barChartContainer}>
            {[
              { day: 'Mon', count: 4, height: 40 },
              { day: 'Tue', count: 6, height: 60 },
              { day: 'Wed', count: 8, height: 80 },
              { day: 'Thu', count: 5, height: 50 },
              { day: 'Fri', count: 7, height: 70 },
              { day: 'Sat', count: 3, height: 30 },
              { day: 'Sun', count: 2, height: 20 },
            ].map((bar) => (
              <View key={bar.day} style={styles.barColumn}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { height: bar.height },
                      bar.day === 'Wed' && styles.barFillActive,
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{bar.day}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Focus Efficiency Tip */}
        <Card style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Pomodoro Principle</Text>
          <Text style={styles.tipText}>
            Taking consistent 5-minute short breaks prevents mental fatigue and maintains your focus for longer sessions.
          </Text>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.md,
  },
  metricCard: {
    width: '48%',
    marginBottom: Layout.spacing.sm,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.lg,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: Layout.borderRadius.sm,
    backgroundColor: defaultColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.sm,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: defaultColors.text,
  },
  metricLabel: {
    fontSize: 12,
    color: defaultColors.secondaryText,
    marginTop: 2,
  },
  chartCard: {
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: defaultColors.text,
  },
  cardSubheading: {
    fontSize: 12,
    color: defaultColors.secondaryText,
    marginBottom: Layout.spacing.md,
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    paddingTop: Layout.spacing.sm,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barTrack: {
    height: 90,
    width: 16,
    backgroundColor: defaultColors.card,
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: defaultColors.border,
    borderRadius: 8,
  },
  barFillActive: {
    backgroundColor: defaultColors.primary,
  },
  barLabel: {
    fontSize: 11,
    color: defaultColors.secondaryText,
    marginTop: 6,
    fontWeight: '500',
  },
  tipCard: {
    backgroundColor: defaultColors.secondaryBackground,
    borderColor: defaultColors.border,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: defaultColors.primary,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: defaultColors.secondaryText,
    lineHeight: 18,
  },
});

