import React, { useEffect, useState, useRef } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SearchStackParamList } from '../index';
import SearchMainPresenter from './SearchMainPresenter';
import type { ProfileSearchData } from '../../Common';
import { authAPI, clubApi, companyApi } from '../../../api';

type SearchMainProps = NativeStackScreenProps<SearchStackParamList, 'SearchMain'>;

const SearchMain: FC<SearchMainProps> = ({ navigation }) => {
  const [isClubOn, setIsClubOn] = useState(true);
  const [profiles, setProfiles] = useState<ProfileSearchData[]>([]);
  const clubList = useRef<ProfileSearchData[]>([]);
  const companyList = useRef<ProfileSearchData[]>([]);

  const getClubList = async () => {
    const { data } = await clubApi.getClubList(authAPI(1), 10, 0);
    clubList.current = data;
  };
  useEffect(() => {
    getClubList();
  }, []);
  const getClubProfileImage = async () => {
    try {
      for (const [index, club] of clubList.current.entries()) {
        const { data } = await clubApi.getProfileImage(authAPI(club.id, 'blob'));
        clubList.current[index].image = URL.createObjectURL(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClubProfileImage();
  }, [clubList.current]);
  const getCompanyList = async () => {
    const { data } = await companyApi.getCompanyList(authAPI(1), 10, 0);
    companyList.current = data;
  };
  useEffect(() => {
    getCompanyList();
  }, []);
  const getCompanyProfileImage = async () => {
    try {
      for (const [index, company] of companyList.current.entries()) {
        const { data } = await companyApi.getProfileImage(authAPI(company.id, 'blob'));
        companyList.current[index].image = URL.createObjectURL(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCompanyProfileImage();
  }, [companyList.current]);
  useEffect(() => {
    setProfiles(isClubOn ? clubList.current : companyList.current);
  }, [isClubOn]);

  const toggleTopTab = (isClubOn: boolean) => setIsClubOn(isClubOn);
  const handlePressProfile = (profileId: number) =>
    navigation.navigate('ProfileDetail', isClubOn ? { clubId: profileId } : { companyId: profileId });

  return (
    <SearchMainPresenter
      profiles={profiles}
      isClubOn={isClubOn}
      onPressTopTab={toggleTopTab}
      onPressProfile={handlePressProfile}
    />
  );
};

export default SearchMain;
