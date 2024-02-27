"use client"
import { AuthAPI } from '@/APIs/AuthApi';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { ListUserSchema } from '../schemas/UserSchema';
import { refreshClients, toggleRefreshClients } from '@/redux/slices/clientSlice';
import useStoreData from './useStoreData';
import useAccountCtx from './useAccountCtx';

const usePullClients = () => {

    const userAPI = new AuthAPI()

    const { refreshingClients } = useStoreData()

    const { token } = useAccountCtx()
    const dispatcher = useDispatch()

    const FetchClients = async () => {
        const response = await userAPI.pull_clients(token)
        return response
    }
    const { data, refetch } = useQuery({
        queryKey: ['clientPull'],
        queryFn: FetchClients,
        enabled: Boolean(token),
    })
    
    React.useEffect(() => {

        const onFocus = () => {
            refetch()
        }
        window.addEventListener("focus", onFocus)

        return () => {
            window.removeEventListener("focus", onFocus)
        }
    }, [])

    React.useEffect(() => {
        if (refreshingClients) {
            refetch()
            dispatcher(toggleRefreshClients())
        }
    }, [refreshingClients])

    const validateClients = ListUserSchema.safeParse(data).success ? data : null;

    React.useEffect(() => {
        Boolean(validateClients) && dispatcher(refreshClients(validateClients))

    }, [validateClients])

    return;
}

export default usePullClients