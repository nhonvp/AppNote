import {SignUpPayload} from 'typings/auth';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface AuthState {
  isLogging: boolean;
  email: '';
  currentUser: FirebaseAuthTypes.User | undefined;
  error: undefined;
}

export interface LoginPayload {
  type : string,
  email : string,
  password : string
}

const initialState: AuthState = {
  isLogging: false,
  email: '',
  currentUser: undefined,
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.isLogging = true,
      action
    },
    loginFailed: (state, action: PayloadAction<LoginPayload>) => {
      state.isLogging = false, 
      action
    },
    logOut: (state) => {
      state.isLogging = false, 
      state.currentUser = undefined
    },
    signUpSuccess: (state, action: PayloadAction<SignUpPayload>) => {
      state.isLogging = false, 
      state.error = undefined,
      action
    },
    authError: (state, action) => {
      state.isLogging = false;
      state.error = action.payload.error
    },
  },

});

const {reducer,actions} = authSlice

export const authAction = authSlice.actions;

export default reducer;
