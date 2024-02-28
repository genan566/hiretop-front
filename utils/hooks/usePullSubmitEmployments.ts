"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { ListEmploymentsSchema } from "../schemas/EmploymentSchema";
import useStoreData from "./useStoreData";
import useAccountCtx from "./useAccountCtx";
import { SubmissionAPI } from "@/APIs/Submission";
import {
  refreshsubmitemployment,
  toggleRefreshsubmitemployment,
} from "@/redux/slices/submitemployments";

const usePullSubmitEmployments = () => {
  const employmentsAPI = new SubmissionAPI();

  const { token } = useAccountCtx();
  const dispatcher = useDispatch();

  const { refreshingsubmitemployment } = useStoreData();

  const FetchEmployments = async () => {
    const response = await employmentsAPI.pull__submitemployment();
    return response;
  };
  const { data, refetch } = useQuery({
    queryKey: ["submitemploymentsPull"],
    queryFn: FetchEmployments,
  });

  React.useEffect(() => {
    const onFocus = () => {
      refetch();
    };
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  React.useEffect(() => {
    if (refreshingsubmitemployment) {
      refetch();
      dispatcher(toggleRefreshsubmitemployment());
    }
  }, [refreshingsubmitemployment]);

  const validateProducts = ListEmploymentsSchema.safeParse(data).success
    ? data
    : null;

  React.useEffect(() => {
    Boolean(validateProducts) &&
      dispatcher(refreshsubmitemployment(validateProducts));
  }, [validateProducts]);

  return;
};

export default usePullSubmitEmployments;
