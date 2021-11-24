import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import SearchMain from './SearchMain';
import ProfileDetail from './ProfileDetail';
import { leftArrowScreenOptions } from '../Home';

const Stack = createNativeStackNavigator();

export type SearchStackParamList = {
  SearchMain: undefined;
  ProfileDetail: { companyId?: number; clubId?: number; studentId?: number };
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const SearchNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="SearchMain" component={SearchMain} />
      <Stack.Screen
        name="ProfileDetail"
        component={ProfileDetail}
        options={({ navigation }) => leftArrowScreenOptions(navigation, '프로필')}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
