import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const PRODUCTS_SLICE = 'PRODUCTS';

const initialState = {
    products: [],
    loadProducts: false,
    addProductModalErrors: '',
  };

  export const productsSlice = createSlice({
    name: PRODUCTS_SLICE,
    initialState,
    reducers: {
      setProducts: (state, action) => {
        state.products = action.payload.products;
        state.limit = action.payload.limit;
        state.skip = action.payload.skip;
        state.totalProducts = action.payload.total;
      },
      setLoadProducts: (state, action) => {
        state.loadProducts = action.payload;
      },
      setUpdateProduct: (state, action) => {
        state.products = state.products.map((product) => ((product.id === action.payload.id) ? { ...product, ...action.payload } : product));
      },
      setNewProduct: (state, action) => {
        state.products = [...state.products, action.payload];
      },
      setRemoveDeletedProduct: (state, action) => {
        state.products = state.products.filter(product => {
          return product.id !== action.payload.id;
        })
      },
      setModalProductErrors: (state, action) => {
        state.addProductModalErrors = action.payload;
      },
      fetchProducts: () => {},
      updateProduct: () => {},
      createProduct: () => {},
      deleteProduct: () => {},
    },
  });

  export const {
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
  } = productsSlice.actions;

  export const productsSliceSelector = (state) => state.products;

export default productsSlice.reducer;