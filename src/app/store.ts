import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import homePageReducer from './screens/homePage/slice';
import ordersPageReducer from './screens/ordersPage/slice';
import productsPageReducer from './screens/productsPage/slice';

export const store = configureStore({
  reducer: {
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
