import React from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSetRecoilState } from 'recoil';

import { ProfileStackParamList } from '../index';
import HomeMainPresenter from './HomeMainPresenter';

type HomeMainProps = NativeStackScreenProps<ProfileStackParamList, 'HomeMain'>;

const HomeMain: FC<HomeMainProps> = ({ route, navigation }) => {
  return <HomeMainPresenter />;
};

export default HomeMain;
