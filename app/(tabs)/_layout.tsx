import React from 'react';
import { Tabs } from 'expo-router';
import { defaultColors } from '../../src/constants/Colors';
import { Timer, CheckSquare, BarChart2, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: defaultColors.tabBarBackground,
          borderTopColor: defaultColors.tabBarBorder,
          borderTopWidth: 1,
          elevation: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: defaultColors.tabBarActive,
        tabBarInactiveTintColor: defaultColors.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Focus',
          tabBarIcon: ({ color, size }) => (
            <Timer color={color} size={size ?? 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <CheckSquare color={color} size={size ?? 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size }) => (
            <BarChart2 color={color} size={size ?? 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size ?? 22} />
          ),
        }}
      />

    </Tabs>
  );
}
