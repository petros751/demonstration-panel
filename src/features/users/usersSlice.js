import { createSlice } from '@reduxjs/toolkit';

const USERS_SLICE = 'USERS';

const initialState = {
    users: [],
    loadUsers: false,
  };

  export const usersSlice = createSlice({
    name: USERS_SLICE,
    initialState,
    reducers: {
      setUsers: (state, action) => {
        console.log(action.payload);
        state.users = action.payload.users;
        // state.limit = action.payload.limit;
        // state.offset = action.payload.offset;
        // state.totalUsers = action.payload.totalUsers;
      },
      setLoadUsers: (state, action) => {
        state.loadUsers = action.payload;
      },
      fetchUsers: () => {},
    },
  });

  export const {
    setUsers,
    fetchUsers,
    setLoadUsers,
  } = usersSlice.actions;

  export const usersSliceSelector = (state) => state.users;

export default usersSlice.reducer;