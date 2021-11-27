import React from 'react';
import type { FC, ComponentProps } from 'react';
import { TextInput, StyleSheet } from 'react-native';

import globalStyles from '../../style/styles';
import colors from '../../style/colors';
import { responsiveWidth as rw } from '../../style/dimensions';

export type DateTextInputProps = ComponentProps<typeof TextInput>;

export const DateTextInput: FC<DateTextInputProps> = ({ ...textInputProps }) => {
  return <TextInput {...textInputProps} style={[globalStyles.textBody14, styles.textInput]} />;
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    backgroundColor: colors.colorGray000,
    borderColor: `${colors.colorGray300}40`,
    borderWidth: 0.7,
    borderRadius: rw(4),
    paddingHorizontal: rw(16),
    paddingVertical: rw(14),
    marginRight: rw(12),
  },
});
