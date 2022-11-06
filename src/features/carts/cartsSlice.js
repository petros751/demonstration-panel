import { createSlice } from '@reduxjs/toolkit';

const CARTS_SLICE = 'CARTS';

const initialState = {
    carts: [],
    loadCarts: false,
  };

  export const cartsSlice = createSlice({
    name: CARTS_SLICE,
    initialState,
    reducers: {
      setCarts: (state, action) => {
        console.log(action.payload);
        state.carts = action.payload.carts;
        // state.limit = action.payload.limit;
        // state.offset = action.payload.offset;
        // state.totalUsers = action.payload.totalUsers;
      },
      setLoadCarts: (state, action) => {
        state.loadCarts = action.payload;
      },
      fetchCarts: () => {},
    },
  });

  export const {
    setCarts,
    fetchCarts,
    setLoadCarts,
  } = cartsSlice.actions;

  export const cartsSliceSelector = (state) => state.carts;

export default cartsSlice.reducer;