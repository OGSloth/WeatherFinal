import { GET_LOCATION, GET_LOCATION_FAILED } from '../actions/types';

const initialState = {
    loc: null
};

/*
    After receiving information about fetching success status,
    information about location being found or not is processed
    by weatherReducer. This function is redundant after all. :(
 */

export default function(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case GET_LOCATION:
            return {...state,
                loc:true
            };
        case GET_LOCATION_FAILED:
            return {...state,
                loc:false
        };
        default:
            return state;
    }
}