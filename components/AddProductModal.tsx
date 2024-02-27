import React from 'react'
import { AnimatePresence } from 'framer-motion'

import { motion } from "framer-motion"
import { TextArea, TextField } from '@radix-ui/themes';
import useAddProduct from '@/utils/hooks/useAddProduct';
import { IoFileTray } from 'react-icons/io5';


const AddProductModal = () => {

    const { handleSubmit, modalAddProduct, onSubmit, ref, register, setmodalAddProduct, file, handleChange, } = useAddProduct()

    return (
        <>
            <AnimatePresence>
                {
                    modalAddProduct &&
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
                                <h2 className="text-[1rem] text-black text-center font-MontBold">Ajout d&apos;un nouveau produit</h2>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} id='modal-ctx' className="max-h-[60vh] max-[500px]:px-[.5rem] px-[1rem] min-h-[1500px]:max-h-[800px] my-2 mt-0 pt-0 py-3 overflow-y-auto">
                                <div className="w-full h-[15rem] relative shadow-lg rounded-sm mt-4 mb-5">

                                    {
                                        file.asPreview && <img
                                            src={file.asPreview}
                                            className='w-full h-full object-cover'
                                            alt="" />
                                    }

                                    {
                                        !file.asPreview && <p className="w-full h-full text-center text-[.85rem] flex font-MontRegular justify-center items-center">Veuillez bien ajouter une image</p>
                                    }
                                    <div className="absolute flex items-center gap-2 font-MontRegular bg-[var(--variant-primary)] text-white rounded-full w-fit z-[51] p-2 bottom-[1rem] right-[1rem]">
                                        <IoFileTray />

                                        <input type="file"
                                            onChange={handleChange}
                                            className='opacity-0 absolute top-0 left-0 right-0 bottom-0' name="" id="" />
                                    </div>

                                </div>
                                <p className="font-MontRegular text-[.8rem] text-slate-500 text-center px-2">Veuillez bien remplir ces informations pour créer un nouveau produit</p>
                                <div className="my-2">
                                    <TextField.Input {...register("title", { required: true })} radius="large" size={"3"} placeholder="Entrez un titre au produit" my={"3"} />
                                    <TextField.Input radius="large" {...register("the_cost", { required: true, valueAsNumber: true })} size={"3"} type='number' my={"3"} placeholder="Entrez le coût du produit" />
                                    <TextArea size="3" {...register("description", { required: true })} placeholder="Entrez une description au produit" />
                                </div>

                                <div className="border-t-[1px] border-black/20 mt-7 pt-5  flex items-center justify-end gap-3 flex-wrap">
                                    <div className="">
                                        <button type='submit'
                                            className="bg-[var(--variant-primary)] shadow-2xl py-2 p-3 text-[.8rem] transition-all active:scale-95 rounded-md text-white font-MontSemiBold cursor-pointer">Sauvegarder</button>
                                    </div>

                                    <div className="">
                                        <div
                                            onClick={() => setmodalAddProduct(false)}
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

export default AddProductModal