import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { notify } from "../notifier";
import { toggleRefreshClients } from "@/redux/slices/clientSlice";
import { z } from "zod";
import useModal from "./useModal";
import useAccountCtx from "./useAccountCtx";
import { useDispatch, useStore } from "react-redux";
import { useOutsideClick } from "./useOutsideClick";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthAPI } from "@/APIs/AuthApi";
import { SubmissionAPI } from "@/APIs/Submission";
import { ClientsAPI } from "@/APIs/ClientsAPI";
import { TalentSchemaType } from "../schemas/TalentSchema";
import { toggleRefreshsubmitemployment } from "@/redux/slices/submitemployments";
import { EmploymentsAPI } from "@/APIs/EmploymentsAPI";
import { toggleRefreshemployments } from "@/redux/slices/employments";
import useStoreData from "./useStoreData";

type Inputs = {
  name: string;
  description: string;
};

const IValidEmploymentSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(5),
});

const useEditEmployment = () => {
  const {
    modalEditEmployment,
    setmodalEditEmployment,
    modalSelectedEmployment,
  } = useModal();

  const { token, userProfile, enterpriseData } = useAccountCtx();
  const { employments } = useStoreData();

  const dispatcher = useDispatch();

  const ref = useOutsideClick(() => {
    setmodalEditEmployment(false);
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(IValidEmploymentSchema),
  });

  React.useEffect(() => {
    setValue(
      "name",
      employments.find((emp) => emp.id === modalSelectedEmployment)?.name!
    );
    setValue(
      "description",
      employments.find((emp) => emp.id === modalSelectedEmployment)
        ?.description!
    );
  }, [modalSelectedEmployment, employments, setValue]);

  const clearModalndRefresh = () => {
    dispatcher(toggleRefreshemployments());
    notify("success", "Offre d'emploi modifié avec succès");
    reset({
      description: "",
      name: "",
    });
    setmodalEditEmployment(false);
  };

  const requestCreateClient = async (data: Inputs) => {
    const employmentAPI = new EmploymentsAPI();
    console.log("data", data);
    let responseEmploymentCreation = await employmentAPI.update_employments(
      {
        name: data.name,
        description: data.description,
        creator: enterpriseData.id,
      },
      modalSelectedEmployment,
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
    modalEditEmployment,
    setmodalEditEmployment,
    errors,
  };
};

export default useEditEmployment;
