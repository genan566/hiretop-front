import { ListEmploymentType } from "@/utils/schemas/EmploymentSchema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";

export interface ProductsSlice {
  employments: ListEmploymentType;
  refreshingEmployments: boolean;
}

const initialState: ProductsSlice = {
  employments: [],
  refreshingEmployments: false,
};

export const ProductsSlice = createSlice({
  name: "employments",
  initialState,
  reducers: {
    refreshemployments: (state, action: PayloadAction<ListEmploymentType>) => {
      state.employments = action.payload;
    },
    clearemployments: (state) => {
      state.employments = [];
    },
    toggleRefreshemployments: (state) => {
      state.refreshingEmployments = !state.refreshingEmployments;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  refreshemployments,
  clearemployments,
  toggleRefreshemployments,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
