'use client'

import DashboardNav from '@/app/dashboard/DashboardNav'
import AddClientModal from '@/components/AddClientModal'
import AddFacturationModal from '@/components/AddFacturationModal'
import AddProductModal from '@/components/AddProductModal'
import EditClient from '@/components/EditClientModal'
import EditFacturation from '@/components/EditFacturationModal'

import LoadEntities from '@/ctx/LoadEntities'
import { RootModalProvider } from '@/ctx/modalsCtx'
import useAccountCtx from '@/utils/hooks/useAccountCtx'
import { useRouter } from 'next/navigation'

import React from 'react'
import DashNavMobile from './DashNavMobile'
import useModal from '@/utils/hooks/useModal'
import DashboardNavMobile from './DashboardNavMobile'

const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { mobNav, setmobNav } = useModal()
    const router = useRouter()
    const { token } = useAccountCtx()
    React.useEffect(() => {
        !Boolean(token.length) && router.push('/login')
    }, [token, router])

    return (
        <div className="bg-primary-variant">
            <RootModalProvider>
                <div className='flex relative h-screen'>
                    <DashboardNav />
                    <DashboardNavMobile />
                    <DashNavMobile />
                    <EditClient />
                    <AddClientModal />

                    <div id='dash_content' className="p-12 px-10 max-[1024px]:pt-[6rem] h-screen max-[10240px]:px-5 relative max-w-[1300px] overflow-y-scroll w-full">
                        {/* {
                            !Boolean(token.length) && <div className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-white" />
                        } */}
                        {children}
                    </div>
                </div>
            </RootModalProvider>
        </div>

    )
}

export default DashboardLayout