import React from 'react'
import { AnimatePresence } from 'framer-motion'

import { motion } from "framer-motion"
import { TextArea, TextField } from '@radix-ui/themes';
import useAddClient from '@/utils/hooks/useAddClient';
import Image from 'next/image';
import { IoFileTray } from 'react-icons/io5';

const AddClientModal = () => {

    const { modalAddClient, handleSubmit, onSubmit, ref, register, setmodalAddClient, file, handleChange, errors } = useAddClient()


    return (
        <>
            <AnimatePresence>
                {
                    modalAddClient &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='bg-black/60 blured sm w-screen h-screen fixed p-2 z-50 inset-0 flex items-center justify-center'
                    >
                        <div
                            ref={ref}
                            className="rounded-md p-5 pb-0 max-[500px]:p-3 bg-white shadow-2xl relative w-full max-w-[420px]">
                            <div className="border-b-[1px] border-black/20 mb-5 pb-5 gap-3 flex-wrap">
                                <h2 className="text-[1rem] text-black text-center font-MontBold">Ajout d&apos;un nouveau client</h2>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} id='modal-ctx' className="max-h-[60vh] max-[500px]:px-[.5rem] px-[1rem] min-h-[1500px]:max-h-[800px] my-2 mt-0 pt-0 py-3 overflow-y-auto">
                                <p className="font-MontRegular text-[.8rem] text-slate-500 text-center px-2">Veuillez bien remplir ces informations pour créer un nouveau client</p>

                                <div className="w-[10rem] h-[10rem] relative mx-auto shadow-lg rounded-full my-7">


                                    {
                                        file.asPreview && <img
                                            src={file.asPreview}
                                            className='w-full h-full select-none rounded-full object-cover'
                                            alt="" />
                                    }
                                    <div className="absolute flex items-center gap-2 font-MontRegular bg-[var(--variant-primary)] text-white rounded-full w-fit z-[51] p-2 bottom-[1rem] right-[1rem]">
                                        <IoFileTray />

                                        <input type="file"
                                            onChange={handleChange}
                                            // {...register("title", { required: true })}
                                            className='opacity-0 absolute top-0 left-0 right-0 bottom-0' name="" id="" />
                                    </div>
                                </div>
                                <div className="my-2">
                                    <TextField.Input {...register("name", { required: true })} radius="large" size={"3"} placeholder="Entrez un nom au client" my={"3"} />
                                    {/* {errors.name && <p className="font-MontRegular text-red-400">{errors.name.message}</p>} */}
                                    <TextField.Input radius="large" {...register("email", { required: true, })} type='email' size={"3"} my={"3"} placeholder="Entrez le mail du client" />
                                    <TextArea size="3" {...register("facturation_adress", { required: true })} placeholder="Entrez une addresse au client" />
                                    <TextField.Input radius="large" {...register("password", { required: true, })} type='password' size={"3"} my={"3"} placeholder="Entrez le mot de passe du client" />
                                    <TextField.Input radius="large" {...register("confPassword", { required: true, })} type='password' size={"3"} my={"3"} placeholder="Confirmez le mot de passe du client" />
                                </div>

                                <div className="border-t-[1px] border-black/20 pt-5 mt-7  flex items-center justify-end gap-3 flex-wrap">
                                    <div className="">
                                        <button type='submit'
                                            className="bg-[var(--variant-primary)] shadow-2xl py-2 p-3 text-[.8rem] transition-all active:scale-95 rounded-md text-white font-MontSemiBold cursor-pointer">Sauvegarder</button>
                                    </div>

                                    <div className="">
                                        <div
                                            onClick={() => setmodalAddClient(false)}
                                            className="bg-red-500 shadow-2xl py-2 p-3 text-[.8rem] transition-all active:scale-95 rounded-md text-white font-MontSemiBold cursor-pointer">Annuler</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export default AddClientModal