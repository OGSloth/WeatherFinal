/*
    NodeJS does not allow me to install reselect
 */

//import { createselector } from 'reselect';

//const weatherSelector = state => state.weather.weather;

const avarageTemperature = state => {
    let temp_sum = 0;
    state.weather.weather.list.map(temp => temp_sum += temp.main.temp - 273.15);
    const avg = temp_sum / state.weather.weather.list.length;
    return avg.toFixed(2);
};

const minTemperature = state => {
    let min_temp = Number.MAX_VALUE;
    state.weather.weather.list.map(temp_min =>
        min_temp = Math.min(min_temp, temp_min.main.temp_min - 273.15));
    return Math.round(min_temp);
};

const maxTemperature = state => {
    let max_temp = Number.MIN_VALUE;
    state.weather.weather.list.map(temp_max =>
        max_temp = Math.max(max_temp, temp_max.main.temp_max - 273.15));
    return Math.round(max_temp);
};

const snowProbability = state => {
    let snowyDays = 0;
    state.weather.weather.list.map(info => snowyDays += info.weather[0].description.includes("snow"));
    return snowyDays / state.weather.weather.list.length;
};

const rainProbability = state => {
    let rainyDays = 0;
    state.weather.weather.list.map(info => rainyDays += info.weather[0].description.includes("rain"));
    return rainyDays / state.weather.weather.list.length;
};

const EXTREME = "EXTREME";
const COLD = "cold";
const NICE = "nice temperature";
const HOT = "hot";
const MILD = "mild";
const WARM = "warm";
const CHILL = "chill temperature";

const temperatureRating = state => {
    const min_temp = minTemperature(state);
    const max_temp = maxTemperature(state);
    const avg_temp = avarageTemperature(state);
    if(max_temp - min_temp > 20)
        return EXTREME;
    else if(avg_temp < -10)
        return COLD;
    else if(avg_temp > 30)
        return HOT;
    else if(avg_temp < 4)
        return CHILL;
    else if(avg_temp < 15)
        return MILD;
    else if(avg_temp > 20)
        return WARM;
    return NICE;
};

const HEAVY_RAIN = "raining heavy";
const RAINY = "rainy";
const NORMAL = "normal";
const SNOWY = "snowy";
const HEAVY_SNOW = "snowing heavy";
const SNOW_WITH_RAIN = "snowing and raining";

const precipitationRating = state => {
    const snow_prob = snowProbability(state);
    const rain_prob = rainProbability(state);
    if(snow_prob > 0.5)
        return HEAVY_SNOW;
    else if(rain_prob > 0.5)
        return HEAVY_RAIN;
    else if(rain_prob > 0.25 && snow_prob > 0.25)
        return SNOW_WITH_RAIN;
    else if(rain_prob > snow_prob && rain_prob > 0.25)
        return RAINY;
    else if(snow_prob > rain_prob && rain_prob > 0.25)
        return SNOWY;
    return NORMAL;
};

const weatherRating = state => {
    const temp = temperatureRating(state);
    const precip = precipitationRating(state);
    if(temp === EXTREME){
        return "The temperature is changing all the tame, take jacket and hoodie";
    }
    return "It is going to be " + precip + " and " + temp;
};

export const weatherSelectorInformation = state => {
    if (state.weather.weather.list !== undefined) {
        return {
            complete: true,
            avg_temp: avarageTemperature(state),
            min_temp: minTemperature(state),
            max_temp: maxTemperature(state),
            snow_prob: snowProbability(state),
            rainy_prob: rainProbability(state),
            description: weatherRating(state),
        };
    }
    return {
        complete: false,
        avg_temp: 0,
        min_temp: 0,
        max_temp: 0,
        snow_prob: 0,
        rainy_prob: 0,
        description: '',
    }
};

