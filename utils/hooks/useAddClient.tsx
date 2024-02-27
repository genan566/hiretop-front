import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { notify } from '../notifier'
import { toggleRefreshClients } from '@/redux/slices/clientSlice'
import { z } from 'zod'
import useModal from './useModal'
import useAccountCtx from './useAccountCtx'
import { useDispatch } from 'react-redux'
import { useOutsideClick } from './useOutsideClick'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthAPI } from '@/APIs/AuthApi'


type FileInterface = {
    asPreview: string,
    file: File,
};

type Inputs = {
    facturation_adress: string,
    name: string,
    email: string,
    password: string,
    confPassword: string,
}

const IValidProducSchema = z.object({
    facturation_adress: z.string(),
    name: z.string().min(0),
    password: z.string().min(5),
    confPassword: z.string().min(5),
    email: z.string().email(),
})

const useAddClient = () => {

    const { modalAddClient, setmodalAddClient } = useModal()

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
        setmodalAddClient(false)
    });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(IValidProducSchema)
    })

    const clearModalndRefresh = () => {

        dispatcher(toggleRefreshClients())
        notify("success", "Creation de client réussi")
        reset({ facturation_adress: "", email: "", name: "", confPassword: "", password: "", })
        setmodalAddClient(false)
    }

    const requestCreateClient = async (data: Inputs) => {
        const clientAPI = new AuthAPI()
        try {
            if (data.confPassword === data.password) {
                let response = await clientAPI.create_user({
                    email: data.email, password: data.password,
                    facturation_adress: data.facturation_adress, name: data.name,
                },)
                if (response?.id) {
                    if (file.file) {
                        let sendImgResp = await clientAPI.retrieve_update_user(token, response?.id, { image: file.file })
                        if (sendImgResp?.id) {
                            clearModalndRefresh()
                        }
                    } else {
                        clearModalndRefresh()
                    }
                } else {
                    notify("error", "Oups une erreur est survenu. Veuillez bien revérifier vos informations.")
                }
            } else {
                notify("error", "Oups les mots de passes ne correspondent pas")
            }
        } catch (error) {
            console.log("error", error)
            notify("error", "Oups une erreur est survenu lors de la création du client")
        }

        // console.log("data", data)
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => requestCreateClient(data)

    return (
        {
            onSubmit, register, handleSubmit, ref, modalAddClient, setmodalAddClient, handleChange, file, errors
        }
    )
}

export default useAddClient