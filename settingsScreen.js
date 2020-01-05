import React, { Component } from 'react';
import { StyleSheet, Platform, SafeAreaView, View, Switch } from 'react-native';
import { Text } from 'react-native-elements';

export default class settingsScreen extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const color = this.props.screenProps.value ? styles.dark : styles.light
    const text = this.props.screenProps.value ? 'Light theme' : 'Dark theme'

    return (
      <SafeAreaView style={styles.droidSafeArea}>
        <View style={[styles.fixed, color]}>
          <Text h3 style={color}>
            {text}
          </Text>
          <Switch onValueChange={this.props.screenProps.changeTheme} value={this.props.screenProps.value}/>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'android' ? 34 : 0
  },
  fixed: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dark: {
    backgroundColor: '#393E42',
    color: '#86939E'
  },
  light: {
    backgroundColor: 'white'
  }
});
