import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SearchStackParamList } from '../index';
import SearchMainPresenter from './SearchMainPresenter';
import type { ProfileSearchData } from '../../Common';

type SearchMainProps = NativeStackScreenProps<SearchStackParamList, 'SearchMain'>;

const dummy1: ProfileSearchData[] = [
  {
    profileId: 1,
    name: 'Nexters',
    image:
      'https://media-exp1.licdn.com/dms/image/C560BAQGQWpaAuJLC8A/company-logo_200_200/0/1626253203412?e=2159024400&v=beta&t=b7c6YH1wVtA0gU8sjBc3_qSioe1AVqTgyxulWBtdf0g',
    description: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
    university: '고려대학교',
  },
  {
    profileId: 2,
    name: 'Nexters',
    image:
      'https://media-exp1.licdn.com/dms/image/C560BAQGQWpaAuJLC8A/company-logo_200_200/0/1626253203412?e=2159024400&v=beta&t=b7c6YH1wVtA0gU8sjBc3_qSioe1AVqTgyxulWBtdf0g',
    description: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
    university: '고려대학교',
  },
  {
    profileId: 3,
    name: 'Nexters',
    image:
      'https://media-exp1.licdn.com/dms/image/C560BAQGQWpaAuJLC8A/company-logo_200_200/0/1626253203412?e=2159024400&v=beta&t=b7c6YH1wVtA0gU8sjBc3_qSioe1AVqTgyxulWBtdf0g',
    description: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
    university: '고려대학교',
  },
];

const dummy2: ProfileSearchData[] = [
  {
    profileId: 1,
    name: 'Wanted',
    image:
      'https://media-exp1.licdn.com/dms/image/C560BAQGQWpaAuJLC8A/company-logo_200_200/0/1626253203412?e=2159024400&v=beta&t=b7c6YH1wVtA0gU8sjBc3_qSioe1AVqTgyxulWBtdf0g',
    description: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
    category: 'IT 스타트업',
  },
  {
    profileId: 2,
    name: 'Wanted',
    image:
      'https://media-exp1.licdn.com/dms/image/C560BAQGQWpaAuJLC8A/company-logo_200_200/0/1626253203412?e=2159024400&v=beta&t=b7c6YH1wVtA0gU8sjBc3_qSioe1AVqTgyxulWBtdf0g',
    description: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
    category: 'IT 스타트업',
  },
  {
    profileId: 3,
    name: 'Wanted',
    image:
      'https://media-exp1.licdn.com/dms/image/C560BAQGQWpaAuJLC8A/company-logo_200_200/0/1626253203412?e=2159024400&v=beta&t=b7c6YH1wVtA0gU8sjBc3_qSioe1AVqTgyxulWBtdf0g',
    description: '해커리어는 대학생 및 취업 준비생 4인이 팀을 이뤄 참가하는 6주간의 IT 오디션입니다!',
    category: 'IT 스타트업',
  },
];

const SearchMain: FC<SearchMainProps> = ({ navigation }) => {
  const [isClubOn, setIsClubOn] = useState(true);
  const [profiles, setProfiles] = useState(dummy1);

  useEffect(() => {
    setProfiles(isClubOn ? dummy1 : dummy2);
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
