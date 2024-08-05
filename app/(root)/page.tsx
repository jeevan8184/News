"use client"
import { getCurrUser } from "@/lib/redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Trending from "@/components/shared/Trending";
import TopHeadlines from "@/components/shared/TopHeadlines";
import Latest from "@/components/shared/Latest";
import SearchPage from "@/components/shared/SearchPage";
import Loader from "@/components/auth/Loader";
import { useRouter } from "next/navigation";

export default function Home() {

  const currUser=useSelector((state:any)=> state.address.currUser);
  const isLoading=useSelector((state:any)=> state.address.isLoading);
  const router=useRouter();

  const dispatch=useDispatch();

  useEffect(()=> {
    dispatch(getCurrUser());
  },[]);

  if(isLoading) return <Loader />

  if(!currUser) {
    router.push("/SignIn");
  }

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
