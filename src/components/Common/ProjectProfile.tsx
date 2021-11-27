import React from 'react';
import type { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { responsiveHeight as rh } from '../../style/dimensions';
import globalStyles from '../../style/styles';
import colors from '../../style/colors';
import { TouchableView } from './TouchableView';
import { Tag } from './Tag';

export interface ProjectProfileData {
  project_id: number;
  categories: string[];
  project_name: string;
  description: string;
  duration: string;
  club: string;
  company_name: string;
}

export interface ProjectProfileProps {
  project: ProjectProfileData;
  onPress: (projectId: number) => void;
}

export const ProjectProfile: FC<ProjectProfileProps> = ({
  project: {
    project_id,
    categories = ['기획', '마케팅'],
    project_name,
    description = '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
    duration = '11.20~12.30',
    club = 'DSC',
    company_name,
  },
  onPress,
}) => {
  return (
    <TouchableView style={styles.container} onPress={() => onPress(project_id)}>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <Tag key={category} text={category} />
        ))}
      </View>
      <View style={styles.top}>
        <View>
          <Text style={[globalStyles.textBody15M]}>{project_name}</Text>
          <View style={styles.groupContainer}>
            <Text style={[globalStyles.textBody15R]}>{company_name} / </Text>
            <Text style={[globalStyles.textBody15R]}>{club}</Text>
          </View>
        </View>
      </View>
      <Text style={[globalStyles.textBody15R, styles.textDescription]} numberOfLines={2}>
        {description}
      </Text>
      <Text style={[globalStyles.textBody14, styles.textDuration]}>{duration}</Text>
      <View style={styles.line} />
    </TouchableView>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: rh(24) },
  categoryContainer: { flexDirection: 'row', marginBottom: rh(10) },
  top: { flexDirection: 'row', justifyContent: 'space-between' },
  groupContainer: { flexDirection: 'row', marginTop: rh(4) },
  textDescription: { color: colors.colorGray300, marginTop: rh(8) },
  line: { height: 0.7, opacity: 0.1, backgroundColor: colors.colorGray500, marginTop: rh(22) },
  textDuration: { color: colors.colorGray300, marginTop: rh(8) },
});
