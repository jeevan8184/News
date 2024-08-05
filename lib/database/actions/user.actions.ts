
"use server"

import { createUserParams, updateUserParams} from "@/lib/constants/types";
import { connectToDB } from "..";
import User from "../models/user.model";
import { cache } from "react";
import { deleteSession, verifySession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import Save from "../models/save.model";

export const createUser=cache(async({username,authId}:createUserParams)=>{

    try {
        await connectToDB();
        const newUser=await User.create({username,authId});
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.log(error);
    }
})

export const getUser=cache(async()=>{
    const session=await verifySession();

    try {
        await connectToDB();
        if(!session?.authId) return null;
        const existUser=await User.findOne({authId:session?.authId})
            .populate({
                path:"AllSaved",
                model:Save,
                populate:"title"
            })

        revalidatePath("/");
        return JSON.parse(JSON.stringify(existUser));    
    } catch (error) {
        console.log(error);
    }
})

export const updateUser=async({photo,id,path,mobileNo,username}:updateUserParams)=>{
    
    try {
        await connectToDB();
        const existUser=await User.findByIdAndUpdate(id,
            {
                photo,mobileNo,username
            },
            {new:true}
        );

        revalidatePath(path);
        return JSON.parse(JSON.stringify(existUser));
    } catch (error) {
        console.log(error);
    }
}

export const updatePhoto=async(id:string,photo:string)=>{

    try {
        await connectToDB();
        const existUser=await User.findByIdAndUpdate(id,{photo},{new:true});
        return JSON.parse(JSON.stringify(existUser));
    } catch (error) {
        console.log(error);
    }
}

export const deleteUSer=()=>{
    deleteSession();
}
