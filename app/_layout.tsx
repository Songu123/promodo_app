import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { defaultColors } from '../src/constants/Colors';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

const FocusPomodoroDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: defaultColors.primary,
    background: defaultColors.background,
    card: defaultColors.tabBarBackground,
    text: defaultColors.text,
    border: defaultColors.tabBarBorder,
    notification: defaultColors.primary,
  },
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider value={FocusPomodoroDarkTheme}>
        <StatusBar style="light" backgroundColor={defaultColors.background} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: defaultColors.background,
            },
            headerTintColor: defaultColors.text,
            contentStyle: {
              backgroundColor: defaultColors.background,
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
