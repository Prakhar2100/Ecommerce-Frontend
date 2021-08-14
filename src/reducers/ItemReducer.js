import { ITEMS_FAILURE, ITEMS_REQUEST, ITEMS_SUCCESS, ITEM_FAILURE, ITEM_REQUEST, ITEM_SUCCESS } from "../constants/ItemConst";

export const itemsReducer = (state = {loading: true, items: []}, action) => {
    switch(action.type) {
        case ITEMS_REQUEST:
            return{loading: true};
        case ITEMS_SUCCESS:
            return{loading: false, items: action.payload};
        case ITEMS_FAILURE:
            return{loading: false, error: action.payload};
        default: return state;
    }
}

export const itemReducer = (state = {loading: true, item: []}, action) => {
    switch(action.type) {
        case ITEM_REQUEST:
            return {loading: true};
        case ITEM_SUCCESS:
            return {loading: false, item: action.payload};
        case ITEM_FAILURE:
            return {loading: false, error: action.payload};
        default: return state
    }
}