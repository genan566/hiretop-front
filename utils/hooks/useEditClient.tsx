import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { notify } from '../notifier'
import { toggleRefreshClients } from '@/redux/slices/clientSlice'
import { AuthAPI } from '@/APIs/AuthApi'
import useModal from './useModal'
import useAccountCtx from './useAccountCtx'
import { useDispatch } from 'react-redux'
import { z } from 'zod'
import { useOutsideClick } from './useOutsideClick'
import { zodResolver } from '@hookform/resolvers/zod'


export type FileInterface = {
    asPreview: string,
    file: File,
};

type Inputs = {
    facturation_adress: string,
    name: string,
    email: string,
}

const IValidProducSchema = z.object({
    facturation_adress: z.string(),
    name: z.string(),
    email: z.string(),
})
const useEditClient = () => {
    const { modalClient, setmodalClient, modalClientData } = useModal()


    const [file, setFile] = React.useState<FileInterface>({} as FileInterface);

    function handleChange(e: any) {
        console.log(e.target.files[0]);
        setFile({
            asPreview: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
        });
    }
    const { token } = useAccountCtx()

    const dispatcher = useDispatch()

    const ref = useOutsideClick(() => {
        setmodalClient(false)
        setFile({} as FileInterface)
        // setmodalData({} as ModalData)
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(IValidProducSchema)
    })


    const clearModalndRefresh = () => {

        dispatcher(toggleRefreshClients())
        notify("success", "Mise à jour effectué avec succès")
        reset({ facturation_adress: "", email: "", name: "", })
        setmodalClient(false)
        setFile({} as FileInterface)
    }


    React.useEffect(() => {
        setValue("email", modalClientData.email)
        setValue("facturation_adress", modalClientData.facturation_adress!)
        setValue("name", modalClientData.name)
    }, [modalClientData])

    const requestCreateClient = async (data: Inputs) => {
        const clientAPI = new AuthAPI()
        try {
            let response = await clientAPI.retrive_account_update(token, modalClientData.id, {
                email: data.email,
                facturation_adress: data.facturation_adress, name: data.name,
            },)
            console.log("response", response)
            if (response?.id) {
                if (file.file) {
                    let sendImgResp = await clientAPI.retrieve_update_user(token, response?.id, { image: file.file })
                    if (sendImgResp?.id) {
                        clearModalndRefresh()
                    }
                }
                else {
                    clearModalndRefresh()
                }
            }
        } catch (error) {
            console.log("error", error)
            notify("error", "Oups une erreur est survenu lors de la création du produit")
        }

        // console.log("data", data)
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => requestCreateClient(data)

    return (
        {
            onSubmit, ref, modalClient, setmodalClient, register, handleSubmit, handleChange, file, setFile, modalClientData, 
        }
    )
}

export default useEditClient