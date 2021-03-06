import React from 'react';
import PropTypes from 'prop-types';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' },
];

const WelcomeScreen = ({ navigation }) => {
  const onSlidesComplete = () => {
    navigation.navigate('auth');
  };

  return <Slides data={SLIDE_DATA} onComplete={onSlidesComplete} />;
};

WelcomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default WelcomeScreen;
