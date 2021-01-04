import {
    ADULT_PRICE, 
    TEENAGER_PRICE, 
    CHILD_PRICE, 
    RESERVATION,
    CANCEL_RESERVATION} from '../_actions/types';

const price = {
    child: 0,
    teenager: 0,
    adult: 0
};

export default function(state=price, action){
    
    const {child, teenager, adult} = state;
    
    switch(action.type){
        case ADULT_PRICE:
            return {...state, adult: adult + action.payload}

        case TEENAGER_PRICE:
            return {...state, teenager: teenager + action.payload}    
        
        case CHILD_PRICE:
            return {...state, child: child + action.payload}
        
        case RESERVATION:
            return {... state, reservationData: action.payload}

        case CANCEL_RESERVATION:
            return {...state, reservationUpdate: action.payload}
        
        default:
            return state;
    }
}