import React, { useState } from 'react';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../RootNavigator';
import ProjectRegisterInfoPresenter from './ProjectRegisterInfoPresenter';
import type { ValidError } from '../../Common/CustomTextInput';

type ProjectRegisterInfoProps = NativeStackScreenProps<RootStackParamList, 'ProjectRegisterInfo'>;

const ProjectRegisterInfo: FC<ProjectRegisterInfoProps> = ({ navigation }) => {
  const [task_type, TaskType] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState<ValidError>(null);
  const [errorPassword, setErrorPassword] = useState<ValidError>(null);

  const handleNameChange = (email: string) => setName(email);
  const handlePasswordChange = (password: string) => setPassword(password);

  return (
    <ProjectRegisterInfoPresenter
      name={name}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onPressLogin={handlePressLogin}
      errorEmail={errorEmail}
      errorPassword={errorPassword}
    />
  );
};

export default ProjectRegisterInfo;
