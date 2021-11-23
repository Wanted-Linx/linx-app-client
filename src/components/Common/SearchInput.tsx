import React, { useCallback, useState, useRef } from 'react';
import type { FC, ComponentProps } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../style/dimensions';
import globalStyles from '../../style/styles';
import colors from '../../style/colors';
import { SearchIcon, SearchCloseIcon } from '../../assets/images';
import { TouchableView } from './TouchableView';

export type SearchInputProps = ComponentProps<typeof TextInput> & {
  viewStyle?: StyleProp<ViewStyle>;
  onPressSearch?: () => void;
  onPressClose?: () => void;
};

export const SearchInput: FC<SearchInputProps> = ({ viewStyle, onPressSearch, onPressClose, ...inputProps }) => {
  const [isFocussed, setIsFocussed] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleClickClose = useCallback(() => {
    setIsFocussed(false);
    if (onPressClose) {
      onPressClose();
    }
    inputRef.current?.blur();
  }, [inputRef.current]);

  return (
    <View style={[styles.view, viewStyle]}>
      <TextInput
        ref={inputRef}
        style={[globalStyles.textBody18, styles.textInput]}
        placeholder="작품 검색"
        placeholderTextColor={`${colors.colorText700}66`}
        onFocus={() => setIsFocussed(true)}
        onBlur={() => setIsFocussed(false)}
        autoFocus={false}
        {...inputProps}
      />
      <View style={styles.iconContainer}>
        {isFocussed ? (
          <TouchableView style={styles.close} onPress={handleClickClose}>
            <SearchCloseIcon />
          </TouchableView>
        ) : null}
        <TouchableView disabled={!isFocussed} onPress={onPressSearch}>
          <SearchIcon />
        </TouchableView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.colorPrimary500,
    borderBottomWidth: 1,
    marginHorizontal: rw(20),
    paddingBottom: rh(8),
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Platform.select({ ios: rh(4), android: 0 }),
    paddingBottom: 0,
  },
  iconContainer: { flexDirection: 'row', alignItems: 'center' },
  close: { marginRight: rw(12) },
});
