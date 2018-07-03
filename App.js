import React, { Component } from 'react';
import {
  TabNavigator,
  StackNavigator,
  SwitchNavigator,
} from 'react-navigation';
import {
  Text,
  StyleProvider,
  Button,
  Icon,
  Footer,
  FooterTab,
} from 'native-base';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Expo, { Notifications } from 'expo';

import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';

import registerForNotifications from './services/push_notifications';
import { store, persistor } from './store';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
    });
    this.setState({ isReady: true });
    await registerForNotifications();
    Notifications.addListener((notification) => {
      const {
        data: { text },
        origin,
      } = notification;
      console.log(notification);
      if (origin === 'received' && text) {
        Alert.alert('New Push Notification', text, [{ text: 'Ok' }]);
      }
    });
  }
  render() {
    const reviewStack = StackNavigator(
      {
        review: { screen: ReviewScreen },
        settings: { screen: SettingsScreen },
      },
      {
        initialRouteName: 'review',
      }
    );
    const mainApp = TabNavigator(
      {
        map: { screen: MapScreen },
        deck: { screen: DeckScreen },
        review: { screen: reviewStack },
      },
      {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        tabBarComponent: (props) => (
          <Footer>
            <FooterTab>
              <Button
                vertical
                active={props.navigationState.index === 0}
                onPress={() => props.navigation.navigate('map')}
              >
                <Icon name="map" />
                <Text>Map</Text>
              </Button>
              <Button
                vertical
                active={props.navigationState.index === 1}
                onPress={() => props.navigation.navigate('deck')}
              >
                <Icon name="list" />
                <Text>Jobs</Text>
              </Button>
              <Button
                vertical
                active={props.navigationState.index === 2}
                onPress={() => props.navigation.navigate('review')}
              >
                <Icon name="heart" />
                <Text>Review jobs</Text>
              </Button>
            </FooterTab>
          </Footer>
        ),
      }
    );
    const MainNavigator = SwitchNavigator(
      {
        authLoading: AuthLoadingScreen,
        welcome: WelcomeScreen,
        auth: AuthScreen,
        main: mainApp,
      },
      {
        initialRouteName: 'authLoading',
      }
    );
    return (
      <Provider store={store}>
        <PersistGate
          loading={
            <View style={styles.container}>
              <ActivityIndicator
                size="large"
                style={styles.activityIndicator}
              />
            </View>
          }
          persistor={persistor}
        >
          <StyleProvider style={getTheme(platform)}>
            {!this.state.isReady ? (
              <View style={styles.container}>
                <ActivityIndicator
                  size="large"
                  style={styles.activityIndicator}
                />
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <MainNavigator />
              </View>
            )}
          </StyleProvider>
        </PersistGate>
      </Provider>
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

export default App;
