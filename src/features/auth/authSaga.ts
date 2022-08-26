import {SignUpPayload} from 'typings/auth';
import { LoginPayload } from './authSlice';
import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  signOut,
  checkUserLogin,
  signInWithGoogle,
  signInWithFaceBook
} from './authApi';
import {call, fork, put, take, takeEvery, takeLatest} from 'redux-saga/effects';
import {authAction} from './authSlice';
import {PayloadAction} from '@reduxjs/toolkit';

function* handleLogin (payload: LoginPayload){
  switch (payload.type){
    case 'email' : 
      yield fork(handleLoginWithEmailAndPassword,payload.email,payload.password)
      break;
    case 'google': 
      yield fork(handleLoginWithGooGle)
      break;
    case 'facebook': 
      yield fork(handleLoginWithFacebook)
      break;
  }
}

export function* handleLoginWithEmailAndPassword(action: any) {
  const email = action.payload.email;
  const password = action.payload.password;
  try {
    if (email && password) {
      yield call(signInWithEmailAndPassword, email, password);
      yield put(
        authAction.loginSuccess({
          type : "email",
          email: email,
          password: password,
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function* handleLoginWithGooGle() {
  try {
    yield call(signInWithGoogle);
    yield put(
      authAction.loginSuccess({
        type: "google",
        email : '',
        password : ''
      })
    )
  } catch (error) {
    console.log(error)
  }
}

export function* handleLoginWithFacebook() {
  try {
    yield call(signInWithFaceBook);
    yield put(
      authAction.loginSuccess({
        type: "facebook",
        email : '',
        password : ''
      })
    )
  } catch (error) {
    console.log(error)
  }
}

export function* handleSignUp(action: any) {
  const email = action.payload.email;
  const password = action.payload.password;
  try {
    if (email && password) {
      yield call(signUpWithEmailAndPassword, email, password);
      yield put(
        authAction.signUpSuccess({
          email: email,
          password: password,
        }),
      );
    }
  } catch (error) {
    console.log('SignUp Failure');
  }
}

export function* handleLogOut() {
  yield call(signOut);
  yield put(authAction.logOut);
  console.log('User Logout Success');
}

function* watchAuthLogin() {
  const check: boolean = yield call(checkUserLogin);
  while (true) {
    // console.log('a')
    if (!check) {
      const action: PayloadAction<LoginPayload> = yield take(
        authAction.loginSuccess,
      );
      yield call(handleLoginWithEmailAndPassword, action);
    }
    yield take(authAction.logOut);
    yield call(handleLogOut);
  }
}

export default function* authSaga() {
  yield fork(watchAuthLogin);
}
