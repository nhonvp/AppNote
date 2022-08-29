import {GroupNotePayload} from '../../typings/groupNote';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface GroupNoteState {
  groupId: string;
  title: string;
  description: string;
  text: string[];
}

const initialState: GroupNoteState = {
  groupId: '',
  title: '',
  description: '',
  text: [],
};

const groupNoteSlice = createSlice({
  name: 'groupNote',
  initialState,
  reducers: {
    createGroupNote: (state, action: PayloadAction<GroupNotePayload>) => {
      console.log(action);
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
  },
});

const {reducer} = groupNoteSlice;

export const groupNoteAction = groupNoteSlice.actions;

export default reducer;
