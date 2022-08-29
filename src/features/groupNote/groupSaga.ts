import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface AuthState {
  isLogging: boolean;
  email: '';
  currentUser: FirebaseAuthTypes.User | undefined;
  error: undefined;
}

const initialState: AuthState = {
  isLogging: false,
  email: '',
  currentUser: undefined,
  error: undefined,
};

const groupNoteSlice = createSlice({
  name: 'groupNote',
  initialState,
  reducers: {
    
  },

});

const {reducer} = groupNoteSlice

export const authAction = groupNoteSlice.actions;

export default reducer;
