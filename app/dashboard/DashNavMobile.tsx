import useModal from '@/utils/hooks/useModal'
import Link from 'next/link'
import React from 'react'
import { IoMenu } from 'react-icons/io5'

const DashNavMobile = () => {
    const { mobNav, setmobNav } = useModal()
    return (
        <div className="min-[1025px]:hidden fixed flex items-center justify-between w-full p-8 py-5 top-0 z-[40]  bg-white">
            <Link href="/" className="bebase_regular text-[2rem] text-[var(--variant-primary)]">HireTop</Link>
            <div
                onClick={() => setmobNav(!mobNav)}
                className="active:scale-95 transition-all rounded-full w-fit bg-[var(--variant-primary)] text-white p-2">
                <IoMenu />
            </div>
        </div>
    )
}

export default DashNavMobile