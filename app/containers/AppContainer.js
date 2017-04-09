import React, { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Home from './Home';

class AppContainer extends Component {
  render() {
    return <Home {...this.props} />
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// connect pulls in ActionCreators and makes them accessible
export default connect((state) => {
  return {
    recipeCount: state.recipeCount
  }
}, mapDispatchToProps)(AppContainer);
