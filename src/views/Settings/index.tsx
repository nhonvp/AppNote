import { View, Text,StyleSheet } from 'react-native'
import React,{useEffect,useState} from 'react'
import { TextButton } from 'components/core/TextButton';
import { useNav } from 'navigation/NavigationApp';
import styles from './SettingStyles'
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { authAction } from 'features/auth/authSlice';
import { useAppSelector } from 'hooks';

export default function Settings() {
    const nav = useNav()
    const dispatch= useDispatch();
    const user = useAppSelector(state => state.auth.email)

    useEffect(() => {
      console.log(user)
    }, [])
    
    const handleLogOut = () => {
      dispatch(authAction.logOut())
      nav.navigate('Login')
    }
  
    return (
      <View>
        <Text>{user}</Text>
        <TextButton label='LogOut' onPress={() => handleLogOut()} buttonStyle={styles.btnLogin}/>
      </View>
    )
}
