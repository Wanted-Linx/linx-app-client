import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SearchStackParamList } from '../index';
import SearchMainPresenter from './SearchMainPresenter';
import type { ProfileSearchData } from '../../Common';
import { authAPI, clubApi, companyApi } from '../../../api';

type SearchMainProps = NativeStackScreenProps<SearchStackParamList, 'SearchMain'>;

const SearchMain: FC<SearchMainProps> = ({ navigation }) => {
  const [isClubOn, setIsClubOn] = useState(true);
  const [clubList, setClubList] = useState<ProfileSearchData[]>([]);
  const [companyList, setCompanyList] = useState<ProfileSearchData[]>([]);

  const getClubList = async () => {
    const { data } = await clubApi.getClubList(authAPI(1), 10, 0);
    setClubList(data);
  };
  useEffect(() => {
    getClubList();
  }, []);
  const getCompanyList = async () => {
    const { data } = await companyApi.getCompanyList(authAPI(1), 10, 0);
    setCompanyList(data);
  };
  useEffect(() => {
    getCompanyList();
  }, []);

  const toggleTopTab = (isClubOn: boolean) => setIsClubOn(isClubOn);
  const handlePressProfile = (profileId: number) =>
    navigation.navigate('ProfileDetail', isClubOn ? { clubId: profileId } : { companyId: profileId });

  return (
    <SearchMainPresenter
      clubList={clubList}
      companyList={companyList}
      isClubOn={isClubOn}
      onPressTopTab={toggleTopTab}
      onPressProfile={handlePressProfile}
    />
  );
};

export default SearchMain;
