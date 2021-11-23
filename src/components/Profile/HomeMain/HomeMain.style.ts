import { StyleSheet, Platform } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../../style/dimensions';
import colors from '../../../style/colors';

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageBackground: { flex: 1, justifyContent: 'space-between', resizeMode: 'cover', padding: rw(22) },
  textTitle: { color: colors.colorText000, marginTop: rh(119) },
  textInputTitleEmail: { marginTop: rh(72) },
  textInputTitlePassword: { marginTop: rh(48) },
  buttonEmail: { backgroundColor: colors.colorPrimary500, marginTop: rh(56) },
  buttonKakao: { backgroundColor: colors.colorText900, marginTop: rh(24) },
  line: { height: 1, backgroundColor: colors.colorPrimary500 },
  buttonSignUp: { marginTop: rh(24), marginBottom: Platform.select({ ios: rh(32), android: rh(8) }) },
  buttonSignUpText: { color: colors.colorText000 },
});

export default styles;
