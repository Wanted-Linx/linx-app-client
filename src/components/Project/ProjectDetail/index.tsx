import React, { useEffect, useState, useLayoutEffect } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRecoilValue } from 'recoil';

import ProjectDetailPresenter from './ProjectDetailPresenter';
import { RootStackParamList } from '../../RootNavigator';
import { userTypeState } from '../../../state';
import { authAPI, likeApi } from '../../../api';
import { defaultErrorAlert } from '../../../utils';
import { TouchableView } from '../../Common';
import { BookmarkActive, BookmarkInactive } from '../../../assets/images';
import { responsiveWidth as rw } from '../../../style/dimensions';
import globalStyles from '../../../style/styles';

type ProjectDetailProps = NativeStackScreenProps<RootStackParamList, 'ProjectDetail'>;

export interface ProjectRecruitingData {
  id: number;
  title: string;
  company: {
    id: number;
    name: string;
    profile: string;
  };
  image: string;
  categories: string[];
  endDate: string;
  sponsorFee: string;
  experience: string;
  qualification: string;
  description: string;
  duration: string;
  bookmark: boolean;
}

export interface ProjectWorkingData {
  id: number;
  title: string;
  company: {
    id: number;
    name: string;
    profile: string;
  };
  image: string;
  categories: string[];
  duration: string;
  description: string;
  logs: LogData[];
}

export interface LogData {
  id: number;
  title: string;
  date: string;
}

const dummy1 = {
  id: 1,
  title: '채용연계형 대규모 해커톤 해,커리어!',
  company: {
    id: 1,
    name: 'Wanted',
    profile:
      'https://media-exp1.licdn.com/dms/image/C560BAQGQWpaAuJLC8A/company-logo_200_200/0/1626253203412?e=2159024400&v=beta&t=b7c6YH1wVtA0gU8sjBc3_qSioe1AVqTgyxulWBtdf0g',
  },
  image: 'https://cf-cpi.campuspick.com/activity/1634363522073924.jpg',
  categories: ['기획', '개발'],
  endDate: 'D-14',
  sponsorFee: '50만원',
  experience: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
  qualification: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
  description: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
  duration: '2개월',
  bookmark: false,
};

const dummy2 = {
  id: 1,
  title: '채용연계형 대규모 해커톤 해,커리어!',
  company: {
    id: 1,
    name: 'Wanted',
    profile:
      'https://media-exp1.licdn.com/dms/image/C560BAQGQWpaAuJLC8A/company-logo_200_200/0/1626253203412?e=2159024400&v=beta&t=b7c6YH1wVtA0gU8sjBc3_qSioe1AVqTgyxulWBtdf0g',
  },
  image: 'https://cf-cpi.campuspick.com/activity/1634363522073924.jpg',
  categories: ['기획', '개발'],
  duration: '11.14~12.10',
  description: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
  logs: [
    { id: 4, title: '프로젝트 발표', date: '11월 23일' },
    { id: 3, title: '프로젝트 발표', date: '11월 20일' },
    { id: 2, title: '프로젝트 발표', date: '11월 18일' },
    { id: 1, title: '프로젝트 발표', date: '11월 14일' },
  ],
};

const ProjectDetail: FC<ProjectDetailProps> = ({ route, navigation }) => {
  const [project, setProject] = useState<ProjectRecruitingData | ProjectWorkingData>();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useLayoutEffect(() => {
    const isRecruiting = route.params.isRecruiting;
    navigation.setOptions({
      title: isRecruiting ? '' : '프로젝트 상세',
      headerTitleStyle: globalStyles.textHeadline20,
      headerRight: isRecruiting
        ? () => (
            <TouchableView viewStyle={{ marginRight: rw(16) }} onPress={handleClickBookmark}>
              {isBookmarked ? <BookmarkActive /> : <BookmarkInactive />}
            </TouchableView>
          )
        : undefined,
    });
  }, [navigation, isBookmarked, route.params.isRecruiting]);

  const handleClickBookmark = async () => {
    try {
      if (isBookmarked) {
        await likeApi.deleteLike(authAPI(accessToken), route.params.projectId);
      } else {
        await likeApi.postLike(authAPI(accessToken), { showId: route.params.projectId });
      }
      setIsBookmarked((isBookmarked) => !isBookmarked);
    } catch (error) {
      defaultErrorAlert();
    }
  };

  const getProjectDetail = async () => {
    try {
      // const { data } = await showApi.getShowDetail(route.params.projectId);
      // setProject(data.project);
    } catch (error) {
      defaultErrorAlert();
    }
  };
  useEffect(() => {
    // getProjectDetail();
    setProject(route.params.isRecruiting ? dummy1 : dummy2);
  }, [route.params.isRecruiting]);

  const handelePressLog = (logId: number) => console.log(logId);
  const handelPressLogin = () => navigation.navigate('Login', { isStudent: true });
  const handelPressSignUp = () => navigation.navigate('SignUpEmail', { isStudent: true });

  return (
    <ProjectDetailPresenter
      project={project}
      onPressLog={handelePressLog}
      onPressLogin={handelPressLogin}
      onPressSignUp={handelPressSignUp}
    />
  );
};

export default ProjectDetail;
