import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { facebookLogin } from '../actions';

class AuthScreen extends Component {
  static propTypes = {
    facebookLogin: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
    // AsyncStorage.removeItem("fb_token");
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return <View />;
  }
}

const mapDispatchToProps = {
  facebookLogin,
};

const mapStateToProps = ({ auth }) => ({ token: auth.token });

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
