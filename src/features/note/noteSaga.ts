import {authAction} from './../auth/authSlice';
import {noteAction} from './noteSlice';
import {PayloadAction} from '@reduxjs/toolkit';
import { fork, call, put, take, takeLatest } from 'redux-saga/effects';
import {NotePayload} from 'typings/note';
import {createNote} from './noteApi';

// function* handleFetchNote() {
//   try {
//     yield call(fetchNote)
//     console.log('d');
//     yield put(noteAction.fetchNote)
//   } catch (error) {
//     console.log(error);
//   }
// }

function* handleAddNote(action: PayloadAction<NotePayload>) {
  const {type, noteId, title, content, image, groupId} = action.payload;
  try {
    yield call(createNote, {type,noteId,title,content,image,groupId});
    yield put(noteAction.fetchAddNote({
        type: type,
        noteId: noteId,
        title: title,
        content: content,
        image: image,
        groupId: groupId,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export function* checkStatusSuccess () {
  const action: PayloadAction<NotePayload> = yield take(
    noteAction.fetchAddNote,
  );
  if (action) {
    return true
  } else {
    return false
  }
}

function* watchAddNoteFlow() {
  while (true) {
    const action: PayloadAction<NotePayload> = yield take(
      noteAction.fetchAddNoteRequest,
    );
    yield call(handleAddNote,action)
  }
}

export default function* noteSaga() {
  yield fork(watchAddNoteFlow);
}
