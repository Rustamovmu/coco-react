import { RootState } from "../../store";

export const selectFeaturedProducts = (state: RootState) =>
  state.homePage.featuredProducts;

export const selectNewArrivals = (state: RootState) => state.homePage.newArrivals;

export const selectTopMembers = (state: RootState) => state.homePage.topMembers;
