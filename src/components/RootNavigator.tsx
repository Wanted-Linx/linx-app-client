import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import MainNavigator from './MainNavigator';
import ProjectDetail from './Project/ProjectDetail';
import { TouchableView } from './Common';
import { LeftArrow } from '../assets/images';
import globalStyles from '../style/styles';
import colors from '../style/colors';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MainNavigator: undefined;
  ProjectDetail: { projectId: number; isRecruiting: boolean };
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const defaultHeaderOption = {
  title: '',
  headerShown: true,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: colors.colorGray000,
  },
};

export const leftArrowScreenOptions = (navigation: any, title?: string): NativeStackNavigationOptions => ({
  ...defaultHeaderOption,
  title: title ?? '',
  headerTitleStyle: {
    ...globalStyles.textHeadline20,
  },
  headerShadowVisible: true,
  headerLeft: () => (
    <TouchableView onPress={() => navigation.goBack()}>
      <LeftArrow />
    </TouchableView>
  ),
});

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetail}
        options={({ navigation }) => leftArrowScreenOptions(navigation)}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
