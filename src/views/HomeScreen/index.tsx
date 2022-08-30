import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextButton} from 'components/core/TextButton';
import {useNav} from 'navigation/NavigationApp';
import styles from './HomeStyles';
import {Input} from 'components/core/Input';
import {groupNoteAction} from 'features/groupNote/groupNoteSlice';
import {useAppDispatch} from 'hooks';
import firestore from '@react-native-firebase/firestore';
import {GroupNotePayload} from 'typings/groupNote';
import {deleteNoteGroup} from 'features/groupNote/groupNoteApi';

export default function Home() {
  const nav = useNav();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [groupNoteArr, setGroupNoteArr] = useState<GroupNotePayload[]>([]);

  useEffect(() => {
    getlist();
    // console.log(groupNoteArr);
  }, []);

  const getlist = async () => {
    const groupNote = await firestore()
      .collection('groupNote')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(rs => {
          const itemExists = groupNoteArr.find(item => item.groupId === rs.id);
          if (!itemExists) {
            setGroupNoteArr(arr => [
              ...arr,
              {
                groupId: rs.id,
                title: rs.data().title,
                description: rs.data().description,
              },
            ]);
          }
        });
      });
  };

  const handleCreateNoteGroup = () => {
    dispatch(
      groupNoteAction.createGroupNote({
        title: title,
        description: description,
        note : []
      }),
    );
    getlist();
  };

  const handleEditNoteGroup = () => {};

  const handleDeleteNoteGroup = async (groupId: string) => {
    deleteNoteGroup(groupId);
    const arr = groupNoteArr.filter(item => item.groupId !== groupId);
    setGroupNoteArr(arr);
  };

  const handleNavNote = (item: GroupNotePayload) => {
    nav.navigate('Note', {groupId: item.groupId, title: item.title});
  };

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
          label="CreateGroupNote"
          onPress={handleCreateNoteGroup}
          buttonStyle={styles.btnLogin}
        />
      </View>
    );
  };

  const renderNoteGroup = () => {
    return (
      <View>
        <Text style={styles.textList}>List GroupNote</Text>
        <View>
          {groupNoteArr.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => handleNavNote(item)}
                key={index.toString()}>
                <View style={styles.listNote}>
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
                    onPress={() => handleDeleteNoteGroup(item.groupId)}
                    buttonStyle={styles.btnDelete}
                  />
                </View>
              </TouchableOpacity>
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
