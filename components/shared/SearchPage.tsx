"use client"
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getCurrNews } from '@/lib/redux/actions';
import Loader from '../auth/Loader';

const SearchPageSuspense = () => {

    const [text, setText] = useState("");
    const searchParams=useSearchParams();
    const router=useRouter();
    const [isFocused, setIsFocused] = useState(false);
    const [searchResults, setSearchResults] = useState<any>([]);
    const dispatch=useDispatch();
  
    useEffect(()=> {
      const debounceFn=setTimeout(()=> {
        let newUrl="";
        if(text) {
          newUrl=formUrlQuery({
            params:searchParams.toString(),
            key:'query',
            value:text
          })
        }else{
          newUrl=removeKeysFromQuery({
            params:searchParams.toString(),
            keysToRemove:['query']
          })
        }
        router.push(newUrl,{scroll:false})
      },100)
  
      return ()=>clearTimeout(debounceFn);
    },[text,router,searchParams])

    useEffect(()=> {
        const fetchData=async()=>{
            if (!text) return;

            try {
            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                    q: text,
                    apiKey: process.env.NEXT_PUBLIC_API_KEY,
                    language: 'en', 
                },
            });

            setSearchResults(response.data.articles);
            } catch (error) {
                console.error(error);
                // toast.error('Something went wrong while fetching data.');
            }
        }
        fetchData();
    },[text])

    return (
        <div className="pt-16 px-2">
            <div className="flex justify-start w-full">
                <div className="border-2 border-blue-500 rounded-full max-w-lg w-full flex items-center relative pl-4">
                    {!text && <SearchIcon className="text-gray-600 w-5 h-5" />}
                    <Input
                        className="max-w-xl w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none pl-2 rounded-full"
                        placeholder="Search for news..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 500)}
                    />
                    {isFocused && searchResults.length > 0 && (
                        <div className="w-full max-sm:no-scrollbar absolute top-full left-0 px-2 max-h-[280px] overflow-auto bg-white shadow-md border-t border-t-gray-200 py-2 rounded-md z-40">
                            <div className="flex flex-col gap-2">
                                {searchResults.map((result:any, i:number) => (
                                    <div 
                                        key={i} 
                                        className={`${result.urlToImage ? " flex gap-2":" hidden"} cursor-pointer hover:bg-slate-50`}
                                        onClick={()=> {
                                            dispatch(getCurrNews(result));
                                            router.push(`/news?query=${encodeURIComponent(result.title.toLowerCase())}`);
                                        }}
                                    >
                                        <img
                                            src={result.urlToImage}
                                            alt='image'
                                            className=''
                                            height={80}
                                            width={80}
                                        />
                                        <p className=' text-sm line-clamp-2'>{result.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div 
                        className="p-2 bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-r-full"
                    >
                        <SearchIcon className="text-white size-6" />
                    </div>
                </div>
            </div>
        </div>
    );    
}

const SearchPage=()=>{
    return(
        <Suspense fallback={<Loader />}>
            <SearchPageSuspense />
        </Suspense>
    )
}


export default SearchPage

