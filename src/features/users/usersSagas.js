import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import _ from 'lodash';
import {
  setUsers,
  fetchUsers,
  setLoadUsers,
} from './usersSlice';
import {
  fetchUsersListCall,
} from '../../utils/apiCalls';
import { setAuthError } from '../auth/authSlice';

function* fetchUsersSaga(action) {
    try {
      console.log(action);
      yield put(setLoadUsers(true));
      console.log(' fetch users');
      const res = yield call(fetchUsersListCall, action.payload);
      if (res.error && res.error === 'Could not authenticate user') {
        yield put(setAuthError(res.error));
        // yield put(logOut());
      } else {
        console.log(res);
        yield put(setUsers(res));
        yield put(setLoadUsers(false));
      }
    } catch (err) {
      toast.error(err, { position: 'top-center' });
      console.error('New error', err);
    }
  }

  export function* watchUsersSaga() {
    yield takeLatest(fetchUsers.type, fetchUsersSaga);
  }