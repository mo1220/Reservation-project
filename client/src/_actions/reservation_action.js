import {
    ADULT_PRICE,
    TEENAGER_PRICE,
    CHILD_PRICE,
    RESERVATION,
    CANCEL_RESERVATION
} from './types';
import Axios from 'axios';

export function AdultPlusPrice(price) {

    return {
        type: ADULT_PRICE,
        payload: price
    }

}

export function AdultMinusPrice(price) {

    return {
        type: ADULT_PRICE,
        payload: -price
    }

}

export function TeenagerPlusPrice(price) {

    return {
        type: TEENAGER_PRICE,
        payload: price
    }

}
export function TeenagerMinusPrice(price) {

    return {
        type: TEENAGER_PRICE,
        payload: -price
    }

}

export function ChildPlusPrice(price) {

    return {
        type: CHILD_PRICE,
        payload: price
    }

}
export function ChildMinusPrice(price) {

    return {
        type: CHILD_PRICE,
        payload: -price
    }

}

export function reservation(params) {
    const request = Axios.post('/api/reservations/reservation', params)
        .then(response => response.data);
    return {
        type: RESERVATION,
        payload: request
    }
}

export function cancelReservation(id) {
    const request = Axios.post('/api/reservations/cancel', id).then(response => response.data);

    return {
        type: CANCEL_RESERVATION,
        payload: request
    }
}