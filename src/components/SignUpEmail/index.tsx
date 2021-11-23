import React, { useState } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetRecoilState } from 'recoil';

import { loginApi, isApiError, signUpApi } from '../../api';
import SignUpEmailPresenter from './SignUpEmailPresenter';
import type { ValidError } from '../Common/TitleTextInput';
import { defaultErrorAlert, checkEmailValidation, checkPasswordValidation } from '../../utils';
import { tokenState, nicknameState } from '../../state';

type SignUpEmailProps = NativeStackScreenProps<RootStackParamList, 'SignUpEmail'>;

const SugnUpEmail: FC<SignUpEmailProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState<ValidError>(null);
  const [errorPassword, setErrorPassword] = useState<ValidError>(null);
  const setToken = useSetRecoilState(tokenState);
  const setNickname = useSetRecoilState(nicknameState);

  const login = async (data: { accessToken: string; refreshToken: string; nickname: string }) => {
    try {
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      setToken(data.accessToken);
      setNickname(data.nickname);
      navigation.replace('Main');
    } catch (error) {
      defaultErrorAlert();
    }
  };

  const handleEmailChange = (email: string) => setEmail(email);
  const handlePasswordChange = (password: string) => setPassword(password);
  const handleNextClick = async () => {
    if (email === '') {
      setErrorEmail({ error: true, errorMessage: '이메일을 입력해주세요' });
      return;
    }
    if (password === '') {
      setErrorPassword({ error: true, errorMessage: '비밀번호를 입력해주세요' });
      return;
    }
    if (!checkEmailValidation(email)) {
      setErrorEmail({ error: true, errorMessage: '잘못된 이메일 형식입니다.' });
      return;
    }
    if (!checkPasswordValidation(password)) {
      setErrorPassword({ error: true, errorMessage: '비밀번호 형식은 영문, 숫자, 특수문자를 혼합한 10~15자입니다.' });
      return;
    }

    try {
      await signUpApi.checkEmailDuplicate({ username: email });
      navigation.navigate('SignUpProfile', { username: email, password });
    } catch (error) {
      if (isApiError(error)) {
        const response = error.response;
        const status = response?.status;
        const errorMessage = response?.data.error;
        if (status === 400) {
          setErrorEmail({ error: true, errorMessage });
        }
        if (status === 500 || !status) {
          defaultErrorAlert();
        }
      } else {
        defaultErrorAlert();
      }
    }
  };
  // ios 테스트 필요
  const handleKakaoClick = async () => {
    try {
      const { accessToken } = await kakaoLogin();
      const { data } = await loginApi.kakaoLogin({ kakaoToken: accessToken });
      login(data);
    } catch (error: any) {
      if (isApiError(error)) {
        const response = error.response;
        const status = response?.status;
        const data = response?.data;
        if (status === 400) {
          navigation.navigate('SignUpProfile', { username: data.username });
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
    <SignUpEmailPresenter
      email={email}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onNextClick={handleNextClick}
      onKakaoClick={handleKakaoClick}
      errorEmail={errorEmail}
      errorPassword={errorPassword}
    />
  );
};

export default SugnUpEmail;
