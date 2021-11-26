import { StyleSheet } from 'react-native';

import { responsiveWidth as rw, responsiveHeight as rh } from '../../../style/dimensions';
import colors from '../../../style/colors';
import globalStyles from '../../../style/styles';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.colorBackground },
  scrollContent: { paddingHorizontal: rw(20) },
  categoryContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: rh(40) },
  category: { alignItems: 'center', paddingHorizontal: 4 },
  categoryImage: {
    width: rw(68),
    height: rw(68),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.colorGray000,
    borderRadius: rw(34),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: colors.colorGray300,
    shadowOpacity: 0.3,
    elevation: 5,
    marginBottom: rh(12),
  },
  registerContainer: {
    alignItems: 'center',
    backgroundColor: colors.colorGray100,
    borderRadius: rw(4),
    paddingVertical: rh(16),
    marginTop: rh(44),
  },
  registerButton: {
    width: rw(220),
    height: rw(30),
    borderRadius: rw(2),
    backgroundColor: colors.colorGray500,
    marginTop: rh(12),
  },
  textRegister: { ...globalStyles.textBody15R, color: colors.colorGray000 },
  projectTitle: { marginTop: rh(40) },
});

export default styles;
