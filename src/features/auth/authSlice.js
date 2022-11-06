import { createSlice } from '@reduxjs/toolkit';

const AUTH_SLICE = 'AUTH';

const initialToken = localStorage.getItem('token');

const initialState = {
  auth: !!initialToken,
  token: initialToken,
  user: null,
  authError: null,
};

export const authSlice = createSlice({
  name: AUTH_SLICE,
  initialState,
  reducers: {
    login: () => {},
    setAuth: (state, action) => {
      const token = action.payload;
      state.auth = !!token;
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthError: (state, action) => {
      state.authError = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (state.token) localStorage.setItem('token', action.payload);
      else localStorage.removeItem('token');
    },
    getLoggedInUser: () => {},
    logOut: () => {},
  },
});

export const {
  login,
  setAuth,
  register,
  setCurrentUser,
  getLoggedInUser,
  logOut,
  setAuthError,
  setToken,
} = authSlice.actions;

export const authSliceSelector = (state) => state.auth;

export default authSlice.reducer;
