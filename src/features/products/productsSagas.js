import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  setProducts,
  fetchProducts,
  setLoadProducts,
  updateProduct,
  setUpdateProduct,
  createProduct,
  setNewProduct,
  deleteProduct,
  setRemoveDeletedProduct,
  setModalProductErrors,
} from './productsSlice';
import { fetchProductsListCall, updateProductCall, createProductCall, deleteProductCall } from '../../utils/apiCalls';
import { setAuthError } from '../auth/authSlice';

function* fetchProductsSaga(action) {
  try {
    yield put(setLoadProducts(true));
    const res = yield call(fetchProductsListCall, action.payload);
    if (res.error && res.error === 'Could not authenticate user') {
      yield put(setAuthError(res.error));
      toast.error(res.error, { position: 'top-center' });
    } else if (res.message) {
      toast.error(res.message, { position: 'top-center' });
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
    const res = yield call(updateProductCall, action.payload);
    if (res.error) {
      yield put(setModalProductErrors(res.error));
      toast.error(res.error, { position: 'top-center' });
    } else if (res.message) {
      toast.error(res.message, { position: 'top-center' });
    } else {
      yield put(setUpdateProduct(res));
      toast.success('Product updated successfully!', { position: 'top-center' });
    }
  } catch (err) {
    toast.error(err, { position: 'top-center' });
  }
}

function* createProductSaga(action) {
  try {
    const res = yield call(createProductCall, action.payload);
    if (res.error && res.error === 'Could not authenticate user') {
      yield put(setModalProductErrors(res.error));
      toast.error(res.error, { position: 'top-center' });
    } else if (res.message) {
      toast.error(res.message, { position: 'top-center' });
    } else {
      yield put(setNewProduct(res));
      toast.success('Product added successfully!', { position: 'top-center' });
    }
  } catch (err) {
    toast.error(err, { position: 'top-center' });
    console.error('New error', err);
  }
}

function* deleteProductSaga(action) {
  try {
    const res = yield call(deleteProductCall, action.payload);
    if (res.error) {
      yield put(setModalProductErrors(res.error));
      toast.error(res.error, { position: 'top-center' });
    } else if (res.message) {
      toast.error(res.message, { position: 'top-center' });
    } else if (res) {
      yield put(setRemoveDeletedProduct(res));
    }
  } catch (err) {
    toast.error(err, { position: 'top-center' });
    console.error('New error', err);
  }
}


export function* watchProductsSaga() {
  yield takeLatest(fetchProducts.type, fetchProductsSaga);
  yield takeLatest(updateProduct.type, updateProductSaga);
  yield takeLatest(createProduct.type, createProductSaga);
  yield takeLatest(deleteProduct.type, deleteProductSaga);
}