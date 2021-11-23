import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SearchStackParamList } from '..';
import ShowListPresenter from './ShowListPresenter';
import { defaultErrorAlert } from '../../../utils';
import { showApi } from '../../../api';

type ShowListProps = NativeStackScreenProps<SearchStackParamList, 'ShowList'>;

const ShowList: FC<ShowListProps> = ({ route: { params }, navigation }) => {
  const [rankShows, setRankShows] = useState([]);
  const [shows, setShows] = useState([]);

  const getRankShows = async () => {
    try {
      if (params.category) {
        const { data } = await showApi.getCategoryRankShows(params.category);
        setRankShows(data.shows);
      }
    } catch (error) {
      defaultErrorAlert();
    }
  };
  useEffect(() => {
    getRankShows();
  }, []);

  const getShows = async () => {
    try {
      if (params.category) {
        const { data } = await showApi.getCategoryShows(params.category);
        setShows(data.shows);
      } else if (params.tag) {
        const { data } = await showApi.searchTag(params.tag);
        setShows(data.shows);
      }
    } catch (error) {
      defaultErrorAlert();
    }
  };
  useEffect(() => {
    getShows();
  }, []);

  const handleClickShow = (showId: number) => navigation.navigate('ShowDetail', { showId });

  return <ShowListPresenter rankShows={rankShows} shows={shows} onPressShow={handleClickShow} />;
};

export default ShowList;
