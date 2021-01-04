import Axios from 'axios';
import {CATEGORY_LIST, INCREASE_INDEX, FULL_LIST} from './types';
import {BASE_URL} from '../components/Config';



export function categoryList (id) {
    const request = Axios.get(`${BASE_URL}/api/products?categoryId=${id}&start=0`)
    .then(response => response.data.items);

    return {
        type: CATEGORY_LIST,
        payload: request
    }
    
}

export function fullList () {
    const request = Axios.get(`${BASE_URL}/api/products/?start=0`)
    .then(response => response.data.items);

    return {
        type: FULL_LIST,
        payload: request
    }
}

export function increaseIndex_full(index){
    const request = Axios.get(`${BASE_URL}/api/products/?start=${index}`)
    .then(response => response.data.items);

    return {
        type: INCREASE_INDEX,
        payload: request
    }
}

export function increaseIndex (id, index){
    const request = Axios.get(`${BASE_URL}/api/products?categoryId=${id}&start=${index}`)
        .then(response => response.data.items);

    return {
        type: INCREASE_INDEX,
        payload: request
    }
}
