import React from 'react';
import type { FC, ComponentProps } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../style/dimensions';
import globalStyles from '../../style/styles';
import colors from '../../style/colors';

export type TagProps = ComponentProps<typeof View> & {
  text: string;
};

export const Tag: FC<TagProps> = ({ text, style, ...viewProps }) => {
  return (
    <View style={[styles.view, style]} {...viewProps}>
      <Text style={[globalStyles.textBody14, styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: rh(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.colorPrimary500,
    borderWidth: 1,
    borderRadius: rw(4),
    paddingHorizontal: rw(4),
    paddingVertical: rw(1),
    marginRight: rw(6),
  },
  text: { color: colors.colorPrimary500, lineHeight: Platform.select({ ios: 0 }) },
});
