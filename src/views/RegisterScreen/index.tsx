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
import { validated } from 'utils/validated';

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
      authAction.signUpRequest({
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
          validationSchema={validated}
          onSubmit={values => handleSignUp(values)}>
          {({handleChange, handleBlur, handleSubmit, values,touched,errors,isValid}) => (
            <View>
              <Input
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email"
              />
              {touched.email && errors.email && (
                <Text style={{fontSize: 12, color: '#FF0D10'}}>
                  {errors.email}
                </Text>
              )}
              <Input
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Password"
                secureText={true}
              />
               {touched.password && errors.password && (
                <Text style={{fontSize: 12, color: '#FF0D10'}}>
                  {errors.password}
                </Text>
              )}
              <TextButton
                label="Sign Up"
                onPress={handleSubmit}
                buttonStyle={styles.btnSignUp}
                disable={!isValid}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
