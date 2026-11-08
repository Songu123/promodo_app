import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { TimerMode } from '../types';

// Configure notification behavior when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

let activeNotificationId: string | null = null;

export const requestNotificationPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'web') return false;
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    return finalStatus === 'granted';
  } catch (error) {
    console.warn('Failed to obtain notification permissions:', error);
    return false;
  }
};

export const scheduleSessionCompleteNotification = async (
  mode: TimerMode,
  secondsRemaining: number
): Promise<string | null> => {
  if (Platform.OS === 'web' || secondsRemaining <= 0) return null;
  try {
    await cancelTimerNotification();

    const title =
      mode === 'focus'
        ? '🍅 Focus Session Complete!'
        : mode === 'shortBreak'
        ? '☕ Short Break Finished!'
        : '🌟 Long Break Finished!';

    const body =
      mode === 'focus'
        ? 'Great job! Time to take a well-deserved break.'
        : 'Break is over! Time to focus and get things done.';

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: Math.max(1, Math.round(secondsRemaining)),
      },
    });

    activeNotificationId = id;
    return id;
  } catch (error) {
    console.warn('Failed to schedule notification:', error);
    return null;
  }
};

export const cancelTimerNotification = async (): Promise<void> => {
  if (Platform.OS === 'web') return;
  try {
    if (activeNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(activeNotificationId);
      activeNotificationId = null;
    }
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.warn('Failed to cancel notifications:', error);
  }
};
