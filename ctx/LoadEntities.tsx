import usePullClients from '@/utils/hooks/usePullClients'
import usePullEmployments from '@/utils/hooks/usePullEmployments'
import usePullSubmitEmployments from '@/utils/hooks/usePullSubmitEmployments'
import React from 'react'

const LoadEntities = ({
    children,
}: {
    children: React.ReactNode
}) => {
    // usePullClients()
    usePullEmployments()
    usePullSubmitEmployments()

    return (
        <>
            {
                children
            }
        </>
    )
}

export default LoadEntities