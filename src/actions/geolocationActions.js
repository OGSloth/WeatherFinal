import {GET_LOCATION, GET_LOCATION_FAILED} from "./types";
import {getWeatherByLocation} from "./weatherActions";

/*
    In case it fails it will send null values to weatherAction, so
    once again catching error does not change much. Perhaps if
    geolocation's API gets broken it might be useful.
 */

export const findLocation = () => dispatch => {
    try {
        const geolocation = navigator.geolocation;
        geolocation.getCurrentPosition(position => {
            if (position.coords != null) {
                console.log(position.coords);
                dispatch({
                    type: GET_LOCATION
                });
                getWeatherByLocation(
                    position.coords.latitude.toFixed(4),
                    position.coords.longitude.toFixed(4),
                    dispatch
                );
            }
            else {
                dispatch({
                    type: GET_LOCATION_FAILED,
                });
            }
        });
    }
    catch(err){
        dispatch({
            type: GET_LOCATION_FAILED,
        })
    }
};