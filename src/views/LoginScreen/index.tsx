import {View, Text, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {Input} from '../../components/core/Input';
import {TextButton} from 'components/core/TextButton';
import styles from './LoginStyles';
import {useNav} from 'navigation/NavigationApp';
import {Field, Formik} from 'formik';
import {LoginPayload} from 'typings/auth';
import {useAppDispatch} from 'hooks';
import {authAction} from 'features/auth/authSlice';
import { validated } from 'utils/validated';
import auth from '@react-native-firebase/auth';

export default function Login() {
  const nav = useNav();
  const dispatch = useAppDispatch();
  const initialValues: LoginPayload = {
    email: '',
    password: '',
  };

  useEffect(() => {
    console.log(auth().currentUser,"a")
  }, [])

  const handleLogin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(
      authAction.loginSuccess({
        // type : "email",
        email: email,
        password: password,
      }),
    );
    nav.navigate('Home');
  };

  const handleSignUp = () => {
    nav.navigate('Register');
  };

  const handleLoginGoogle = async () => {
    dispatch(
      authAction.loginSuccess({
        // type : "google",
        email: '',
        password: '',
      }),
    );
    nav.navigate('Home');
  };

  const handleLoginFacebook = async () => {
    dispatch(
      authAction.loginSuccess({
        // type : "facebook",
        email: '',
        password: '',
      }),
    );
    nav.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.textHeader}>Login</Text>
      <View>
        <Formik
          initialValues={initialValues}
          validationSchema={validated}
          onSubmit={values => handleLogin(values)}>
          {({handleChange,handleBlur,handleSubmit,values,touched,errors,isValid}) => (
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
              <View style={styles.btn}>
                <TextButton
                  label="Login"
                  onPress={handleSubmit}
                  buttonStyle={styles.btnLogin}
                  disable={!isValid}
                />
                <TextButton
                  label="Sign Up"
                  onPress={handleSignUp}
                  buttonStyle={styles.btnLogin}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
      <View style={styles.loginWithSocial}>
        <TextButton
          label="Login With Google"
          onPress={() => handleLoginGoogle()}
          buttonStyle={styles.btnloginGoogle}
        />
        <TextButton
          label="Login With Facebook"
          onPress={() => handleLoginFacebook()}
          buttonStyle={styles.btnloginFacebook}
        />
      </View>
    </View>
  );
}
