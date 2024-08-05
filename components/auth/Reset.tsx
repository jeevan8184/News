
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useEffect, useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { ResetPassValidity } from "@/lib/validations/validator";
  import { ResetPassInitVals } from "@/lib/constants";
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { EyeIcon, EyeOffIcon } from "lucide-react"
// import { AuthResetPass } from "@/lib/database/actions/auth.actions"
import { usePathname, useRouter } from "next/navigation";
import {toast} from 'react-hot-toast';
import { AuthResetPass } from "@/lib/database/actions/auth.actions"
import { useDispatch } from "react-redux"
import { getCurrUser } from "@/lib/redux/actions"

const ResetPass = ({newEmail}:{newEmail:string}) => {

    const [isShowPass, setIsShowPass] = useState(false);
    const [isShowPass1, setIsShowPass1] = useState(false);
    const [newError, setNewError] = useState("");
    const pathname=usePathname();
    const router=useRouter();
    const dispatch=useDispatch();

    useEffect(()=> {
        if(newError) {
            toast.error(newError);
        }
    },[newError]);

    const form = useForm<z.infer<typeof ResetPassValidity>>({
        resolver: zodResolver(ResetPassValidity),
        defaultValues:ResetPassInitVals
    })
    
     async function onSubmit(values: z.infer<typeof ResetPassValidity>) {

        try {
            const data=await AuthResetPass({
                password:values?.password,
                cpassword:values?.cpassword,
                path:pathname,
                email:newEmail
            });
            if(data?.error) {
                setNewError(data?.error);
                setTimeout(()=> {
                    setNewError("");
                },2000);
            }else{
                toast.success("password reset successful!.");
                dispatch(getCurrUser());
                router.back();
            }

        } catch (error) {
            console.log(error);
        }
    }

  return (
            <div className=' mx-auto mt-28 max-w-md max-md:px-8  max-sm:mx-2 border-2 pb-10 border-gray-200 bg-transparent rounded-xl px-10 py-8'>
                <div className=' mx-auto flex flex-col gap-6'>
                    <div className=' flex flex-col flex-1 gap-4'>
                        <h1 className=' text-4xl max-sm:text-3xl text-blue-500 font-bold flex-center'>News Website</h1>
                        <p className=' flex-center font-medium text-lg'>Welcome to News</p>
                        <div className=' flex flex-col flex-1 gap-0'>
                            <h1 className=' text-lg font-semibold'>Reset Password</h1>
                            <p className=' text-[15px] text-gray-800'>reset your password by entering a strong password</p>
                        </div>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className='flex-start flex-col gap-1'>
                                    <FormLabel className=' ml-1 text-black text-base'>password</FormLabel>
                                    <FormControl>
                                        <div className=' flex-between w-full border-2 border-orange-600 rounded-md pr-3'>
                                            <Input 
                                                type={isShowPass ? 'text':'password'} 
                                                placeholder="" {...field} 
                                                className='focus-visible:ring-0 focus-visible:ring-offset-0 border-none' 
                                            />
                                            {isShowPass ? (
                                                <EyeIcon className=' cursor-pointer'  onClick={()=> setIsShowPass((prev)=> !prev)} />
                                            ):(
                                                <EyeOffIcon className=' cursor-pointer'  onClick={()=> setIsShowPass((prev)=> !prev)}  />
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cpassword"
                            render={({ field }) => (
                                <FormItem className='flex-start flex-col gap-1'>
                                    <FormLabel className=' ml-1 text-black text-base'>password again</FormLabel>
                                    <FormControl>
                                        <div className=' flex-between w-full border-2 border-orange-600 rounded-md pr-3'>
                                            <Input 
                                                type={isShowPass1 ? 'text':'password'} 
                                                placeholder="" {...field} 
                                                className='focus-visible:ring-0 focus-visible:ring-offset-0 border-none' 
                                            />
                                            {isShowPass1 ? (
                                                <EyeIcon className=' cursor-pointer'  onClick={()=> setIsShowPass1((prev)=> !prev)} />
                                            ):(
                                                <EyeOffIcon className=' cursor-pointer'  onClick={()=> setIsShowPass1((prev)=> !prev)}  />
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            <div className=" flex flex-col gap-3">
                                <Button 
                                    disabled={form.formState.isSubmitting} 
                                    type="submit" 
                                    className=' w-full bg-orange-500 hover:bg-orange-500' 
                                >
                                    Reset
                                </Button>
                                <p className=" text-red-500 flex-center text-sm">{newError}</p>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
  )
}

export default ResetPass