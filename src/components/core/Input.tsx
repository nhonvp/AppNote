import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  TextStyle
} from 'react-native';
import React from 'react';
import {width, height} from '../../utils/Responsive';
import Colors from '../../utils/Colors';

export interface InputProps extends TextInputProps {
  value ?:string,
  title ?:string,
  placeholder ?: string,
  onChangeText ?:(e:string) => void 
  onBlur ?:(e : NativeSyntheticEvent<TextInputFocusEventData>) => void,
  secureText ?: boolean,
  borderStyle ?: StyleProp<TextStyle>
}

export const Input = (props: InputProps) => {
  return (
    <View style={styles.container}>
      <Text>{props.title}</Text>
          <TextInput
            onBlur={props.onBlur}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            style={[styles.input,props.borderStyle]}
            secureTextEntry={props.secureText}
            value={props.value}
            multiline
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    color: Colors.black,
    borderRadius: 8,
  },
});
