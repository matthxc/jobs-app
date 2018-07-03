import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

class AuthLoadingScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };
  async componentDidMount() {
    const token = await AsyncStorage.getItem('fb_token');
    if (token) {
      this.props.navigation.navigate('map');
    } else {
      this.props.navigation.navigate('welcome');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" style={styles.activityIndicator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});

export default AuthLoadingScreen;
