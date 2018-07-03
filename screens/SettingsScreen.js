import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  Container,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
} from 'native-base';
import { StatusBar } from 'react-native';
import { clearLikedJobs } from '../actions';

class SettingsScreen extends Component {
  static propTypes = {
    clearLikedJobs: PropTypes.func.isRequired,
  };
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={{ marginTop: StatusBar.currentHeight }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Settings</Title>
        </Body>
        <Right />
      </Header>
    ),
  });
  render() {
    return (
      <Container>
        <Content padder>
          <Button danger block onPress={this.props.clearLikedJobs}>
            <Icon name="trash" />
            <Text uppercase={false}>Reset liked jobs</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  clearLikedJobs,
};

export default connect(null, mapDispatchToProps)(SettingsScreen);
