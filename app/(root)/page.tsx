"use client"
import { getCurrUser } from "@/lib/redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Trending from "@/components/shared/Trending";
import TopHeadlines from "@/components/shared/TopHeadlines";
import Latest from "@/components/shared/Latest";
import SearchPage from "@/components/shared/SearchPage";

export default function Home() {

  const currUser=useSelector((state:any)=> state.address.currUser);
  const dispatch=useDispatch();

  useEffect(()=> {
    dispatch(getCurrUser());
  },[]);

  console.log("curruser",currUser);
  

  return (
    <div className=" py-20 max-sm:pt-2 px-2 md:px-4 pb-40">
      <div className=" flex flex-col gap-0">
        <Trending />
        <TopHeadlines />
        <SearchPage />
        <Latest />
      </div>
    </div>
  );
}
