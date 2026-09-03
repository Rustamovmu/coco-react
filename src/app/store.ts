import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homePageReducer from './screens/homePage/slice';
import ordersPageReducer from './screens/ordersPage/slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    homePage: homePageReducer,
    ordersPage: ordersPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
