
import { Dispatch } from "redux";
import { USER,NEWS } from "../constants";
import { getUser } from "../database/actions/user.actions";

interface UserAction {
    type:typeof USER,
    payload:any
}

interface NewsAction {
    type:typeof NEWS,
    payload:any
}

export const getCurrUser=():any=>async(dispatch:Dispatch<UserAction>)=>{

    try {
        const data=await getUser();
        dispatch({type:USER,payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const getCurrNews=(data:any):any=>(dispatch:Dispatch<NewsAction>)=>{
    console.log("data");
    dispatch({type:NEWS,payload:data});
}
