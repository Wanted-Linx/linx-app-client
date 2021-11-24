import React from 'react';
import type { FC } from 'react';
import { View, Text, ScrollView, Image, Linking } from 'react-native';

import styles from './ProfileDetail.style';
import { CompanyProfile, ClubProfile, StudentProfile } from './index';
import globalStyles from '../../../style/styles';
import { ProjectProfile, TouchableView } from '../../Common';

interface ProfileDetailPresenterProps {
  profile: CompanyProfile | ClubProfile | StudentProfile | undefined;
}

const ProfileDetailPresenter: FC<ProfileDetailPresenterProps> = ({ profile }) => {
  return profile ? (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      bounces={false}>
      <Image source={{ uri: profile?.image }} style={styles.profile} />
      <Text style={globalStyles.textBody15M}>{profile?.name}</Text>
      <Text style={[globalStyles.textBody15M, styles.textCategory]}>
        {'category' in profile ? profile.category : profile.interests.join('/')}
      </Text>
      <Text style={globalStyles.textBody15M}>{'university' in profile ? profile.university : profile.address}</Text>
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
          onPress={async () => await Linking.openURL('hompage' in profile ? profile.hompage : profile.portfolio)}>
          <Text style={globalStyles.textBody15R}>
            {'hompage' in profile ? '홈페이지 바로가기' : '포트폴리오 바로가기'}
          </Text>
        </TouchableView>
      </View>
      <Text style={[globalStyles.textBody15M, styles.textProjectTitle]}>진행프로젝트</Text>
      {profile.projects.map((project) => (
        <ProjectProfile key={project.projectId} project={project} onPress={() => console.log(project.projectId)} />
      ))}
    </ScrollView>
  ) : null;
};

export default ProfileDetailPresenter;
