import { AccountContext } from '@/ctx/AccountContext'
import React from 'react'

const useAccountCtx = () => {
    const accountCOntext = React.useContext(AccountContext)
    const ctx = accountCOntext
    return (
        {
            ...ctx
        }
    )
}

export default useAccountCtx