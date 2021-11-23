import { StyleSheet } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../../style/dimensions';
import colors from '../../../style/colors';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.colorPrimary000, paddingTop: rh(60) },
  searchTermTitle: { color: colors.colorPrimary300, marginLeft: rw(20), marginTop: rw(20) },
  searchTermTextView: { alignSelf: 'flex-start', marginLeft: rw(32), marginTop: rh(10), marginBottom: rh(4) },
  searchTermText: { color: colors.colorText700 },
  noSearchTermText: { color: colors.colorText700, marginLeft: rw(32), marginTop: rh(10), marginBottom: rh(4) },
  tagTitle: { color: colors.colorText800, marginLeft: rw(20), marginTop: rh(44) },
  line: { height: 1, opacity: 0.1, backgroundColor: colors.colorText700, marginTop: rh(8), marginHorizontal: rw(20) },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: rw(20), marginTop: rh(8) },
  tag: { marginRight: rw(16), marginTop: rh(16) },
  showContainer: { marginTop: rh(20), marginHorizontal: rw(20) },
  noShowContainer: { marginTop: rh(60), alignItems: 'center' },
  noShowText: { color: colors.colorText700 },
  noShowButton: { backgroundColor: colors.colorPrimary300, width: rw(220), height: rw(44), marginTop: rh(24) },
});

export default styles;
