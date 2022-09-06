import { all } from 'redux-saga/effects';
import authSaga from 'features/auth/authSaga';
import groupNoteSaga from 'features/groupNote/groupNoteSaga';
import noteSaga from 'features/note/noteSaga';
export default function* rootSaga() {
  yield all([
    authSaga(),
    groupNoteSaga(),
    noteSaga()
  ]);
}