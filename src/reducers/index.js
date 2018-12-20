import { combineReducers } from 'redux';
import geolocationReducer from './geolocationReducer';
import weatherReducer from './weatherReducer';

export default combineReducers({
  location: geolocationReducer,
  weather: weatherReducer,
});
