import React, { useState } from 'react';
import type { FC } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import styles from './ProjectDetail.style';
import type { ProjectRecruitingData, ProjectWorkingData } from './index';
import globalStyles from '../../../style/styles';
import { Button, Tag, ProjectLog, TouchableView } from '../../Common';
import { BottomModal } from '../../modal';

interface ShowDetailPresenterProps {
  project: ProjectRecruitingData | ProjectWorkingData | undefined;
  onPressProfile: (companyId: number) => void;
  onPressLog: (logId: number) => void;
}

const ShowDetailPresenter: FC<ShowDetailPresenterProps> = ({ project, onPressProfile, onPressLog }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModalVisible = () => setModalVisible((flag) => !flag);

  return project ? (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}>
        <TouchableView
          style={styles.profileView}
          viewStyle={styles.profileContainer}
          onPress={() => onPressProfile(project.company.id)}>
          <Image style={styles.profile} source={{ uri: project.company.profile }} resizeMode="cover" />
          <Text style={globalStyles.textBody15R}>{project.company.name}</Text>
        </TouchableView>
        <Text style={[globalStyles.textHeadline20, styles.textTitle]}>{project?.title}</Text>
        <Image style={styles.mainImage} source={{ uri: project.image }} resizeMode="cover" />
        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            {project.categories.map((category) => (
              <Tag key={category} text={category} />
            ))}
          </View>
          {'endDate' in project ? (
            <View style={styles.recrutingContentContainer}>
              <View style={styles.infoContainer}>
                <View style={styles.durationContainer}>
                  <Text style={[globalStyles.textBody14, styles.textInfoSubtitle]}>지원기간</Text>
                  <Text style={globalStyles.textBody14}>{project.endDate}</Text>
                </View>
                <View style={styles.feeContainer}>
                  <Text style={[globalStyles.textBody14, styles.textInfoSubtitle]}>스폰서비</Text>
                  <Text style={globalStyles.textBody14}>{project.sponsorFee}</Text>
                </View>
              </View>
              <View style={styles.infoContainer}>
                <Text style={[globalStyles.textBody15M, styles.textInfoTitle]}>직무경험</Text>
                <Text style={[globalStyles.textBody15R, styles.textInfoContent]}>{project.experience}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={[globalStyles.textBody15M, styles.textInfoTitle]}>지원자격</Text>
                <Text style={[globalStyles.textBody15R, styles.textInfoContent]}>{project.qualification}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={[globalStyles.textBody15M, styles.textInfoTitle]}>프로젝트소개</Text>
                <View style={styles.feeContainer}>
                  <Text style={[globalStyles.textBody14, styles.textInfoSubtitle]}>프로젝트 기간</Text>
                  <Text style={globalStyles.textBody14}>{project.duration}</Text>
                </View>
                <Text style={[globalStyles.textBody15R, styles.textDescription]}>{project.description}</Text>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.durationContainer}>
                <Text style={[globalStyles.textBody14, styles.textInfoSubtitle]}>진행기간</Text>
                <Text style={globalStyles.textBody14}>{project.duration}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={[globalStyles.textBody15M, styles.textInfoTitle]}>활동내역</Text>
                <Text style={[globalStyles.textBody15R, styles.textInfoContent]}>{project.description}</Text>
              </View>
              <Text style={[globalStyles.textBody15M, styles.textInfoTitle]}>프로젝트로그</Text>
              <View style={styles.timeline}>
                {project.logs.map((log) => (
                  <ProjectLog key={log.id} log={log} onPress={onPressLog} />
                ))}
              </View>
            </View>
          )}
        </View>
        {modalVisible ? (
          <BottomModal
            title="회원이신가요?"
            subtitle={'프로젝트를 지원하기 전에\n로그인을 먼저 해주세요'}
            buttonTexts={['회원가입', '로그인']}
            onPressClose={toggleModalVisible}
            onPresses={[() => console.log('회원가입'), () => console.log('로그인')]}
          />
        ) : null}
      </ScrollView>
      {'endDate' in project ? (
        <Button
          title="지원하기"
          style={styles.button}
          textStyle={[globalStyles.textHeadline18R, styles.textButton]}
          onPress={toggleModalVisible}
        />
      ) : null}
    </View>
  ) : null;
};

export default ShowDetailPresenter;
