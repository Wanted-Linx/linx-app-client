import React from 'react';
import type { FC, ComponentProps } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { responsiveHeight as rh } from '../../style/dimensions';
import globalStyles from '../../style/styles';
import colors from '../../style/colors';

export type FeedbackProps = ComponentProps<typeof View> & {
  text: string;
};

export const Feedback: FC<FeedbackProps> = ({ text, ...viewProps }) => {
  return (
    <View style={[styles.view]} {...viewProps}>
      <Text style={[globalStyles.textBody14, styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    borderColor: `${colors.colorGray300}1A`,
    borderBottomWidth: 0.7,
    paddingVertical: rh(16),
  },
  text: { color: colors.colorGray300 },
});
