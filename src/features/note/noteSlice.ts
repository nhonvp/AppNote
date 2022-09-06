import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NotePayload} from 'typings/note';

export interface NoteState {
  loading: boolean;
  data: {
    type: string;
    noteId: string;
    title: string;
    content: string;
    image: string;
  };
  error : boolean
}

const initialState: NoteState = {
  loading: false,
  data: {
    type: '',
    noteId: '',
    title: '',
    content: '',
    image: '',
  },
  error : false
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    fetchNote : (state,action) => {
      state.loading = false,
      state.error = false
    },
    fetchAddNoteRequest: (state,action:PayloadAction<NotePayload>) => {
      state.loading = true;
      state.error = false
    },
    fetchAddNote: (state, action: PayloadAction<NotePayload>) => {
      state.loading = false;
      state.data = action.payload
      state.error = false
    },
    fetchAddNoteFailed: state => {
      state.loading = false,
      state.error = true
    },
  },
});

const {reducer} = noteSlice;

export const noteAction = noteSlice.actions;

export default reducer;
