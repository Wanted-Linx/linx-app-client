import React from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../RootNavigator';
import ProjectLogDetailPresenter from './ProjectLogDetailPresenter';

type ProjectLogDetailProps = NativeStackScreenProps<RootStackParamList, 'ProjectLogDetail'>;

export interface LogDetailData {
  title: string;
  author: string;
  content: string;
  start_date: string;
  end_date: string;
  feedbacks: { author: string; content: string }[];
  participants: { name: string }[];
}

const ProjectLogDetail: FC<ProjectLogDetailProps> = ({ route }) => {
  return <ProjectLogDetailPresenter log={route.params.log} />;
};

export default ProjectLogDetail;
