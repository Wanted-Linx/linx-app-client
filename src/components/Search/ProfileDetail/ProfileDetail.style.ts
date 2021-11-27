import { StyleSheet } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../../style/dimensions';
import colors from '../../../style/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.colorBackground,
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: rh(28),
    paddingHorizontal: rw(20),
  },
  profile: {
    width: rw(80),
    height: rw(72),
    borderRadius: rw(4),
    borderWidth: 0.7,
    borderColor: colors.colorGray100,
    marginBottom: rh(16),
  },
  textCategory: { color: colors.colorGray300 },
  textSub: { marginTop: rh(8) },
  countContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rh(20),
    paddingHorizontal: rw(88),
  },
  countView: { alignItems: 'center' },
  textCountTitle: { marginBottom: rh(8) },
  line: { width: 0.7, height: '100%', opacity: 0.1, backgroundColor: colors.colorGray500 },
  infoContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: `${colors.colorGray500}1A`,
    paddingBottom: rh(24),
    marginBottom: rh(24),
  },
  textDescription: { color: colors.colorGray300, marginTop: rh(20) },
  link: { alignSelf: 'flex-start', marginTop: rh(8) },
  textProjectTitle: { alignSelf: 'flex-start' },
});

export default styles;
