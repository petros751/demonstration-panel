import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  login,
  setAuth,
  setAuthError,
  setCurrentUser,
  setToken,
  logOut,
} from './authSlice';
import {
  loginUser,
} from '../../utils/apiCalls';

function* loginSaga(action) {
  try {
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
      if (res.error) {
        yield put(setAuthError(res.error));
      } else if(res.message) {
        yield put(setAuthError(res.message));
        toast.error(res.message, { position: 'top-center' });
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

function* logOutSaga() {
  try {
    yield put(setToken(null));
    window.location.reload();
  } catch (err) {
    yield put(setAuthError(err));
    console.error('New error', err);
  }
}


export function* watchAuthSaga() {
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(logOut.type, logOutSaga);
}
