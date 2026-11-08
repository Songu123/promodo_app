import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaultColors } from '../../src/constants/Colors';
import { Layout } from '../../src/constants/Layout';
import { Header } from '../../src/components/common/Header';
import { Card } from '../../src/components/common/Card';
import { Button } from '../../src/components/common/Button';
import { Task, Priority } from '../../src/types';
import { Plus, Check, Circle, AlertCircle } from 'lucide-react-native';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Initialize Expo SDK 54 project',
    description: 'Setup base configuration and TypeScript strict mode',
    priority: 'high',
    status: 'completed',
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now(),
    completedAt: Date.now(),
  },
  {
    id: '2',
    title: 'Configure TrollStore 2 GitHub Actions Workflow',
    description: 'Ensure unsigned IPA packaging works for iOS 15.8',
    priority: 'high',
    status: 'pending',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '3',
    title: 'Test Fast Refresh on iPhone 8 Plus',
    description: 'Connect to Metro tunnel over local WiFi',
    priority: 'medium',
    status: 'pending',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === 'completed' ? 'pending' : 'completed',
              completedAt: t.status === 'completed' ? undefined : Date.now(),
            }
          : t
      )
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return t.status === 'pending';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  const getPriorityColor = (p: Priority) => {
    if (p === 'high') return defaultColors.danger;
    if (p === 'medium') return defaultColors.warning;
    return defaultColors.primary;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header
        title="Tasks"
        subtitle={`${tasks.filter((t) => t.status === 'pending').length} tasks remaining`}
        rightAction={
          <Button
            title="New"
            size="sm"
            icon={<Plus color="#0F172A" size={16} />}
            onPress={() => {}}
          />
        }
      />

      <View style={styles.container}>
        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {(['all', 'pending', 'completed'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setFilter(tab)}
              style={[
                styles.filterPill,
                filter === tab && styles.filterPillActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === tab && styles.filterTextActive,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Task List */}
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Card style={styles.taskCard} variant="secondary">
              <TouchableOpacity
                style={styles.taskItemRow}
                onPress={() => toggleTask(item.id)}
              >
                <View
                  style={[
                    styles.checkbox,
                    item.status === 'completed' && styles.checkboxCompleted,
                  ]}
                >
                  {item.status === 'completed' ? (
                    <Check color="#0F172A" size={14} />
                  ) : (
                    <Circle color={defaultColors.border} size={14} />
                  )}
                </View>

                <View style={styles.taskInfo}>
                  <Text
                    style={[
                      styles.taskTitle,
                      item.status === 'completed' && styles.taskTitleCompleted,
                    ]}
                  >
                    {item.title}
                  </Text>
                  {item.description && (
                    <Text style={styles.taskDesc}>{item.description}</Text>
                  )}
                </View>

                <View
                  style={[
                    styles.priorityBadge,
                    { borderColor: getPriorityColor(item.priority) },
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      { color: getPriorityColor(item.priority) },
                    ]}
                  >
                    {item.priority}
                  </Text>
                </View>
              </TouchableOpacity>
            </Card>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AlertCircle color={defaultColors.secondaryText} size={32} />
              <Text style={styles.emptyText}>No tasks found in this view.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: defaultColors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: Layout.spacing.md,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
  },
  filterPill: {
    paddingVertical: Layout.spacing.xs + 2,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: defaultColors.secondaryBackground,
    marginRight: Layout.spacing.sm,
    borderWidth: 1,
    borderColor: defaultColors.border,
  },
  filterPillActive: {
    backgroundColor: defaultColors.primaryMuted,
    borderColor: defaultColors.primary,
  },
  filterText: {
    fontSize: 13,
    color: defaultColors.secondaryText,
    fontWeight: '500',
  },
  filterTextActive: {
    color: defaultColors.primary,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: Layout.spacing.lg,
  },
  taskCard: {
    marginBottom: Layout.spacing.sm,
  },
  taskItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: defaultColors.secondaryText,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.md,
  },
  checkboxCompleted: {
    backgroundColor: defaultColors.success,
    borderColor: defaultColors.success,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: defaultColors.text,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: defaultColors.mutedText,
  },
  taskDesc: {
    fontSize: 12,
    color: defaultColors.secondaryText,
    marginTop: 2,
  },
  priorityBadge: {
    borderWidth: 1,
    paddingHorizontal: Layout.spacing.xs + 4,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
    marginLeft: Layout.spacing.sm,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.xxl,
  },
  emptyText: {
    color: defaultColors.secondaryText,
    marginTop: Layout.spacing.sm,
    fontSize: 14,
  },
});

