import { StyleSheet } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../style/dimensions';
import colors from '../../style/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBackground,
    justifyContent: 'space-between',
    paddingHorizontal: rw(20),
  },
  loginContainer: { alignItems: 'center' },
  textTitle: { marginTop: rh(56), marginBottom: rh(44) },
  textInputTitleEmail: { marginTop: rh(72) },
  textInputTitlePassword: { marginTop: rh(48) },
  buttonEmail: {
    width: '100%',
    height: rw(52),
    borderRadius: rw(4),
    backgroundColor: colors.colorGray500,
    marginTop: rh(12),
    marginBottom: rh(40),
  },
  textChangeType: { textDecorationLine: 'underline' },
  buttonSignUp: {
    width: '100%',
    height: rw(52),
    borderRadius: rw(4),
    borderWidth: 0.7,
    borderColor: colors.colorGray500,
    backgroundColor: colors.colorGray000,
    marginBottom: rh(72),
  },
  textSignUp: { color: colors.colorGray500 },
});

export default styles;
