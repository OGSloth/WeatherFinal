import React, {Component} from 'react';
import {connect} from 'react-redux';
import { findLocation } from '../actions/geolocationActions'

class GetLocation extends Component {
    render() {
        return (
            <div>
                <button onClick = { this.props.locationReceived } >Get weather information via geolocation</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    locationReceived: () => dispatch(findLocation())
});

export default connect(null, mapDispatchToProps)(GetLocation);