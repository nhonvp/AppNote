import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {width, height} from '../../utils/Responsive';
import Colors from '../../utils/Colors';

export interface Props {
  buttonStyle ?: StyleProp<ViewStyle>,
  label?: string,
  disable ?: boolean,
  labelStyle ?: StyleProp<TextStyle>
  onPress : () => void,
}

export const TextButton = (props: Props) => {
  return (
      <TouchableWithoutFeedback  onPress={props.onPress} >
        <View style={[styles.button,props.buttonStyle]}>
            <Text style={[styles.textBtn,props.labelStyle]}>{props.label}</Text>
        </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent : "center",
    alignItems : "center",
    borderWidth : 1,
    borderRadius : 8,
  },
  textBtn : {
    fontSize : 16,
    color : Colors.white,
    fontWeight : "500",
  }
});
