import { Dimensions } from 'react-native';

const standardScreenWidth = 375;
const standardScreenHeight = 812;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const responsiveWidth = (width: number) => (width * deviceWidth) / standardScreenWidth;
const responsiveHeight = (height: number) => (height * deviceHeight) / standardScreenHeight;

export { responsiveWidth, responsiveHeight };
