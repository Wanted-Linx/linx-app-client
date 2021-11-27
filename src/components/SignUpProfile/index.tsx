import React, { useState } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../RootNavigator';
import SignUpProfilePresenter from './SignUpProfilePresenter';
import type { ValidError } from '../Common/CustomTextInput';
import { userApi, isApiError } from '../../api';
import { defaultErrorAlert } from '../../utils';

type SignUpProfileProps = NativeStackScreenProps<RootStackParamList, 'SignUpProfile'>;

const SignUpProfile: FC<SignUpProfileProps> = ({ route, navigation }) => {
  const [nickname, setNickname] = useState('');
  const [errorNickname, setErrorNickname] = useState<ValidError>(null);

  const handleNicknameChange = (nickname: string) => setNickname(nickname);
  const handleNextClick = async () => {
    if (nickname === '') {
      setErrorNickname({ error: true, errorMessage: '닉네임을 입력해주세요' });
      return;
    }
    if (nickname.length < 2 || nickname.length > 10) {
      setErrorNickname({ error: true, errorMessage: '닉네임은 2~10자입니다.' });
      return;
    }

    try {
      await signUpApi.checkNicknameDuplicate({ nickname });
      const { username, password } = route.params;
      navigation.navigate('SignUpCampaign', { username, password, nickname });
    } catch (error) {
      if (isApiError(error)) {
        const response = error.response;
        const status = response?.status;
        const errorMessage = response?.data.error;
        if (status === 400) {
          setErrorNickname({ error: true, errorMessage });
        }
        if (status === 500 || !status) {
          defaultErrorAlert();
        }
      } else {
        defaultErrorAlert();
      }
    }
  };

  return (
    <SignUpProfilePresenter nickname={nickname} onNicknameChange={handleNicknameChange} onNextClick={handleNextClick} errorNickname={errorNickname} />
  );
};

export default SignUpProfile;
