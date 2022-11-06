import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import _ from 'lodash';
import {
  setUsers,
  fetchUsers,
  setLoadUsers,
  setModalErrors,
  updateUser,
  setUpdatedUser,
  createUser,
  setNewUser,
  fetchCartUser,
  setCartUser,
} from './usersSlice';
import {
  fetchUsersListCall,
  updateUserCall,
  createUserCall,
  fetchCartUserCall,
} from '../../utils/apiCalls';
import { setAuthError } from '../auth/authSlice';

function* fetchUsersSaga(action) {
    try {
      yield put(setLoadUsers(true));
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

  function* updateUserSaga(action) {
    try {
      const { user } = action.payload;
      const res = yield call(updateUserCall, user,);
      if (res) {
        yield put(setUpdatedUser(res));
        toast.success('User updated successfully!', { position: 'top-center' });
      } else if (res.error) {
        yield put(setModalErrors(res.error));
        toast.error(res.error, { position: 'top-center' });
      }
    } catch (err) {
      toast.error(err, { position: 'top-center' });
      console.error('New error', err);
    }
  }

  function* createUserSaga(action) {
    try {
      const { user } = action.payload;
      const res = yield call(createUserCall, user);
      if (res) {
        yield put(setNewUser(res));
        toast.success('User added successfully!', { position: 'top-center' });
      } else if (res.error) {
        yield put(setModalErrors(res.error));
        toast.error(res.error, { position: 'top-center' });
      }
    } catch (err) {
      toast.error(err, { position: 'top-center' });
      console.error('New error', err);
    }
  }

  function* fetchCartUserSaga(action) {
    try {
      const res = yield call(fetchCartUserCall, action.payload);
      if (res) {
        yield put(setCartUser(res));
      } else if (res.error) {
        yield put(setModalErrors(res.error));
        toast.error(res.error, { position: 'top-center' });
      }
    } catch (err) {
      toast.error(err, { position: 'top-center' });
      console.error('New error', err);
    }
  }

  export function* watchUsersSaga() {
    yield takeLatest(fetchUsers.type, fetchUsersSaga);
    yield takeLatest(updateUser.type, updateUserSaga);
    yield takeLatest(createUser.type, createUserSaga);
    yield takeLatest(fetchCartUser.type, fetchCartUserSaga);
  }