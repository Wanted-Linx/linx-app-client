import React, { useState } from 'react';
import type { FC } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { DateTime } from 'luxon';

import styles from './ProjectDetail.style';
import type { ProjectDetailData } from './index';
import globalStyles from '../../../style/styles';
import { Button, Tag, ProjectLog } from '../../Common';
import { BottomModal } from '../../modal';
import { calDateDiff } from '../../../utils';
import { defaultFormat } from '../../../utils';

interface ShowDetailPresenterProps {
  isRecruiting: boolean;
  userType: string;
  project: ProjectDetailData | undefined;
  profileImage: string;
  onPressLog: (logId: number) => void;
  onPressLogin: () => void;
  onPressSignUp: () => void;
  onPressApply: () => void;
}

const ShowDetailPresenter: FC<ShowDetailPresenterProps> = ({
  isRecruiting,
  userType,
  project,
  profileImage,
  onPressLog,
  onPressLogin,
  onPressSignUp,
  onPressApply,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModalVisible = () => setModalVisible((flag) => !flag);

  return project ? (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}>
        <View style={styles.profileContainer}>
          <Image style={styles.profile} source={{ uri: profileImage }} resizeMode="cover" />
          <Text style={globalStyles.textBody15R}>{project.company.name}</Text>
        </View>
        <Text style={[globalStyles.textHeadline20, styles.textTitle]}>{project?.name}</Text>
        <Image style={styles.mainImage} source={{ uri: project.image }} resizeMode="cover" />
        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            {project.task_type.map((task) => (
              <Tag key={task} text={task} />
            ))}
          </View>
          {isRecruiting ? (
            <View style={styles.recrutingContentContainer}>
              <View style={styles.infoContainer}>
                <View style={styles.durationContainer}>
                  <Text style={[globalStyles.textBody14, styles.textInfoSubtitle]}>지원기간</Text>
                  <Text style={globalStyles.textBody14}>
                    D-{calDateDiff(project.applying_end_date, DateTime.now().toISODate())}
                  </Text>
                </View>
                <View style={styles.feeContainer}>
                  <Text style={[globalStyles.textBody14, styles.textInfoSubtitle]}>스폰서비</Text>
                  <Text style={globalStyles.textBody14}>{project.sponsor_fee / 10000}만원</Text>
                </View>
              </View>
              <View style={styles.infoContainer}>
                <Text style={[globalStyles.textBody15M, styles.textInfoTitle]}>직무경험</Text>
                <Text style={[globalStyles.textBody15R, styles.textInfoContent]}>{project.task_experience}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={[globalStyles.textBody15M, styles.textInfoTitle]}>지원자격</Text>
                <Text style={[globalStyles.textBody15R, styles.textInfoContent]}>{project.qualification}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={[globalStyles.textBody15M, styles.textInfoTitle]}>프로젝트소개</Text>
                <View style={styles.feeContainer}>
                  <Text style={[globalStyles.textBody14, styles.textInfoSubtitle]}>프로젝트 기간</Text>
                  <Text style={globalStyles.textBody14}>{calDateDiff(project.end_date, project.start_date)}일</Text>
                </View>
                <Text style={[globalStyles.textBody15R, styles.textDescription]}>{project.content}</Text>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.durationContainer}>
                <Text style={[globalStyles.textBody14, styles.textInfoSubtitle]}>진행기간</Text>
                <Text style={globalStyles.textBody14}>
                  {defaultFormat(project.start_date)}-{defaultFormat(project.end_date)}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={[globalStyles.textBody15M, styles.textInfoTitle]}>활동내역</Text>
                <Text style={[globalStyles.textBody15R, styles.textInfoContent]}>{project.content}</Text>
              </View>
              <Text style={[globalStyles.textBody15M, styles.textInfoTitle]}>프로젝트로그</Text>
              <View style={styles.timeline}>
                {project.project_log.map((log) => (
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
            onPresses={[
              () => {
                onPressSignUp();
                toggleModalVisible();
              },
              () => {
                onPressLogin();
                toggleModalVisible();
              },
            ]}
          />
        ) : null}
      </ScrollView>
      {isRecruiting && userType !== 'company' ? (
        <Button
          title="지원하기"
          style={styles.button}
          onPress={userType === 'student' ? onPressApply : toggleModalVisible}
        />
      ) : null}
    </View>
  ) : null;
};

export default ShowDetailPresenter;
