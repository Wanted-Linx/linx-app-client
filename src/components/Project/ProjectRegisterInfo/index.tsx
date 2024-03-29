import React, { useState } from 'react';
import type { FC } from 'react';
import { Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DateTime } from 'luxon';

import { RootStackParamList } from '../../RootNavigator';
import ProjectRegisterInfoPresenter from './ProjectRegisterInfoPresenter';

type ProjectRegisterInfoProps = NativeStackScreenProps<RootStackParamList, 'ProjectRegisterInfo'>;

const ProjectRegisterInfo: FC<ProjectRegisterInfoProps> = ({ navigation }) => {
  const [task_type, setTaskType] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [applying_start_date, setApplyingStartDate] = useState('');
  const [applying_end_date, setApplyingEndDate] = useState('');
  const [sponsor_fee, setSponsorFee] = useState('');

  const handlePressType = (type: string) =>
    setTaskType((prev) => {
      if (!prev.includes(type)) {
        return [...prev, type];
      } else {
        return prev.filter((prevType) => prevType !== type);
      }
    });
  const handleNameChange = (email: string) => setName(email);
  const handleSponsorFeeChange = (sponsor_fee: string) => setSponsorFee(sponsor_fee);
  const handleStartChange = (date: Date) => setApplyingStartDate(DateTime.fromJSDate(date).toISODate());
  const handleEndChange = (date: Date) => setApplyingEndDate(DateTime.fromJSDate(date).toISODate());
  const handlePressNext = () => {
    if (!task_type.length) {
      Alert.alert('모집 분야를 선택해주세요');
      return;
    }
    if (name === '') {
      Alert.alert('제목을 입력해주세요');
      return;
    }
    if (applying_start_date === '') {
      Alert.alert('시작일을 입력해주세요');
      return;
    }
    if (applying_end_date === '') {
      Alert.alert('마감일을 입력해주세요');
      return;
    }
    if (sponsor_fee === '') {
      Alert.alert('스폰서비를 입력해주세요');
      return;
    }
    navigation.navigate('ProjectRegisterDetail', {
      project: {
        task_type,
        name,
        applying_start_date,
        applying_end_date,
        sponsor_fee: parseInt(sponsor_fee, 10) * 10000,
      },
    });
  };

  return (
    <ProjectRegisterInfoPresenter
      name={name}
      sponsor_fee={sponsor_fee}
      applying_start_date={applying_start_date}
      applying_end_date={applying_end_date}
      onPressType={handlePressType}
      onNameChange={handleNameChange}
      onSponsorFeeChange={handleSponsorFeeChange}
      onStartChange={handleStartChange}
      onEndChange={handleEndChange}
      onPressNext={handlePressNext}
    />
  );
};

export default ProjectRegisterInfo;
