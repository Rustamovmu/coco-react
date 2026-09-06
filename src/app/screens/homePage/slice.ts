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
    updateProductLike(state, action: PayloadAction<{ productId: string; productLikes: number; isLiked: boolean }>) {
      const update = (product: Product) => product._id === action.payload.productId
        ? { ...product, productLikes: action.payload.productLikes, isLiked: action.payload.isLiked }
        : product;
      state.featuredProducts = state.featuredProducts.map(update);
      state.newArrivals = state.newArrivals.map(update);
    },
  },
});

export const { setFeaturedProducts, setNewArrivals, setTopMembers, updateProductLike } = homePageSlice.actions;
export default homePageSlice.reducer;
