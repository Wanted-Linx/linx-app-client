import { StyleSheet } from 'react-native';

import colors from '../../../style/colors';
import { responsiveHeight as rh, responsiveWidth as rw } from '../../../style/dimensions';

const styles = StyleSheet.create({
  container: { backgroundColor: colors.colorBackground },
  scrollContent: { flexGrow: 1, paddingTop: rh(36) },
  profileView: { alignSelf: 'flex-start' },
  profileContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: rw(20) },
  profile: {
    width: rw(28),
    height: rw(28),
    borderWidth: 1,
    borderColor: colors.colorGray100,
    borderRadius: rw(14),
    marginRight: rw(12),
  },
  textTitle: { marginLeft: rw(20), marginTop: rh(8) },
  mainImage: { width: '100%', height: rw(200), marginTop: rh(24) },
  content: { marginHorizontal: rw(20), marginTop: rw(24) },
  categoryContainer: { flexDirection: 'row', marginBottom: rh(10) },
  recrutingContentContainer: { paddingBottom: rh(70) },
  infoContainer: { borderBottomWidth: 1, borderColor: `${colors.colorGray500}1A`, paddingBottom: rh(24) },
  durationContainer: { flexDirection: 'row' },
  feeContainer: { flexDirection: 'row', marginTop: rh(4) },
  textInfoSubtitle: { marginRight: rw(8) },
  textInfoTitle: { marginTop: rh(24) },
  textInfoContent: { color: colors.colorGray300, marginTop: rh(12) },
  textDescription: { color: colors.colorGray300, marginTop: rh(6) },
  timeline: { marginTop: rh(24) },
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: rh(70),
    backgroundColor: colors.colorGray500,
    paddingBottom: rh(10),
  },
  textButton: { color: colors.colorGray000 },
});

export default styles;
