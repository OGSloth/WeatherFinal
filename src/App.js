import React, { Component } from 'react';
import './css/App.css';
import { Provider } from 'react-redux';
import { findLocation } from './actions/geolocationActions';
import GetLocation from './components/GetLocation';
import SearchForm from './components/searchForm';
import WeatherTable from './components/WeatherTable';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <div className="App">
              <div className="Search">
                  <SearchForm />
                  <GetLocation locationRecieved = {findLocation} />
              </div>
              <WeatherTable />
          </div>
      </Provider>
    );
  }
}

export default App;
