import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";
import { Product } from "../../../lib/types/product";

const initialState: ProductsPageState = {
  chosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setChosenProduct(state, action: PayloadAction<Product | null>) {
      state.chosenProduct = action.payload;
    },
    clearChosenProduct(state) {
      state.chosenProduct = null;
    },
    resetProductsPage(state) {
      state.products = [];
      state.chosenProduct = null;
    },
  },
});

export const {
  setProducts,
  setChosenProduct,
  clearChosenProduct,
  resetProductsPage,
} = productsPageSlice.actions;

export default productsPageSlice.reducer;
