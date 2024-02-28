"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const useStoreData = () => {
  const employments = useSelector((state: RootState) => state.employments);
  const submitemployments = useSelector(
    (state: RootState) => state.submitemployments
  );

  return {
    ...employments,
    ...submitemployments,
  };
};

export default useStoreData;
