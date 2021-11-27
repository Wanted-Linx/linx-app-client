import { StyleSheet } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../../style/dimensions';
import colors from '../../../style/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBackground,
    justifyContent: 'space-between',
  },
  inputContainer: { paddingHorizontal: rw(20), paddingTop: rh(32) },
  typeContainer: { flexDirection: 'row', marginTop: rh(8), marginBottom: rh(24) },
  textTitleApply: { marginTop: rh(12), marginBottom: rh(8) },
  applyContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: rh(12) },
  textApplySub: { marginRight: rw(24) },
  buttonNext: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: rh(70),
    backgroundColor: colors.colorGray500,
    paddingBottom: rh(10),
  },
});

export default styles;
