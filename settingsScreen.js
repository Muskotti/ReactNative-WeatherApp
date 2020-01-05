import React, { Component } from 'react';
import { StyleSheet, Platform, SafeAreaView, Text, View, Switch } from 'react-native';

export default class settingsScreen extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const color = this.props.screenProps.value ? styles.dark : styles.light

    return (
      <SafeAreaView style={styles.droidSafeArea}>
        <View style={[styles.fixed, color]}>
          <Text>
            dasdasdsadasdadsadasdsadasdasdasdsadasdasd
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
    backgroundColor: '#393E42'
  },
  light: {
    backgroundColor: 'white'
  }
});
