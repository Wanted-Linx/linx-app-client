import { StyleSheet } from 'react-native';

import colors from '../../../style/colors';
import { responsiveHeight as rh, responsiveWidth as rw } from '../../../style/dimensions';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.colorBackgroundWhite, paddingTop: rh(52) },
  rankTitle: { marginTop: rh(20), marginLeft: rw(20) },
  rankContainer: { marginTop: rh(20), paddingRight: rw(20) },
  line: { height: 1, opacity: 0.1, backgroundColor: colors.colorText700, marginTop: rh(32), marginHorizontal: rw(20) },
  showsContaniner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: rh(20),
    marginBottom: rh(30),
    paddingRight: rw(20),
  },
});

export default styles;
