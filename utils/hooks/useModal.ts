import { RootModalsContext } from '@/ctx/modalsCtx'
import React from 'react'

const useModal = () => {

    const modalContext = React.useContext(RootModalsContext)
    const ctx = modalContext

    return {
        ...ctx
    }
}

export default useModal