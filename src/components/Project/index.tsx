import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export type ProjectStackParamList = {
  ProjectDetail: { projectId: number; isRecruiting: boolean };
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const TicketBook = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
    </Stack.Navigator>
  );
};

export default TicketBook;
