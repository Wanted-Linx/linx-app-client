import React, { useState } from 'react';
import type { FC } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import styles from './ProjectDetail.style';
import type { ProjectDetailData } from './index';
import globalStyles from '../../../style/styles';
import { Button, Tag } from '../../Common';
import { BottomModal } from '../../modal';

interface ShowDetailPresenterProps {
  project: ProjectDetailData | undefined;
}

const ShowDetailPresenter: FC<ShowDetailPresenterProps> = ({ project }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModalVisible = () => setModalVisible((flag) => !flag);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}>
        <View style={styles.profileContainer}>
          <Image style={styles.profile} source={{ uri: project?.companyProfile }} resizeMode="cover" />
          <Text style={globalStyles.textBody15R}>{project?.company}</Text>
        </View>
        <Text style={[globalStyles.textHeadline20, styles.textTitle]}>{project?.title}</Text>
        <Image style={styles.mainImage} source={{ uri: project?.image }} resizeMode="cover" />
        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            {project?.categories.map((category) => (
              <Tag key={category} text={category} />
            ))}
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.durationContainer}>
              <Text style={[globalStyles.textBody14, styles.textInfoSubtitle]}>지원기간</Text>
              <Text style={globalStyles.textBody14}>{project?.endDate}</Text>
            </View>
            <View style={styles.feeContainer}>
              <Text style={[globalStyles.textBody14, styles.textInfoSubtitle]}>스폰서비</Text>
              <Text style={globalStyles.textBody14}>{project?.sponsorFee}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={[globalStyles.textBody15M, styles.textInfoTitle]}>직무경험</Text>
            <Text style={[globalStyles.textBody15R, styles.textInfoContent]}>{project?.experience}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={[globalStyles.textBody15M, styles.textInfoTitle]}>지원자격</Text>
            <Text style={[globalStyles.textBody15R, styles.textInfoContent]}>{project?.qualification}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={[globalStyles.textBody15M, styles.textInfoTitle]}>프로젝트소개</Text>
            <View style={styles.feeContainer}>
              <Text style={[globalStyles.textBody14, styles.textInfoSubtitle]}>프로젝트 기간</Text>
              <Text style={globalStyles.textBody14}>{project?.duration}</Text>
            </View>
            <Text style={[globalStyles.textBody15R, styles.textDescription]}>{project?.description}</Text>
          </View>
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
      <Button
        title="지원하기"
        style={styles.button}
        textStyle={[globalStyles.textHeadline18R, styles.textButton]}
        onPress={toggleModalVisible}
      />
    </View>
  );
};

export default ShowDetailPresenter;
