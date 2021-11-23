import React from 'react';
import type { FC, ComponentProps } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

export type TouchableViewProps = ComponentProps<typeof TouchableOpacity> & {
  viewStyle?: StyleProp<ViewStyle>;
};

export const TouchableView: FC<TouchableViewProps> = ({ children, viewStyle, style, ...touchableProps }) => {
  return (
    <TouchableOpacity {...touchableProps} style={[styles.touchableView, style]}>
      <View style={viewStyle}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableView: {
    alignSelf: 'center',
  },
});
