import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const USERS_SLICE = 'USERS';

const initialState = {
    users: [],
    loadUsers: false,
    addUserModalErrors: '',
    cartUser: null,
  };

  export const usersSlice = createSlice({
    name: USERS_SLICE,
    initialState,
    reducers: {
      setUsers: (state, action) => {
        state.users = action.payload.users;
        state.limit = action.payload.limit;
        state.skip = action.payload.skip;
        state.totalUsers = action.payload.total;
      },
      setLoadUsers: (state, action) => {
        state.loadUsers = action.payload;
      },
      setModalErrors: (state, action) => {
        state.addUserModalErrors = action.payload;
      },
      setUpdatedUser: (state, action) => {
        state.users = state.users.map((user) => ((user.id === action.payload.id) ? { ...user, ...action.payload } : user));
      },
      setNewUser: (state, action) => {
        state.users = [...state.users, action.payload];
      },
      setCartUser: (state, action) => {
        state.cartUser = action.payload;
      },
      updateUserList: (state, action) => {
        state.users = state.users.filter(user => {
          return user.id !== action.payload.id;
        })
      },
      fetchUsers: () => {},
      updateUser: () => {},
      createUser: () => {},
      fetchCartUser: () => {},
      deleteUser: () => {},
    },
  });

  export const {
    setUsers,
    fetchUsers,
    setLoadUsers,
    updateUser,
    setModalErrors,
    setUpdatedUser,
    createUser,
    setNewUser,
    fetchCartUser,
    setCartUser,
    deleteUser,
    updateUserList,
  } = usersSlice.actions;

  export const usersSliceSelector = (state) => state.users;

export default usersSlice.reducer;