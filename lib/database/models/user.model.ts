
import mongoose, { Schema, model, models } from "mongoose";
import { IAuth } from "./auth.model";
import { ISave } from "./save.model";

export interface IUser extends Document {
    _id:string,
    authId:IAuth,
    username:string,
    photo:string,
    mobileNo:number, 
    createdAt:Date,
    AllSaved:ISave[]
}

const UserSchema=new Schema({
    authId:{type:mongoose.Schema.Types.ObjectId,ref:"Auth",required:true},
    username:{type:String,required:true,trim:true},
    photo:{type:String,default:"/assets/user1.png"},
    mobileNo:{type:Number},
    createdAt:{type:Date,default:Date.now()},
    AllSaved:[{type:Schema.Types.ObjectId,ref:"Save"}]
},{
    timestamps:true
  }
)

const User=models.User || model('User',UserSchema);

export default User;
