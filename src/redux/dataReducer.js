import { ADD_TO_BASKET, REMOVE_FROM_BASKET, SET_USER } from "./types"

const initialState = {
    basket: JSON.parse(localStorage.getItem('basket')) || [],
    user: null
}

export default function dataReducer(state=initialState, action) {
    if(action.type === ADD_TO_BASKET) {
        return {...state, basket: [...state.basket, action.payload]}
    } else if (action.type === REMOVE_FROM_BASKET) {
        return {...state, basket: state.basket.filter((el, index) => index !== action.payload)}
    } else if (action.type === SET_USER) {
        return {...state, user: action.payload}
    }

    return state
}