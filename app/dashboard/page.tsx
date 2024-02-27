"use client";

import { containerVariants } from "@/utils/constants/animateView";
import useStoreData from "@/utils/hooks/useStoreData";
import React from "react";
import { SiTaxbuzz } from "react-icons/si";
import { RiSearch2Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { TextField } from "@radix-ui/themes";
import useAccountCtx from "@/utils/hooks/useAccountCtx";

const DashBoardPage = () => {
  const { employments } = useStoreData();
  const { isEnterprise } = useAccountCtx();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="px-7 p-8 max-[1024px]:px-1 max-[1024px]:ml-0"
    >
      <h2 className="font-MontBold text-[1.5rem] mb-[2rem]">Dashboard</h2>
      <h5 className="font-MontMedium text-[1rem]">
        Liste des offres {`d'emplois`}
      </h5>

      {isEnterprise && (
        <button className="bg-blue-400 transition-all active:scale-95 rounded-full py-1 text-white font-MontMedium px-4 text-[.9rem] mt-[2rem] mb-[1rem] shadow-md">
          Créer un nouveau
        </button>
      )}

      <div className="mt-[1rem]">
        {employments.map((it, idx) => {
          return (
            <div
              key={idx}
              className="w-full flex border-[1px] border-black/20 p-4 bg-white shadow-md items-center justify-between"
            >
              <div className="">
                <h2 className="font-MontSemiBold text-black">{it.name}</h2>
                <p className="font-MontRegular mt-[.8rem] text-black">
                  {it.description}
                </p>
              </div>
              <button className="bg-blue-400 transition-all active:scale-95 rounded-full py-1 text-white font-MontMedium px-4 text-[.9rem] shadow-md">
                Postuler
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DashBoardPage;
