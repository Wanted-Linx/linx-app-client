import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import HomeMain from './HomeMain';
import SignUpEmail from '../SignUpEmail';
import SignUpProfile from '../SignUpProfile';
import { TouchableView } from '../Common';

const Stack = createNativeStackNavigator();

export type ProfileStackParamList = {
  HomeMain: undefined;
  SignUpEmail: undefined;
  SignUpProfile: { username: string; password?: string };
  SignUpCampaign: { username: string; password?: string; nickname: string };
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const signUpScreenOptions = (navigation: any) => ({
  title: '',
  headerShown: true,
  headerTransparent: true,
  headerStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
  },
  headerShadowVisible: false,
  headerLeft: () => (
    <TouchableView onPress={() => navigation.goBack()} viewStyle={{ padding: 10 }}>
      <LeftArrow />
    </TouchableView>
  ),
});

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeMain" component={HomeMain} />
      <Stack.Group screenOptions={({ navigation }) => signUpScreenOptions(navigation)}>
        <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
        <Stack.Screen name="SignUpProfile" component={SignUpProfile} />
        <Stack.Screen name="SignUpCampaign" component={SignUpCampaign} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
