import React from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import MainNavigator from './MainNavigator';
import type { MainTabParamList } from './MainNavigator';
import Login from './Login';
import SignUpEmail from './SignUpEmail';
import ProjectDetail from './Project/ProjectDetail';
import { leftArrowScreenOptions } from './Home';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MainNavigator: NavigatorScreenParams<MainTabParamList>;
  Login: { isStudent: boolean };
  SignUpEmail: { isStudent: boolean };
  ProjectDetail: { projectId: number; isRecruiting: boolean };
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
      <Stack.Screen name="Login" component={Login} options={({ navigation }) => leftArrowScreenOptions(navigation)} />
      <Stack.Screen
        name="SignUpEmail"
        component={SignUpEmail}
        options={({ navigation }) => leftArrowScreenOptions(navigation)}
      />
      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetail}
        options={({ navigation }) => leftArrowScreenOptions(navigation)}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
