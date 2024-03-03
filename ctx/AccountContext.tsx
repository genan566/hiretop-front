import { AuthAPI } from "@/APIs/AuthApi";
import { ClientsAPI } from "@/APIs/ClientsAPI";
import { EnterpriseAPI } from "@/APIs/EnterpriseAPI";
import usePullAccountProfile from "@/utils/hooks/usePullAccountProfile";
import { notify } from "@/utils/notifier";
import { EnterpriseSchemaType } from "@/utils/schemas/EnterpriseSchema";
import { TalentSchemaType } from "@/utils/schemas/TalentSchema";
import { UserType } from "@/utils/schemas/UserSchema";
import { useRouter } from "next/navigation";
import React from "react";

export interface ValuesAccountDataTypes {
  token: string;
  isEnterprise: boolean;
  userProfile: UserType;
  candidateData: TalentSchemaType;
  enterpriseData: EnterpriseSchemaType;
  setIsEnterprise: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUserProfile: React.Dispatch<React.SetStateAction<UserType>>;
  setCandidateData: React.Dispatch<React.SetStateAction<TalentSchemaType>>;
  setEnterpriseData: React.Dispatch<React.SetStateAction<EnterpriseSchemaType>>;
}
export const AccountContext = React.createContext<ValuesAccountDataTypes>(
  {} as ValuesAccountDataTypes
);

export const AccountContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = React.useState<string>("");
  const [isEnterprise, setIsEnterprise] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState<UserType>(
    {} as UserType
  );

  const [candidateData, setCandidateData] = React.useState<TalentSchemaType>(
    {} as TalentSchemaType
  );

  const [enterpriseData, setEnterpriseData] =
    React.useState<EnterpriseSchemaType>({} as EnterpriseSchemaType);

  const loadEnterprise = async () => {
    const enterprise = new EnterpriseAPI();
    const responseEnterprise = await enterprise.retrive_enterprise(
      userProfile?.id
    );
    if (responseEnterprise?.length) {
      setEnterpriseData(responseEnterprise[0]);
    }
  };

  const loadCandidate = async () => {
    const clientAPI = new ClientsAPI();
    const responseClient = await clientAPI.retrive_client(userProfile?.id);
    if (responseClient?.length) {
      setCandidateData(responseClient[0]);
    }
  };

  const router = useRouter();
  const loadToken = () => {
    let resultToken = () =>
      JSON.parse(localStorage.getItem("userTokenProfile")!);
    let getted = resultToken();

    if (Boolean(getted?.length)) {
      setToken(getted!);
    }
  };

  const loadIsEnterprise = () => {
    let resultRes = JSON.parse(localStorage.getItem("userIsEnterprise")!);
    console.log("resultRes", resultRes);
  };

  React.useEffect(() => {
    loadToken();
    loadIsEnterprise();
  }, []);

  const loadProfile = async () => {
    const userAPI = new AuthAPI();
    try {
      const response = await userAPI.retrive_me__account(token);
      if (response?.id) {
        setUserProfile(response);
        Boolean(response.is_superuser) && router.push("/dashboard");
      }
    } catch (error) {
      notify(
        "error",
        "Une erreur est survenu lors du chargement de vos informations"
      );
      router.push("/");
    }
  };

  React.useEffect(() => {
    Boolean(token?.length) && !Boolean(userProfile.id) && loadProfile();
  }, [token]);

  React.useEffect(() => {
    if (userProfile.id) {
      if (isEnterprise) {
        loadEnterprise();
      } else {
        loadCandidate();
      }
    }
  }, [userProfile, isEnterprise]);

  return (
    <AccountContext.Provider
      value={{
        token,
        setToken,
        setUserProfile,
        userProfile,
        isEnterprise,
        setIsEnterprise,
        candidateData,
        setCandidateData,
        setEnterpriseData,
        enterpriseData,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
