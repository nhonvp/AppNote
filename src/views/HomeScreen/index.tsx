import { View, Text,StyleSheet } from 'react-native'
import React,{useEffect,useState} from 'react'
import { TextButton } from 'components/core/TextButton';
import { useNav } from 'navigation/NavigationApp';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';


export default function Home() {
  const [user, setuser] = useState();
  const [logIn, setLogIn] = useState();
  
  const nav = useNav()

  const handleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // await auth().signOut().then(() => console.log('User signed out!'));
      nav.navigate('Login')
    } catch (error) {
      console.log(error)
    }
  }

  // const onAuthStateChanged = (user: {}) => {
  //   setUser(user);
  //   console.log(user);
  //   if (user) setloggedIn(true);
  // }

  return (
    <View>
      <TextButton label='back' onPress={() => handleSignOut()}/>
    </View>
  )
}

const styles = StyleSheet.create({
    
});