import {View, Text, StyleSheet, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextButton} from 'components/core/TextButton';
import {useNav} from 'navigation/NavigationApp';
import styles from './HomeStyles';
import {authAction} from 'features/auth/authSlice';
import {Input} from 'components/core/Input';
import { groupNoteAction } from 'features/groupNote/groupNoteSlice';
import { useAppDispatch } from 'hooks';
import firestore from '@react-native-firebase/firestore';
import { GroupNotePayload } from 'typings/groupNote';
 
export default function Home() {
  const nav = useNav();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [groupNoteArr, setGroupNoteArr] = useState<GroupNotePayload[]>([])

  useEffect(() => {
    getlist()
    console.log(groupNoteArr);
    return () => {
      
    }
  }, [])
  
  const getlist = async () => {
    const groupNote = await firestore().collection('groupNote').get().then(
      (querySnapshot) =>{
        querySnapshot.forEach(rs =>{
          // groupNoteArr.push({
          //   // id : rs.id,
          //   title : rs.data().title,
          //   description : rs.data().description
          // })
          setGroupNoteArr(arr => [...arr,{title :rs.data().title,description:rs.data().description}])
        })
      }
    )
    console.log(groupNote)
  }

  const handleCreateNoteGroup = () => {
    dispatch(groupNoteAction.createGroupNote({
      title : title ,
      description : description
    }))
  };

  const renderCreateNoteGroup = () => {
    return (
      <View style={styles.input}>
        <View style={styles.inputCreateNote}>
          <Input
            placeholder="Title"
            onChangeText={value => setTitle(value)}
          />
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
      <View style={styles.listNote}>
          <Text style={styles.textList}>List GroupNote</Text>
          <View>
              {groupNoteArr.map(item =>{
                console.log(item)
                return (
                  <View style={styles.groupNote}>
                      <Text style={styles.textTitle}>{item.title}</Text>
                      <Text style={styles.textDes}>{item.description}</Text>
                  </View>
                )
              })}
          </View>
      </View>
    )
  };

  return (
    <View>
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
