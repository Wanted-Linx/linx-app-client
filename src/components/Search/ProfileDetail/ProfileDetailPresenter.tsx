import React from 'react';
import type { FC } from 'react';
import { View, Text, ScrollView, Image, Linking } from 'react-native';

import styles from './ProfileDetail.style';
import { CompanyProfile, ClubProfile, StudentProfile } from './index';
import globalStyles from '../../../style/styles';
import { ProjectProfile, TouchableView } from '../../Common';

interface ProfileDetailPresenterProps {
  profile: CompanyProfile | ClubProfile | StudentProfile | undefined;
  profileImage: string;
  onPressProject: (projectId: number) => void;
}

const ProfileDetailPresenter: FC<ProfileDetailPresenterProps> = ({ profile, profileImage, onPressProject }) => {
  return profile ? (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      bounces={false}>
      <Image source={{ uri: profileImage }} style={styles.profile} />
      <Text style={globalStyles.textBody15M}>
        {profile?.name} ∙{' '}
        <Text style={[globalStyles.textBody15M, styles.textCategory]}>
          {'business_type' in profile
            ? profile.business_type.join(' ')
            : 'university' in profile
            ? profile.university
            : profile.organization}
        </Text>
      </Text>
      <Text style={[globalStyles.textBody15M, styles.textSub]}>
        {'address' in profile
          ? profile.address
          : profile.interested_type
          ? profile.interested_type.join('/')
          : '기획/마케팅'}
      </Text>
      <View style={styles.countContainer}>
        <View style={styles.countView}>
          <Text style={[globalStyles.textBody14, styles.textCountTitle]}>
            {'clubCount' in profile ? '동아리' : '기업'}
          </Text>
          <Text style={globalStyles.textBody15M}>
            {'clubCount' in profile ? profile.clubCount : profile.companyCount}
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.countView}>
          <Text style={[globalStyles.textBody14, styles.textCountTitle]}>
            {'followerCount' in profile ? '팔로워' : 'memberCount' in profile ? '멤버' : '팔로잉 기업'}
          </Text>
          <Text style={globalStyles.textBody15M}>
            {'followerCount' in profile
              ? profile.followerCount
              : 'memberCount' in profile
              ? profile.memberCount
              : profile.followingCount}
          </Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[globalStyles.textBody15R, styles.textDescription]}>{profile.description}</Text>
        <TouchableView
          style={styles.link}
          onPress={async () => await Linking.openURL('hompage' in profile ? profile.hompage : profile.profile_link)}>
          <Text style={globalStyles.textBody15R}>
            {'hompage' in profile || 'organization' in profile ? '홈페이지 바로가기' : '포트폴리오 바로가기'}
          </Text>
        </TouchableView>
      </View>
      <Text style={[globalStyles.textBody15M, styles.textProjectTitle]}>진행프로젝트</Text>
      {profile.projects.map((project) => (
        <ProjectProfile key={project.project_id} project={project} onPress={onPressProject} />
      ))}
    </ScrollView>
  ) : null;
};

export default ProfileDetailPresenter;
