import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { setProducts, fetchProducts, setLoadProducts, updateProduct, setUpdateProduct, createProudct, setNewProduct } from './productsSlice';
import { fetchProductsListCall, updateProductCall, createProductCall } from '../../utils/apiCalls';
import { setAuthError } from '../auth/authSlice';

function* fetchProductsSaga(action) {
    try {
      yield put(setLoadProducts(true));
      const res = yield call(fetchProductsListCall, action.payload);
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

  function* updateProductSaga(action) {
    try {
      yield put(setLoadProducts(true));
      const res = yield call(updateProductCall, action.payload);
      if (res.error && res.error === 'Could not authenticate user') {
        yield put(setAuthError(res.error));
      } else {
        yield put(setUpdateProduct(res));
        yield put(setLoadProducts(false));
      }
    } catch (err) {
      toast.error(err, { position: 'top-center' });
      console.error('New error', err);
    }
  }

  function* createProudctSaga(action) {
    try {
      yield put(setLoadProducts(true));
      const res = yield call(createProductCall, action.payload);
      if (res.error && res.error === 'Could not authenticate user') {
        yield put(setAuthError(res.error));
      } else {
        yield put(setNewProduct(res));
        yield put(setLoadProducts(false));
      }
    } catch (err) {
      toast.error(err, { position: 'top-center' });
      console.error('New error', err);
    }
  }

  export function* watchProductsSaga() {
    yield takeLatest(fetchProducts.type, fetchProductsSaga);
    yield takeLatest(updateProduct.type, updateProductSaga);
    yield takeLatest(createProudct.type, createProudctSaga);
  }