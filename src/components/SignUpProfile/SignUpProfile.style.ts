import { StyleSheet } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../style/dimensions';
import colors from '../../style/colors';

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageBackground: { flex: 1, resizeMode: 'cover', padding: rw(22) },
  textTitle: { color: colors.colorText000, marginTop: rh(119) },
  textInputTitleNickname: { marginTop: rh(72) },
  buttonNext: { backgroundColor: colors.colorPrimary500, marginTop: rh(56) },
});

export default styles;
