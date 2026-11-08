import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { defaultColors } from '../src/constants/Colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Return to Focus</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: defaultColors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: defaultColors.text,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: defaultColors.primary,
  },
});
