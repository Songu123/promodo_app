/**
 * Focus Pomodoro - Design System Colors
 * Specified in AGENT.md Section 5.1
 */

export const Colors = {
  dark: {
    // Backgrounds
    background: '#101827',
    secondaryBackground: '#1B2638',
    card: '#1E293B',
    cardHover: '#253349',
    
    // Accents & Actions
    primary: '#38BDF8', // Cyan / Light Blue accent
    primaryMuted: 'rgba(56, 189, 248, 0.15)',
    tint: '#38BDF8',
    
    // Status colors
    success: '#22C55E', // Green
    successMuted: 'rgba(34, 197, 94, 0.15)',
    warning: '#F59E0B', // Amber
    warningMuted: 'rgba(245, 158, 11, 0.15)',
    danger: '#EF4444', // Red
    dangerMuted: 'rgba(239, 68, 68, 0.15)',
    
    // Typography
    text: '#F8FAFC',
    secondaryText: '#94A3B8',
    mutedText: '#64748B',
    
    // Borders & Dividers
    border: '#334155',
    borderLight: '#1E293B',
    
    // Tab bar
    tabBarBackground: '#131D2E',
    tabBarBorder: '#1E293B',
    tabBarActive: '#38BDF8',
    tabBarInactive: '#64748B',
  },
  light: {
    background: '#F8FAFC',
    secondaryBackground: '#F1F5F9',
    card: '#FFFFFF',
    cardHover: '#F8FAFC',
    primary: '#0284C7',
    primaryMuted: 'rgba(2, 132, 199, 0.12)',
    tint: '#0284C7',
    success: '#16A34A',
    successMuted: 'rgba(22, 163, 74, 0.12)',
    warning: '#D97706',
    warningMuted: 'rgba(217, 119, 6, 0.12)',
    danger: '#DC2626',
    dangerMuted: 'rgba(220, 38, 38, 0.12)',
    text: '#0F172A',
    secondaryText: '#475569',
    mutedText: '#94A3B8',
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    tabBarBackground: '#FFFFFF',
    tabBarBorder: '#E2E8F0',
    tabBarActive: '#0284C7',
    tabBarInactive: '#94A3B8',
  }
} as const;

export type ThemeColors = typeof Colors.dark;

// Default theme is Dark according to AGENT.md Section 5.1
export const defaultColors = Colors.dark;

export default Colors;
