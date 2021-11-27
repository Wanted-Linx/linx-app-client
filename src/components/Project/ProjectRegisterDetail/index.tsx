import React, { useState } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DateTime } from 'luxon';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../../RootNavigator';
import ProjectRegisterDetailPresenter from './ProjectRegisterDetailPresenter';
import { defaultErrorAlert } from '../../../utils';
import { authAPI, projectApi } from '../../../api';

type ProjectRegisterDetailProps = NativeStackScreenProps<RootStackParamList, 'ProjectRegisterDetail'>;

const ProjectRegisterDetail: FC<ProjectRegisterDetailProps> = ({ route, navigation }) => {
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [task_experience, setTaskExperience] = useState('');
  const [qualification, setQualifiation] = useState('');
  const [content, setContent] = useState('');

  const handleStartChange = (date: Date) => setStartDate(DateTime.fromJSDate(date).toISODate());
  const handleEndChange = (date: Date) => setEndDate(DateTime.fromJSDate(date).toISODate());
  const handleTaskExperienceChange = (taskExperience: string) => setTaskExperience(taskExperience);
  const handleQualifiationChange = (qualification: string) => setQualifiation(qualification);
  const handleContentChange = (content: string) => setContent(content);
  const handlePressAdd = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        await projectApi.postProject(authAPI(parseInt(userId, 10)), {
          ...route.params.project,
          start_date,
          end_date,
          task_experience,
          qualification,
          content,
        });
        navigation.replace('MainNavigator', { screen: 'Home', params: { screen: 'HomeMain' } });
      }
    } catch (error) {
      console.log(error);
      defaultErrorAlert();
    }
  };

  return (
    <ProjectRegisterDetailPresenter
      start_date={start_date}
      end_date={end_date}
      task_experience={task_experience}
      qualification={qualification}
      content={content}
      onStartChange={handleStartChange}
      onEndChange={handleEndChange}
      onTaskExperienceChange={handleTaskExperienceChange}
      onQualificationChange={handleQualifiationChange}
      onContentChange={handleContentChange}
      onPressAdd={handlePressAdd}
    />
  );
};

export default ProjectRegisterDetail;
