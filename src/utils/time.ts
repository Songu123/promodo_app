/**
 * Time utility functions for Focus Pomodoro
 */

export function formatTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function calculateRemainingSeconds(endsAt: number, now: number = Date.now()): number {
  const diffMs = endsAt - now;
  if (diffMs <= 0) return 0;
  return Math.ceil(diffMs / 1000);
}

export function formatDurationMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

export function formatSecondsToHumanReadable(seconds: number): string {
  const mins = Math.round(seconds / 60);
  return formatDurationMinutes(mins);
}
