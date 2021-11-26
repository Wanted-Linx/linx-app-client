import React, { useState } from 'react';
import type { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { responsiveHeight as rh } from '../../style/dimensions';
import globalStyles from '../../style/styles';
import colors from '../../style/colors';
import { TouchableView } from './TouchableView';
import { Tag } from './Tag';
import { BookmarkActive, BookmarkInactive } from '../../assets/images';

export interface ProjectData {
  projectId: number;
  categories: string[];
  title: string;
  company: string;
  bookmark: boolean;
  description: string;
  endDate: string;
  sponsorFee: string;
}

export interface ProjectProps {
  project: ProjectData;
  onPress: (projectId: number) => void;
}

export const Project: FC<ProjectProps> = ({
  project: { projectId, categories, title, company, bookmark, description, endDate, sponsorFee },
  onPress,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmark);
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
          <Text style={[globalStyles.textBody14, styles.textCompany]}>{company}</Text>
        </View>
        <TouchableView style={styles.bookmark} onPress={() => setIsBookmarked((flag) => !flag)}>
          {isBookmarked ? <BookmarkActive /> : <BookmarkInactive />}
        </TouchableView>
      </View>
      <Text style={[globalStyles.textBody15R, styles.textDescription]} numberOfLines={2}>
        {description}
      </Text>
      <View style={styles.bottom}>
        <Text style={[globalStyles.textBody15R]}>{endDate}</Text>
        <Text style={[globalStyles.textBody15R]}>{sponsorFee}</Text>
      </View>
      <View style={styles.line} />
    </TouchableView>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: rh(24) },
  categoryContainer: { flexDirection: 'row', marginBottom: rh(10) },
  top: { flexDirection: 'row', justifyContent: 'space-between' },
  textCompany: { color: colors.colorGray300, marginTop: rh(2) },
  bookmark: { alignSelf: 'flex-start' },
  textDescription: { color: colors.colorGray300, marginTop: rh(8) },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: rh(8) },
  line: { height: 0.7, opacity: 0.1, backgroundColor: colors.colorGray500, marginTop: rh(22) },
});
