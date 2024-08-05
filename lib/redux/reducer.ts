

import {AnyAction} from 'redux'
import { ISLOADING, NEWS, USER } from '../constants'

interface InitialStateParams {
    
}

const InitialState:InitialStateParams={
    currUser:null,
    currNews:null,
    isLoading:false
} 

const reducer=(state=InitialState,action:AnyAction)=>{

    switch (action.type) {
        case USER:
            return {...state,currUser:action?.payload}
        case NEWS:
            return {...state,currNews:action?.payload}
        case ISLOADING:
            return {...state,isLoading:action?.payload}
        default:
            return state
    }
}

export default reducer;
