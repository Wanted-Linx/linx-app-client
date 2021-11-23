import React from 'react';
import type { FC } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import globalStyles from '../../style/styles';
import styles from './Login.style';
import { TitleTextInput, Button, TouchableView } from '../Common';
import type { ValidError } from '../Common';

interface LoginPresenterProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  errorEmail?: ValidError;
  errorPassword?: ValidError;
}

const LoginPresenter: FC<LoginPresenterProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLoginClick,
  onSignUpClick,
  errorEmail,
  errorPassword,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://i.ytimg.com/vi/mGJulFFrgL0/maxresdefault.jpg',
        }}
        style={styles.imageBackground}
        blurRadius={25}>
        <View>
          <Text style={[globalStyles.textHeadline29, styles.textTitle]}>{'오페라 글라스,\n공연을 더 선명하게'}</Text>
          <TitleTextInput
            title="이메일"
            titleStyle={styles.textInputTitleEmail}
            value={email}
            onChangeText={(email) => onEmailChange(email)}
            validError={errorEmail}
            keyboardType="email-address"
          />
          <TitleTextInput
            secureTextEntry
            title="비밀번호"
            titleStyle={styles.textInputTitlePassword}
            value={password}
            onChangeText={(password) => onPasswordChange(password)}
            validError={errorPassword}
          />
          <Button title="이메일로 로그인하기" style={styles.buttonEmail} onPress={onLoginClick} />
        </View>
        <View>
          <View style={styles.line} />
          <TouchableView viewStyle={styles.buttonSignUp} onPress={onSignUpClick}>
            <Text style={[globalStyles.textBody15, styles.buttonSignUpText]}>이메일로 가입하기</Text>
          </TouchableView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginPresenter;
