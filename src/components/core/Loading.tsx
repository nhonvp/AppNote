import React from 'react'
import { StyleSheet,View } from 'react-native';
import Lottie from 'lottie-react-native';

const Loading = (props: Props) => {
  return (
    <View style={[StyleSheet.absoluteFill,styles.container]}>
        <Lottie source={require('../../../assets/images/loading.json')} autoPlay loop/>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    justifyContent : "center",
    alignItems : "center",
    zIndex :  1,
  }
});

export default Loading