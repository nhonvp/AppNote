import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNav} from 'navigation/NavigationApp';
import styles from './NoteStyles';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'hooks';
import {TextButton} from 'components/core/TextButton';
import {Input} from 'components/core/Input';
import {NotePayload} from 'typings/note';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import generateString from 'utils/generated';

export default function Note(props: any) {
  const nav = useNav();
  const [note, setNote] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const dispatch = useDispatch();
  const [noteArr, setNoteArr] = useState<NotePayload[]>([]);
  const [noteChangeText, setNoteChangeText] = useState<string>('');
  const groupId = props.route.params.groupId;

  useEffect(() => {
    getListNote();
  }, []);

  const handleAddNote = async () => {
    const add = await firestore()
      .collection('groupNote')
      .doc(groupId)
      .update({
        note: firestore.FieldValue.arrayUnion(
         {
          type: 'text',
          noteId: generateString(10),
          title: title,
          content: note,
          image: '',
        }),
      });
    getListNote();
  };

  const getListNote = async () => {
    const note = await firestore()
      .collection('groupNote')
      .doc(groupId)
      .get()
      .then(querySnapshot => {
        const listNote: FirebaseFirestoreTypes.DocumentData | undefined =
          querySnapshot.data();
        listNote.note.forEach(rs => {
          const itemExists = noteArr.find(item => item.noteId === rs.noteId);
          if (!itemExists) {
            setNoteArr(arr => [
              ...arr,
              {
                type: rs.text,
                noteId: rs.noteId,
                title: rs.title,
                content: rs.content,
                image: rs.image,
              },
            ]);
          }
        });
      });
  };

  const handleEditNote = () => {};

  const handleDeleteNote = async (noteId: string) => {
    const a = await firestore()
      .collection('groupNote')
      .doc(groupId)
      .update(
        {
          note : firestore.FieldValue.arrayRemove(0,noteId)
        }
      ).then(rs => console.log('deleted!',rs))
    
    // const filterNote = noteArr.filter(item => item.noteId !== noteId);
    // setNoteArr(filterNote);
    getListNote();
  };

  const renderNote = () => {
    return (
      <View>
        <Text style={styles.textListNote}>List Note</Text>
        <View>
          <FlatList
            data={noteArr}
            keyExtractor={item => item.noteId}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => {
              return <View style={{paddingBottom: 400}}></View>;
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity>
                  <View style={styles.listNote}>
                    <View style={{marginRight: 40}}>
                      <Input
                        value={item.content}
                        title={item.title}
                        placeholder={item.title}
                        onChangeText={value => setNoteChangeText(value)}
                      />
                    </View>
                    <TextButton
                      label="Edit"
                      onPress={handleEditNote}
                      buttonStyle={styles.btnDelete}
                    />
                    <TextButton
                      label="Delete"
                      onPress={() => handleDeleteNote(item.noteId)}
                      buttonStyle={styles.btnDelete}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
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

        {renderNote()}
      </View>
    </View>
  );
}
