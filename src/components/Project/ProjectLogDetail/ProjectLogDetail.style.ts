import { StyleSheet } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../../style/dimensions';
import colors from '../../../style/colors';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.colorBackground },
  top: {
    backgroundColor: `${colors.colorPrimary300}4D`,
    paddingTop: rh(36),
    paddingBottom: rh(24),
    paddingHorizontal: rw(20),
  },
  textTitle: { marginTop: rh(8) },
  textAuthor: { marginTop: rh(24), marginBottom: rh(8) },
  textContent: { marginTop: rh(24), marginBottom: rh(84), marginHorizontal: rw(20) },
  line: { backgroundColor: colors.colorGray100, height: 4, width: '100%' },
  feedbackContainer: { paddingHorizontal: rw(20) },
  textFeedback: { marginTop: rh(22), marginBottom: rh(8) },
});

export default styles;
