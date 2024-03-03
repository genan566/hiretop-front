import { EmploymentsType } from "@/utils/schemas/EmploymentSchema";
import { UserType } from "@/utils/schemas/UserSchema";
import React from "react";

export interface ValuesModalsDataTypes {
  modalClient: boolean;
  modalEmployment: boolean;
  modalAddClient: boolean;
  modalAddEmployment: boolean;
  mobNav: boolean;
  modalSelectedEmployment: number;
  modalEditEmployment: boolean;

  setmobNav: React.Dispatch<React.SetStateAction<boolean>>;
  setmodalAddClient: React.Dispatch<React.SetStateAction<boolean>>;
  setmodalAddEmployment: React.Dispatch<React.SetStateAction<boolean>>;
  setmodalEmployment: React.Dispatch<React.SetStateAction<boolean>>;
  setmodalClient: React.Dispatch<React.SetStateAction<boolean>>;
  setmodalSelectedEmployment: React.Dispatch<React.SetStateAction<number>>;
  setmodalEditEmployment: React.Dispatch<React.SetStateAction<boolean>>;
}
export const RootModalsContext = React.createContext<ValuesModalsDataTypes>(
  {} as ValuesModalsDataTypes
);

export const RootModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalClient, setmodalClient] = React.useState<boolean>(false);
  const [modalEmployment, setmodalEmployment] = React.useState<boolean>(false);
  const [modalEditEmployment, setmodalEditEmployment] =
    React.useState<boolean>(false);
  const [mobNav, setmobNav] = React.useState<boolean>(false);

  const [modalAddClient, setmodalAddClient] = React.useState<boolean>(false);
  const [modalAddEmployment, setmodalAddEmployment] =
    React.useState<boolean>(false);
  const [modalSelectedEmployment, setmodalSelectedEmployment] =
    React.useState<number>(0);

  return (
    <RootModalsContext.Provider
      value={{
        mobNav,
        modalAddClient,
        modalClient,
        setmobNav,
        setmodalAddClient,
        setmodalClient,
        modalSelectedEmployment,
        setmodalSelectedEmployment,
        modalAddEmployment,
        modalEmployment,
        setmodalAddEmployment,
        setmodalEmployment,
        modalEditEmployment,
        setmodalEditEmployment,
      }}
    >
      {children}
    </RootModalsContext.Provider>
  );
};
