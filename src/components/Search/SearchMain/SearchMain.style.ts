import { StyleSheet } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../../style/dimensions';
import colors from '../../../style/colors';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.colorPrimary000, paddingTop: rh(60) },
  scroll: { marginTop: rw(28) },
  scrollContent: { flexGrow: 1 },
  categoryTitle: { color: colors.colorText700, marginLeft: rw(32) },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: rw(32), marginBottom: rh(32) },
  categoryView: { marginBottom: rh(22) },
  categoryViewStyle: { alignItems: 'center' },
  categoryText: { position: 'absolute', bottom: rw(8), color: colors.colorText000 },
  categoryImage: { width: rw(86), height: rw(86) },
  rankContainer: { flex: 1, backgroundColor: colors.colorBackgroundWhite, paddingTop: rh(32) },
  rankTitle: { marginLeft: rw(20) },
  showsContainer: { marginTop: rh(28), paddingBottom: rh(16), paddingRight: rw(20) },
});

export default styles;
