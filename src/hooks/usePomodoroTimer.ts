import { useState, useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TimerMode, TimerStatus, UserSettings } from '../types';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '../constants/Config';
import { triggerHaptic } from '../services/hapticsService';
import {
  scheduleSessionCompleteNotification,
  cancelTimerNotification,
} from '../services/notificationService';

export interface UsePomodoroTimerOptions {
  settings?: UserSettings;
  onSessionComplete?: (mode: TimerMode, completedCount: number) => void;
}

export function usePomodoroTimer({
  settings = DEFAULT_SETTINGS,
  onSessionComplete,
}: UsePomodoroTimerOptions = {}) {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  // Get duration in seconds for given mode
  const getDurationForMode = useCallback(
    (m: TimerMode): number => {
      switch (m) {
        case 'focus':
          return (settings.focusDuration || 25) * 60;
        case 'shortBreak':
          return (settings.shortBreakDuration || 5) * 60;
        case 'longBreak':
          return (settings.longBreakDuration || 15) * 60;
      }
    },
    [settings]
  );

  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => getDurationForMode('focus'));
  const endsAtRef = useRef<number | null>(null);
  const statusRef = useRef<TimerStatus>('idle');
  const modeRef = useRef<TimerMode>('focus');
  const completedSessionsRef = useRef<number>(0);

  // Keep refs in sync for timer callbacks & AppState
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    completedSessionsRef.current = completedSessions;
  }, [completedSessions]);

  // Handle completion of a session
  const handleComplete = useCallback(
    async (completedMode: TimerMode) => {
      endsAtRef.current = null;
      setStatus('idle');
      await triggerHaptic('success');
      await cancelTimerNotification();

      let nextCompletedCount = completedSessionsRef.current;
      let nextMode: TimerMode = 'focus';

      if (completedMode === 'focus') {
        nextCompletedCount += 1;
        setCompletedSessions(nextCompletedCount);

        const interval = settings.longBreakInterval || 4;
        if (nextCompletedCount % interval === 0) {
          nextMode = 'longBreak';
        } else {
          nextMode = 'shortBreak';
        }
      } else {
        // Break finished, next is focus
        nextMode = 'focus';
      }

      setMode(nextMode);
      setRemainingSeconds(getDurationForMode(nextMode));

      if (onSessionComplete) {
        onSessionComplete(completedMode, nextCompletedCount);
      }
    },
    [getDurationForMode, onSessionComplete, settings.longBreakInterval]
  );

  // Start / Resume timer
  const start = useCallback(async () => {
    const currentRemaining = remainingSeconds > 0 ? remainingSeconds : getDurationForMode(mode);
    const targetEndsAt = Date.now() + currentRemaining * 1000;
    endsAtRef.current = targetEndsAt;
    setStatus('running');

    await triggerHaptic('medium');
    await scheduleSessionCompleteNotification(mode, currentRemaining);
  }, [getDurationForMode, mode, remainingSeconds]);

  // Pause timer
  const pause = useCallback(async () => {
    if (endsAtRef.current) {
      const now = Date.now();
      const left = Math.max(0, Math.ceil((endsAtRef.current - now) / 1000));
      setRemainingSeconds(left);
      endsAtRef.current = null;
    }
    setStatus('paused');

    await triggerHaptic('selection');
    await cancelTimerNotification();
  }, []);

  // Reset timer to beginning of current mode
  const reset = useCallback(async () => {
    endsAtRef.current = null;
    setStatus('idle');
    setRemainingSeconds(getDurationForMode(mode));

    await triggerHaptic('selection');
    await cancelTimerNotification();
  }, [getDurationForMode, mode]);

  // Toggle Play / Pause
  const toggle = useCallback(() => {
    if (status === 'running') {
      pause();
    } else {
      start();
    }
  }, [pause, start, status]);

  // Skip to next session
  const skip = useCallback(async () => {
    endsAtRef.current = null;
    setStatus('idle');
    await cancelTimerNotification();
    await triggerHaptic('selection');

    let nextMode: TimerMode = 'focus';
    let nextCount = completedSessions;

    if (mode === 'focus') {
      nextCount += 1;
      setCompletedSessions(nextCount);
      const interval = settings.longBreakInterval || 4;
      nextMode = nextCount % interval === 0 ? 'longBreak' : 'shortBreak';
    } else {
      nextMode = 'focus';
    }

    setMode(nextMode);
    setRemainingSeconds(getDurationForMode(nextMode));
  }, [completedSessions, getDurationForMode, mode, settings.longBreakInterval]);

  // Switch mode manually
  const selectMode = useCallback(
    async (newMode: TimerMode) => {
      endsAtRef.current = null;
      setStatus('idle');
      setMode(newMode);
      setRemainingSeconds(getDurationForMode(newMode));

      await triggerHaptic('selection');
      await cancelTimerNotification();
    },
    [getDurationForMode]
  );

  // Interval ticker when running
  useEffect(() => {
    if (status !== 'running') return;

    const intervalId = setInterval(() => {
      if (!endsAtRef.current) return;

      const now = Date.now();
      const diff = endsAtRef.current - now;

      if (diff <= 0) {
        clearInterval(intervalId);
        setRemainingSeconds(0);
        handleComplete(modeRef.current);
      } else {
        const secs = Math.ceil(diff / 1000);
        setRemainingSeconds(secs);
      }
    }, 250);

    return () => clearInterval(intervalId);
  }, [handleComplete, status]);

  // Handle AppState (Background -> Foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && statusRef.current === 'running' && endsAtRef.current) {
        const now = Date.now();
        const diff = endsAtRef.current - now;

        if (diff <= 0) {
          setRemainingSeconds(0);
          handleComplete(modeRef.current);
        } else {
          setRemainingSeconds(Math.ceil(diff / 1000));
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [handleComplete]);

  // Total duration for current mode
  const totalDuration = getDurationForMode(mode);
  const progress = totalDuration > 0 ? (totalDuration - remainingSeconds) / totalDuration : 0;

  return {
    mode,
    status,
    remainingSeconds,
    totalDuration,
    progress,
    completedSessions,
    cycleSessionIndex: completedSessions % (settings.longBreakInterval || 4),
    start,
    pause,
    reset,
    toggle,
    skip,
    selectMode,
  };
}
