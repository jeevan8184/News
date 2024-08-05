
import { Dispatch } from "redux";
import { USER,NEWS, ISLOADING } from "../constants";
import { getUser } from "../database/actions/user.actions";
interface NewsAction {
    type:typeof NEWS,
    payload:any
}

interface UserAction {
    type:typeof USER,
    payload:any
}
interface IsLoadingAction {
    type: typeof ISLOADING;
    payload: boolean;
}

export const getCurrUser=():any=>async(dispatch:Dispatch<UserAction | IsLoadingAction>)=>{

    try {
        const data=await getUser();
        dispatch({type:ISLOADING,payload:true});
        dispatch({type:USER,payload:data});
        dispatch({type:ISLOADING,payload:false});
    } catch (error) {
        console.log(error);
    }
}

export const getCurrNews=(data:any):any=>(dispatch:Dispatch<NewsAction>)=>{
    console.log("data");
    dispatch({type:NEWS,payload:data});
}
