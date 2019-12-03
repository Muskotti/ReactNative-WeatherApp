import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, View, ActivityIndicator} from 'react-native';
import SearchBarTop from './SearchBarTop.js';
import CurrentInfo from './CurrentInfo.js';
import { Icon } from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

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
        console.log(result);
        this.setState({
          isLoading: false,
          city: result.name,
          tempeture: result.main.temp + ' C',
          icon: this.getIcon(result.weather[0].icon),
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  getIcon(iconID) {
    switch (iconID) {
      case '01d':
        return 'weather-sunny';
      case '01n':
        return 'weather-night';
      case '02d':
        return 'weather-partly-cloudy';
      case '02n':
        return 'weather-night-partly-cloudy';
      case '03d':
        return 'weather-cloudy';
      case '03n':
        return 'weather-cloudy';
      case '04d':
        return 'weather-cloudy';
      case '04n':
        return 'weather-cloudy';
      case '09d':
        return 'weather-pouring';
      case '09n':
        return 'weather-pouring';
      case '10d':
        return 'weather-rainy';
      case '10n':
        return 'weather-rainy';
      case '11d':
        return 'weather-lightning';
      case '11n':
        return 'weather-lightning';
      case '13d':
        return 'weather-snowy';
      case '13n':
        return 'weather-snowy';
      case '50d':
        return 'weather-fog';
      case '50n':
        return 'weather-fog';
      default :
        return 'weather-sunny';
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
      <SafeAreaView  style={styles.droidSafeArea}>
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
