import React, { useState } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetRecoilState } from 'recoil';

import { RootStackParamList } from '../RootNavigator';
import { userApi } from '../../api';
import LoginPresenter from './LoginPresenter';
import type { ValidError } from '../Common/CustomTextInput';
import { defaultErrorAlert } from '../../utils';
import { userTypeState } from '../../state';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: FC<LoginProps> = ({ route, navigation }) => {
  const [isStudent, setIsStudent] = useState(route.params.isStudent);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState<ValidError>(null);
  const [errorPassword, setErrorPassword] = useState<ValidError>(null);
  const setUserType = useSetRecoilState(userTypeState);

  const handleEmailChange = (email: string) => setEmail(email);
  const handlePasswordChange = (password: string) => setPassword(password);
  const handlePressLogin = async () => {
    if (email === '') {
      setErrorEmail({ error: true, errorMessage: '이메일을 입력해주세요' });
      return;
    }
    if (password === '') {
      setErrorPassword({ error: true, errorMessage: '비밀번호를 입력해주세요' });
      return;
    }
    const body = { email, password, kind: isStudent ? 'student' : 'company' };
    try {
      const { data } = await userApi.emailLogin(body);
      console.log(data);
      await AsyncStorage.setItem('userId', data.id.toString());
      await AsyncStorage.setItem('userType', data.kind);
      setUserType(data.kind);
      navigation.replace('MainNavigator', { screen: 'Home', params: { screen: 'HomeMain' } });
    } catch (error) {
      defaultErrorAlert();
    }
  };
  const handlePressChangeType = () => setIsStudent((isStudent) => !isStudent);
  const handlePressSignUp = () => navigation.navigate('SignUpEmail', { isStudent });

  return (
    <LoginPresenter
      isStudent={isStudent}
      email={email}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onPressLogin={handlePressLogin}
      onPressChangeType={handlePressChangeType}
      onPressSignUp={handlePressSignUp}
      errorEmail={errorEmail}
      errorPassword={errorPassword}
    />
  );
};

export default Login;
