import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { setCarts, fetchCarts, setLoadCarts } from './cartsSlice';
import { fetchCartsListCall } from '../../utils/apiCalls';
import { setAuthError } from '../auth/authSlice';

function* fetchCartsSaga() {
    try {
      yield put(setLoadCarts(true));
      const res = yield call(fetchCartsListCall);
      if (res.error && res.error === 'Could not authenticate user') {
        yield put(setAuthError(res.error));
      } else {
        yield put(setCarts(res));
        yield put(setLoadCarts(false));
      }
    } catch (err) {
      toast.error(err, { position: 'top-center' });
      console.error('New error', err);
    }
  }

  export function* watchCartsSaga() {
    yield takeLatest(fetchCarts.type, fetchCartsSaga);
  }