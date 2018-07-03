import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onComplete: PropTypes.func.isRequired,
  };

  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          title="Login"
          raised
          buttonStyle={{ backgroundColor: '#fff' }}
          containerViewStyle={{ marginTop: 20 }}
          onPress={this.props.onComplete}
        />
      );
    }
    return [];
  }

  renderSlides() {
    return this.props.data.map((slide, index) => (
      <View
        key={slide.text}
        style={[styles.slideStyle, { backgroundColor: slide.color }]}
      >
        <Text style={styles.textStyle}>{slide.text}</Text>
        {this.renderLastSlide(index)}
      </View>
    ));
  }

  render() {
    return (
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  textStyle: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
};

export default Slides;
