import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { NotePayload } from 'typings/note';

export interface NoteState {
  type : string,
  noteId : string,
  title : string,
  content : string,
  image : string
}

const initialState: NoteState = {
  type : '',
  noteId : '',
  title : '',
  content : '',
  image : ''
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    createNote: (state, action: PayloadAction<NotePayload>) => {
      console.log(action);
    },
  },
});

const {reducer} = noteSlice;

export const noteAction = noteSlice.actions;

export default reducer;
