import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from '../features/auth/authSaga';
// import { watchUsersSaga } from '../features/users/usersSaga';

export default function* rootSaga() {
  yield all([
    // more sagas from different files
    watchAuthSaga,
    // watchUsersSaga,
  ].map(fork));
}
