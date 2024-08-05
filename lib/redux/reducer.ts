

import {AnyAction} from 'redux'
import { NEWS, USER } from '../constants'

interface InitialStateParams {
    
}

const InitialState:InitialStateParams={
    currUser:null,
    currNews:null
} 

const reducer=(state=InitialState,action:AnyAction)=>{

    switch (action.type) {
        case USER:
            return {...state,currUser:action?.payload}
        case NEWS:
            return {...state,currNews:action?.payload}
        default:
            return state
    }
}

export default reducer;
