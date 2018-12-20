import {FETCH_FAILED, FETCH_INFO, FETCH_SUCCESSED} from "./types";

/*
    Constance values required for API to work
 */

const KEY = "089f23f1ac7696521d2eee7d1bb22b0a";
const API = "https://api.openweathermap.org/data/2.5/forecast";

/*
    Application's main function, returns values from API and
    sends down to reducers and then to components.
 */
const getApiResponse = (endpoint, dispatch) => {
    dispatch({
        type: FETCH_INFO
    });
    try {
        fetch(endpoint)
            .then(function(response){
                if(!response.ok){
                    return null
                }
                return response.json()
            })
            .then(weather => {
                if (weather == null) {
                    dispatch({
                       type: FETCH_FAILED
                    });
                }
                else{
                    dispatch({
                        type: FETCH_SUCCESSED,
                        payload: weather
                    })
                }
            });
    }
    catch(err){
        dispatch({
            type: FETCH_FAILED
        })
    }
};

/*
    Some ancillary constance values for processing
    fetch request.
 */

const KEY_ID = '&appid=' + KEY;

export const getWeatherByName = name => dispatch => {
    const endpoint = API + '?q=' + name + KEY_ID;
    getApiResponse(endpoint, dispatch);
};

export const getWeatherByLocation = (lat, lon, dispatch) => {
    const endpoint = API + '?lat=' + lat
        + '&lon=' + lon + KEY_ID;
    console.log(endpoint);
    getApiResponse(endpoint, dispatch);
};