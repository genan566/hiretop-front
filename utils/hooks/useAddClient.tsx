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

type FileInterface = {
  asPreview: string;
  file: File;
};

type Inputs = {
  motivation_letter: string;
};

const IValidSubmissionSchema = z.object({
  motivation_letter: z.string(),
});

const useAddClient = () => {
  const { modalAddClient, setmodalAddClient, modalSelectedEmployment } =
    useModal();

  const [file, setFile] = React.useState<FileInterface>({} as FileInterface);

  function handleChange(e: any) {
    console.log(e.target.files[0]);
    setFile({
      asPreview: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  }

  const { token, userProfile, candidateData } = useAccountCtx();

  const dispatcher = useDispatch();

  const ref = useOutsideClick(() => {
    setmodalAddClient(false);
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(IValidSubmissionSchema),
  });

  const clearModalndRefresh = () => {
    dispatcher(toggleRefreshsubmitemployment());
    notify("success", "Candidature envoyé");
    reset({
      motivation_letter: "",
    });
    setmodalAddClient(false);
  };

  const requestCreateClient = async (data: Inputs) => {
    const submissionAPI = new SubmissionAPI();
    if (Boolean(file.asPreview)) {
      if (!data.motivation_letter) {
        notify("error", "Vous devez ajouter votre motivation");
      } else {
        try {
          let response = await submissionAPI.create_submitemployment(
            {
              employment: modalSelectedEmployment,
              motivation_on_employment: data.motivation_letter,
              submiter: candidateData.id,
            },
            token
          );
          if (response?.id) {
            let sendCVResp = await submissionAPI.upload_cv_to_submitemployment(
              response?.id,
              { cv_file: file.file },
              token
            );
            if (sendCVResp?.id) {
              clearModalndRefresh();
            }
          } else {
            console.log("res", response);
          }
        } catch (error) {
          console.log("error", error);
          notify(
            "error",
            "Oups une erreur est survenu lors de la création du produit"
          );
        }
      }
    } else {
      notify("error", "Vous devez ajouter un ficher");
    }

    // console.log("data", data)
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => requestCreateClient(data);

  return {
    onSubmit,
    register,
    handleSubmit,
    ref,
    modalAddClient,
    setmodalAddClient,
    handleChange,
    file,
    errors,
  };
};

export default useAddClient;
