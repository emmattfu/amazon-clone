import {ADD_TO_BASKET, REMOVE_FROM_BASKET, SET_USER} from './types'

export function addToBasket (product) {
    return {type: ADD_TO_BASKET, payload: product}
}

export function removeFromBasket(index) {
    return {type: REMOVE_FROM_BASKET, payload: index}
}

export function setUser(user) {
    return {type: SET_USER, payload: user}
}