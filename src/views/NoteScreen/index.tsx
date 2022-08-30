import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNav} from 'navigation/NavigationApp';
import styles from './NoteStyles';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'hooks';
import {TextButton} from 'components/core/TextButton';
import {Input} from 'components/core/Input';
import {NotePayload} from 'typings/note';
import firestore from '@react-native-firebase/firestore';

export default function Note(props: any) {
  const nav = useNav();
  const [note, setNote] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const dispatch = useDispatch();
  const [noteArr, setNoteArr] = useState<NotePayload[]>([]);

  const handleAddNote = async () => {
    const a = await firestore()
      .collection('groupNote')
      .doc(props.route.params.groupId)
      .update({
        note : firestore.FieldValue.arrayUnion({
                type: 'text',
                noteId: 1,
                title: title,
                content: note,
                image: '',
              },)
      })
      // .add();
    // .set({
    //   text: [
    //     {
    //       type: 'text',
    //       noteId: 1,
    //       title: title,
    //       content: note,
    //       image: '',
    //     },
    //   ],
    // });
  };

  return (
    <View>
      <TextButton
        label="Back"
        onPress={() => nav.navigate('BottomBar')}
        buttonStyle={styles.btnBack}
      />
      <View>
        <Text style={styles.title}>{props.route.params.title}</Text>
        <View style={styles.input}>
          <Input placeholder="Title" onChangeText={value => setTitle(value)} />
          <Input placeholder="Note" onChangeText={value => setNote(value)} />
          <TextButton
            label="+"
            onPress={handleAddNote}
            buttonStyle={styles.btnAddNote}
          />
        </View>
      </View>
    </View>
  );
}
