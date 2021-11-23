import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SearchStackParamList } from '../index';
import SearchMainPresenter from './SearchMainPresenter';
import { showApi } from '../../../api';
import { defaultErrorAlert } from '../../../utils';

type SearchMainProps = NativeStackScreenProps<SearchStackParamList, 'SearchMain'>;

const SearchMain: FC<SearchMainProps> = ({ navigation }) => {
  const [shows, setShows] = useState([]);

  const getRankShows = async () => {
    try {
      const { data } = await showApi.getWeekRankShows();
      setShows(data.shows);
    } catch (error) {
      defaultErrorAlert();
    }
  };
  useEffect(() => {
    getRankShows();
  }, []);

  const handleClickSearchInput = () => navigation.navigate('SearchShow');
  const handleClickCategory = (category: string) => navigation.navigate('ShowList', { category });
  const handleClickShow = (showId: number) => navigation.navigate('ShowDetail', { showId });

  return (
    <SearchMainPresenter
      shows={shows}
      onPressSearchInput={handleClickSearchInput}
      onPressCategory={handleClickCategory}
      onPressShow={handleClickShow}
    />
  );
};

export default SearchMain;
