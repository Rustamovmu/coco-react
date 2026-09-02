import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";
import { Member } from "../../../lib/types/member";
import { Product } from "../../../lib/types/product";

const initialState: HomePageState = {
  featuredProducts: [],
  newArrivals: [],
  topMembers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setFeaturedProducts(state, action: PayloadAction<Product[]>) {
      state.featuredProducts = action.payload;
    },
    setNewArrivals(state, action: PayloadAction<Product[]>) {
      state.newArrivals = action.payload;
    },
    setTopMembers(state, action: PayloadAction<Member[]>) {
      state.topMembers = action.payload;
    },
  },
});

export const { setFeaturedProducts, setNewArrivals, setTopMembers } = homePageSlice.actions;
export default homePageSlice.reducer;
