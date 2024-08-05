import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'query-string'
import { formUrlParams, RemoveUrlQueryParams } from "./constants/types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const removeKeysFromQuery=({params,keysToRemove}:RemoveUrlQueryParams)=> {

  let currentUrl=qs.parse(params);

  keysToRemove.forEach((key)=> (
    delete currentUrl[key]
  ))

  return qs.stringifyUrl(
    {
      url:window.location.pathname,
      query:currentUrl
    },
    {skipNull:true}
  )
}

export const formUrlQuery=({params,key,value}:formUrlParams)=> {

  let currentUrl=qs.parse(params);
  currentUrl[key]=value;

  return qs.stringifyUrl(
    {
      url:window.location.pathname,
      query:currentUrl
    },
    {skipNull:true}
  )
}