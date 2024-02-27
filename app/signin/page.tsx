"use client";

import { AuthAPI } from "@/APIs/AuthApi";
import { containerVariants } from "@/utils/constants/animateView";
import useAccountCtx from "@/utils/hooks/useAccountCtx";
import { notify } from "@/utils/notifier";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch, TextArea, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { motion } from "framer-motion";
import Link from "next/link";
import { EnterpriseAPI } from "@/APIs/EnterpriseAPI";
import { ClientsAPI } from "@/APIs/ClientsAPI";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confPassword: string;
};

const IValidAccountSchema = z.object({
  name: z.string(),
  password: z.string(),
  confPassword: z.string(),
  email: z.string(),
});
const SigninPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(IValidAccountSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => requestCreateAccount(data);

  const router = useRouter();
  const { token, userProfile } = useAccountCtx();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    Boolean(token?.length) && Boolean(userProfile.id) && router.push("/");
  }, [token, userProfile, router]);

  const requestCreateAccount = async (data: Inputs) => {
    const accountAPI = new AuthAPI();
    try {
      if (data.confPassword === data.password) {
        let response = await accountAPI.create_user({
          email: data.email,
          password: data.password,
          name: data.name,
        });
        if (response?.id) {
          if (isAdmin) {
            const enterpriseAPI = new EnterpriseAPI();
            let responseEnterID = await enterpriseAPI.create_enterprise({
              name: response?.name,
              creator: response?.id,
            });
            if (responseEnterID?.id) {
              notify("success", "Creation de compte entreprise réussi");
              router.push("/login");
              reset({
                email: "",
                name: "",
                confPassword: "",
                password: "",
              });
            }
          } else {
            const talentAPI = new ClientsAPI();
            let resTalent = await talentAPI.create_client({
              name: response?.name,
              member: response?.id,
            });
            if (resTalent?.id) {
              notify("success", "Creation de compte talent réussi");
              router.push("/login");
              reset({
                email: "",
                name: "",
                confPassword: "",
                password: "",
              });
            }
          }
        } else {
          console.log("response", response);
          notify(
            "error",
            "Oups une erreur est survenu. Veuillez bien revérifier vos informations."
          );
        }
      } else {
        notify("error", "Oups les mots de passes ne correspondent pas");
      }
    } catch (error) {
      notify(
        "error",
        "Oups une erreur est survenu lors de la création du compte"
      );
    }
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-screen w-full flex pt-16 items-start py-5 justify-center"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-center bg-white max-w-[400px] w-full mx-2 rounded-lg p-4 shadow-md"
      >
        <p className="text-[1.5rem] font-MontSemiBold mb-4">Signin Page</p>
        <TextField.Input
          {...register("name", { required: true })}
          radius="large"
          size={"3"}
          placeholder="Entrez un nom au client"
          my={"3"}
        />
        <TextField.Input
          radius="large"
          {...register("email", { required: true })}
          type="email"
          size={"3"}
          my={"3"}
          placeholder="Entrez le mail du client"
        />
        <TextField.Input
          radius="large"
          {...register("password", { required: true })}
          type="password"
          size={"3"}
          my={"3"}
          placeholder="Entrez le mot de passe du client"
        />
        <TextField.Input
          radius="large"
          {...register("confPassword", { required: true })}
          type="password"
          size={"3"}
          my={"3"}
          placeholder="Confirmez le mot de passe du client"
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

        <button
          type="submit"
          className="bg-[var(--variant-primary)] shadow-lg w-full py-2 p-3 text-[.8rem] transition-all active:scale-95 rounded-md text-white font-MontSemiBold cursor-pointer"
        >
          Sauvegarder
        </button>

        <div className="mt-4">
          <p className="font-MontRegular text-[.85rem]">
            Vous avez déja un compte{" "}
            <Link href={"/login"} className="underline text-indigo-500">
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default SigninPage;
