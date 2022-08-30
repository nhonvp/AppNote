import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface GroupNoteState {
  groupId: string;
  title: string;
  description: string;
  note: string[];
}

export interface GroupNotePayload {
  title : string,
  description : string,
  note : string[]
}

const initialState: GroupNoteState = {
  groupId: '',
  title: '',
  description: '',
  note: [],
};

const groupNoteSlice = createSlice({
  name: 'groupNote',
  initialState,
  reducers: {
    createGroupNote: (state, action: PayloadAction<GroupNotePayload>) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    // editGroupNote: (state, action: PayloadAction<GroupNotePayload>) => {
    //   state.title = action.payload.title;
    //   state.description = action.payload.description;
    // },
    // deleteNoteGroup: (state,action) => {
    //   action
    // }
  },
});

const {reducer} = groupNoteSlice;

export const groupNoteAction = groupNoteSlice.actions;

export default reducer;
