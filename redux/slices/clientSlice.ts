import { ListUserType } from '@/utils/schemas/UserSchema'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { z } from 'zod'

export interface ClientsSlice {
    clients: ListUserType,
    refreshingClients: boolean
}

const initialState: ClientsSlice = {
    clients: [],
    refreshingClients: false
}

export const ClientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        refreshClients: (state, action: PayloadAction<ListUserType>) => {
            state.clients = action.payload
        },
        clearClients: (state) => {
            state.clients = []
        },
        toggleRefreshClients: (state) => {
            state.refreshingClients = !state.refreshingClients
        },
    },
})

// Action creators are generated for each case reducer function
export const { refreshClients, clearClients, toggleRefreshClients } = ClientsSlice.actions

export default ClientsSlice.reducer