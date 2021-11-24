import React, { useState, useLayoutEffect, useEffect } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SearchStackParamList } from '../index';
import ProfileDetailPresenter from './ProfileDetailPresenter';
import { responsiveWidth as rw } from '../../../style/dimensions';
import { TouchableView } from '../../Common';
import { HeartIconActive, HeartIconInactive } from '../../../assets/images';
import type { ProjectProfileData } from '../../Common';

type ProfileDetailProps = NativeStackScreenProps<SearchStackParamList, 'ProfileDetail'>;

interface ProfileData {
  name: string;
  image: string;
  description: string;
  projects: ProjectProfileData[];
}

export type CompanyProfile = ProfileData & {
  category: string;
  address: string;
  clubCount: number;
  followerCount: number;
  hompage: string;
};

export type ClubProfile = ProfileData & {
  category: string;
  university: string;
  companyCount: number;
  memberCount: number;
  hompage: string;
};

export type StudentProfile = ProfileData & {
  university: string;
  interests: string[];
  clubCount: number;
  followingCount: number;
  portfolio: string;
};

const dummy = {
  name: 'Wanted',
  image:
    'https://media-exp1.licdn.com/dms/image/C560BAQGQWpaAuJLC8A/company-logo_200_200/0/1626253203412?e=2159024400&v=beta&t=b7c6YH1wVtA0gU8sjBc3_qSioe1AVqTgyxulWBtdf0g',
  description: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
  projects: [
    {
      projectId: 1,
      categories: ['기획', '디자인', '마케팅', '개발'],
      title: '채용연계형 대규모 해커톤 해,커리어!',
      description: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
      duration: '6.11~11.5',
      club: 'DSC동아리',
      company: 'Wanted',
    },
    {
      projectId: 2,
      categories: ['기획', '디자인', '마케팅'],
      title: '채용연계형 대규모 해커톤 해,커리어!',
      description: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
      duration: '6.11~11.5',
      club: 'DSC동아리',
      company: 'Wanted',
    },
    {
      projectId: 3,
      categories: ['기획', '디자인'],
      title: '채용연계형 대규모 해커톤 해,커리어!',
      description: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
      duration: '6.11~11.5',
      club: 'DSC동아리',
      company: 'Wanted',
    },
  ],
};

const dummy1 = {
  ...dummy,
  category: 'IT 스타트업',
  address: '서울 특별시 강남구',
  clubCount: 3,
  followerCount: 1000,
  hompage: 'https://www.wanted.co.kr/newintro',
};

const ProfileDetail: FC<ProfileDetailProps> = ({ route, navigation }) => {
  const [profile, setProfile] = useState<CompanyProfile | ClubProfile | StudentProfile>();
  const [isLiked, setIsLiked] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: route.params.companyId
        ? () => (
            <TouchableView viewStyle={{ marginRight: rw(16) }} onPress={handleClickLike}>
              {isLiked ? <HeartIconActive /> : <HeartIconInactive />}
            </TouchableView>
          )
        : undefined,
    });
  }, [navigation, isLiked, route.params.companyId]);

  useEffect(() => {
    setProfile(route.params.companyId ? dummy1 : route.params.clubId ? undefined : undefined);
  }, []);

  const handleClickLike = () => setIsLiked((flag) => !flag);

  return <ProfileDetailPresenter profile={profile} />;
};

export default ProfileDetail;
