import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { SiHomeadvisor, SiTaxbuzz } from "react-icons/si";
import { IoIosPeople } from "react-icons/io";
import { TbShoppingBagEdit, TbUserEdit } from "react-icons/tb";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { LuMoreHorizontal } from "react-icons/lu";
import { IoClose, IoLogOut } from "react-icons/io5";
import useAccountCtx from "@/utils/hooks/useAccountCtx";
import { UserType } from "@/utils/schemas/UserSchema";
import useModal from "@/utils/hooks/useModal";

const DashboardNavMobile = () => {
  const pathname = usePathname();
  const { token, userProfile, setToken, setUserProfile } = useAccountCtx();
  const { mobNav, setmobNav } = useModal();
  const router = useRouter();
  React.useEffect(() => {
    !Boolean(token.length) && router.push("/login");
  }, [token, router]);
  return (
    <div
      className={`bg-white shadow-lg justify-between flex-col ${
        !mobNav ? "hidden" : "flex fixed z-[50] w-[240px]"
      } gap-4 h-full transition-all border-r-[1px] border-slate-700/20 text-black px-4 py-8`}
    >
      <div
        onClick={() => setmobNav(!mobNav)}
        className="active:scale-95 absolute top-5 right-5 transition-all rounded-full w-fit bg-[var(--variant-primary)] text-white p-1"
      >
        <IoClose />
      </div>
      <div className="mt-10">
        <div className={`text-[1.8rem]  pl-[1rem] font-MontBold`}>
          <Link
            href="/"
            onClick={() => setmobNav(!mobNav)}
            className="bebase_regular text-[2rem] text-[var(--variant-primary)]"
          >
            HireTop
          </Link>
        </div>
        <ul className=" flex flex-col font-MontRegular gap-1 mt-10">
          <li
            className={`${
              pathname === "/dashboard"
                ? "bg-[var(--variant-primary)] text-white"
                : "bg-transparent hover:bg-[var(--variant-primary)] hover:text-white"
            } text-[.9rem] px-[1rem] rounded-md active:scale-95 transition-all cursor-pointer py-2`}
          >
            <Link
              onClick={() => setmobNav(true)}
              href="/dashboard"
              className="flex items-center gap-2"
            >
              <span className="text-[1.2rem]">
                <SiHomeadvisor />
              </span>{" "}
              Dashboard
            </Link>
          </li>
          <li
            className={`${
              pathname.includes("dashboard/clients")
                ? "bg-[var(--variant-primary)] text-white"
                : "bg-transparent hover:bg-[var(--variant-primary)] hover:text-white"
            } text-[.9rem] px-[1rem] rounded-md active:scale-95 transition-all cursor-pointer py-2`}
          >
            <Link
              onClick={() => setmobNav(true)}
              href="/dashboard/clients"
              className="flex items-center gap-2"
            >
              <span className="text-[1.2rem]">
                <IoIosPeople />
              </span>
              Clients
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <img
            src={userProfile.image!}
            alt="client Picture"
            className="rounded-full w-16 h-16"
          />
        </div>
        <div className="">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="outline" color="indigo">
                <LuMoreHorizontal />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item
                onClick={() => {
                  setToken("");
                  setUserProfile({} as UserType);
                  localStorage.setItem("userTokenProfile", JSON.stringify(""));
                  localStorage.setItem("userIsEnterprise", JSON.stringify(""));
                  window.location.reload();
                  router.push("/login");
                }}
                className="font-MontRegular flex gap-2 justify-between"
                color="red"
              >
                Disconnect{" "}
                <span className="text-[1.2rem]">
                  <IoLogOut />
                </span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavMobile;
