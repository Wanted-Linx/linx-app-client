import React, { useState } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DateTime } from 'luxon';

import { RootStackParamList } from '../../RootNavigator';
import ProjectRegisterDetailPresenter from './ProjectRegisterDetailPresenter';

type ProjectRegisterDetailProps = NativeStackScreenProps<RootStackParamList, 'ProjectRegisterDetail'>;

const ProjectRegisterDetail: FC<ProjectRegisterDetailProps> = ({ navigation }) => {
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
  const handlePressNext = () => {};

  return (
    <ProjectRegisterDetailPresenter
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

export default ProjectRegisterDetail;
