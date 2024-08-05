"use client"
import Loader from '@/components/auth/Loader';
import TrendingItem from '@/components/shared/TrendingItem';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'

const AllNewsSuspense = () => {

    const [allTrending, setAllTrending] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams=useSearchParams();
    const type=searchParams.get("type");

    useEffect(()=> {
        const fetchData=async()=>{
          if(!type) return;
          try {
            setIsLoading(true);
            const response = await axios.get(`https://newsapi.org/v2/everything`, {
              params: {
                q: type,
                apiKey: process.env.NEXT_PUBLIC_API_KEY,
              },
            });

            console.log("response",response.data);     
            setAllTrending(response.data.articles);
          } catch (error) {
            console.log(error);
          }finally{
            setIsLoading(false);
          }
        }
        fetchData();
    },[type])

    if(isLoading) return <Loader />
  return (
    <div className=' py-20 max-sm:pt-2 px-2 md:px-4 pb-40'>
        <div className='flex flex-col gap-2 pt-6 '>
            <h1 className='font-semibold text-2xl text-gray-800'>Top Trending News</h1>
            <div className=' grid grid-cols-3 max-md:grid-cols-2 gap-4 max-sm:gap-2'>
                {allTrending.length > 0 ? (
                allTrending.map((trending:any, i:number) => (
                    <div className={`${trending?.urlToImage ? "flex-shrink-0 h-full w-fit bg-white shadow-md rounded-lg overflow-hidden":" hidden"}`} key={i}>
                    {trending?.urlToImage && (
                        <TrendingItem trending={trending} />
                    )}
                    </div>
                ))
                ) : (
                <div className='flex items-center justify-center w-full h-32'>
                    <p className='text-gray-500'>No Trending News Available</p>
                </div>
                )}
            </div>
        </div>
    </div>
  )
}

const AllNews=()=>{
  return(
      <Suspense fallback={<Loader />}>
          <AllNewsSuspense />
      </Suspense>
  )
}

export default AllNews