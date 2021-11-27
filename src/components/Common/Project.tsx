import React, { useState } from 'react';
import type { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DateTime } from 'luxon';

import { responsiveHeight as rh } from '../../style/dimensions';
import globalStyles from '../../style/styles';
import colors from '../../style/colors';
import { TouchableView } from './TouchableView';
import { Tag } from './Tag';
import { BookmarkActive, BookmarkInactive } from '../../assets/images';
import { calDateDiff } from '../../utils/dateUtils';

export interface ProjectData {
  id: number;
  task_type: string[];
  name: string;
  company: { name: string };
  bookmark: boolean;
  content: string;
  applying_end_date: string;
  sponsor_fee: number;
}

export interface ProjectProps {
  project: ProjectData;
  onPress: (projectId: number) => void;
}

export const Project: FC<ProjectProps> = ({
  project: { id, task_type, name, company, bookmark, content, applying_end_date, sponsor_fee },
  onPress,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmark);
  return (
    <TouchableView style={styles.container} onPress={() => onPress(id)}>
      <View style={styles.categoryContainer}>
        {task_type.map((type) => (
          <Tag key={type} text={type} />
        ))}
      </View>
      <View style={styles.top}>
        <View>
          <Text style={[globalStyles.textBody15M]}>{name}</Text>
          <Text style={[globalStyles.textBody14, styles.textCompany]}>{company.name}</Text>
        </View>
        <TouchableView style={styles.bookmark} onPress={() => setIsBookmarked((flag) => !flag)}>
          {isBookmarked ? <BookmarkActive /> : <BookmarkInactive />}
        </TouchableView>
      </View>
      <Text style={[globalStyles.textBody15R, styles.textDescription]} numberOfLines={2}>
        {content}
      </Text>
      <View style={styles.bottom}>
        <Text style={[globalStyles.textBody15R]}>D-{calDateDiff(applying_end_date, DateTime.now().toISODate())}</Text>
        <Text style={[globalStyles.textBody15R]}>{sponsor_fee / 10000}만원</Text>
      </View>
      <View style={styles.line} />
    </TouchableView>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', marginTop: rh(24) },
  categoryContainer: { flexDirection: 'row', marginBottom: rh(10) },
  top: { flexDirection: 'row', justifyContent: 'space-between' },
  textCompany: { color: colors.colorGray300, marginTop: rh(2) },
  bookmark: { alignSelf: 'flex-start' },
  textDescription: { color: colors.colorGray300, marginTop: rh(8) },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: rh(8) },
  line: { height: 0.7, opacity: 0.1, backgroundColor: colors.colorGray500, marginTop: rh(22) },
});
