import React, { useEffect, useState, useLayoutEffect } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRecoilValue } from 'recoil';

import ProjectDetailPresenter from './ProjectDetailPresenter';
import { HomeStackParamList } from '../../Home';
import { ProjectStackParamList } from '../../Project';
import { tokenState } from '../../../state';
import { authAPI, likeApi } from '../../../api';
import { defaultErrorAlert } from '../../../utils';
import { TouchableView } from '../../Common';
import { BookmarkActive, BookmarkInactive } from '../../../assets/images';
import { responsiveWidth as rw } from '../../../style/dimensions';

type ProjectDetailProps = NativeStackScreenProps<HomeStackParamList, 'ProjectDetail'> &
  NativeStackScreenProps<ProjectStackParamList, 'ProjectDetail'>;

export interface ProjectDetailData {
  id: number;
  title: string;
  company: string;
  companyProfile: string;
  image: string;
  categories: string[];
  endDate: string;
  sponsorFee: string;
  experience: string;
  qualification: string;
  description: string;
  duration: string;
  bookmark: boolean;
}

const dummy = {
  id: 1,
  title: '채용연계형 대규모 해커톤 해,커리어!',
  company: 'Wanted',
  companyProfile:
    'https://media-exp1.licdn.com/dms/image/C560BAQGQWpaAuJLC8A/company-logo_200_200/0/1626253203412?e=2159024400&v=beta&t=b7c6YH1wVtA0gU8sjBc3_qSioe1AVqTgyxulWBtdf0g',
  image: 'https://cf-cpi.campuspick.com/activity/1634363522073924.jpg',
  categories: ['기획', '개발'],
  endDate: 'D-14',
  sponsorFee: '50만원',
  experience: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
  qualification: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
  description: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
  duration: '2개월',
  bookmark: false,
};

const ProjectDetail: FC<ProjectDetailProps> = ({ route, navigation }) => {
  const accessToken = useRecoilValue(tokenState);
  const [project, setProject] = useState<ProjectDetailData>(dummy);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableView viewStyle={{ marginRight: rw(20) }} onPress={handleClickBookmark}>
          {isBookmarked ? <BookmarkActive /> : <BookmarkInactive />}
        </TouchableView>
      ),
    });
  }, [navigation, isBookmarked]);

  const handleClickBookmark = async () => {
    try {
      if (isBookmarked) {
        await likeApi.deleteLike(authAPI(accessToken), route.params.projectId);
      } else {
        await likeApi.postLike(authAPI(accessToken), { showId: route.params.projectId });
      }
      setIsBookmarked((isBookmarked) => !isBookmarked);
    } catch (error) {
      defaultErrorAlert();
    }
  };

  const getProjectDetail = async () => {
    try {
      // const { data } = await showApi.getShowDetail(route.params.projectId);
      // setProject(data.project);
    } catch (error) {
      defaultErrorAlert();
    }
  };
  useEffect(() => {
    // getProjectDetail();
  }, []);

  return <ProjectDetailPresenter project={project} />;
};

export default ProjectDetail;
