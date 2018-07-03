import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Text,
  Card,
  CardItem,
  Body,
  Button,
  Icon,
} from 'native-base';
import { StatusBar, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { likeJob } from '../actions';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {
  static propTypes = {
    jobs: PropTypes.array.isRequired,
    likeJob: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  renderCard(job, transparent = false) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02,
    };
    return (
      <Card style={{ flex: 1 }} transparent={transparent}>
        <CardItem header>
          <Text>{job.jobtitle}</Text>
        </CardItem>
        <View style={{ height: 200 }}>
          <MapView
            cacheEnabled
            scrollEnabled={false}
            style={{ flex: 1 }}
            initialRegion={initialRegion}
          />
        </View>
        <CardItem>
          <Body style={styles.detailWrapper}>
            <Text style={styles.equals}>{job.company}</Text>
            <Text style={styles.equals}>{job.formattedRelativeTime}</Text>
          </Body>
        </CardItem>
        <CardItem style={{ flex: 1 }}>
          <Body>
            <Text>{job.snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }

  renderNoMoreCards = () => (
    <Card>
      <CardItem header>
        <Text style={{ textAlign: 'center' }}>No more jobs</Text>
      </CardItem>
      <CardItem>
        <Body>
          <Button
            primary
            block
            onPress={() => this.props.navigation.navigate('map')}
          >
            <Icon name="map" />
            <Text>Back to map</Text>
          </Button>
        </Body>
      </CardItem>
    </Card>
  );

  render() {
    const { jobs } = this.props;
    return (
      <Container style={{ marginTop: StatusBar.currentHeight, padding: 10 }}>
        {jobs.length > 0 ? (
          <Swipe
            data={this.props.jobs}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderNoMoreCards}
            onSwipeRight={(job) => this.props.likeJob(job)}
            keyProp="jobkey"
          />
        ) : (
          this.renderNoMoreCards()
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  equals: {
    flex: 1,
    textAlign: 'center',
  },
});

const mapDispatchToProps = {
  likeJob,
};

const mapStateToProps = ({ jobs }) => ({ jobs: jobs.data });

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);
