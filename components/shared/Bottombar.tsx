"use client"
import { NavItems } from '@/lib/constants'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

const Bottombar = () => {

    const router=useRouter();
    const pathname=usePathname();
    const currUser=useSelector((state:any)=> state.address.currUser);


  return (
    <div className=' fixed bottom-0 border px-4 py-1 w-full bg-slate-100 overflow-hidden md:hidden'>
        <div className=' flex-between'>
            {NavItems.map(({Icon,label,path},i)=> {
                const isActive=pathname===path;

                return (
                    <div className=' flex-center flex-col gap-0 cursor-pointer' onClick={()=> router.push(path)} key={i}>
                        <Icon className={`${isActive ? ' text-blue-500':''}  size-5`} />
                        <p className={` text-sm ${isActive ? ' text-blue-500':''}`}>{label==='Profile' ? currUser?.username:label}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Bottombar
