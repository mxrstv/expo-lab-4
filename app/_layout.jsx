import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as db from '../utils/db.js';

export default function Layout() {
  useEffect(() => {
    const initApp = async () => {
      await db.initDB();
    };
    initApp();
  }, []);
  
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
