import { UserSettings } from '../types';

export const DEFAULT_SETTINGS: UserSettings = {
  focusDuration: 25, // 25 minutes
  shortBreakDuration: 5, // 5 minutes
  longBreakDuration: 15, // 15 minutes
  longBreakInterval: 4, // 4 sessions
  soundEnabled: true,
  hapticsEnabled: true,
  notificationsEnabled: true,
  theme: 'dark',
};

export const STORAGE_KEYS = {
  USER_SETTINGS: '@focus_pomodoro:settings',
  TIMER_STATE: '@focus_pomodoro:timer_state',
  ACTIVE_TASK_ID: '@focus_pomodoro:active_task_id',
};

