import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';
import { Dimensions } from 'react-native';

const DESIGN_WIDTH = Dimensions.get('window').width;
const DESIGN_HEIGHT = Dimensions.get('window').height;

export function wp(pixel: number) {
  return widthPercentageToDP((pixel / DESIGN_WIDTH) * 100);
}

export function hp(pixel: number) {
  return heightPercentageToDP((pixel / DESIGN_HEIGHT) * 100);
}

export function getWidth() {
  return DESIGN_WIDTH;
}
export function getHight() {
  return DESIGN_HEIGHT;
}
