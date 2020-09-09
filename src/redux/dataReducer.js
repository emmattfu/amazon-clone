import { ADD_TO_BASKET } from "./types"

const initialState = {
    basket: []
}

export default function dataReducer(state=initialState, action) {
    if(action.type === ADD_TO_BASKET) {
        return {...state, basket: [...state.basket, action.payload]}
    }

    return state
}