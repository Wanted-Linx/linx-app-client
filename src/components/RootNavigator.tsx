import React from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import MainNavigator from './MainNavigator';
import type { MainTabParamList } from './MainNavigator';
import Login from './Login';
import SignUpEmail from './SignUpEmail';
import ProjectDetail from './Project/ProjectDetail';
import ProjectRegisterInfo from './Project/ProjectRegisterInfo';
import ProjectRegisterDetail from './Project/ProjectRegisterDetail';
import { leftArrowScreenOptions } from './Home';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MainNavigator: NavigatorScreenParams<MainTabParamList>;
  Login: { isStudent: boolean };
  SignUpEmail: { isStudent: boolean };
  ProjectDetail: { projectId: number; isRecruiting: boolean };
  ProjectRegisterInfo: undefined;
  ProjectRegisterDetail: {
    project: {
      task_type: string[];
      name: string;
      applying_start_date: string;
      applying_end_date: string;
      sponsor_fee: number;
    };
  };
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
      <Stack.Group screenOptions={({ navigation }) => leftArrowScreenOptions(navigation, '프로젝트 등록')}>
        <Stack.Screen name="ProjectRegisterInfo" component={ProjectRegisterInfo} />
        <Stack.Screen name="ProjectRegisterDetail" component={ProjectRegisterDetail} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigator;
