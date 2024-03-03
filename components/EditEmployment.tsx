import React from "react";
import { AnimatePresence } from "framer-motion";

import { motion } from "framer-motion";
import { TextArea, TextField } from "@radix-ui/themes";
import useEditEmployment from "@/utils/hooks/useEditEmploment";

const EditEmployment = () => {
  const {
    handleSubmit,
    modalEditEmployment,
    onSubmit,
    ref,
    register,
    setmodalEditEmployment,
    errors,
  } = useEditEmployment();

  return (
    <>
      <AnimatePresence>
        {modalEditEmployment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black/60 blured sm w-screen h-screen fixed p-2 z-50 inset-0 flex items-center justify-center"
          >
            <div
              ref={ref}
              className="rounded-md p-5 pb-0 max-[500px]:p-3 bg-white shadow-2xl relative w-full max-w-[420px]"
            >
              <div className="border-b-[1px] border-black/20 mb-5 pb-5 gap-3 flex-wrap">
                <h2 className="text-[1rem] text-black text-center font-MontBold">
                  Remplissez ce formulaire pour modifier {"l'offre d'emploi"}
                </h2>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                id="modal-ctx"
                className="max-h-[60vh] max-[500px]:px-[.5rem] px-[1rem] min-h-[1500px]:max-h-[800px] my-2 mt-0 pt-0 py-3 overflow-y-auto"
              >
                <p className="font-MontRegular text-[.8rem] text-slate-500 text-center px-2">
                  Veuillez bien remplir ces informations{" "}
                </p>
                <TextField.Input
                  radius="large"
                  size={"3"}
                  type="text"
                  placeholder="Entrez l'intitulé du poste"
                  my={"3"}
                  {...register("name", { required: true })}
                />

                {errors.name && (
                  <p className="text-red-400 font-MontRegular text-[.85rem] mb-4">{errors.name.message}</p>
                )}

                <div className="my-2">
                  <TextArea
                    size="3"
                    {...register("description", { required: true })}
                    placeholder="Description de l'offre d'emploi"
                  />
                </div>

                {errors.description && (
                  <p className="text-red-400 font-MontRegular text-[.85rem] mb-4">{errors.description.message}</p>
                )}

                <div className="border-t-[1px] border-black/20 pt-5 mt-7  flex items-center justify-end gap-3 flex-wrap">
                  <div className="">
                    <button
                      type="submit"
                      className="bg-[var(--variant-primary)] shadow-2xl py-2 p-3 text-[.8rem] transition-all active:scale-95 rounded-md text-white font-MontSemiBold cursor-pointer"
                    >
                      Sauvegarder
                    </button>
                  </div>

                  <div className="">
                    <div
                      onClick={() => setmodalEditEmployment(false)}
                      className="bg-red-500 shadow-2xl py-2 p-3 text-[.8rem] transition-all active:scale-95 rounded-md text-white font-MontSemiBold cursor-pointer"
                    >
                      Annuler
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditEmployment;
