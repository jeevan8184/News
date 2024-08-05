import React, { Suspense, useEffect } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from '../ui/button';
import {toast} from 'react-hot-toast';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ProfileForm } from '@/lib/validations/validator';
import UserImg from './UserImg';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/lib/database/actions/user.actions';
import { getCurrUser } from '@/lib/redux/actions';
import { IUser } from '@/lib/database/models/user.model';
import Loader from './Loader';

const ProfilePageSuspense = () => {

    const searchParams=useSearchParams();
    const dispatch=useDispatch();
    const name=searchParams.get("name");
    const currUser:IUser=useSelector((state:any)=> state.address.currUser);

    console.log("currUser",currUser);

    useEffect(()=> {
      dispatch(getCurrUser());
    },[]);

    const ProfileInitVals={
        username:name || "",
        photo:'/icons/user1.png',
        mobileNo:''
    }

    const form = useForm<z.infer<typeof ProfileForm>>({
        resolver: zodResolver(ProfileForm),
        defaultValues:ProfileInitVals
    })

    const router=useRouter();
    const pathname=usePathname();


    async function onSubmit(values:z.infer<typeof ProfileForm>) {

        console.log("values",values);
        const data=await updateUser({
            photo:values.photo,
            id:currUser._id,
            username:values.username,
            path:pathname,
            mobileNo:Number(values.mobileNo)
        })
        if(data) {
            dispatch(getCurrUser());
            router.push("/");
        }
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3 text-black">
            <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                    <FormItem className='flex-start flex-col'>
                        <FormLabel className=' ml-1 text-black'>upload photo</FormLabel>
                        <FormControl>
                            <UserImg value={field.value} handleChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem className='flex-start flex-col'>
                        <FormLabel className=' ml-1 text-black'>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="Example" {...field} className=' border focus-visible:ring-0 focus-visible:ring-offset-0 border-gray-600' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="mobileNo"
                render={({ field }) => (
                    <FormItem className='flex-start flex-col'>
                        <FormLabel className=' ml-1 text-black'>Mobile No</FormLabel>
                        <FormControl>
                            <Input type='number' placeholder="+91 0000000000" {...field} className=' border focus-visible:ring-0 focus-visible:ring-offset-0 border-gray-600' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className=' pt-10'>
                <Button 
                    type="submit" 
                    className=' flex-start px-8 rounded-xl text-white bg-blue-500/100 active:bg-blue-600/50 w-full' 
                    variant={null}
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? "submitting":"submit"}
                </Button>        
            </div>
            </form>
    </Form>
  )
}

const ProfilePage=()=>{
    return(
        <Suspense fallback={<Loader />}>
            <ProfilePageSuspense />
        </Suspense>
    )
}

export default ProfilePage

