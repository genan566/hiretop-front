import { AuthAPI } from "@/APIs/AuthApi";
import usePullAccountProfile from "@/utils/hooks/usePullAccountProfile";
import { UserType } from "@/utils/schemas/UserSchema";
import { useRouter } from "next/navigation";
import React from "react";

export interface ValuesAccountDataTypes {
  token: string;
  isEnterprise: boolean;
  userProfile: UserType;
  setIsEnterprise: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUserProfile: React.Dispatch<React.SetStateAction<UserType>>;
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
    const response = await userAPI.retrive_me__account(token);
    if (response?.id) {
      setUserProfile(response);
      Boolean(response.is_superuser) && router.push("/dashboard");
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
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
