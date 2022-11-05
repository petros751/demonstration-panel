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
        console.log(action.payload);
        state.products = action.payload.products;
        // state.limit = action.payload.limit;
        // state.offset = action.payload.offset;
        // state.totalUsers = action.payload.totalUsers;
      },
      setLoadProducts: (state, action) => {
        state.loadProducts = action.payload;
      },
      fetchProducts: () => {},
    },
  });

  export const {
    setProducts,
    fetchProducts,
    setLoadProducts,
  } = productsSlice.actions;

  export const productsSliceSelector = (state) => state.products;

export default productsSlice.reducer;