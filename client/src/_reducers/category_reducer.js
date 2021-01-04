import {
    CATEGORY_LIST, 
    FULL_LIST, 
    INCREASE_INDEX} from '../_actions/types';

export default function(state=[], action){
    switch(action.type){
        case CATEGORY_LIST:
            return [...action.payload];

        case FULL_LIST:
            return [...action.payload];
        
        case INCREASE_INDEX:
            return state.concat(action.payload)

        default:
            return state;
    }
}