"use client"
import { NavItems1 } from '@/lib/constants';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';


const Navbar = () => {
    const pathname=usePathname();
    const router=useRouter();
    const currUser=useSelector((state:any)=> state.address.currUser);


  return (
    <div className=' w-full bg-white overflow-hidden max-w-6xl shadow-sm max-md:shadow-none fixed max-sm:static max-sm:py-4 top-0 px-2 py-4 max-sm:p-1 max-sm:px-4 xl:px-8 z-50'>
        <div className=' flex-between'>
            <h1 className=' text-blue-500 font-semibold text-3xl cursor-pointer' onClick={()=> router.push("/")}>News Website</h1>
            <div className=' flex-between gap-12 max-md:hidden pr-4'>
                {NavItems1.map(({Icon,label,path},i)=> {
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
    </div>
  )
}

export default Navbar
