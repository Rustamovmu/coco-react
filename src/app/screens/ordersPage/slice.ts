import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../lib/types/screen";
import { Order } from "../../../lib/types/order";

const initialState: OrdersPageState = {
  pendingOrders: [],
  processingOrders: [],
  completedOrders: [],
};

const ordersPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setPendingOrders(state, action: PayloadAction<Order[]>) {
      state.pendingOrders = action.payload;
    },
    setProcessingOrders(state, action: PayloadAction<Order[]>) {
      state.processingOrders = action.payload;
    },
    setCompletedOrders(state, action: PayloadAction<Order[]>) {
      state.completedOrders = action.payload;
    },
    resetOrders(state) {
      state.pendingOrders = [];
      state.processingOrders = [];
      state.completedOrders = [];
    },
  },
});

export const {
  setPendingOrders,
  setProcessingOrders,
  setCompletedOrders,
  resetOrders,
} = ordersPageSlice.actions;

export default ordersPageSlice.reducer;
