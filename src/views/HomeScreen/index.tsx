import { View, Text,StyleSheet } from 'react-native'
import React,{useEffect,useState} from 'react'
import { TextButton } from 'components/core/TextButton';
import { useNav } from 'navigation/NavigationApp';
import styles from './HomeStyles'
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { authAction } from 'features/auth/authSlice';


export default function Home() {
  const nav = useNav()
  const dispatch= useDispatch();

  // useEffect(() => {
  //   console.log(auth().currentUser)
  // }, [])
  
  const handleLogOut = () => {
    dispatch(authAction.logOut())
    nav.navigate('Login')
  }

  return (
    <View>
      <TextButton label='Login' onPress={() => nav.navigate("Login")} buttonStyle={styles.btnLogin}/>
    </View>
  )
}
