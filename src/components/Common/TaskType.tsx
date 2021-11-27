import React, { useState } from 'react';
import type { FC, ComponentProps } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import globalStyles from '../../style/styles';
import colors from '../../style/colors';
import { responsiveWidth as rw } from '../../style/dimensions';

export type TaskTypeProps = ComponentProps<typeof TouchableOpacity> & {
  title: string;
  onPress: () => void;
};

export const TaskType: FC<TaskTypeProps> = ({ title, style, onPress, ...touchableProps }) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.view, { borderColor: isPressed ? colors.colorPrimary500 : `${colors.colorGray300}40` }, style]}
      onPress={() => {
        onPress();
        setIsPressed((flag) => !flag);
      }}
      {...touchableProps}>
      <Text style={[globalStyles.textBody14, { color: isPressed ? colors.colorPrimary500 : colors.colorGray300 }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.colorGray000,
    borderWidth: 0.7,
    borderRadius: rw(4),
    marginRight: rw(15),
    paddingHorizontal: rw(12),
    paddingVertical: rw(6),
  },
});
