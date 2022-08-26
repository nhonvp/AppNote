import {View, Text, StyleSheet, StatusBar, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import {Input} from '../../components/core/Input';
import {TextButton} from 'components/core/TextButton';
import styles from './LoginStyles';
import {useNav} from 'navigation/NavigationApp';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {Formik} from 'formik';
import { LoginPayload } from 'typings/auth';

export default function Login() {
  const nav = useNav();
  const initialValues: LoginPayload = {
    email: '',
    password: '',
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '993505332259-hl7gl9imo7josf2jd98kd9rl54sbq5oh.apps.googleusercontent.com',
    });
    return () => {};
  }, []);


  const handleLogin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log(email, password);
  };

  const handleSignUp = () => {
    nav.navigate('Register');
  };

  const handleLoginGoogle = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = await auth.GoogleAuthProvider.credential(
        idToken,
      );
      const res = await auth().signInWithCredential(googleCredential);
      // nav.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      const res = await auth().signInWithCredential(facebookCredential);
      console.log(res);
      nav.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.textHeader}>Login</Text>
      <View>
        <Formik
          initialValues={initialValues}
          onSubmit={values => handleLogin(values)}>
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
              <View style={styles.btn}>
                <TextButton
                  label="Login"
                  onPress={handleSubmit}
                  buttonStyle={styles.btnLogin}
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
