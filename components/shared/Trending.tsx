import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../auth/Loader';
import TrendingItem from './TrendingItem';
import { useRouter } from 'next/navigation';

const Trending = () => {

    const [allTrending, setAllTrending] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router=useRouter();

    useEffect(()=> {
        const fetchData=async()=>{
          try {
            setIsLoading(true);
            const response = await axios.get(`https://newsapi.org/v2/everything`, {
              params: {
                q: 'trending',
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
    },[])

    if(isLoading) return <Loader />

  return (
    <div className='flex flex-col gap-2 pt-6'>
      <h1 className='font-semibold text-2xl text-gray-800'>Top Trending News</h1>
      <div className='relative flex w-full overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar items-center'>
        {allTrending.length > 0 ? (
          allTrending.map((trending:any, i:number) => (
            <div className={`snap-center ${trending?.urlToImage ? "flex-shrink-0 h-full w-fit bg-white shadow-md rounded-lg overflow-hidden":" hidden"}`} key={i}>
              {i<10 && trending?.urlToImage && (
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
      <p className=' flex-end text-blue-500 font-medium cursor-pointer' onClick={()=> router.push("/AllNews?type=trending")}>View All</p>
    </div>
  
  )
}

export default Trending
