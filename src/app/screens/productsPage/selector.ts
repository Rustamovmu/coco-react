import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectProductsPage = (state: RootState) => state.productsPage;

export const selectProducts = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.products,
);

export const selectChosenProduct = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.chosenProduct,
);

export const selectProductCount = createSelector(
  selectProducts,
  (products) => products.length,
);

export const selectProductById = (productId: string) => createSelector(
  selectProducts,
  (products) => products.find((product) => product._id === productId),
);
