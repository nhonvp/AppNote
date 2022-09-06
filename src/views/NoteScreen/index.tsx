import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
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
import Lottie from 'lottie-react-native';
import Loading from 'components/core/Loading';
import {noteAction} from 'features/note/noteSlice';
import { fetchNote } from 'features/note/noteApi';
import { checkStatusSuccess } from 'features/note/noteSaga';

export default function Note(props: any) {
  const nav = useNav();
  const [note, setNote] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const dispatch = useDispatch();
  const [noteArr, setNoteArr] = useState<NotePayload[]>([]);
  const [noteChangeText, setNoteChangeText] = useState<string>('');
  const groupId = props.route.params.groupId;
  const [search, setSearch] = useState<string>('');
  const animationRef = useRef<Lottie>(null);
  const {loading, error} = useAppSelector(state => state.note);
  const [loader, setLoader] = useState<boolean>(loading);

  useEffect(() => {
    getListNote();
    // const fetchData = async () => {
    //   const arr = await fetchNote(groupId).then(rs => rs)
    //   console.log(arr)
    // }
    // fetchData();
  }, [noteArr]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoader(loading);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  const handleAddNote = async () => {
    dispatch(
      noteAction.fetchAddNoteRequest({
        type: 'text',
        noteId: generateString(10).trim(),
        title: title,
        content: note,
        image: '',
        groupId: groupId,
      }),
    );
    getListNote();
  };

  const handleAddImage = () => {};

 const getListNote = async () => {
    await firestore()
      .collection('groupNote')
      .doc(groupId)
      .get()
      .then(querySnapshot => {
        const listNote: FirebaseFirestoreTypes.DocumentData | undefined = querySnapshot.data();
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
                groupId: groupId,
              },
            ]);
          }
        });
      });
  };

  const handleEditNote = () => {};

  const handleDeleteNote = async (noteId: string) => {
    const add = await firestore()
      .collection('groupNote')
      .doc(groupId)
      .update({
        note: firestore.FieldValue.arrayRemove(noteId),
      });
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
                    <View>
                      <Input
                        // value={item.content}
                        title={item.title}
                        placeholder={item.title}
                        onChangeText={value => setNoteChangeText(value)}
                        borderStyle={{width: 200}}
                      />
                    </View>
                    <View style={styles.btn}>
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

                    <View style={styles.status}>
                      {error ? (
                        <Lottie
                          ref={animationRef}
                          source={require('../../../assets/images/error.json')}
                          autoPlay
                          loop={false}
                        />
                      ) : (
                        <Lottie
                          ref={animationRef}
                          source={require('../../../assets/images/success.json')}
                          autoPlay
                          loop={false}
                        />
                      )}
                    </View>
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
        <View>
          <Input
            placeholder="Search"
            onChangeText={value => setSearch(value)}
            title="Search"
          />
        </View>
        <View style={styles.input}>
          <Input placeholder="Title" onChangeText={value => setTitle(value)} />
          <Input placeholder="Note" onChangeText={value => setNote(value)} />
          <View style={styles.btn}>
            <TextButton
              label="+"
              onPress={handleAddNote}
              buttonStyle={styles.btnAddNote}
            />
            <TextButton
              label="AddImage"
              onPress={handleAddImage}
              buttonStyle={styles.btnAddNote}
            />
          </View>
        </View>
      </View>
      {renderNote()}
      {loading && <Loading />}
    </View>
  );
}
