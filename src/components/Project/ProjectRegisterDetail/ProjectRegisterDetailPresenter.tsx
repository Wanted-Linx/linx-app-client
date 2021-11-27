import React, { useState } from 'react';
import type { FC } from 'react';
import { View, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';

import styles from './ProjectRegisterDetail.style';
import { CustomTextInput, Button, TaskType, DateTextInput } from '../../Common';
import globalStyles from '../../../style/styles';

interface ProjectRegisterDetailPresenterProps {
  name: string;
  sponsor_fee: string;
  applying_start_date: string;
  applying_end_date: string;
  onPressType: (type: string) => void;
  onNameChange: (email: string) => void;
  onSponsorFeeChange: (sponsor_fee: string) => void;
  onStartChange: (date: Date) => void;
  onEndChange: (date: Date) => void;
  onPressNext: () => void;
}

const types = ['기획', '마케팅', '개발', '디자인'];

const ProjectRegisterDetailPresenter: FC<ProjectRegisterDetailPresenterProps> = ({
  name,
  sponsor_fee,
  applying_start_date,
  applying_end_date,
  onPressType,
  onNameChange,
  onSponsorFeeChange,
  onStartChange,
  onEndChange,
  onPressNext,
}) => {
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={globalStyles.textBody14}>모집 분야</Text>
        <View style={styles.typeContainer}>
          {types.map((type) => (
            <TaskType key={type} title={type} onPress={() => onPressType(type)} />
          ))}
        </View>
        <CustomTextInput title="프로젝트 제목" value={name} onChangeText={(email) => onNameChange(email)} />
        <Text style={[globalStyles.textBody14, styles.textTitleApply]}>지원 기간</Text>
        <View style={styles.applyContainer}>
          <DateTextInput
            placeholder="시작일"
            value={applying_start_date}
            editable={false}
            onPressIn={() => setOpenStart(true)}
          />
          <Text style={[globalStyles.textBody14, styles.textApplySub]}>부터</Text>
          <DateTextInput
            placeholder="마감일"
            value={applying_end_date}
            editable={false}
            onPressIn={() => setOpenEnd(true)}
          />
          <Text style={globalStyles.textBody14}>까지</Text>
        </View>
        <CustomTextInput
          title="스폰서비"
          value={sponsor_fee}
          placeholder="만 원"
          onChangeText={(sponsor_fee) => onSponsorFeeChange(sponsor_fee)}
          keyboardType="numbers-and-punctuation"
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
      <Button title="다음" style={styles.buttonNext} onPress={onPressNext} />
    </View>
  );
};

export default ProjectRegisterDetailPresenter;
