import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Linking } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SearchStackParamList } from '../index';
import SearchShowPresenter from './SearchShowPresenter';
import { showApi, tagApi } from '../../../api';
import { defaultErrorAlert } from '../../../utils';

type SearchShowProps = NativeStackScreenProps<SearchStackParamList, 'SearchShow'>;

const INSTAGRAM_LINK = 'instagram://user?username=operaglass_official';
const INSTAGRAM_WEB_LINK = 'https://www.instagram.com/operaglass_official/';

const SearchShow: FC<SearchShowProps> = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchShows, setSearchTerms] = useState<{ id: number; title: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState([]);
  const [shows, setShows] = useState([]);

  const getSearchTerms = async () => {
    try {
      const searchShows = await AsyncStorage.getItem('searchShows');
      setSearchTerms(JSON.parse(searchShows ?? '[]'));
    } catch (error) {
      defaultErrorAlert();
    }
  };
  useEffect(() => {
    getSearchTerms();
  }, []);

  const getTags = async () => {
    try {
      const { data } = await tagApi.getTags();
      setTags(data.tags);
    } catch (error: any) {
      defaultErrorAlert();
    }
  };
  useEffect(() => {
    getTags();
  }, []);

  const handleChangeText = (text: string) => setInputValue(text);
  const handleClickSearch = async () => {
    if (inputValue === '') {
      return;
    }
    try {
      const { data } = await showApi.searchTitle(inputValue);
      setShows(data.shows);
      setSearchTerm(inputValue);
    } catch (error) {
      defaultErrorAlert();
    }
  };
  const handleClickClose = () => {
    setInputValue('');
    setSearchTerm('');
  };
  const handleClickTag = (tag: string) => navigation.navigate('ShowList', { tag });
  const handleClickShow = async (id: number, title: string) => {
    try {
      let newArr = searchShows.filter((searchShow) => searchShow.title !== title);
      newArr = [{ id, title }, ...newArr];
      if (newArr.length > 5) {
        newArr = newArr.slice(0, 5);
      }
      setSearchTerms(newArr);
      await AsyncStorage.setItem('searchShows', JSON.stringify(newArr));
      navigation.navigate('ShowDetail', { showId: id });
    } catch (error) {
      defaultErrorAlert();
    }
  };
  const handleClickNoShow = async () => {
    try {
      const supported = await Linking.canOpenURL(INSTAGRAM_LINK);
      if (supported) {
        await Linking.openURL(INSTAGRAM_LINK);
      } else {
        await Linking.openURL(INSTAGRAM_WEB_LINK);
      }
    } catch (error) {
      defaultErrorAlert();
    }
  };

  return (
    <SearchShowPresenter
      inputValue={inputValue}
      searchShows={searchShows}
      searchTerm={searchTerm}
      shows={shows}
      tags={tags}
      onChangeText={handleChangeText}
      onPressSearch={handleClickSearch}
      onPressClose={handleClickClose}
      onPressTag={handleClickTag}
      onPressShow={handleClickShow}
      onPressNoShow={handleClickNoShow}
    />
  );
};

export default SearchShow;
