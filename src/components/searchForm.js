import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getWeatherByName } from '../actions/weatherActions';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cityname: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const cityname = this.state.cityname;
        this.props.getWeatherByName(cityname);
    }

    render() {
        return (
            <div>
                <h1>Type your city name</h1>
                <form onSubmit={this.onSubmit}>
                    <label>City:</label>
                    <br />
                    <input
                        type="text"
                        name="cityname"
                        onChange={this.onChange}
                        value={this.state.cityname}
                    />
                    <button type="submit">Get weather!</button>
                </form>
            </div>
        );
    }
}

SearchForm.propTypes = {
    getWeatherByName: PropTypes.func.isRequired
};

export default connect(null, { getWeatherByName })(SearchForm);