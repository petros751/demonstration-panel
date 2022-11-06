import { createSlice } from '@reduxjs/toolkit';

const PRODUCTS_SLICE = 'PRODUCTS';

const initialState = {
    products: [],
    loadProducts: false,
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
      fetchProducts: () => {},
      updateProduct: () => {},
      createProudct: () => {},
    },
  });

  export const {
    setProducts,
    fetchProducts,
    setLoadProducts,
    updateProduct,
    setUpdateProduct,
    createProudct,
    setNewProduct,
  } = productsSlice.actions;

  export const productsSliceSelector = (state) => state.products;

export default productsSlice.reducer;