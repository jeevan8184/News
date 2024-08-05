"use server"

import mongoose from 'mongoose';

let cached=(global as any).mongoose || {conn:null,promise:null};
let url=process.env.MONGODB_URL

export const connectToDB=async()=>{

    try {
        if(cached.conn) return cached.conn;

        cached.promise=cached.promise || mongoose.connect(url || "",{dbName:'News'});
        
        cached.conn=await cached.promise;

        return cached.conn;
    } catch (error) {
        console.log(error);
    }
}

