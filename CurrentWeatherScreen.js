import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, View, ActivityIndicator} from 'react-native';
import SearchBarTop from './SearchBarTop.js';
import CurrentInfo from './CurrentInfo.js';
import { Icon } from 'react-native-elements';

export default class CurrentWeatherScreen extends Component {

  constructor(props) {
    super(props)
    this.data = props.screenProps.data
  }

  state = {
    isLoading: true,
    city: null,
    tempeture: null,
    icon: null,
  }

  async componentDidMount(){
    if(await this.data.compareTime('current') || await this.data.cheackKey('current')) {
      await this.data.getLocation();
      await this.data.getCurrentWeather().then(()=> {
        this.setCurrentWeather()
      });
    } else {
      this.data.getStorageCurrent().then(()=> {
        this.setCurrentWeather()
      })
    }
  }

  setCurrentWeather() {
    this.setState({
      isLoading: this.data.currentWeather.isLoading,
      city: this.data.currentWeather.city,
      tempeture: this.data.currentWeather.tempeture,
      icon: this.data.currentWeather.icon
    })
  }

  async getLocation(){
    this.setState({
      isLoading: true,
    })
    await this.data.getLocation();
    await this.data.getCurrentWeather().then(()=> {
      this.setCurrentWeather()
    });
  }

  searchCity(city) {
    this.data.fetchCity(city).then(()=> {
      this.setCurrentWeather()
    })
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
          <SearchBarTop searchCity={(data) => this.searchCity(data)}/>
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
