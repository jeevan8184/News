import { BookmarkCheck, BookmarkIcon, HistoryIcon } from 'lucide-react'
import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import { getCurrNews, getCurrUser } from '@/lib/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ISave } from '@/lib/database/models/save.model';
import Image from 'next/image';
import { createSave, deleteSave } from '@/lib/database/actions/save.actions';

const TrendingItem = ({trending}:{trending:any}) => {

  const slug = encodeURIComponent(trending.title.toLowerCase());
  const router=useRouter();
  const dispatch=useDispatch();
  const currUser=useSelector((state:any)=> state.address.currUser);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave1=async(id:string)=>{

    try {
      setIsLoading(true);
      await deleteSave(currUser._id,id);
      dispatch(getCurrUser());
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  const handleSave2=async()=>{

    try {
      setIsLoading(true);
      await createSave(trending.title,trending,currUser?._id);
      dispatch(getCurrUser());
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  if(!currUser) return;

  const isMarked=currUser.AllSaved.find((saved:ISave)=> saved.title===trending.title);

  return (
    <div className=' max-w-96 w-full h-full hover:shadow-md overflow-hidden'>
        <div className=' flex flex-col gap-2'>
          <div className="relative w-full h-48 overflow-hidden rounded-xl bg-gray-200">
            <img
              src={trending.urlToImage}
              alt="News Image"
              className="object-cover w-full h-full cursor-pointer"
              onClick={()=> {
                dispatch(getCurrNews(trending));
                router.push(`/news?query=${slug}`);
              }}
            />
            {isMarked ? (
              <div className=' absolute top-1 right-1 z-20 bg-white p-1 cursor-pointer rounded-full'>
                {isLoading ? (
                  <div className=' animate-spin flex-center'>
                    <Image
                      src='/icons/loader.svg'
                      alt='loader'
                      height={24}
                      width={24}
                      className=''
                    />
                  </div>
                ):(
                  <BookmarkCheck className=' size-6' onClick={()=>handleSave1(isMarked._id)} />
                )}
              </div>
            ):(
              <div className=' absolute top-1 right-1 z-20 bg-white p-1 cursor-pointer rounded-full'>
                 {isLoading ? (
                  <div className=' animate-spin flex-center'>
                    <Image
                      src='/icons/loader.svg'
                      alt='loader'
                      height={24}
                      width={24}
                      className=''
                    />
                  </div>
                ):(
                  <BookmarkIcon className=' size-6' onClick={handleSave2} />
                )}
              </div>
            )}
          </div>
          <div className=' flex flex-col'>
            <p 
              className=' font-medium line-clamp-2 cursor-pointer'           
              onClick={()=> {
                dispatch(getCurrNews(trending));
                router.push(`/news?query=${slug}`);
              }}
            >
              {trending.title}
            </p>
            {trending?.publishedAt && (
              <div className=' flex gap-1 text-gray-500'>
                <HistoryIcon className=' size-5' />
                <p className=''>{trending?.publishedAt ? formatDistanceToNow(new Date(trending?.publishedAt), { addSuffix: true }) : ''}</p>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default TrendingItem
