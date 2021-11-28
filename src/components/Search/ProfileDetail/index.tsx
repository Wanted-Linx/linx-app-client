import React, { useState, useLayoutEffect, useEffect } from 'react';
import type { FC } from 'react';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { SearchStackParamList } from '../index';
import { MainTabParamList } from '../../MainNavigator';
import { RootStackParamList } from '../../RootNavigator';
import ProfileDetailPresenter from './ProfileDetailPresenter';
import { responsiveWidth as rw } from '../../../style/dimensions';
import { TouchableView } from '../../Common';
import { HeartIconActive, HeartIconInactive } from '../../../assets/images';
import type { ProjectProfileData } from '../../Common';
import { authAPI, clubApi, companyApi, studentApi } from '../../../api';
import { defaultErrorAlert } from '../../../utils/errorUtils';

type ProfileDetailProps = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParamList, 'ProfileDetail'>,
  CompositeScreenProps<BottomTabScreenProps<MainTabParamList>, NativeStackScreenProps<RootStackParamList>>
>;

interface ProfileData {
  name: string;
  description: string;
  projects: ProjectProfileData[];
}

export type CompanyProfile = ProfileData & {
  business_type: string[];
  address: string;
  clubCount: number;
  followerCount: number;
  hompage: string;
};

export type ClubProfile = ProfileData & {
  interested_type: string[];
  organization: string;
  companyCount: number;
  memberCount: number;
  profile_link: string;
};

export type StudentProfile = ProfileData & {
  interested_type: string[];
  university: string;
  clubCount: number;
  followingCount: number;
  profile_link: string;
};

const dummy = [
  {
    project_id: 6,
    categories: ['기획', '개발', '디자인'],
    project_name: '러브 시그널!',
    description:
      '1:1 보이스 채팅에서 직접 만남까지, 서비스를 기획 프로젝트인 <러브 시그널>은 현재 보이스 1:1 채팅 서비스를 기반으로 페이스채팅, 직접 만남까지 연결하는 서비스를 직접 기획, 개발, 디자인 해보는 6개월 간의 장기 개발 프로젝트입니다',
    duration: '04.15-10.20',
    club: 'DSC',
    company_name: '썸아더플레이스',
  },
  {
    project_id: 3,
    categories: ['기획', '개발'],
    project_name: '워스트 투 베스트!',
    description:
      '기업이 해외 진출을 준비하는 과정을 함께 하는 프로젝트로, 골프 사업이 중국에 진출했던 다양한 사례를 분석하여 해외진출 과정을 기획해보고 중국 상황에 맞는 서비스를 직접 기획해 볼 수 있습니다. 기업의 서비스 기획 과정에 대해 직접 실무 경험을 할 수 있으며 해외 진출 사례를 분석해보는 등 분석 업무에 대해서도 경험해볼 수 있습니다',
    duration: '02.01-08.30',
    club: 'KUPC',
    company_name: '라이앤캐처스',
  },
  {
    project_id: 2,
    categories: ['마케팅', '기획', '디자인'],
    project_name: '빔유어드림!',
    description:
      '<빔유어드림>은 마케팅, 디자인, 영상 제작 및 기획 과정에 관심 있는 동아리들이 참가하여 직접 광고 영상을 제작하는 3개월 간의 단기 프로젝트입니다. 전문가들과 함께 광고 기획부터 마케팅, 디자인까지 여러 분야의 직무를 실제 경험해볼 수 있습니다. 전문가와 함께 모든 과정이 진행되기에 충분한 피드백과 실무 경험을 얻어가실 수 있습니다',
    duration: '01.01-03.30',
    club: 'KUBS',
    company_name: '프라센',
  },
];

const ProfileDetail: FC<ProfileDetailProps> = ({ route, navigation }) => {
  const [profile, setProfile] = useState<CompanyProfile | ClubProfile | StudentProfile>();
  const [profileImage, setProfileImage] = useState(
    'https://media-exp1.licdn.com/dms/image/C560BAQGQWpaAuJLC8A/company-logo_200_200/0/1626253203412?e=2159024400&v=beta&t=b7c6YH1wVtA0gU8sjBc3_qSioe1AVqTgyxulWBtdf0g',
  );
  const [isLiked, setIsLiked] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: route.params.companyId
        ? () => (
            <TouchableView viewStyle={{ marginRight: rw(16) }} onPress={handlePressLike}>
              {isLiked ? <HeartIconActive /> : <HeartIconInactive />}
            </TouchableView>
          )
        : undefined,
    });
  }, [navigation, isLiked, route.params.companyId]);

  const getProfile = async () => {
    try {
      if (route.params.companyId) {
        const { data } = await companyApi.getCompany(authAPI(1), route.params.companyId);
        data.clubCount = 10;
        data.followerCount = 523;
        data.projects = dummy;
        setProfile(data);
      } else if (route.params.clubId) {
        const { data } = await clubApi.getClub(authAPI(1), route.params.clubId);
        data.companyCount = 3;
        data.memberCount = data.club_members.length;
        data.projects = data.club_projects.length ? data.club_projects : dummy;
        setProfile(data);
      } else if (route.params.studentId) {
        const { data } = await studentApi.getStudent(authAPI(1), route.params.studentId);
        data.clubCount = 2;
        data.followingCount = 121;
        data.projects = dummy;
        setProfile(data);
      }
    } catch (error) {
      defaultErrorAlert();
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const getProfileImage = async () => {
    if (!profile) {
      return;
    }
    try {
      if (route.params.companyId) {
        const { data } = await companyApi.getProfileImage(authAPI(route.params.companyId, 'blob'));
        setProfileImage(URL.createObjectURL(data));
      } else if (route.params.clubId) {
        const { data } = await clubApi.getProfileImage(authAPI(route.params.clubId, 'blob'));
        setProfileImage(URL.createObjectURL(data));
      } else if (route.params.studentId) {
        const { data } = await studentApi.getProfileImage(authAPI(route.params.studentId, 'blob'));
        setProfileImage(URL.createObjectURL(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfileImage();
  }, [profile]);

  const handlePressLike = () => setIsLiked((flag) => !flag);
  const handlePressProject = (projectId: number) =>
    navigation.navigate('ProjectDetail', { projectId, isRecruiting: false });

  return <ProfileDetailPresenter profile={profile} profileImage={profileImage} onPressProject={handlePressProject} />;
};

export default ProfileDetail;
