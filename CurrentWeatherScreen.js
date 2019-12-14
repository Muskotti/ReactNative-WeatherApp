import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, View, ActivityIndicator} from 'react-native';
import SearchBarTop from './SearchBarTop.js';
import CurrentInfo from './CurrentInfo.js';
import { Icon } from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import iconMaker from "./iconMaker.js";

export default class CurrentWeatherScreen extends Component {

  state = {
    location: null,
    isLoading: true,
    city: '',
    tempeture: '',
    icon: '',
  };

  componentDidMount(){
    this.getLocation();
  }

  async getLocation() {
    this.setState({
      isLoading: true,
    });
    await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location }, () => {
      this.getWeather(location.coords.latitude, location.coords.longitude)
    });
  }

  async getWeather(latitude, longitude) {
    try {
      let response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon=' + longitude + '&units=metric&APPID=63dba0881a9c7a2ab8dd3666fe61c42c&',
      );
      await response.json().then((result)=> {
        this.setState({
          isLoading: false,
          city: result.name,
          tempeture: result.main.temp + ' C',
          icon: iconMaker.getIcon(result.weather[0].icon),
        });
      });
    } catch (error) {
      console.error(error);
    }
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
              onPress={() => this.getLocation()} 
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
