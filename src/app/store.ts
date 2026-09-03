import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homePageReducer from './screens/homePage/slice';
import ordersPageReducer from './screens/ordersPage/slice';
import productsPageReducer from './screens/productsPage/slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    homePage: homePageReducer,
    ordersPage: ordersPageReducer,
    productsPage: productsPageReducer,
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
