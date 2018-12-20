import React, {Component} from 'react';
import {connect} from 'react-redux';
import {weatherSelectorInformation} from "../selectors/weatherSelector";
import PropTypes from "prop-types";

class LongtermInfrormation extends Component {
    render() {
      const longterm = this.props.information.complete === false ?
            noInformation : (
                <div>
                  <h2>During next 5 days:</h2>
                  <h3>Average temperature is going to be {this.props.information.avg_temp}°C</h3>
                  <h3>Between {this.props.information.min_temp}°C and {this.props.information.max_temp}°C</h3>
                  <h3>Overall: {this.props.information.description}</h3>
                  <hr />
                </div>
          );
        return (
            <div>
                {longterm}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    information: weatherSelectorInformation(state),
});

LongtermInfrormation.propTypes = {
    information: PropTypes.any.isRequired,
};

const noInformation = (
    <div />
);


export default connect(
    mapStateToProps,
)(LongtermInfrormation);