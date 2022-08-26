import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {Input} from '../../components/core/Input';
import {TextButton} from 'components/core/TextButton';
import styles from './RegisterStyles';
import {useNav} from 'navigation/NavigationApp';
import {Formik} from 'formik';
import {SignUpPayload} from 'typings/auth';
import {useAppDispatch, useAppSelector} from 'hooks';
import {authAction} from 'features/auth/authSlice';

export default function Register() {
  const nav = useNav();

  const dispatch = useAppDispatch();

  const initialValues: SignUpPayload = {
    email: '',
    password: '',
  };

  const handleSignUp = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(
      authAction.signUpSuccess({
        email: email,
        password: password,
      }),
    );
    nav.navigate('Login')
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <View>
        <Text style={styles.textHeader}>Register</Text>
        <Formik
          initialValues={initialValues}
          onSubmit={values => handleSignUp(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <Input
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email"
              />
              <Input
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Password"
                secureText={true}
              />
              <TextButton
                label="Sign Up"
                onPress={handleSubmit}
                buttonStyle={styles.btnSignUp}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
