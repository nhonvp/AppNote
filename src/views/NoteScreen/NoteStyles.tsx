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
    },
    textListNote : {
        fontSize : 16,
        textAlign : "center",
        fontWeight: "600",
        color :Colors.black
    },
    listNote : {
        flexDirection : "row",
        justifyContent : 'space-around',
        alignItems : "center",
        width : width,
        marginHorizontal : 10
    },
    btnDelete :{
        backgroundColor : Colors.black,
        width : 50
    },
    btn : {
        flexDirection : "row",
        // width : 'auto',
    },
    status : {
       width : 30,
       height : 30 
    }
});
