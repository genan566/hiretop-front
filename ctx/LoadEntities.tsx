import usePullClients from '@/utils/hooks/usePullClients'
import usePullEmployments from '@/utils/hooks/usePullEmployments'
import React from 'react'

const LoadEntities = ({
    children,
}: {
    children: React.ReactNode
}) => {
    // usePullClients()
    usePullEmployments()

    return (
        <>
            {
                children
            }
        </>
    )
}

export default LoadEntities