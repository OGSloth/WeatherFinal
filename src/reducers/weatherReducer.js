import { FETCH_INFO, FETCH_FAILED, FETCH_SUCCESSED } from '../actions/types';

const initialState = {
    loading: false,
    success: null,
    weather: []
};

export default function(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case FETCH_INFO:
            return {
                ...state,
                loading: true,
                success: null,
            };
        case FETCH_FAILED:
            return {
                ...initialState,
                loading: false,
                success: false
            };
        case FETCH_SUCCESSED:
            return {
                ...state,
                loading: false,
                weather: action.payload,
                success: true
            };
        default:
            return state;
    }
}
