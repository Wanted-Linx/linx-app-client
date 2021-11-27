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
  dateContainer: { flexDirection: 'row', alignItems: 'center', marginTop: rh(8), marginBottom: rh(12) },
  textDateSub: { marginRight: rw(24) },
  input: { height: rh(120) },
  buttonAdd: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: rh(70),
    backgroundColor: colors.colorGray500,
    paddingBottom: rh(10),
  },
});

export default styles;
