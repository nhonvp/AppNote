import {NotePayload} from 'typings/note';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export const fetchNote = async (groupId: string) => {
  try {
    const data = await firestore()
      .collection('groupNote')
      .doc(groupId)
      .get()
      .then(querySnapshot => {
        const listNote: FirebaseFirestoreTypes.DocumentData | undefined = querySnapshot.data();
        const listArr: string[] = [];
        listNote.note.forEach(rs => {
          listArr.push(rs);
        });
        return listArr;
      });
  } catch (error) {
    console.log(error);
  }
};
export const createNote = async (payload: NotePayload) => {
  const {type, noteId, title, content, image, groupId} = payload;
  try {
    const data = await firestore()
      .collection('groupNote')
      .doc(groupId)
      .update({
        note: firestore.FieldValue.arrayUnion({
          type: type,
          noteId: noteId,
          title: title,
          content: content,
          image: image,
        }),
      });
    console.log(data, 'Note Add Success');
  } catch (error) {
    console.log('Add Failed');
  }
};
