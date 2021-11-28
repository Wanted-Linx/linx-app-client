import React from 'react';
import type { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle, Line } from 'react-native-svg';
import { DateTime } from 'luxon';

import { LogData } from '../Project/ProjectDetail/index';
import { responsiveWidth as rw } from '../../style/dimensions';
import globalStyles from '../../style/styles';
import colors from '../../style/colors';
import { TouchableView } from './TouchableView';

export interface ProjectLogProps {
  log: LogData;
  onPress: (logId: number) => void;
}

export const ProjectLog: FC<ProjectLogProps> = ({ log, onPress }) => {
  return (
    <View style={styles.log}>
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator}>
          <Svg height={rw(12)} width={rw(13)}>
            <Circle cx={rw(6)} cy={rw(6)} r={rw(6)} fill={colors.colorPrimary500} />
          </Svg>
          <Svg height={rw(80)} width={rw(13)}>
            <Line x1={rw(6)} y1="0" x2={rw(6)} y2={rw(80)} stroke={colors.colorGray300} strokeWidth="2" />
          </Svg>
        </View>
        <Text style={globalStyles.textBody14}>{DateTime.fromISO(log.end_date).toFormat('MM월 dd일')}</Text>
      </View>
      <TouchableView onPress={() => onPress(log.id)} style={styles.logContent}>
        <Text style={globalStyles.textBody15R}>{log.title}</Text>
      </TouchableView>
    </View>
  );
};

const styles = StyleSheet.create({
  log: { flexDirection: 'row', justifyContent: 'space-between' },
  indicatorContainer: { flexDirection: 'row' },
  indicator: { marginRight: rw(8) },
  logContent: {
    width: rw(253),
    height: rw(60),
    backgroundColor: '#D5E6FF',
    borderRadius: rw(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});
