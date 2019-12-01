import React, { Component } from 'react';
import { StyleSheet, Text, Platform, SafeAreaView} from 'react-native';

export default class PredictionScreen extends Component {
  render() {
    return (
      <SafeAreaView  style={styles.droidSafeArea}>
          <Text>asdsaddsdas</Text>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0
  },
});
