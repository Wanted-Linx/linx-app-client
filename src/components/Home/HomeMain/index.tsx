import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useRecoilValue } from 'recoil';

import { RootStackParamList } from '../../RootNavigator';
import { MainTabParamList } from '../../MainNavigator';
import { HomeStackParamList } from '../index';
import HomeMainPresenter from './HomeMainPresenter';
import { defaultErrorAlert } from '../../../utils/errorUtils';
import type { ImageData, ProjectData } from '../../Common';
import { authAPI, projectApi } from '../../../api';
import { userTypeState } from '../../../state';

type HomeMainProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'HomeMain'>,
  CompositeScreenProps<BottomTabScreenProps<MainTabParamList>, NativeStackScreenProps<RootStackParamList>>
>;

const bannerImages: ImageData[] = [
  {
    imageUrl: 'https://certifind.com/blog/wp-content/uploads/2017/11/Work-Ethics3.jpg',
    url: 'https://wooded-colby-4c1.notion.site/9a3d2855dd6441dda4de8ffd2441cbbc',
  },
  {
    imageUrl: 'https://scarlettlibrarian.files.wordpress.com/2010/08/professional.jpg',
    url: 'https://wooded-colby-4c1.notion.site/9a3d2855dd6441dda4de8ffd2441cbbc',
  },
  {
    imageUrl: 'https://biznpro.co.kr/wp-content/uploads/2020/06/problem-4129493_1920_wide-screen_rev1.jpg',
    url: 'https://wooded-colby-4c1.notion.site/9a3d2855dd6441dda4de8ffd2441cbbc',
  },
];

const HomeMain: FC<HomeMainProps> = ({ navigation }) => {
  const userType = useRecoilValue(userTypeState);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const getProjectLList = async () => {
    try {
      const { data } = await projectApi.getProjectList(authAPI(), 10, 0);
      setProjects(data);
    } catch (error) {
      defaultErrorAlert();
    }
  };
  useEffect(() => {
    getProjectLList();
  }, []);

  const handelPressImage = (url: string) => console.log(url);
  const handelPressProject = (projectId: number) =>
    navigation.navigate('ProjectDetail', { projectId, isRecruiting: true });
  const handelPressLogin = () => navigation.navigate('Login', { isStudent: false });
  const handelPressSignUp = () => navigation.navigate('SignUpEmail', { isStudent: false });
  const handlePressAddProject = () => navigation.navigate('ProjectRegisterInfo');

  return (
    <HomeMainPresenter
      userType={userType}
      bannerImages={bannerImages}
      projects={projects}
      onPressImage={handelPressImage}
      onPressProject={handelPressProject}
      onPressLogin={handelPressLogin}
      onPressSignUp={handelPressSignUp}
      onPressAddProject={handlePressAddProject}
    />
  );
};

export default HomeMain;
