import { groupNoteAction } from 'features/groupNote/groupNoteSlice';
import { fork, call, put, take, takeLatest } from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import { GroupNotePayload } from './groupNoteSlice';
import { createGroupNote, deleteNoteGroup } from './groupNoteApi';

function* handleCreateGroupNote(action: PayloadAction<GroupNotePayload>) {
  const {title, description} = action.payload;
  try {
    if (title && description) {
      yield call(createGroupNote, {title, description,note: []});
      yield put(
        groupNoteAction.createGroupNote({
          title: title,
          description: description,
          note : []
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// function* handleDeleteGroupNote(action :string) {
//   const groupId = action
//   try {
//     if (groupId) {
//       yield call(deleteNoteGroup,groupId);
//       yield put(
//         groupNoteAction.deleteNoteGroup(groupId),
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }


function* watchGroupNoteFlow() {
   while(true) {
    const action: PayloadAction<GroupNotePayload> =  yield take(groupNoteAction.createGroupNote);
    yield call(handleCreateGroupNote,action)    
   }
}

export default function* groupNoteSaga() {
  yield fork(watchGroupNoteFlow);
}
