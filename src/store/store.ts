import { configureStore } from '@reduxjs/toolkit';
import { workerApi } from './workerApiSlice';
import workersReducer from './workersSlice';

export const store = configureStore({
  reducer: {
    workers: workersReducer,
    [workerApi.reducerPath]: workerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(workerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;