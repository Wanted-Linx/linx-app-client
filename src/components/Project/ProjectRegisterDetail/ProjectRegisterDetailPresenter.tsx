import React, { useState } from 'react';
import type { FC } from 'react';
import { View, Text, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';

import styles from './ProjectRegisterDetail.style';
import { CustomTextInput, Button, DateTextInput } from '../../Common';
import globalStyles from '../../../style/styles';

interface ProjectRegisterDetailPresenterProps {
  start_date: string;
  end_date: string;
  task_experience: string;
  qualification: string;
  content: string;
  onStartChange: (date: Date) => void;
  onEndChange: (date: Date) => void;
  onTaskExperienceChange: (text: string) => void;
  onQualificationChange: (text: string) => void;
  onContentChange: (text: string) => void;
  onPressAdd: () => void;
}

const ProjectRegisterDetailPresenter: FC<ProjectRegisterDetailPresenterProps> = ({
  start_date,
  end_date,
  task_experience,
  qualification,
  content,
  onStartChange,
  onEndChange,
  onTaskExperienceChange,
  onQualificationChange,
  onContentChange,
  onPressAdd,
}) => {
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={globalStyles.textBody14}>프로젝트 기간</Text>
          <View style={styles.dateContainer}>
            <DateTextInput
              placeholder="시작일"
              value={start_date}
              editable={false}
              onPressIn={() => setOpenStart(true)}
            />
            <Text style={[globalStyles.textBody14, styles.textDateSub]}>부터</Text>
            <DateTextInput placeholder="마감일" value={end_date} editable={false} onPressIn={() => setOpenEnd(true)} />
            <Text style={globalStyles.textBody14}>까지</Text>
          </View>
          <CustomTextInput
            title="직무경험"
            style={styles.input}
            multiline
            placeholder={'프로젝트에 참여할 경우\n어떤 직무 경험을 할 수 있는지 적어주세요'}
            value={task_experience}
            onChangeText={onTaskExperienceChange}
          />
          <CustomTextInput
            title="지원자격"
            style={styles.input}
            multiline
            value={qualification}
            placeholder="프로젝트 지원 자격을 적어주세요"
            onChangeText={onQualificationChange}
          />
          <CustomTextInput
            title="프로젝트 소개"
            style={styles.input}
            multiline
            value={content}
            placeholder="프로젝트 상세 소개를 적어주세요"
            onChangeText={onContentChange}
          />
        </View>
        <DatePicker
          modal
          open={openStart}
          date={new Date()}
          mode="date"
          onConfirm={(date) => {
            setOpenStart(false);
            onStartChange(date);
          }}
          onCancel={() => setOpenStart(false)}
        />
        <DatePicker
          modal
          open={openEnd}
          date={new Date()}
          mode="date"
          onConfirm={(date) => {
            setOpenEnd(false);
            onEndChange(date);
          }}
          onCancel={() => setOpenEnd(false)}
        />
      </ScrollView>
      <Button title="등록하기" style={styles.buttonAdd} onPress={onPressAdd} />
    </View>
  );
};

export default ProjectRegisterDetailPresenter;
