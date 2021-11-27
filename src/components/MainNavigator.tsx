import React, { useEffect } from 'react';
import type { FC } from 'react';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetRecoilState } from 'recoil';

import Home from './Home';
import type { HomeStackParamList } from './Home';
import Search from './Search';
import type { SearchStackParamList } from './Search';
import Project from './Project';
import type { ProjectStackParamList } from './Project';
import Profile from './Profile';
import type { ProfileStackParamList } from './Profile';
import { responsiveHeight as rh } from '../style/dimensions';
import {
  HomeTabActive,
  HomeTabInactive,
  SearchTabActive,
  SearchTabInactive,
  ProjectTabActive,
  ProjectTabInactive,
  ProfileTabActive,
  ProfileTabInactive,
} from '../assets/images';
import colors from '../style/colors';
import { userTypeState } from '../state';

const Tab = createBottomTabNavigator();

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Search: NavigatorScreenParams<SearchStackParamList>;
  Project: NavigatorScreenParams<ProjectStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle: {
    height: rh(80),
    paddingTop: rh(12),
    backgroundColor: colors.colorGray000,
  },
};

const homeOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (focused ? <HomeTabActive /> : <HomeTabInactive />),
  tabBarLabel: '홈',
};
const searchOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (focused ? <SearchTabActive /> : <SearchTabInactive />),
  tabBarLabel: '탐색',
};
const projectOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (focused ? <ProjectTabActive /> : <ProjectTabInactive />),
  tabBarLabel: '프로젝트',
};
const profileOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (focused ? <ProfileTabActive /> : <ProfileTabInactive />),
  tabBarLabel: '프로필',
};

const MainNavigator: FC = () => {
  const setUserType = useSetRecoilState(userTypeState);

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      const userType = await AsyncStorage.getItem('userType');
      if (userType) {
        setUserType(userType);
      }
      SplashScreen.hide();
    }, 1500);
    return () => clearTimeout(timeOutId);
  }, []);

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} options={homeOptions} />
      <Tab.Screen name="Search" component={Search} options={searchOptions} />
      <Tab.Screen name="Project" component={Project} options={projectOptions} />
      <Tab.Screen name="Profile" component={Profile} options={profileOptions} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
