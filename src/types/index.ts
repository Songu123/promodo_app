/**
 * Focus Pomodoro - Core Type Definitions
 * Specified in AGENT.md Section 7
 */

export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  createdAt: number;
  updatedAt: number;
  dueDate?: number;
  completedAt?: number;
}

export type SessionType = 'focus' | 'shortBreak' | 'longBreak';
export type SessionStatus = 'completed' | 'interrupted';

export interface PomodoroSession {
  id: string;
  taskId?: string;
  type: SessionType;
  duration: number; // Duration in seconds
  startedAt: number; // Unix timestamp ms
  completedAt?: number; // Unix timestamp ms
  status: SessionStatus;
}

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';
export type TimerStatus = 'idle' | 'running' | 'paused';

export interface TimerState {
  mode: TimerMode;
  status: TimerStatus;
  duration: number; // Total duration in seconds
  remainingTime: number; // Remaining duration in seconds
  startedAt?: number; // Unix timestamp ms
  endsAt?: number; // Unix timestamp ms (when running)
  pausedAt?: number; // Unix timestamp ms (when paused)
  completedSessionsCount: number; // Count of completed focus sessions in current cycle
}

export interface UserSettings {
  focusDuration: number; // in minutes (default: 25)
  shortBreakDuration: number; // in minutes (default: 5)
  longBreakDuration: number; // in minutes (default: 15)
  longBreakInterval: number; // default: 4 completed focus sessions
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  notificationsEnabled: boolean;
  theme: 'dark' | 'light';
}

export interface ProductivitySummary {
  totalFocusTimeMinutes: number;
  completedSessions: number;
  completedTasksCount: number;
  dailyFocusMinutes: { date: string; minutes: number }[];
  weeklyFocusMinutes: { week: string; minutes: number }[];
}

