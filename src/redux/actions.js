import {ADD_TO_BASKET} from './types'

export function addToBasket (product) {
    return {type: ADD_TO_BASKET, payload: product}
}