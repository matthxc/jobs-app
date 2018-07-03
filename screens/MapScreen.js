import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Container, Button, Text, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { isEqual, isEmpty } from 'lodash';
import { fetchJobs } from '../actions';

class MapScreen extends Component {
  static propTypes = {
    fetchJobs: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    jobs: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { jobs } = nextProps;
    if (!isEqual(jobs, prevState.jobs)) {
      return {
        jobs,
      };
    }

    return null;
  }

  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    },
  };

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  componentDidUpdate(prevProps, prevState) {
    const { jobs } = this.state;
    if (
      !isEqual(jobs, prevState.jobs) &&
      !jobs.isLoading &&
      !isEmpty(jobs.data)
    ) {
      this.props.navigation.navigate('deck');
    }
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  };

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region);
  };

  render() {
    const { region, mapLoaded, jobs } = this.state;
    if (!mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <Container>
        <MapView
          style={{ flex: 1 }}
          region={region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <Button block style={styles.button} onPress={this.onButtonPress}>
          {jobs.isLoading ? (
            <Spinner color="#fff" />
          ) : (
            [
              <Icon name="search" key="search" />,
              <Text uppercase={false} key="text">
                Search this area
              </Text>,
            ]
          )}
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginLeft: 20,
    marginRight: 20,
  },
});

const mapDispatchToProps = {
  fetchJobs,
};

const mapStateToProps = ({ jobs }) => ({ jobs });

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
