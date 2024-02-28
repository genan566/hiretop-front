import { EmploymentsType } from "@/utils/schemas/EmploymentSchema";
import { UserType } from "@/utils/schemas/UserSchema";
import React from "react";

export interface ValuesModalsDataTypes {
  modalClient: boolean;
  modalAddClient: boolean;
  mobNav: boolean;
  modalSelectedEmployment: number;

  setmobNav: React.Dispatch<React.SetStateAction<boolean>>;
  setmodalAddClient: React.Dispatch<React.SetStateAction<boolean>>;
  setmodalClient: React.Dispatch<React.SetStateAction<boolean>>;
  setmodalSelectedEmployment: React.Dispatch<React.SetStateAction<number>>;
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
  const [mobNav, setmobNav] = React.useState<boolean>(false);

  const [modalAddClient, setmodalAddClient] = React.useState<boolean>(false);
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
      }}
    >
      {children}
    </RootModalsContext.Provider>
  );
};
