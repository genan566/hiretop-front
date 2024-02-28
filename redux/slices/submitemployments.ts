import { ListSubmitEmploymentType } from "@/utils/schemas/SubmitEmploymentSchema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";

export interface SubmitEmploymentSlice {
  submitemployment: ListSubmitEmploymentType;
  refreshingsubmitemployment: boolean;
}

const initialState: SubmitEmploymentSlice = {
  submitemployment: [],
  refreshingsubmitemployment: false,
};

export const SubmitEmploymentSlice = createSlice({
  name: "submitemployments",
  initialState,
  reducers: {
    refreshsubmitemployment: (
      state,
      action: PayloadAction<ListSubmitEmploymentType>
    ) => {
      state.submitemployment = action.payload;
    },
    clearsubmitemployment: (state) => {
      state.submitemployment = [];
    },
    toggleRefreshsubmitemployment: (state) => {
      state.refreshingsubmitemployment = !state.refreshingsubmitemployment;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  refreshsubmitemployment,
  clearsubmitemployment,
  toggleRefreshsubmitemployment,
} = SubmitEmploymentSlice.actions;

export default SubmitEmploymentSlice.reducer;
