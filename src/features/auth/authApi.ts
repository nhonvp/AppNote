import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User Sign In Success');
    })
    .catch((error: any) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log('User Sign In Success', user.user);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export const signInWithGoogle = async () => {
  GoogleSignin.configure({
    webClientId:
      '993505332259-hl7gl9imo7josf2jd98kd9rl54sbq5oh.apps.googleusercontent.com',
  });
  try {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.log(error);
  }
};

export const signInWithFaceBook = async () => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    return auth().signInWithCredential(facebookCredential);
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  return auth()
    .signOut()
    .then(() => {
      console.log('User SignOut Success');
    });
};
