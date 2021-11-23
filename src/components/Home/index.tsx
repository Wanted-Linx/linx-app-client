import React from 'react';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import HomeMain from './HomeMain';
import { LinxLogo } from '../../assets/images';
import { responsiveWidth as rw } from '../../style/dimensions';
import colors from '../../style/colors';

const Stack = createNativeStackNavigator();

export type HomeStackParamList = {
  HomeMain: undefined;
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

const mainScreenOptions = {
  ...defaultHeaderOption,
  headerLeft: () => <Image source={LinxLogo} style={{ width: rw(70), height: rw(37) }} />,
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeMain" component={HomeMain} options={mainScreenOptions} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
