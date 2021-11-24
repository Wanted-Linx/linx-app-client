import React from 'react';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import HomeMain from './HomeMain';
import { LinxLogo } from '../../assets/images';
import { responsiveWidth as rw } from '../../style/dimensions';
import colors from '../../style/colors';
import { TouchableView } from '../Common';
import { LeftArrow } from '../../assets/images';
import globalStyles from '../../style/styles';

const Stack = createNativeStackNavigator();

export type HomeStackParamList = {
  HomeMain: undefined;
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

export const defaultHeaderOption = {
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

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeMain" component={HomeMain} options={mainScreenOptions} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
