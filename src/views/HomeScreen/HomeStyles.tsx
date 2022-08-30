import {StyleSheet} from 'react-native';
import Colors from 'utils/Colors';
import { width } from 'utils/Responsive';

export default StyleSheet.create({
    btnLogin: {
        backgroundColor: Colors.black,
        width: width,
    },
    input : {
        marginVertical : 10
    },
    inputCreateNote : {
        marginHorizontal : 20
    },
    listNote :{
        marginVertical : 20,
        width : width,
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : "center",
    },
    textList : {
        fontSize : 16,
        textAlign : "center",
        fontWeight: "600",
        color :Colors.black
    },
    groupNote : {
        width : width - 150,
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        marginVertical : 10 
    },
    textTitle : {
        fontSize : 16,
        fontWeight: "600",
        color: Colors.black
    },
    textDes : {
        ontSize : 13,
        fontWeight: "600",
        color: Colors.black
    }, 
    btnDelete : {
        width : 50,
        backgroundColor: Colors.black
    }
});
