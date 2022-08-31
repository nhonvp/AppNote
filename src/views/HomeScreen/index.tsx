import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextButton} from 'components/core/TextButton';
import {useNav} from 'navigation/NavigationApp';
import styles from './HomeStyles';
import {Input} from 'components/core/Input';
import {groupNoteAction} from 'features/groupNote/groupNoteSlice';
import {useAppDispatch} from 'hooks';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {GroupNotePayload} from 'typings/groupNote';
import {deleteNoteGroup} from 'features/groupNote/groupNoteApi';
import * as Progress from 'react-native-progress';

export default function Home() {
  const nav = useNav();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [groupNoteArr, setGroupNoteArr] = useState<GroupNotePayload[]>([]);
  const [groupNoteLoad, setGroupNoteLoad] = useState<number>(5);
  const [lastVisible, setLastVisible] = useState<number>(0);
  const [startAfter, setStartAfter] = useState<number>(Object);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    let lastVisible: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;
    const groupNote = await firestore()
      .collection('groupNote')
      .limit(groupNoteLoad)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(rs => {
          const itemExists = groupNoteArr.find(item => item.groupId === rs.id);
          lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          setStartAfter(lastVisible);
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

  const fetchMoreGroup = async (startAfter: {}, groupNoteLoad: number) => {
    const groupNote = await firestore()
      .collection('groupNote')
      .startAfter(startAfter)
      .limit(groupNoteLoad)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(rs => {
          const itemExists = groupNoteArr.find(item => item.groupId === rs.id);
          // lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          // setStartAfter(lastVisible);
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

  const getMoreGroup = async () => {
    await fetchMoreGroup(startAfter, groupNoteLoad);
  };

  const listFooterLoading = () => {
    return <Text style={styles.loading}>Loading...</Text>;
  };

  const handleCreateNoteGroup = () => {
    dispatch(
      groupNoteAction.createGroupNote({
        title: title,
        description: description,
        note: [],
      }),
    );
    getList();
  };

  const handleEditNoteGroup = () => {};

  const handleDeleteNoteGroup = async (groupId: string) => {
    deleteNoteGroup(groupId);
    const filterGroupNote = groupNoteArr.filter(
      item => item.groupId !== groupId,
    );
    setGroupNoteArr(filterGroupNote);
  };

  const handleNavNote = (item: GroupNotePayload) => {
    nav.navigate('Note', {groupId: item.groupId, title: item.title});
  };

  const renderCreateNoteGroup = () => {
    return (
      <View style={styles.input}>
        <View style={styles.inputCreateNote}>
          <Input
            title="Title"
            placeholder="Title"
            onChangeText={value => setTitle(value)}
          />
          <Input
            title="Description"
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
          <FlatList
            data={groupNoteArr}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.groupId}
            ListFooterComponent={() => {
              return (
                <View style={{paddingBottom: 400}}>{listFooterLoading()}</View>
              );
            }}
            onEndReached={getMoreGroup}
            onEndReachedThreshold={0.01}
            scrollEventThrottle={150}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => handleNavNote(item)}>
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
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <TextButton
        label="Login"
        onPress={() => nav.navigate('Login')}
        buttonStyle={styles.btnLogin}
      />
      {renderCreateNoteGroup()}
      {renderNoteGroup()}
    </View>
  );
}
