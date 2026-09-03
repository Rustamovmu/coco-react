import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectOrdersPage = (state: RootState) => state.ordersPage;

export const selectPendingOrders = createSelector(
  selectOrdersPage,
  (ordersPage) => ordersPage.pendingOrders,
);

export const selectProcessingOrders = createSelector(
  selectOrdersPage,
  (ordersPage) => ordersPage.processingOrders,
);

export const selectCompletedOrders = createSelector(
  selectOrdersPage,
  (ordersPage) => ordersPage.completedOrders,
);

export const selectOrderCounts = createSelector(
  selectPendingOrders,
  selectProcessingOrders,
  selectCompletedOrders,
  (pendingOrders, processingOrders, completedOrders) => ({
    pending: pendingOrders.length,
    processing: processingOrders.length,
    completed: completedOrders.length,
    total: pendingOrders.length + processingOrders.length + completedOrders.length,
  }),
);
