"use client"
import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter, 
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import UserImg from '@/components/auth/UserImg'
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import Bookmark from '../Bookmark/page';
import { deleteUSer, updatePhoto } from '@/lib/database/actions/user.actions';
import { getCurrUser } from '@/lib/redux/actions';
import { useRouter } from 'next/navigation';
import Loader from '@/components/auth/Loader';


const UserProfile = () => {

  const currUser=useSelector((state:any)=> state.address.currUser);
  const isLoading=useSelector((state:any)=> state.address.isLoading);
  const dispatch=useDispatch();
  const router=useRouter();
  const [picVal, setPicVal] = useState(currUser?.photo);
  

  useEffect(()=> {
    dispatch(getCurrUser());
    setPicVal(currUser?.photo);
  },[]);

  const handleChange=async(value:string)=>{
    
    try {
      setPicVal(value);
      await updatePhoto(currUser?._id,value);
      dispatch(getCurrUser());
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout=()=>{
    deleteUSer();
    dispatch(getCurrUser());
    router.push("/SignIn");
  }

  if(isLoading) return <Loader />

  if(!currUser) {
    router.push("/SignIn");
  }
  
  return (
    <div className='pt-20 max-sm:pt-4 px-2'>
      <div className=' flex max-sm:flex-col gap-2 max-sm:gap-8'>
        <div className=' flex-center flex-col gap-3 w-full'>
          <UserImg value={picVal ? picVal : currUser?.photo} handleChange={handleChange} type="user" />
          <div className=' flex flex-col gap-1'>
            <p className=''><strong>username : </strong>{currUser?.username}</p>
            <p className=''><strong>mobileNo : </strong>{currUser?.mobileNo}</p>
            {currUser && (
              <p className=''><strong>loggedin At : </strong>{formatDistanceToNow(new Date(currUser?.createdAt),{ addSuffix: true })}</p>
            )}
            <AlertDialog>
              <AlertDialogTrigger className=' w-fit'>
                <p className=' text-red-500 flex-start px-6 py-1.5 rounded-md bg-red-500/10 w-fit overflow-hidden'>Logout</p>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want logout?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>logout</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className=' w-full'>
        </div>
      </div>
    </div>
  )
}

export default UserProfile