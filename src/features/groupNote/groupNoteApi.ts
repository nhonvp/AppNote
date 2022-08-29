import firestore from '@react-native-firebase/firestore';
// import  firebase  from 'utils/firebaseConfig';
import { GroupNotePayload } from 'typings/groupNote';

export const createGroupNote = async (payload:GroupNotePayload) => {
    const {title,description} = payload
    try {
        const ref = firestore().collection('groupNote')
        const data = ref.add({
            title : title,
            description : description
        })
        console.log(data,'Create GroupNote Success');
    } catch (error) {
        console.log(error);
    }
}


