import React from 'react';
import type { FC } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import globalStyles from '../../style/styles';
import styles from './SignUpEmail.style';
import { TitleTextInput, Button } from '../Common';
import type { ValidError } from '../Common';

interface SignUpEmailPresenterProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onNextClick: () => void;
  errorEmail?: ValidError;
  errorPassword?: ValidError;
}

const SignUpEmailPresenter: FC<SignUpEmailPresenterProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onNextClick,
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
          <Text style={[globalStyles.textHeadline29, styles.textTitle]}>{'이메일로\n5초만에 가입!'}</Text>
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
          <Button title="다음으로" style={styles.buttonNext} onPress={onNextClick} />
        </View>
        <View>
          <View style={styles.line} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignUpEmailPresenter;
