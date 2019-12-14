import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, View, ActivityIndicator} from 'react-native';
import SearchBarTop from './SearchBarTop.js';
import CurrentInfo from './CurrentInfo.js';
import { Icon } from 'react-native-elements';
import fetchData from "./fetchData.js"

const data = new fetchData();

export default class CurrentWeatherScreen extends Component {

  state = {
    isLoading: true,
    city: null,
    tempeture: null,
    icon: null,
  }

  setCurrentWeather() {
    this.setState({
      isLoading: data.currentWeather.isLoading,
      city: data.currentWeather.city,
      tempeture: data.currentWeather.tempeture,
      icon: data.currentWeather.icon
    })
  }

  async componentDidMount(){
    await data.setLocation().then(()=> {
      this.setCurrentWeather()
    });
  }

  getLocation = () => {
    this.setState({
      isLoading: true,
    })
    data.setLocation().then(()=> {
      this.setCurrentWeather()
    });
  }

  render() {
    if (this.state.isLoading) {
      return(
        <SafeAreaView  style={styles.droidSafeArea}>
          <SearchBarTop/>
          <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
      </SafeAreaView >
      )
    }
    return (
      <SafeAreaView style={styles.droidSafeArea}>
          <SearchBarTop/>
          <View style={{flexDirection: 'row-reverse', position: 'absolute', right: 6, top: 96}}>
            <Icon
              reverse
              raised
              name='crosshairs-gps'
              type='material-community'
              color='tomato'
              onPress={() => {this.getLocation()}} 
            />
          </View>
          <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
            <CurrentInfo city={this.state.city} tempeture={this.state.tempeture} icon={this.state.icon}/>
          </View>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'android' ? 34 : 0
  },
});
