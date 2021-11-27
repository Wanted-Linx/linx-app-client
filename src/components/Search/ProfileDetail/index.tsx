import React, { useState, useLayoutEffect, useEffect } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SearchStackParamList } from '../index';
import ProfileDetailPresenter from './ProfileDetailPresenter';
import { responsiveWidth as rw } from '../../../style/dimensions';
import { TouchableView } from '../../Common';
import { HeartIconActive, HeartIconInactive } from '../../../assets/images';
import type { ProjectProfileData } from '../../Common';
import { authAPI, clubApi, companyApi, studentApi } from '../../../api';
import { defaultErrorAlert } from '../../../utils/errorUtils';

type ProfileDetailProps = NativeStackScreenProps<SearchStackParamList, 'ProfileDetail'>;

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
            <TouchableView viewStyle={{ marginRight: rw(16) }} onPress={handleClickLike}>
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
        data.address = '서울특별시 강남구';
        data.clubCount = 10;
        data.followerCount = 523;
        data.projects = [];
        setProfile(data);
      } else if (route.params.clubId) {
        const { data } = await clubApi.getClub(authAPI(1), route.params.clubId);
        data.companyCount = 3;
        data.memberCount = data.club_members.length;
        data.projects = data.club_projects;
        setProfile(data);
      } else if (route.params.studentId) {
        const { data } = await studentApi.getStudent(authAPI(1), route.params.studentId);
        data.clubCount = 2;
        data.followingCount = 121;
        data.projects = [];
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

  const handleClickLike = () => setIsLiked((flag) => !flag);

  return <ProfileDetailPresenter profile={profile} profileImage={profileImage} />;
};

export default ProfileDetail;
