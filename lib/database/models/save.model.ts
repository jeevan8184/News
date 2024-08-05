

import mongoose, { Schema, model, models } from "mongoose";

export interface ISave extends Document {
    _id:string,
    saved:any,
    title:string
}

const SaveSchema=new Schema({
    user:{type:Schema.Types.ObjectId,required:true},
    saved:{type:Schema.Types.Mixed,default:[]},
    title:{type:String,required:true}
})

const Save=models.Save || model('Save',SaveSchema);

export default Save;
