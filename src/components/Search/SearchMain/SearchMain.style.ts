import { StyleSheet } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../../style/dimensions';
import colors from '../../../style/colors';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.colorBackground },
  topTab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: `${colors.colorGray500}1A`,
    backgroundColor: colors.colorGray000,
  },
  tab: { flex: 1, height: rh(48), justifyContent: 'center', alignItems: 'center' },
  line: { width: 0.7, height: rh(36), backgroundColor: `${colors.colorGray500}1A` },
  profileContainer: { paddingHorizontal: rw(20) },
});

export default styles;
