import firestore from '@react-native-firebase/firestore';
import {GroupNotePayload} from './groupNoteSlice';

export const createGroupNote = async (payload: GroupNotePayload) => {
  const {title, description} = payload;
  try {
    const ref = await firestore().collection('groupNote');
    const data = await ref.add({
      title: title,
      description: description,
      note : []
    });
    console.log(data, 'Create GroupNote Success');
  } catch (error) {
    console.log(error);
  }
};

export const deleteNoteGroup = async (payload: string) => {
  
  const groupId = payload;
  try {
    const data = await firestore().collection('groupNote').doc(groupId).delete()
      .then(() => {
        console.log('deleted!');
      });
  } catch (error) {
    console.log(error);
  }
};
