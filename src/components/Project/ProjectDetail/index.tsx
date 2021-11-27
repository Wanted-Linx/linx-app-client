import React, { useEffect, useState, useLayoutEffect } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRecoilValue } from 'recoil';

import ProjectDetailPresenter from './ProjectDetailPresenter';
import { RootStackParamList } from '../../RootNavigator';
import { userTypeState } from '../../../state';
import { authAPI, projectApi, companyApi } from '../../../api';
import { defaultErrorAlert } from '../../../utils';
import { TouchableView } from '../../Common';
import { BookmarkActive, BookmarkInactive } from '../../../assets/images';
import { responsiveWidth as rw } from '../../../style/dimensions';
import globalStyles from '../../../style/styles';

type ProjectDetailProps = NativeStackScreenProps<RootStackParamList, 'ProjectDetail'>;

export interface ProjectRecruitingData {
  id: number;
  name: string;
  company: {
    id: number;
    name: string;
    profile_image: string;
  };
  image: string;
  task_type: string[];
  applying_end_date: string;
  sponsor_fee: number;
  experience: string;
  qualification: string;
  content: string;
  start_date: string;
  end_date: string;
  bookmark: boolean;
}

export interface ProjectWorkingData {
  id: number;
  name: string;
  company: {
    id: number;
    name: string;
    profile_image: string;
  };
  image: string;
  task_type: string[];
  start_date: string;
  end_date: string;
  content: string;
  project_log: LogData[];
}

export interface LogData {
  id: number;
  title: string;
  end_date: string;
}

const ProjectDetail: FC<ProjectDetailProps> = ({ route, navigation }) => {
  const userType = useRecoilValue(userTypeState);
  const [project, setProject] = useState<ProjectRecruitingData | ProjectWorkingData>();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useLayoutEffect(() => {
    const isRecruiting = route.params.isRecruiting;
    navigation.setOptions({
      title: isRecruiting ? '' : '프로젝트 상세',
      headerTitleStyle: globalStyles.textHeadline20,
      headerRight: isRecruiting
        ? () => (
            <TouchableView viewStyle={{ marginRight: rw(16) }} onPress={handlePressBookmark}>
              {isBookmarked ? <BookmarkActive /> : <BookmarkInactive />}
            </TouchableView>
          )
        : undefined,
    });
  }, [navigation, isBookmarked, route.params.isRecruiting]);

  const getProject = async () => {
    try {
      const { data } = await projectApi.getProject(authAPI(1), route.params.projectId);
      const profile = await companyApi.getProfileImage(authAPI(data.company.id));
      data.company.profile_image = profile.data;
      setProject(
        route.params.isRecruiting
          ? {
              ...data,
              image: 'https://cf-cpi.campuspick.com/activity/1634363522073924.jpg',
              experience: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
            }
          : { ...data, image: 'https://cf-cpi.campuspick.com/activity/1634363522073924.jpg' },
      );
    } catch (error) {
      defaultErrorAlert();
    }
  };
  useEffect(() => {
    getProject();
  }, [route.params.projectId]);

  const handlePressBookmark = () => setIsBookmarked((flag) => !flag);
  const handelePressLog = (logId: number) => console.log(logId);
  const handelPressLogin = () => navigation.navigate('Login', { isStudent: true });
  const handelPressSignUp = () => navigation.navigate('SignUpEmail', { isStudent: true });

  return (
    <ProjectDetailPresenter
      userType={userType}
      project={project}
      onPressLog={handelePressLog}
      onPressLogin={handelPressLogin}
      onPressSignUp={handelPressSignUp}
    />
  );
};

export default ProjectDetail;
