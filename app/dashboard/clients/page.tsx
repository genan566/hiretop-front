"use client"

import useStoreData from '@/utils/hooks/useStoreData'
import React from 'react'
import "@radix-ui/themes"
import { CiMenuKebab } from "react-icons/ci";
import { Button, DropdownMenu } from '@radix-ui/themes'
import { FaPlus } from 'react-icons/fa6'
import { LuClipboardEdit } from 'react-icons/lu'
import { MdDelete } from "react-icons/md";
import useModal from '@/utils/hooks/useModal';
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion"
import { containerVariants } from '@/utils/constants/animateView';
import { toggleRefreshClients } from '@/redux/slices/clientSlice';
import { notify } from '@/utils/notifier';
import { AuthAPI } from '@/APIs/AuthApi';
import { useDispatch } from 'react-redux';
import useAccountCtx from '@/utils/hooks/useAccountCtx';
import Image from 'next/image';


const ManageClientsPage = () => {
  // const { clients } = useStoreData()
  const { setmodalClient, setmodalAddClient, setmodalClientData } = useModal()

  const dispatcher = useDispatch()

  const { token } = useAccountCtx()

  const requestDeleteProduct = async (id: number) => {
    if (id) {
      const clientAPI = new AuthAPI()
      try {
        let response = await clientAPI.delete_account(token, id)
        if (response) {
          dispatcher(toggleRefreshClients())
          notify("success", "Supression de compte réussi")
        }
      } catch (error) {
        notify("error", "Oups une erreur est survenu lors de la création du compte client")
      }
    }
  }

  return (
    <motion.div

      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"

      className='rounded-xl shadow-lg max-[1024px]:ml-0 bg-white ml-7 px-7 p-8 max-[1024px]:mt-8'>
      <div className="flex flex-wrap items-center gap-4 border-b-[1px] border-b-slate-100 pb-5 justify-between">
        <h2 className='font-MontBold text-[1.5rem]'>Clients</h2>
        <button
          onClick={() => setmodalAddClient(true)}
          className="bg-[var(--variant-primary)] hover:bg-[var(--variant-primary)]
          active:bg-[var(--variant-primary)] 
          focus:outline-none w-fit flex items-center gap-1
          focus:ring-2 text-sm active:scale-95 transition-all
          focus:ring-violet-300 font-MontSemiBold
              py-2 text-white px-5 shadow-md
              rounded-md">
          <span>
            <FaPlus />
          </span>
          Ajouter un client
        </button>
      </div>


      <div className="mt-10">
        {/* {
          clients.map((it, idX) => {
            return <div key={idX} className="bg-white flex-wrap gap-4 flex items-center justify-between shadow-sm rounded-xl p-5">
              <div className="flex gap-4 flex-wrap items-center">
                {
                  it.image && <img
                    src={it.image}
                    alt="client Picture"
                    className='rounded-full shadow-lg w-16 h-16'
                  />
                }

                {
                  !Boolean(it.image) && <div className="w-16 text-[1.5rem] flex items-center justify-center shadow-lg rounded-full h-16 bg-slate-300">
                    <FaUserCircle />
                  </div>
                }
                <div className="">
                  <p className="mt-2 text-[.9rem] font-MontSemiBold">{it.name}</p>
                  <p className=" text-[.8rem] text-black/50 font-MontRegular">{it.email}</p>
                </div>
              </div>
              <div className="">
                <p className=" text-[.8rem] text-black/50 font-MontRegular">{it.facturation_adress || "Non défini"}</p>
              </div>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="outline" color='indigo'>
                    <CiMenuKebab />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item onClick={() => {
                    setmodalClientData(it)
                    setmodalClient(true)
                  }} className='font-MontRegular flex gap-2 justify-between' color='indigo'>
                    Edit <span className="text-[1.2rem]"><LuClipboardEdit /></span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => requestDeleteProduct(it.id!)} className='font-MontRegular flex gap-2 justify-between' color="red">
                    Supprimer <span className="text-[1.2rem]"><MdDelete /></span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          })
        } */}
      </div>
    </motion.div>
  )
}

export default ManageClientsPage