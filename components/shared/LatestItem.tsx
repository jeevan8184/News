import { createSave, deleteSave } from '@/lib/database/actions/save.actions';
import { ISave } from '@/lib/database/models/save.model';
import { getCurrNews, getCurrUser } from '@/lib/redux/actions';
import { formatDistanceToNow } from 'date-fns';
import { BookmarkCheck, BookmarkIcon, HistoryIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LatestItem = ({ latestItem}:{latestItem:any}) => {

    const slug = encodeURIComponent(latestItem.title.toLowerCase());
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
      await createSave(latestItem.title,latestItem,currUser?._id);
      dispatch(getCurrUser());
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  if(!currUser) return;

  const isMarked=currUser.AllSaved.find((saved:ISave)=> saved.title===latestItem.title);

  return (
    <div className=' w-full h-auto hover:shadow-md rounded-lg overflow-hidden'>
      <div className='flex flex-col sm:flex-row p-4 gap-4'>
        <div className=' relative w-full md:w-1/2 max-w-sm h-60 md:h-auto'>
          <img
            src={latestItem.urlToImage}
            alt="News Image"
            onClick={()=> {
              dispatch(getCurrNews(latestItem));
              router.push(`/news?query=${slug}`);
            }}
            className="object-cover cursor-pointer rounded-lg  md:h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
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
        <div className='flex flex-col w-full sm:w-1/2'>
          <h2 
            className='text-lg font-semibold mb-2 cursor-pointer' 
            onClick={()=> {
                dispatch(getCurrNews(latestItem));
                router.push(`/news?query=${slug}`);
            }}
           >
                {latestItem.title}
            </h2>
          <p className=''>{latestItem.description}</p>
          <p className=' font-medium line-clamp-1 py-1'>-{latestItem.author}</p>
          {latestItem?.publishedAt && (
            <div className='flex items-center gap-2 text-gray-600 '>
              <HistoryIcon className='h-5 w-5 text-gray-500' />
              <p className='text-sm'>
                {formatDistanceToNow(new Date(latestItem?.publishedAt), { addSuffix: true })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestItem;
