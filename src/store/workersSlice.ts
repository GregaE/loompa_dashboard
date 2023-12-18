import { UnknownAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import {
  getWorker,
  getWorkers,
} from 'api/oompa_worker.api';
import filterWorkers from 'utils/filterWorkers';
import Worker from 'interfaces/Worker';
import DetailedWorker from 'interfaces/DetailedWorker';

export const workersSlice = createSlice({
  name: 'workers',
  initialState: {
    workers: [] as Array<Worker>,
    filteredWorkers: [] as Array<Worker>,
    workersPage: 1,
    workersTotalPages: 0,
    isLoadingWorkers: false,
    searchTerm: '',
    currentWorker: {} as DetailedWorker,
    isLoadingCurrentWorker: false,
  },
  reducers: {
    setWorkers(state, action: PayloadAction<Array<Worker>>) {
      state.workers = action.payload;
    },
    loadMoreWorkers: (state, action: PayloadAction<Array<Worker>>) => {
      state.workers = [...state.workers, ...action.payload];
    },
    setWorkersTotalPages(state, action: PayloadAction<number>) {
      state.workersTotalPages = action.payload;
    },
    setWorkersPage(state, action: PayloadAction<number>) {
      state.workersPage = action.payload;
    },
    setIsLoadingWorkers(state, action: PayloadAction<boolean>) {
      state.isLoadingWorkers = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setFilteredWorkers(state) {
      state.filteredWorkers = state.searchTerm.length
        ? filterWorkers([...state.workers], state.searchTerm)
        : state.workers;
    },
    setWorker(state, action: PayloadAction<DetailedWorker>) {
      state.currentWorker = action.payload;
    },
    setIsLoadingCurrentWorker(state, action: PayloadAction<boolean>) {
      state.isLoadingCurrentWorker = action.payload;
    },
  }
})

export const {
  setWorkers,
  loadMoreWorkers,
  setWorkersTotalPages,
  setWorkersPage,
  setIsLoadingWorkers,
  setSearchTerm,
  setFilteredWorkers,
  setWorker,
  setIsLoadingCurrentWorker,
} = workersSlice.actions

type TypedThunkAction = ThunkAction<void, RootState, unknown, UnknownAction>;

export const fetchWorkers = (resetData?: boolean):  TypedThunkAction => async (dispatch, getState) => {
  const state = getState();
  if (state.workers.workersPage === state.workers.workersTotalPages) return;

  try {
    dispatch(setIsLoadingWorkers(true));
    dispatch(setWorkersPage(resetData ? 1 : state.workers.workersPage + 1));

    const response = await getWorkers(resetData ? 1 : state.workers.workersPage + 1);
    const workers = response.data.results;

    if (resetData) {
      dispatch(setWorkers(workers));
    } else {
      dispatch(loadMoreWorkers(workers));
    }

    dispatch(setWorkersTotalPages(response.data.total));
    dispatch(setFilteredWorkers());
  } catch (error) {
    console.error('Error fetching workers data');
  } finally {
    dispatch(setIsLoadingWorkers(false));
  }
};

export const fetchWorker = (id: string): TypedThunkAction => async (dispatch) => {
  try {
    dispatch(setIsLoadingCurrentWorker(true));
    const { data } = await getWorker(id);
    dispatch(setWorker(data));
    dispatch(setIsLoadingCurrentWorker(false));
  } catch (error) {
    console.error('Error fetching worker data');
  }
};

export default workersSlice.reducer