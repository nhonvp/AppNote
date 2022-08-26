import {StyleSheet} from 'react-native';
import Colors from 'utils/Colors';
import { width } from 'utils/Responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textHeader: {
    fontSize: 30,
    color: Colors.black,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnSignUp: {
    backgroundColor: Colors.black,
    width: width - 40,
  },

});
