import React from 'react';
import type { FC, ComponentProps } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { responsiveWidth as rw } from '../../style/dimensions';
import colors from '../../style/colors';

export type RandomProfileProps = ComponentProps<typeof View> & {
  nickname: string;
  size?: number;
};

const emojis = ['🐶', '🐱', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🐸'];

export const RandomProfile: FC<RandomProfileProps> = ({ nickname, size = rw(24) }) => {
  return (
    <View style={[styles.view, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={{ fontSize: size / 2 }}>{emojis[nickname.length % 10]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: { justifyContent: 'center', alignItems: 'center', backgroundColor: colors.colorPrimary100 },
});
