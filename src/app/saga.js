import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from '../features/auth/authSaga';
import { watchUsersSaga } from '../features/users/usersSagas';
import { watchProductsSaga } from '../features/products/productsSagas';

export default function* rootSaga() {
  yield all([
    // more sagas from different files
    watchAuthSaga,
    watchUsersSaga,
    watchProductsSaga,
  ].map(fork));
}
