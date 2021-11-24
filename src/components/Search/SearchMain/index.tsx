import React from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SearchStackParamList } from '../index';
import SearchMainPresenter from './SearchMainPresenter';

type SearchMainProps = NativeStackScreenProps<SearchStackParamList, 'SearchMain'>;

const SearchMain: FC<SearchMainProps> = ({ route, navigation }) => {
  return <SearchMainPresenter />;
};

export default SearchMain;
