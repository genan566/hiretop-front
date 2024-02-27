"use client";

import { AuthAPI } from "@/APIs/AuthApi";
import useAccountCtx from "@/utils/hooks/useAccountCtx";
import { notify } from "@/utils/notifier";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { motion } from "framer-motion";
import { containerVariants } from "@/utils/constants/animateView";
import { ClientsAPI } from "@/APIs/ClientsAPI";
import { EnterpriseAPI } from "@/APIs/EnterpriseAPI";

type Inputs = {
  email: string;
  password: string;
};

const ValidateLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});
const LoginPage = () => {
  const [requesting, setRequesting] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(ValidateLoginSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => requestCreateProduct(data);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const router = useRouter();
  const { token, setToken, userProfile, setIsEnterprise } = useAccountCtx();

  React.useEffect(() => {
    Boolean(token?.length) && Boolean(userProfile.id) && router.push("/");
  }, [token, userProfile, router]);

  const loadProfile = async (sendedToken: string) => {
    const userAPI = new AuthAPI();
    const response = await userAPI.retrive_me__account(sendedToken);
    if (response?.id) {
      if (!isAdmin) {
        const clientAPI = new ClientsAPI();
        const responseClient = await clientAPI.retrive_client(response?.id);

        if (responseClient.length) {
          notify("success", "Login réussi");
          setToken(sendedToken);
          localStorage.setItem("userTokenProfile", JSON.stringify(sendedToken));
          localStorage.setItem("userIsEnterprise", JSON.stringify(false));
          setIsEnterprise(false);
          reset({ email: "", password: "" });
          router.push("/dashboard");
        } else {
          notify("error", "Il se pourrait que le compte n'existe pas.");
        }
      } else {
        const enterpriseAPI = new EnterpriseAPI();
        const responseEnterprise = await enterpriseAPI.retrive_enterprise(
          response?.id
        );

        if (responseEnterprise.length) {
          notify("success", "Login réussi");
          setToken(sendedToken);
          localStorage.setItem("userTokenProfile", JSON.stringify(sendedToken));
          localStorage.setItem("userIsEnterprise", JSON.stringify(true));
          setIsEnterprise(true);
          reset({ email: "", password: "" });
          router.push("/dashboard");
        } else {
          notify("error", "Il se pourrait que le compte n'existe pas.");
        }
      }
    }
  };

  const requestCreateProduct = async (data: Inputs) => {
    const loginAPI = new AuthAPI();

    try {
      setRequesting(true);
      let response = await loginAPI.login_account(data);
      if (response?.token) {
        loadProfile(response?.token);
      } else {
        response.error &&
          notify("error", "Le compte n'existe pas. Veuillez reessayer");
      }
    } catch (error) {
      notify(
        "error",
        "Oups une erreur est survenu lors de la connection au compte."
      );
    } finally {
      setRequesting(false);
    }
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-screen w-full flex items-start py-5 pt-16 justify-center"
    >
      {!Boolean(userProfile.id) && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-center bg-white max-w-[400px] w-full mx-2 rounded-lg p-4 shadow-md"
        >
          <p className="text-[1.5rem] font-MontRegular mb-4">Login Page</p>
          <TextField.Input
            radius="large"
            size={"3"}
            placeholder="Entrez votre mail"
            my={"3"}
            {...register("email", { required: true })}
          />
          <TextField.Input
            radius="large"
            size={"3"}
            type="password"
            placeholder="Entrez votre password"
            my={"3"}
            {...register("password", { required: true })}
          />
          <div className="my-10 mx-auto w-fit flex items-center gap-4">
            <input
              type="checkbox"
              name="isAdmin"
              id="isAdmin"
              value={isAdmin as any}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label
              htmlFor="isAdmin"
              className="font-MontRegular m-0 text-[.9rem]"
            >
              As Enterprise
            </label>
          </div>

          <div className="relative">
            {!token && (
              <button
                type="submit"
                className="bg-[var(--variant-primary)] w-full shadow-lg py-2 p-3 text-[.8rem] transition-all active:scale-95 rounded-md text-white font-MontSemiBold cursor-pointer"
              >
                {requesting ? "Chargement..." : "Sauvegarder"}
              </button>
            )}
            {requesting && <div className="absolute inset-0 z-1 bg-black/20" />}
          </div>

          <div className="mt-4">
            <p className="font-MontRegular text-[.85rem]">
              Vous n&apos;avez pas de compte{" "}
              <Link href={"/signin"} className="underline text-indigo-500">
                Créer un compte
              </Link>
            </p>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default LoginPage;
