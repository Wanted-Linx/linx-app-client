import React from 'react';
import type { FC, ComponentProps, ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';

import { responsiveWidth as rw } from '../../style/dimensions';
import globalStyles from '../../style/styles';
import colors from '../../style/colors';

export type ButtonProps = ComponentProps<typeof TouchableOpacity> & {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: () => ReactNode;
};

export const Button: FC<ButtonProps> = ({ title, textStyle, icon, style, ...touchableProps }) => {
  return (
    <TouchableOpacity style={[styles.view, style]} {...touchableProps}>
      {icon ? icon() : null}
      <Text style={[globalStyles.textBody15R, { color: colors.colorGray000, marginLeft: icon ? rw(6) : 0 }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
