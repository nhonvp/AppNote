import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// export interface GroupNoteState {
//   groupId: string;
//   title: string;
//   description: string;
//   text: string[];
// }

// export interface GroupNotePayload {
//   title : string,
//   description : string
// }

const initialState = {
  groupId: '',
  title: '',
  description: '',
  text: [],
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    // createGroupNote: (state, action: PayloadAction<GroupNotePayload>) => {
    //   console.log(action);
    //   state.title = action.payload.title;
    //   state.description = action.payload.description;
    // },
  },
});

const {reducer} = noteSlice;

export const noteAction = noteSlice.actions;

export default reducer;
