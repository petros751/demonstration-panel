import { createSlice } from '@reduxjs/toolkit';

const GLOBALS_SLICE = 'GLOBALS_SLICE';

const initialState = {
  isLoading: false,
  loadingMessage: '',
  activeLoaders: [],
};

const DEFAULT_LOADER_MESSAGE = 'Loading...';

export const globalsSlice = createSlice({
  name: GLOBALS_SLICE,
  initialState,
  reducers: {
    // TODO: Make this better so that it is a queue of loaders with messages.
    addLoader: (state, action) => {
      const loadingMessage = action.payload;
      const newLoaders = new Set(state.activeLoaders);
      const message = loadingMessage || DEFAULT_LOADER_MESSAGE;
      if (message && !newLoaders.has(message)) {
        newLoaders.add(message);
      }
      state.isLoading = !!newLoaders.size;
      state.activeLoaders = Array.from(newLoaders);
      state.loadingMessage = message;
    },
    removeLoader: (state, action) => {
      const loadingMessage = action.payload;
      const newLoaders = new Set(state.activeLoaders);
      if (loadingMessage && newLoaders.has(loadingMessage)) {
        newLoaders.delete(loadingMessage);
      }
      state.isLoading = !!newLoaders.size;
      const stateLoaders = Array.from(newLoaders);
      state.activeLoaders = stateLoaders;
      state.loadingMessage = stateLoaders.length ? stateLoaders[0] : '';
    },
  },
});

export const {
  addLoader,
  removeLoader,
} = globalsSlice.actions;

export const isLoading = (state) => state.globals.isLoading;
export const loadingMessage = (state) => state.globals.loadingMessage;

export default globalsSlice.reducer;
