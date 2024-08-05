
"use server"

import { connectToDB } from "..";
import Save from "../models/save.model";
import User from "../models/user.model";

export const createSave=async(title:string,data:any,id:string)=>{

    try {
        await connectToDB();
        const newSave=await Save.create({title,saved:data,user:id});
        await User.updateOne({_id:id},{$push:{AllSaved:newSave._id}});
        
        return JSON.parse(JSON.stringify(newSave));
    } catch (error) {
        console.log(error);
    }
}

export const deleteSave=async(id:string,saveId:string)=>{

    try {
        await connectToDB();
        const existSave=await Save.findByIdAndDelete(saveId);
        await User.updateOne({_id:id},{$pull:{AllSaved:existSave._id}});

        return JSON.parse(JSON.stringify(existSave));
    } catch (error) {
        console.log(error);
    }
}

export const getAllUserSaves=async(id:string)=>{

    try {
        await connectToDB();
        const existSaves=await Save.find({user:id});

        return JSON.parse(JSON.stringify(existSaves));
    } catch (error) {
        console.log(error);
    }
}
