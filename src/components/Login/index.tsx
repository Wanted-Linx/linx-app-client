import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetRecoilState } from 'recoil';

import { loginApi, isApiError } from '../../api';
import LoginPresenter from './LoginPresenter';
import type { ValidError } from '../Common/TitleTextInput';
import { defaultErrorAlert } from '../../utils';
import { tokenState, nicknameState } from '../../state';
import colors from '../../style/colors';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: FC<LoginProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState<ValidError>(null);
  const [errorPassword, setErrorPassword] = useState<ValidError>(null);
  const setToken = useSetRecoilState(tokenState);
  const setNickname = useSetRecoilState(nicknameState);

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      await autoLogin();
      SplashScreen.hide();
    }, 1500);
    return () => clearTimeout(timeOutId);
  }, []);

  const login = async (data: { accessToken: string; refreshToken?: string; nickname: string }) => {
    try {
      if (data.refreshToken) {
        await AsyncStorage.setItem('refreshToken', data.refreshToken);
      }
      setToken(data.accessToken);
      setNickname(data.nickname);
      navigation.replace('Main');
    } catch (error) {
      defaultErrorAlert();
    }
  };
  const autoLogin = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (!refreshToken) {
        setLoading(false);
        return;
      }
      const { data } = await loginApi.autoLogin({ refreshToken });
      login(data);
    } catch (error: any) {
      defaultErrorAlert();
    }
  };

  const handleEmailChange = (email: string) => setEmail(email);
  const handlePasswordChange = (password: string) => setPassword(password);
  const handleLoginClick = async () => {
    if (email === '') {
      setErrorEmail({ error: true, errorMessage: '이메일을 입력해주세요' });
      return;
    }
    if (password === '') {
      setErrorPassword({ error: true, errorMessage: '비밀번호를 입력해주세요' });
      return;
    }
    const body = { username: email, password };
    try {
      const { data } = await loginApi.emailLogin(body);
      login(data);
    } catch (error) {
      if (isApiError(error)) {
        // status code로 변경할 예정
        const response = error.response;
        const status = response?.status;
        const errorMessage = response?.data.error;
        switch (status) {
          case 402: {
            setErrorEmail({ error: true, errorMessage });
            break;
          }
          case 403: {
            setErrorPassword({ error: true, errorMessage });
            break;
          }
          case 500:
          default: {
            defaultErrorAlert();
            break;
          }
        }
      } else {
        defaultErrorAlert();
      }
    }
  };
  const handleSignUpClick = () => navigation.navigate('SignUpEmail');

  return loading ? (
    <View style={{ backgroundColor: colors.colorPrimary500 }} />
  ) : (
    <LoginPresenter
      email={email}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onLoginClick={handleLoginClick}
      onSignUpClick={handleSignUpClick}
      errorEmail={errorEmail}
      errorPassword={errorPassword}
    />
  );
};

export default Login;
