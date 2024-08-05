import { LatestItems } from '@/lib/constants'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TrendingItem from './TrendingItem';
import Loader from '../auth/Loader';
import LatestItem from './LatestItem';

const Latest = () => {
    const [queryType, setQueryType] = useState("All");

    const [allTrending, setAllTrending] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        const fetchData=async()=>{
          try {
            setIsLoading(true);

            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                  q:queryType,
                  apiKey:process.env.NEXT_PUBLIC_API_KEY,
                  language: 'en',
                  sortBy: 'relevancy',
                },
              });

            console.log("latest",response.data.articles);

            setAllTrending(response.data.articles);
          } catch (error) {
            console.log(error);
          }finally{
            setIsLoading(false);
          }
        }
        fetchData();
    },[queryType]);


  return (
    <div className=' flex flex-col gap-6 pt-8'>
        <div className=' flex flex-col gap-2'>
            <h1 className=' text-xl font-medium'>Latest</h1>
            <div className=' flex gap-4 relative overflow-x-auto w-full no-scrollbar md:gap-6'>
                {LatestItems.map(({label},i)=> (
                    <div className={`${queryType===label ? " text-blue-500 font-bold":""} font-medium cursor-pointer`} key={i} onClick={()=> setQueryType(label)}>
                        {label}
                    </div>
                ))}
            </div>
        </div>
        <div className=' flex flex-col gap-4'>
            {allTrending?.length>0 && allTrending?.map((trending:any,i:number)=> {

              if(isLoading) return <Loader />
              if(trending.urlToImage===null) return;
              return(
                <div className={`${trending?.urlToImage ? "":"hidden"}`} key={i}>
                  <LatestItem latestItem={trending} key={i} />
                </div>
              )
            })}
        </div>
    </div>
  )
}

export default Latest
