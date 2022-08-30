import {StyleSheet} from 'react-native';
import Colors from 'utils/Colors';
import { width } from 'utils/Responsive';

export default StyleSheet.create({
    title : {
        fontSize : 20,
        color : Colors.black,
        textAlign : "center",
        fontWeight : "bold"
    },
    input : {
        marginHorizontal : 20
    },
    viewAdd:{
        marginVertical : 40,
        height : 50,
        flexDirection : "row",
        alignItems: "center",
    },
    btnAddNote : {
        backgroundColor : Colors.black,
        width : 50,
    },
    btnBack : {
        backgroundColor : Colors.black,
        width : 50
    }
});
