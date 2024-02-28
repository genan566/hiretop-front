import { AuthAPI } from "@/APIs/AuthApi";
import { ClientsAPI } from "@/APIs/ClientsAPI";
import usePullAccountProfile from "@/utils/hooks/usePullAccountProfile";
import { notify } from "@/utils/notifier";
import { TalentSchemaType } from "@/utils/schemas/TalentSchema";
import { UserType } from "@/utils/schemas/UserSchema";
import { useRouter } from "next/navigation";
import React from "react";

export interface ValuesAccountDataTypes {
  token: string;
  isEnterprise: boolean;
  userProfile: UserType;
  candidateData: TalentSchemaType;
  setIsEnterprise: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUserProfile: React.Dispatch<React.SetStateAction<UserType>>;
  setCandidateData: React.Dispatch<React.SetStateAction<TalentSchemaType>>;
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

  React.useEffect(() => {
    if (userProfile.id) {
      (async () => {
        const clientAPI = new ClientsAPI();
        const responseClient = await clientAPI.retrive_client(userProfile?.id);
        if (responseClient?.length) {
          setCandidateData(responseClient[0]);
        }
      })();
    }
  }, [userProfile]);

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
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
