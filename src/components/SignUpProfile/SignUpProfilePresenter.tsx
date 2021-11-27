import React from 'react';
import type { FC } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import globalStyles from '../../style/styles';
import styles from './SignUpProfile.style';
import { CustomTextInput, Button } from '../Common';
import type { ValidError } from '../Common';

interface SignUpProfilePresenterProps {
  nickname: string;
  onNicknameChange: (nickname: string) => void;
  onNextClick: () => void;
  errorNickname?: ValidError;
}

const SignUpProfilePresenter: FC<SignUpProfilePresenterProps> = ({ nickname, onNicknameChange, onNextClick, errorNickname }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://i.ytimg.com/vi/mGJulFFrgL0/maxresdefault.jpg',
        }}
        style={styles.imageBackground}
        blurRadius={25}>
        <View>
          <Text style={[globalStyles.textHeadline29, styles.textTitle]}>{'마지막으로\n닉네임을 입력하면 끝!'}</Text>
          <CustomTextInput
            value={nickname}
            onChangeText={(nickname) => onNicknameChange(nickname)}
            validError={errorNickname}
          />
          <Button title="회원가입 완료" style={styles.buttonNext} onPress={onNextClick} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignUpProfilePresenter;
