import React, { useState, useEffect } from 'react';
import type { FC, ComponentProps } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';

import globalStyles from '../../style/styles';
import colors from '../../style/colors';
import { responsiveHeight as rh } from '../../style/dimensions';

export type ValidError = {
  error: boolean;
  errorMessage: string;
} | null;

export type TitleTextInputProps = ComponentProps<typeof TextInput> & {
  title: string;
  normalColor?: string;
  focusedColor?: string;
  errorColor?: string;
  validError?: ValidError;
  titleStyle?: StyleProp<TextStyle>;
};

export const TitleTextInput: FC<TitleTextInputProps> = ({
  title,
  normalColor = colors.colorPrimary300,
  focusedColor = colors.colorText000,
  errorColor = colors.colorError,
  validError,
  titleStyle,
  style,
  ...textInputProps
}) => {
  const [color, setColor] = useState(normalColor);
  const [isError, setIsError] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (validError) {
      setColor(errorColor);
      setIsError(true);
    }
  }, [validError]);

  const handleChange = (text: string) => {
    setText(text);
    if (text === '') {
      setColor(normalColor);
    } else {
      setColor(focusedColor);
    }
    if (isError) {
      setIsError(false);
    }
  };
  const handleFocus = () => {
    if (!isError) {
      setColor(focusedColor);
    }
  };
  const handleBlur = () => {
    if (!isError && text === '') {
      setColor(normalColor);
    }
  };

  return (
    <View>
      <Text style={[globalStyles.textBody15, { color, marginBottom: rh(8) }, titleStyle]}>{title}</Text>
      <TextInput
        {...textInputProps}
        style={[globalStyles.textBody15, styles.textInput, { borderBottomWidth: 1, borderBottomColor: color, color }, style]}
        onChange={({ nativeEvent }) => handleChange(nativeEvent.text)}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
      />
      {isError ? <Text style={[globalStyles.textCaption, { color: errorColor }]}>{validError?.errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
    paddingBottom: Platform.select({ ios: rh(6), android: 0 }),
    paddingHorizontal: 0,
    paddingTop: 0,
  },
});
