import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export type HapticType = 'selection' | 'success' | 'warning' | 'heavy' | 'medium';

export const triggerHaptic = async (type: HapticType = 'selection'): Promise<void> => {
  if (Platform.OS === 'web') return;
  try {
    switch (type) {
      case 'selection':
        await Haptics.selectionAsync();
        break;
      case 'success':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'heavy':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'medium':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
    }
  } catch (error) {
    // Gracefully ignore if haptics is unsupported on device
  }
};
