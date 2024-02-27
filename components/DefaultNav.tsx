"use client";

import useAccountCtx from "@/utils/hooks/useAccountCtx";
import useStoreData from "@/utils/hooks/useStoreData";
import { UserType } from "@/utils/schemas/UserSchema";
import { DropdownMenu } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoLogIn, IoLogOut, IoMenu } from "react-icons/io5";
import { SiHomeadvisor } from "react-icons/si";

const DefaultNav = () => {
  const { userProfile, setToken, setUserProfile } = useAccountCtx();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-white sticky top-0 border-b-[1px] border-b-black/10 w-full z-[100]">
      <div className="mx-auto flex-wrap flex items-center justify-between py-5 bg-white max-nav px-5">
        <div className={`text-[1.8rem] font-MontBold`}>
          <Link
            href="/"
            className="bebase_regular text-[2rem] text-[var(--variant-primary)]"
          >
            HireTop
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!Boolean(userProfile.id) && (
            <Link href={"/login"}>
              <div
                className="font-MontMedium bg-[var(--variant-primary)] py-[.35rem] px-4 
                    rounded-lg text-[.9rem] text-white active:scale-95 flex items-center gap-1 transition-all"
              >
                Login
                <span className="text-[1.2rem]">
                  <IoLogIn />
                </span>
              </div>
            </Link>
          )}
          {userProfile.id && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                {/* <> */}

                <div className="flex items-center justify-center  w-[3rem] h-[3rem] cursor-pointer gap-2">
                  {userProfile.image && (
                    <img
                      // width={48}
                      // height={48}
                      src={userProfile.image!}
                      alt="client Picture"
                      className="rounded-full w-full h-full max-[370px]:hidden"
                    />
                  )}

                  {!userProfile.image && (
                    <div className="w-[3rem] h-[3rem] rounded-full items-center flex justify-center text-[4rem] bg-slate-300">
                      <FaUserCircle />
                    </div>
                  )}
                  <div className="min-[371px]:hidden text-[1.5rem]">
                    <IoMenu />
                  </div>
                </div>
                {/* </> */}
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item className="font-MontRegular" color="indigo">
                  <Link
                    href={"/dashboard"}
                    className="flex gap-2 justify-between items-center"
                  >
                    <span className="text-[1.2rem]">
                      <SiHomeadvisor />
                    </span>{" "}
                    Dashboard
                  </Link>
                </DropdownMenu.Item>

                <DropdownMenu.Item
                  onClick={() => {
                    setToken("");
                    setUserProfile({} as UserType);
                    router.push("/login");
                    localStorage.setItem(
                      "userTokenProfile",
                      JSON.stringify("")
                    );
                    window.location.reload();
                  }}
                  className="font-MontRegular flex gap-2 justify-between"
                  color="red"
                >
                  <span className="text-[1.2rem]">
                    <IoLogOut />
                  </span>{" "}
                  Disconnect
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </div>
      </div>
    </div>
  );
};

export default DefaultNav;
