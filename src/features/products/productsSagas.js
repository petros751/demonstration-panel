import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { setProducts, fetchProducts, setLoadProducts } from './productsSlice';
import { fetchProductsListCall } from '../../utils/apiCalls';
import { setAuthError } from '../auth/authSlice';

function* fetchProductsSaga() {
    try {
      yield put(setLoadProducts(true));
      const res = yield call(fetchProductsListCall);
      if (res.error && res.error === 'Could not authenticate user') {
        yield put(setAuthError(res.error));
      } else {
        yield put(setProducts(res));
        yield put(setLoadProducts(false));
      }
    } catch (err) {
      toast.error(err, { position: 'top-center' });
      console.error('New error', err);
    }
  }

  export function* watchProductsSaga() {
    yield takeLatest(fetchProducts.type, fetchProductsSaga);
  }