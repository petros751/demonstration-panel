import { createSlice } from '@reduxjs/toolkit';

const USERS_SLICE = 'USERS';

const initialState = {
    users: [],
    loadUsers: false,
    addUserModalErrors: '',
  };

  export const usersSlice = createSlice({
    name: USERS_SLICE,
    initialState,
    reducers: {
      setUsers: (state, action) => {
        console.log(action.payload);
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
      setNewUser: (state,action) => {

      },
      fetchUsers: () => {},
      updateUser: () => {},
      createUser: () => {},
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
  } = usersSlice.actions;

  export const usersSliceSelector = (state) => state.users;

export default usersSlice.reducer;