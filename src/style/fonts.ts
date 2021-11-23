import { RFValue } from 'react-native-responsive-fontsize';

const standardScreenHeight = 812;
const responsiveFontSize = (size: number) => RFValue(size, standardScreenHeight);

export default responsiveFontSize;
