import React, { useState, useEffect } from 'react';
import type { FC, ComponentProps } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import globalStyles from '../../style/styles';
import colors from '../../style/colors';
import { responsiveWidth as rw, responsiveHeight as rh } from '../../style/dimensions';

export type ValidError = {
  error: boolean;
  errorMessage: string;
} | null;

export type TitleTextInputProps = ComponentProps<typeof TextInput> & {
  normalColor?: string;
  errorColor?: string;
  validError?: ValidError;
};

export const TitleTextInput: FC<TitleTextInputProps> = ({
  normalColor = colors.colorPrimary300,
  errorColor = colors.colorError,
  validError,
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
    setColor(normalColor);
    if (isError) {
      setIsError(false);
    }
  };
  const handleBlur = () => {
    if (!isError && text === '') {
      setColor(normalColor);
    }
  };

  return (
    <View style={styles.view}>
      <TextInput
        {...textInputProps}
        style={[
          globalStyles.textBody14,
          styles.textInput,
          { borderBottomWidth: 1, borderBottomColor: color, color },
          style,
        ]}
        onChange={({ nativeEvent }) => handleChange(nativeEvent.text)}
        onBlur={() => handleBlur()}
      />
      {isError ? (
        <Text style={[globalStyles.textBody14, { color: errorColor }]}>{validError?.errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  view: { width: '100%', marginBottom: rh(12) },
  textInput: {
    backgroundColor: colors.colorGray000,
    borderColor: `${colors.colorGray300}40`,
    borderWidth: 0.7,
    borderRadius: rw(4),
    paddingHorizontal: rw(16),
    paddingVertical: rw(14),
  },
});
