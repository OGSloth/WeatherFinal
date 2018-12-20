import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import LongtermInfrormation from './longtermInfrormation';

class WeatherTable extends Component {
    render() {
        const weatherInformation = this.props.weather.map(info => (
            <div key={info.dt}>
                <h2>{info.dt_txt}</h2>
                <div>
                    <h3>Temperature Information:</h3>
                    <ul>
                        <li>Avarage: { Math.round(info.main.temp - 273.15) }°C</li>
                        <li>Min: { Math.round(info.main.temp_min - 273.15) }°C</li>
                        <li>Max: { Math.round(info.main.temp_max - 273.15) }°C</li>
                    </ul>
                </div>
                <div>
                    <h3>Clouds will cover {info.clouds.all}% of sky</h3>
                </div>
                <div>
                    <h3>You may suspect {info.weather[0].description}</h3>
                </div>
                <hr />
            </div>
        ));
        return (
            <div>
                <LongtermInfrormation />
                {this.props.cityname}
                <hr />
                {weatherInformation}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    weather: processWeatherPayload(state),
    cityname: proccesCityName(state),
});

WeatherTable.propTypes = {
    weather: PropTypes.array.isRequired,
    cityname: PropTypes.any.isRequired
};


/*
    Functions to allow mapStateToProps process reducers.
    By accident I overloaded "weather" name.
 */

const processWeatherPayload = state => {
    const weather =
        state.weather.weather.list === undefined
            ? [] : state.weather.weather.list;
    return weather;
};

const proccesCityName = state => {
    const name =
        state.weather.weather.city === undefined ?
            (<div />) :
            (<h2>You are looking for: {state.weather.weather.city.name}</h2>);
    if(state.location.loc === false){
        return (<h2>Enable geolocation in your browser</h2>);
    }
    if(state.weather.success === false){
        return (<h2>Something went wrong - Type name of existing city</h2>);
    }
    else if(state.weather.loading === true){
        return (<h2>LOADING</h2>);
    }
    return name;
};

export default connect(
    mapStateToProps,
)(WeatherTable);
