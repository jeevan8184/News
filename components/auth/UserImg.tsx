import Image from 'next/image';
import { ImageIcon, SaveIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useContext, useState } from 'react'
import {useDropzone} from 'react-dropzone';

const UserImg = ({value,handleChange,type}:{value:string,handleChange:(image:string)=>void,type?:"user"}) => {

    const [isUploading, setIsUploading] = useState(false);

    const onDrop=useCallback((acceptedFiles:any)=> {
      const reader=new FileReader();
      reader.onload=async()=>{
  
        try {
            setIsUploading(true);
            const response=await fetch('/api/upload',{
                method:'POST',
                body:reader?.result
            })
            const data=await response.json();
            handleChange(data);
        } catch (error) {
            console.log(error);
        }finally{
            setIsUploading(false);
        }
      }
      reader.readAsDataURL(acceptedFiles[0]);
    },[]);
  
    const {getRootProps,getInputProps}=useDropzone({
      onDrop,
      accept:{'image/*':[]},
      multiple:false,
    })
    
  return (
    <div className=' w-full h-full flex-center relative'>
      <div className=' w-fit'>
        {isUploading ? (
          <div className=' h-52 w-full flex-center'>
            <div className=' animate-spin flex-center h-7 w-7 flex-center'>
              <Image
                  src='/icons/loader.svg'
                  alt='loader'
                  layout='fill'
                  className=''
              />
            </div>
          </div>
          ):(
          <div className={`relative z-10 ${type ? " h-64 w-64 max-sm:h-52 max-sm:w-52":" h-52 w-52"}`}>
            <Image
              src={value}
              className='rounded-full bg-white'
              layout='fill'
              alt='image'
            />
          </div>
          )}
      </div>
      <div className=' absolute z-10 bottom-1 left-1/2 cursor-pointer'>
        <div {...getRootProps()} className='edit'>
          <input {...getInputProps()} />
            <div className=' flex gap-1 px-3 py-0.5 rounded-full bg-blue-500'>
              <ImageIcon className=' text-white size-5' />
              <p className=' text-white text-sm'>Edit</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserImg;