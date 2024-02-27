import { AuthAPI } from '@/APIs/AuthApi'
import React from 'react'
import useAccountCtx from './useAccountCtx'
import { useQuery } from '@tanstack/react-query'
import { UserSchema } from '../schemas/UserSchema'

const usePullAccountProfile = () => {

    const userAPI = new AuthAPI()
    const { token } = useAccountCtx()
    // 
    const FetchProfile = async () => {
        console.log("token", token)
        const response = await userAPI.retrive_me__account(token)
        return response
    }
    const { data, refetch } = useQuery({
        queryKey: ['accountPull', token],
        queryFn: FetchProfile,
        enabled: Boolean(token?.length) ? true : false,
    })

    // React.useEffect(() => {
    //     if (refreshingClients) {
    //         refetch()
    //         dispatcher(toggleRefreshClients())
    //     }
    // }, [refreshingClients])

    const validateAccount = UserSchema.safeParse(data).success ? data : {};

    React.useEffect(() => {
        Boolean(validateAccount) && console.log("Validate", validateAccount)
    }, [validateAccount])

    return;
}

export default usePullAccountProfile