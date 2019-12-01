import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

export default class CurrentInfo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text h2>{this.props.city}</Text>
        <Icon
          name={this.props.icon}
          type='material-community'
          color='tomato'
          size={200}
        />
        <Text h2>{this.props.tempeture}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
});
