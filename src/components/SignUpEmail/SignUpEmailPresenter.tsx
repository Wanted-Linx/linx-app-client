import React from 'react';
import type { FC } from 'react';
import { View, Text } from 'react-native';

import globalStyles from '../../style/styles';
import styles from './SignUpEmail.style';
import { CustomTextInput, Button } from '../Common';
import type { ValidError } from '../Common';

interface LoginPresenterProps {
  isStudent: boolean;
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onPressNext: () => void;
  errorEmail?: ValidError;
  errorPassword?: ValidError;
}

const LoginPresenter: FC<LoginPresenterProps> = ({
  isStudent,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onPressNext,
  errorEmail,
  errorPassword,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[globalStyles.textHeadline20, styles.textTitle]}>{isStudent ? '학생 로그인' : '기업 로그인'}</Text>
      <CustomTextInput
        placeholder="이메일"
        value={email}
        onChangeText={(email) => onEmailChange(email)}
        validError={errorEmail}
        keyboardType="email-address"
      />
      <CustomTextInput
        secureTextEntry
        placeholder="비밀번호"
        value={password}
        onChangeText={(password) => onPasswordChange(password)}
        validError={errorPassword}
      />
      <Button title="로그인하기" style={styles.buttonEmail} onPress={onPressNext} />
    </View>
  );
};

export default LoginPresenter;
