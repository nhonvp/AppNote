import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData
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
  secureText ?: boolean
}

export const Input = (props: InputProps) => {
  return (
    <View style={styles.container}>
      <Text>{props.title}</Text>
          <TextInput
            onBlur={props.onBlur}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            style={styles.input}
            secureTextEntry={props.secureText}
            value={props.value}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  input: {
    height: 50,
    with: width - 40,
    borderWidth: 1,
    padding: 10,
    color: Colors.black,
    borderRadius: 8,
  },
});
