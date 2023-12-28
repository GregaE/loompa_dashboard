import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const workersSlice = createSlice({
  name: 'workers',
  initialState: {
    workersPage: 1,
    workersTotalPages: 0,
    searchTerm: '',
  },
  reducers: {
    setWorkersTotalPages(state, action: PayloadAction<number>) {
      state.workersTotalPages = action.payload;
    },
    incrementWorkersPage(state) {
      state.workersPage++;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  }
})

export const {
  setWorkersTotalPages,
  incrementWorkersPage,
  setSearchTerm,
} = workersSlice.actions

export default workersSlice.reducer