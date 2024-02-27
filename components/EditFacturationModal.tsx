import React from 'react'
import { AnimatePresence } from 'framer-motion'

import { motion } from "framer-motion"
import Select from 'react-select'

import ManageItems from './ManageItems';
import useEditFacturation from '@/utils/hooks/useEditFacturation';


const EditFacturation = () => {

    const { calculatedTotalHTVA, modalFacturation, appliedTVAInTotal, totalWithTVA, setmodalFactureDataID,
        options, requestUpdateFacture, allowSettingProduct, items, setAllowSettingProduct, ref,
        setSelectedProduct, setmodalFacturation } = useEditFacturation()

    return (
        <>
            <AnimatePresence>
                {
                    modalFacturation &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='bg-black/60 blured sm w-screen h-screen absolute p-2 z-50 inset-0 flex items-center justify-center'
                    >
                        <div
                            ref={ref}
                            className="rounded-md p-5 pb-0 max-[500px]:p-3 bg-white shadow-2xl relative w-full max-w-[420px]">
                            <div className="border-b-[1px] border-black/20 pb-5 gap-3 flex-wrap">
                                <h2 className="text-[1rem] text-black text-center font-MontBold">Modification de la facture</h2>
                            </div>
                            <div id='modal-ctx' className="max-[500px]:px-[.5rem] px-[1rem] min-h-[1500px]:max-h-[800px] my-2 py-3">

                                <>
                                    <p className="font-MontRegular text-[.8rem] text-slate-500 mb-4 mt-1">Produits ajoutés:</p>

                                    <div className="mt-3">
                                        {
                                            items.map((it, idX) => {
                                                return <ManageItems
                                                    limit={1}
                                                    item={it}
                                                    key={idX} />
                                            })
                                        }
                                        {
                                            !Boolean(items.length) && <p className="font-MontRegular text-center text-[.8rem] text-slate-500 mb-4 mt-7">Aucun produit n&apos;est ajouté. Vous ne pouvez donc pac créer une facture</p>
                                        }
                                    </div>


                                    <p className="font-MontRegular text-[.85rem] text-slate-700 mb-4 mt-7">Total Hors TVA: <span className="font-MontSemiBold">{calculatedTotalHTVA}F</span></p>
                                    <p className="font-MontRegular text-[.85rem] text-slate-700 mb-4 mt-3">TVA (18%) appliquée: <span className="font-MontSemiBold">{appliedTVAInTotal}F</span></p>
                                    <p className="font-MontRegular text-[.85rem] text-slate-700 mb-4 mt-3">Total avec TVA: <span className="font-MontSemiBold">{totalWithTVA}F</span></p>
                                </>

                                <div className="border-t-[1px] border-black/20 pt-5  flex items-center justify-end gap-3 flex-wrap">
                                    <div className="">
                                        <div
                                            onClick={requestUpdateFacture}
                                            className="bg-[var(--variant-primary)] shadow-2xl py-2 p-3 text-[.8rem] transition-all active:scale-95 rounded-md text-white font-MontSemiBold cursor-pointer">Save</div>
                                    </div>

                                    <div className="">
                                        <div
                                            onClick={() => {
                                                setmodalFacturation(false)
                                                setAllowSettingProduct(true)
                                                setSelectedProduct([])
                                                setmodalFactureDataID(0)
                                            }}
                                            className="bg-red-500 shadow-2xl py-2 p-3 text-[.8rem] transition-all active:scale-95 rounded-md text-white font-MontSemiBold cursor-pointer">Cancel</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export default EditFacturation