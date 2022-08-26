import { signInWithEmailAndPassword } from './authApi';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import { call, fork,put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AuthAction, authAction } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { SignUpPayload } from 'typings/auth';

export function* loginWithEmailAndPassword(email:string, password : string) {
    try {
        
    } catch (error) {
        
    }
}

export function* loginWithGooGle() {

}

export function* loginWithFacebook() {
    
}

export function* signUp(email:string, password : string) {

    try {
        if(email && password) {
            yield call(signInWithEmailAndPassword,email,password)
            yield put(authAction.signUpSuccess({
                email : email,
                password: password
            }))
        }
    } catch (error) {
        console.log('SignUp Failure')
    }
}


export function* logOut() {

}

export default function* authSaga() {
    yield takeEvery(authAction.requestSignout,signUp)
}