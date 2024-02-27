"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { EmploymentsAPI } from "@/APIs/EmploymentsAPI";
import { ListEmploymentsSchema } from "../schemas/EmploymentSchema";
import {
  refreshemployments,
  toggleRefreshemployments,
} from "@/redux/slices/employments";
import useStoreData from "./useStoreData";
import useAccountCtx from "./useAccountCtx";

const usePullEmployments = () => {
  const employmentsAPI = new EmploymentsAPI();

  const { token } = useAccountCtx();
  const dispatcher = useDispatch();

  const { refreshingEmployments } = useStoreData();

  const FetchEmployments = async () => {
    const response = await employmentsAPI.pull__employments();
    return response;
  };
  const { data, refetch } = useQuery({
    queryKey: ["employmentsPull"],
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
    if (refreshingEmployments) {
      refetch();
      dispatcher(toggleRefreshemployments());
    }
  }, [refreshemployments]);

  const validateProducts = ListEmploymentsSchema.safeParse(data).success
    ? data
    : null;

  React.useEffect(() => {
    Boolean(validateProducts) &&
      dispatcher(refreshemployments(validateProducts));
  }, [validateProducts]);

  return;
};

export default usePullEmployments;
