import React from 'react';
import type { FC } from 'react';
import { View, Text } from 'react-native';

import globalStyles from '../../../style/styles';
import styles from './ProjectRegister.style';
import { CustomTextInput, Button, TouchableView } from '../../Common';
import type { ValidError } from '../../Common';

interface ProjectRegisterInfoPresenterProps {
  isStudent: boolean;
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onPressLogin: () => void;
  onPressChangeType: () => void;
  onPressSignUp: () => void;
  errorEmail?: ValidError;
  errorPassword?: ValidError;
}

const ProjectRegisterInfoPresenter: FC<ProjectRegisterInfoPresenterProps> = ({
  isStudent,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onPressLogin,
  onPressChangeType,
  onPressSignUp,
  errorEmail,
  errorPassword,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
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
        <Button title="로그인하기" style={styles.buttonEmail} onPress={onPressLogin} />
        <TouchableView onPress={onPressChangeType}>
          <Text style={[globalStyles.textBody15M, styles.textChangeType]}>
            {isStudent ? '기업 회원으로 로그인하기' : '학생 회원으로 로그인하기'}
          </Text>
        </TouchableView>
      </View>
      <Button
        title={isStudent ? '학생 회원가입하기' : '기업 회원가입하기'}
        style={styles.buttonSignUp}
        textStyle={styles.textSignUp}
        onPress={onPressSignUp}
      />
    </View>
  );
};

export default ProjectRegisterInfoPresenter;
