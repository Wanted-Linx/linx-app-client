import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { RootStackParamList } from '../../RootNavigator';
import { MainTabParamList } from '../../MainNavigator';
import { HomeStackParamList } from '../index';
import HomeMainPresenter from './HomeMainPresenter';
import { defaultErrorAlert } from '../../../utils/errorUtils';
import type { ImageData, ProjectData } from '../../Common';

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

const projects: ProjectData[] = [
  {
    projectId: 1,
    categoies: ['기획', '개발'],
    title: '채용 연계형 해커톤 해, 커리어',
    company: 'Wanted',
    bookmark: false,
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut dolore in hic maiores? Repellat mollitia laudantium repellendus fugit blanditiis quibusdam cupiditate eligendi doloremque incidunt, consequuntur dicta sit eaque, impedit at?',
    endDate: 'D-14',
    sponsorFee: '50만원',
  },
  {
    projectId: 2,
    categoies: ['마케팅', '기획'],
    title: '채용 연계형 해커톤 해, 커리어',
    company: 'Wanted',
    bookmark: true,
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut dolore in hic maiores? Repellat mollitia laudantium repellendus fugit blanditiis quibusdam cupiditate eligendi doloremque incidunt, consequuntur dicta sit eaque, impedit at?',
    endDate: 'D-14',
    sponsorFee: '50만원',
  },
  {
    projectId: 3,
    categoies: ['디자인', '개발'],
    title: '채용 연계형 해커톤 해, 커리어',
    company: 'Wanted',
    bookmark: false,
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut dolore in hic maiores? Repellat mollitia laudantium repellendus fugit blanditiis quibusdam cupiditate eligendi doloremque incidunt, consequuntur dicta sit eaque, impedit at?',
    endDate: 'D-14',
    sponsorFee: '50만원',
  },
];

const HomeMain: FC<HomeMainProps> = ({ navigation }) => {
  const getBanners = async () => {
    try {
      // const { data } = await realtimeApi.getRealtimes();
    } catch (error) {
      defaultErrorAlert();
    }
  };
  useEffect(() => {
    // getBanners();
  }, []);

  const handelPressImage = (url: string) => console.log(url);
  const handelPressProject = (projectId: number) =>
    navigation.navigate('ProjectDetail', { projectId, isRecruiting: true });

  return (
    <HomeMainPresenter
      bannerImages={bannerImages}
      projects={projects}
      onPressImage={handelPressImage}
      onPressProject={handelPressProject}
    />
  );
};

export default HomeMain;
