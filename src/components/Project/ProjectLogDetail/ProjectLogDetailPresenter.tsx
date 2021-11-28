import React from 'react';
import type { FC } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { DateTime } from 'luxon';

import styles from './ProjectLogDetail.style';
import type { LogDetailData } from './index';
import globalStyles from '../../../style/styles';
import { Feedback } from '../../Common';

interface ProjectLogDetailPresenterProps {
  log: LogDetailData;
}

const ProjectLogDetailPresenter: FC<ProjectLogDetailPresenterProps> = ({ log }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      bounces={false}>
      <View style={styles.top}>
        <Text style={globalStyles.textBody15R}>
          진행기간 {DateTime.fromISO(log.start_date).toFormat('MM.dd')}~
          {DateTime.fromISO(log.end_date).toFormat('MM.dd')}
        </Text>
        <Text style={[globalStyles.textHeadline20, styles.textTitle]}>{log.title}</Text>
        <Text style={[globalStyles.textBody14, styles.textAuthor]}>by {log.author}</Text>
        <Text style={[globalStyles.textBody14]}>
          with{' '}
          {log.participants
            .slice(1, 4)
            .map((part) => part.name)
            .join(', ')}
        </Text>
      </View>
      <Text style={[globalStyles.textBody15R, styles.textContent]}>{log.content}</Text>
      <View style={styles.line} />
      <View style={styles.feedbackContainer}>
        <Text style={[globalStyles.textBody15R, styles.textFeedback]}>피드백</Text>
        {log.feedbacks.map((feedback, index) => (
          <Feedback key={index} text={feedback.content} />
        ))}
      </View>
    </ScrollView>
  );
};

export default ProjectLogDetailPresenter;
