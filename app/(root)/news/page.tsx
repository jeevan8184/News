"use client";
import Loader from '@/components/auth/Loader';
import LatestItem from '@/components/shared/LatestItem';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { HistoryIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import {toast} from 'react-hot-toast';
import { useSelector } from 'react-redux';

const NewsPageSuspense = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("query");
  const [isLoading, setIsLoading] = useState(true);
  const [currNews, setCurrNews] = useState<any>();
  const [allTrending, setAllTrending] = useState<any>([]);
  const currNews1=useSelector((state:any)=> state.address.currNews);
  console.log("title", currNews1);

  useEffect(()=> {
    setCurrNews(currNews1);
  },[currNews1])

  useEffect(() => {
    const fetchData = async () => {
      if (!title) return;

      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: title,
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
          },
        });

        console.log("News response:", response.data);
        setCurrNews(currNews1===null ? response.data.articles[0]:currNews1);
        setAllTrending(response.data.articles);
        
        if(response.data.articles.length<2) {
            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                  q:"All",
                  apiKey:process.env.NEXT_PUBLIC_API_KEY,
                  language: 'en',
                  sortBy: 'relevancy',
                },
            });
            setAllTrending(response.data.articles);
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [title]);

  if (isLoading) return <Loader />

  if(!currNews) return;

  return (
    <div className='py-20 max-sm:pt-2 px-2 md:px-4 pb-40'>
     <div className=' flex flex-col gap-6 max-md:gap-4'>
        <div className=' flex flex-col gap-4 pt-2'>
            <h1 className=' text-2xl font-medium flex'>{currNews.title}</h1>
            <div className=' flex gap-4 max-md:flex-col'>
                <div className=' flex px-4 w-full'>
                    <img
                    src={currNews.urlToImage}
                    alt="News Image"
                    className="object-cover flex rounded-lg w-full h-full max-w-lg md:h-auto"
                    />
                </div>
                <div className=' flex flex-col max-md:flex-col w-full px-1'>
                    <p className=''>{currNews.content}</p>
                    <p className=' py-1'></p>
                    <p className=''>{currNews.description}</p>
                    <p className=' font-medium line-clamp-1 py-1'>-{currNews.author}</p>
                    {currNews?.publishedAt && (
                        <div className='flex items-center gap-2 text-gray-600 '>
                        <HistoryIcon className='h-5 w-5 text-gray-500' />
                        <p className='text-sm'>
                            {formatDistanceToNow(new Date(currNews?.publishedAt), { addSuffix: true })}
                        </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className=' flex flex-col gap-0'>
            <h1 className=' text-2xl font-medium'>Related News</h1>
            <div className=' flex flex-col gap-4'>
                {allTrending?.length>0 && allTrending?.map((trending:any,i:number)=> {

                if(isLoading) return <Loader />
                if(trending.urlToImage===null) return;
                if(currNews.title===trending.title) return;

                return(
                    <div className={`${trending?.urlToImage ? "":"hidden"}`}>
                    <LatestItem latestItem={trending} key={i} />
                    </div>
                )
                })}
            </div>
        </div>
     </div>
    </div>
  );
};


const NewsPage=()=>{
  return(
      <Suspense fallback={<Loader />}>
          <NewsPageSuspense />
      </Suspense>
  )
}

export default NewsPage;

