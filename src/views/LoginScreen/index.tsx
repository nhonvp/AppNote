import { View, Text,StyleSheet, StatusBar } from 'react-native'
import React from 'react'

export default function Login() {
  return (
    <View>
      <StatusBar/>
      <View style={styles.container}>
        <View style={styles.login}>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex : 1,
    justifyContent : "center",
    alignItems : "center"
  },
  login : {
    
  }
});