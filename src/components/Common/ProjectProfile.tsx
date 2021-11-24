import React from 'react';
import type { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { responsiveHeight as rh } from '../../style/dimensions';
import globalStyles from '../../style/styles';
import colors from '../../style/colors';
import { TouchableView } from './TouchableView';
import { Tag } from './Tag';

export interface ProjectProfileData {
  projectId: number;
  categories: string[];
  title: string;
  description: string;
  duration: string;
  club: string;
  company: string;
}

export interface ProjectProfileProps {
  project: ProjectProfileData;
  onPress: (projectId: number) => void;
}

export const ProjectProfile: FC<ProjectProfileProps> = ({
  project: { projectId, categories, title, description, duration, club, company },
  onPress,
}) => {
  return (
    <TouchableView style={styles.container} onPress={() => onPress(projectId)}>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <Tag key={category} text={category} />
        ))}
      </View>
      <View style={styles.top}>
        <View>
          <Text style={[globalStyles.textBody15M]}>{title}</Text>
          <View style={styles.groupContainer}>
            <Text style={[globalStyles.textBody15R]}>{company} / </Text>
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
  line: { height: 1, opacity: 0.1, backgroundColor: colors.colorGray500, marginTop: rh(22) },
  textDuration: { color: colors.colorGray300, marginTop: rh(8) },
});
