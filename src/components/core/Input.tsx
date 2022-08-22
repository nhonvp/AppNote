import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {hp, wp} from '@utils/Reponsive';

import colors from '@utils/colors';

export interface InputProps extends TextInputProps {
  label?: string;
  labelStyles?: StyleProp<TextStyle>;
  containerStyles?: StyleProp<ViewStyle>;
}

export const Input = (props: InputProps) => {
  return (
    <View>
      <Text>Username</Text>
      <TextInput />
    </View>
  );
};

const styles = StyleSheet.create({});
