import { takeLatest, put, call } from 'redux-saga/effects';
import {
  login,
  setAuth,
  setAuthError,
  setCurrentUser
} from './authSlice';
import {
  loginUser,
} from '../../utils/apiCalls';

function* loginSaga(action) {
  try {
    console.log(action);
    const res = yield call(loginUser, action.payload);
    if (res) {
      const { token, email, firstName, gender, id, image, lastName, username } = res;
      const user = {
        email,
        firstName,
        gender,
        id,
        image,
        lastName,
        username
      }
      console.log(res);
      if (res.error) {
        yield put(setAuthError(res.error));
      } else {
        yield put(setAuth(token));
        yield put(setCurrentUser(user));
        yield put(setAuthError(null));
      }
    }
  } catch (err) {
    yield put(setAuthError(err));
    console.error('New error', err);
  }
}


export function* watchAuthSaga() {
  yield takeLatest(login.type, loginSaga);
}
