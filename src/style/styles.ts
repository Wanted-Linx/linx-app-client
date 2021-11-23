import { StyleSheet } from 'react-native';
import colors from './colors';
import rfSize from './fonts';

const globalStyles = StyleSheet.create({
  textBody14: {
    fontSize: rfSize(14),
    fontFamily: 'Pretendard-Regular',
    color: colors.colorGray500,
    lineHeight: rfSize(18),
    letterSpacing: -rfSize(14) * 0.02,
  },
  textBody15R: {
    fontSize: rfSize(15),
    fontFamily: 'Pretendard-Regular',
    color: colors.colorGray500,
    lineHeight: rfSize(20),
    letterSpacing: -rfSize(15) * 0.02,
  },
  textBody15M: {
    fontSize: rfSize(15),
    fontFamily: 'Pretendard-Medium',
    color: colors.colorGray500,
    lineHeight: rfSize(20),
    letterSpacing: -rfSize(15) * 0.02,
  },
  textHeadline18R: {
    fontSize: rfSize(18),
    fontFamily: 'Pretendard-Regular',
    color: colors.colorGray500,
    lineHeight: rfSize(21),
    letterSpacing: -rfSize(12) * 0.02,
  },
  textHeadline18M: {
    fontSize: rfSize(18),
    fontFamily: 'Pretendard-Medium',
    color: colors.colorGray500,
    lineHeight: rfSize(21),
    letterSpacing: -rfSize(12) * 0.02,
  },
  textHeadline20: {
    fontSize: rfSize(20),
    fontFamily: 'Pretendard-Medium',
    color: colors.colorGray500,
    lineHeight: rfSize(21),
    letterSpacing: -rfSize(18) * 0.02,
  },
});

export default globalStyles;
