import React, { useEffect, useState, useLayoutEffect } from 'react';
import type { FC } from 'react';
import { Alert } from 'react-native';
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
import type { LogDetailData } from '../ProjectLogDetail';

type ProjectDetailProps = NativeStackScreenProps<RootStackParamList, 'ProjectDetail'>;

export interface ProjectDetailData {
  id: number;
  name: string;
  company: {
    id: number;
    name: string;
  };
  image: string;
  task_type: string[];
  applying_end_date: string;
  sponsor_fee: number;
  task_experience: string;
  qualification: string;
  content: string;
  start_date: string;
  end_date: string;
  project_log: LogDetailData[];
  bookmark: boolean;
}

const dummy = [
  {
    id: 1,
    title: '프로젝트 발표',
    end_date: '11월 30일',
  },
  {
    id: 2,
    title: '프로젝트 발표 준비',
    end_date: '11월 23일',
  },
  {
    id: 3,
    title: '프로젝트 기획',
    end_date: '11월 12일',
  },
];

const ProjectDetail: FC<ProjectDetailProps> = ({ route, navigation }) => {
  const userType = useRecoilValue(userTypeState);
  const [project, setProject] = useState<ProjectDetailData>();
  const [profileImage, setProfileImage] = useState(
    'https://media-exp1.licdn.com/dms/image/C560BAQGQWpaAuJLC8A/company-logo_200_200/0/1626253203412?e=2159024400&v=beta&t=b7c6YH1wVtA0gU8sjBc3_qSioe1AVqTgyxulWBtdf0g',
  );
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
      data.company.profile_image = null;
      if (!data.project_log.length) {
        data.project_log = dummy;
      }
      setProject({
        ...data,
        image:
          data.name === '빔유어드림!'
            ? 'https://w.namu.la/s/31c424261bc2f3752f01dece5929dffb4da1c8913e1c69f1acd56fb70b3d2f655b249bd707b71efd3e839904cb063ab07f8504108720bdd80cae46cb0d24bab09771bd71235694324d8da872b512da4e'
            : 'https://cf-cpi.campuspick.com/activity/1634363522073924.jpg',
      });
    } catch (error) {
      defaultErrorAlert();
    }
  };
  useEffect(() => {
    getProject();
  }, [route.params.projectId]);

  const getProfileImage = async () => {
    try {
      if (project) {
        const { data } = await companyApi.getProfileImage(authAPI(project.company.id, 'blob'));
        setProfileImage(URL.createObjectURL(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfileImage();
  }, [project]);

  const handlePressBookmark = () => setIsBookmarked((flag) => !flag);
  const handelePressLog = (index: number) => {
    if (project?.project_log[index]) {
      navigation.navigate('ProjectLogDetail', { log: project?.project_log[index] });
    }
  };
  const handelPressLogin = () => navigation.navigate('Login', { isStudent: true });
  const handelPressSignUp = () => navigation.navigate('SignUpEmail', { isStudent: true });
  const handlePressApply = () => {
    Alert.alert('지원되었습니다!');
    navigation.navigate('MainNavigator', { screen: 'Home', params: { screen: 'HomeMain' } });
  };

  return (
    <ProjectDetailPresenter
      isRecruiting={route.params.isRecruiting}
      userType={userType}
      project={project}
      profileImage={profileImage}
      onPressLog={handelePressLog}
      onPressLogin={handelPressLogin}
      onPressSignUp={handelPressSignUp}
      onPressApply={handlePressApply}
    />
  );
};

export default ProjectDetail;
