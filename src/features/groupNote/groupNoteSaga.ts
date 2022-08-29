import {groupNoteAction} from './groupNoteSlice';
import { fork, call, put, take } from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {GroupNotePayload} from 'typings/groupNote';
import {createGroupNote} from './groupNoteApi';

function* handleCreateGroupNote(action: PayloadAction<GroupNotePayload>) {
  const {title, description} = action.payload;
  try {
    if (title && description) {
      yield call(createGroupNote, {title, description});
      yield put(
        groupNoteAction.createGroupNote({
          title: title,
          description: description,
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchGroupNoteFlow() {
   while(true) {
    const action: PayloadAction<GroupNotePayload> =  yield take(groupNoteAction.createGroupNote);
    yield call(handleCreateGroupNote,action)
   }
}

export default function* groupNoteSaga() {
  yield fork(watchGroupNoteFlow);
}
