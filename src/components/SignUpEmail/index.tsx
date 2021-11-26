import React, { useState } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetRecoilState } from 'recoil';

import { RootStackParamList } from '../RootNavigator';
import { userApi } from '../../api';
import SignUpEmailPresenter from './SignUpEmailPresenter';
import type { ValidError } from '../Common/TitleTextInput';
import { defaultErrorAlert, checkEmailValidation, checkPasswordValidation } from '../../utils';

type SignUpEmailProps = NativeStackScreenProps<RootStackParamList, 'SignUpEmail'>;

const SugnUpEmail: FC<SignUpEmailProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState<ValidError>(null);
  const [errorPassword, setErrorPassword] = useState<ValidError>(null);

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
      defaultErrorAlert();
    }
  };

  return (
    <SignUpEmailPresenter
      email={email}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onNextClick={handleNextClick}
      errorEmail={errorEmail}
      errorPassword={errorPassword}
    />
  );
};

export default SugnUpEmail;
