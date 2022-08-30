import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextButton} from 'components/core/TextButton';
import {useNav} from 'navigation/NavigationApp';
import styles from './HomeStyles';
import {Input} from 'components/core/Input';
import {groupNoteAction} from 'features/groupNote/groupNoteSlice';
import {useAppDispatch} from 'hooks';
import firestore from '@react-native-firebase/firestore';
import {GroupNotePayload} from 'typings/groupNote';

export default function Home() {
  const nav = useNav();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [groupNoteArr, setGroupNoteArr] = useState<GroupNotePayload[]>([]);

  useEffect(() => {
    getlist();
    return () => {};
  }, []);

  const getlist = async () => {
    const groupNote = await firestore()
      .collection('groupNote')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(rs => {
          setGroupNoteArr(arr => [
            ...arr,
            {title: rs.data().title, description: rs.data().description},
          ]);
        });
      });
  };

  const handleCreateNoteGroup = () => {
    dispatch(
      groupNoteAction.createGroupNote({
        title: title,
        description: description,
      }),
    );
  };

  const handleEditNoteGroup = () => {};

  const handleDeleteNoteGroup = () => {};

  const renderCreateNoteGroup = () => {
    return (
      <View style={styles.input}>
        <View style={styles.inputCreateNote}>
          <Input placeholder="Title" onChangeText={value => setTitle(value)} />
          <Input
            placeholder="Description"
            onChangeText={value => setDescription(value)}
          />
        </View>
        <TextButton
          label="CreateNote"
          onPress={handleCreateNoteGroup}
          buttonStyle={styles.btnLogin}
        />
      </View>
    );
  };

  const renderNoteGroup = () => {
    return (
      <View >
        <Text style={styles.textList}>List GroupNote</Text>
        <View >
          {groupNoteArr.map((item,index) => {
            return (
             <View style={styles.listNote} key={index.toString()}>
               <View style={styles.groupNote}>
                <Text style={styles.textTitle}>{item.title}</Text>
                <Text style={styles.textDes}>{item.description}</Text>
              </View>
              <TextButton
              label="Edit"
              onPress={handleEditNoteGroup}
              buttonStyle={styles.btnDelete}
            />
            <TextButton
              label="Delete"
              onPress={handleDeleteNoteGroup}
              buttonStyle={styles.btnDelete}
            />
             </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View>
      <ScrollView>
        <TextButton
          label="Login"
          onPress={() => nav.navigate('Login')}
          buttonStyle={styles.btnLogin}
        />
        {renderCreateNoteGroup()}
        {renderNoteGroup()}
      </ScrollView>
    </View>
  );
}
