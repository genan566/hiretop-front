import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { notify } from "../notifier";
import { toggleRefreshClients } from "@/redux/slices/clientSlice";
import { z } from "zod";
import useModal from "./useModal";
import useAccountCtx from "./useAccountCtx";
import { useDispatch } from "react-redux";
import { useOutsideClick } from "./useOutsideClick";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthAPI } from "@/APIs/AuthApi";
import { SubmissionAPI } from "@/APIs/Submission";
import { ClientsAPI } from "@/APIs/ClientsAPI";
import { TalentSchemaType } from "../schemas/TalentSchema";
import { toggleRefreshsubmitemployment } from "@/redux/slices/submitemployments";
import { EmploymentsAPI } from "@/APIs/EmploymentsAPI";
import { toggleRefreshemployments } from "@/redux/slices/employments";

type Inputs = {
  name: string;
  description: string;
};

const IValidEmploymentSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(5),
});

const useAddEmployment = () => {
  const { modalAddEmployment, setmodalAddEmployment, modalSelectedEmployment } =
    useModal();

  const { token, userProfile, enterpriseData } = useAccountCtx();

  const dispatcher = useDispatch();

  const ref = useOutsideClick(() => {
    setmodalAddEmployment(false);
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(IValidEmploymentSchema),
  });

  const clearModalndRefresh = () => {
    dispatcher(toggleRefreshemployments());
    notify("success", "Offre d'emploi créé avec succès");
    reset({
      description: "",
      name: "",
    });
    setmodalAddEmployment(false);
  };

  const requestCreateClient = async (data: Inputs) => {
    const employmentAPI = new EmploymentsAPI();
    console.log("data", data);
    let responseEmploymentCreation = await employmentAPI.create_employments(
      {
        name: data.name,
        description: data.description,
        creator: enterpriseData.id,
      },
      token
    );
    if (responseEmploymentCreation.id) {
      clearModalndRefresh();
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => requestCreateClient(data);

  return {
    onSubmit,
    register,
    handleSubmit,
    ref,
    modalAddEmployment,
    setmodalAddEmployment,
    errors,
  };
};

export default useAddEmployment;
