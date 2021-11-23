import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import SearchMain from './SearchMain';
import SearchShow from './SearchShow';
import ShowList from './ShowList';
import { TouchableView } from '../Common';

const Stack = createNativeStackNavigator();

export type SearchStackParamList = {
  SearchMain: undefined;
  SearchShow: undefined;
  ShowList: { category?: string; tag?: string };
  ShowDetail: { showId: number };
  CastingBoard: { casts: Casting[] };
  ReviewDetail: {
    reviewId: number;
    user: { nickname: string; profile?: string };
    location: string;
    score: number;
    seatInfo: string;
  };
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

export const blackArrowScreenOptions = (navigation: any) => ({
  title: '',
  headerShown: true,
  headerTransparent: true,
  headerShadowVisible: false,
  headerLeft: () => (
    <TouchableView onPress={() => navigation.goBack()} viewStyle={{ padding: 10 }}>
      <LeftArrow />
    </TouchableView>
  ),
});

const SearchNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="SearchMain" component={SearchMain} />
      <Stack.Screen
        name="SearchShow"
        component={SearchShow}
        options={({ navigation }) => blackArrowScreenOptions(navigation)}
      />
      <Stack.Screen
        name="ShowList"
        component={ShowList}
        options={({ route, navigation }) => {
          const showListRoute = route as RouteProp<SearchStackParamList, 'ShowList'>;
          return titleScreenOptions(navigation, `${showListRoute.params?.category ?? showListRoute.params.tag} 작품`);
        }}
      />
      <Stack.Group>
        <Stack.Screen
          name="ShowDetail"
          component={ShowDetail}
          options={({ navigation }) => showDetailScreenOptions(navigation)}
        />
        <Stack.Screen
          name="CastingBoard"
          component={CastingBoard}
          options={({ navigation }) => titleScreenOptions(navigation, '캐스팅')}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SearchNavigator;
