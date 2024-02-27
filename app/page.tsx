"use client";

import { containerVariants } from "@/utils/constants/animateView";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import useAnimateDragHorizontal from "@/utils/hooks/useAnimateDrag";
import useStoreData from "@/utils/hooks/useStoreData";
import { FaAngleRight, FaArrowRight, FaCartFlatbed } from "react-icons/fa6";
import Link from "next/link";

import IMG from "@/assets/banniere.jpg";
import Image from "next/image";

export default function Home() {
  const { employments } = useStoreData();
  const router = useRouter();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full min-h-screen"
    >
      <div className="mt-0 h-[70dvh] bg-slate-100 pt-[6rem] px-2 transition-all max-[500px]:pt-0 max-[500px]:justify-center relative max-h-[550px] flex items-center flex-col">
        <h1 className="bebase_regular text-[7rem] max-lg:text-[6.5rem] leading-[7rem] m-0 text-center">
          Bienvenue sur{" "}
          <span className="text-[var(--variant-primary)] block underline">
            Hiretop
          </span>
        </h1>
        <p className="text-center font-MontMedium text-[.8rem] mt-[4rem] uppercase">
          La plateforme où vous trouverez les offres qui vous correspondent le
          mieux{" "}
        </p>
      </div>
      <p className="text-center font-MontRegular mt-[10rem] text-black/50 text-[.85rem] mb-[3rem]">
        Copyright all right reserved by nazaire.dayo@gmail.com
      </p>
    </motion.div>
  );
}
