import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import PcD from './assets/weather-partly-cloudy.svg';
import PcN from "./assets/weather-night-partly-cloudy.svg";

export default class CurrentInfo extends Component {
  render() {
    if(this.props.icon === 'weather-night-partly-cloudy') {
      return (
        <View style={styles.container}>
          <Text h2 style={this.props.color}>{this.props.city}</Text>
          <PcN fill="tomato" width={200} height={200} />
          <Text h2 style={this.props.color}>{this.props.tempeture} C</Text>
        </View>
      );
    } else if (this.props.icon === 'weather-partly-cloudy') {
      return (
        <View style={styles.container}>
          <Text h2 style={this.props.color}>{this.props.city}</Text>
          <PcD fill="tomato" width={200} height={200} />
          <Text h2 style={this.props.color}>{this.props.tempeture} C</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text h2 style={this.props.color}>{this.props.city}</Text>
        <Icon
          name={this.props.icon}
          type='material-community'
          color='tomato'
          size={200}
        />
        <Text h2 style={this.props.color}>{this.props.tempeture} C</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
});
