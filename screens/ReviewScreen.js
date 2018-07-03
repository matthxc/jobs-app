import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Right,
  Icon,
  Title,
  Button,
} from 'native-base';
import { StatusBar, View, ScrollView, StyleSheet, Linking } from 'react-native';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: (
        <Header style={{ marginTop: StatusBar.currentHeight }}>
          <Body>
            <Title> Review Jobs </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => navigate('settings')}>
              <Icon name="settings" />
            </Button>
          </Right>
        </Header>
      ),
    };
  };

  static propTypes = {
    likedJobs: PropTypes.array.isRequired,
  };

  renderLikedJobs() {
    return this.props.likedJobs.map((job) => {
      const {
        jobtitle,
        company,
        formattedRelativeTime,
        url,
        jobkey,
        longitude,
        latitude,
      } = job;
      const initialRegion = {
        longitude,
        latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02,
      };
      return (
        <Card style={{ flex: 1 }} key={jobkey}>
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
              <Text style={[styles.italics, styles.equals]}>{company}</Text>
              <Text style={[styles.italics, styles.equals]}>
                {formattedRelativeTime}
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Button primary block onPress={() => Linking.openURL(url)}>
                <Icon name="checkmark" />
                <Text>Apply now!</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      );
    });
  }

  render() {
    return (
      <Container>
        <Content padder>
          <ScrollView>{this.renderLikedJobs()}</ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  italics: {
    fontStyle: 'italic',
  },
  equals: {
    flex: 1,
    textAlign: 'center',
  },
});

const mapStateToProps = ({ likedJobs }) => ({
  likedJobs,
});

export default connect(mapStateToProps)(ReviewScreen);
