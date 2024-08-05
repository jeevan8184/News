"use client"
import Loader from '@/components/auth/Loader';
import TrendingItem from '@/components/shared/TrendingItem';
import { getAllUserSaves } from '@/lib/database/actions/save.actions';
import { getCurrUser } from '@/lib/redux/actions';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Bookmark = () => {

  const currUser=useSelector((state:any)=> state.address.currUser);
  const dispatch=useDispatch();
  const [allTrending, setAllTrending] = useState<any>([]);

  useEffect(()=> {
    dispatch(getCurrUser());
  },[]);
  
  useEffect(()=> {
    const fetchData=async()=>{
      if(!currUser) return;
      try {
        const allSaved=await getAllUserSaves(currUser?._id);
        setAllTrending(allSaved);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[currUser])

  if(!currUser) return <Loader />

  console.log("Bookmark",allTrending);

  return (
    <div className=' py-20 max-sm:pt-0 px-2 md:px-4 pb-40'>
      <div className='flex flex-col gap-2 pt-6 '>
          <h1 className='font-semibold text-2xl text-gray-800'>Your Saved News</h1>
          <div className=' grid grid-cols-3 max-md:grid-cols-2 gap-4 max-sm:gap-2'>
              {allTrending.length > 0 ? (
              allTrending.map((trending:any, i:number) => (
                <div className="flex-shrink-0 h-full w-fit bg-white shadow-md rounded-lg overflow-hidden" key={i}>
                  <TrendingItem trending={trending.saved} />
                </div>
              ))
              ) : (
              <div className='flex items-center justify-center w-full h-32'>
                  <p className='text-gray-500'>No Saved News Available</p>
              </div>
              )}
          </div>
      </div>
    </div>
  )
}

export default Bookmark