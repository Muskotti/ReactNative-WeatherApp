import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';

export default class fetchData {

  constructor(){
    this.location = {
      latitude: null,
      longitude: null,
    }
    this.currentWeather = {
      isLoading: true,
      city: null,
      tempeture: null,
      icon: null,
    }
    this.forecast = null
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

  async cheackKey(key) {
    if(await AsyncStorage.getItem(key)) {
      return false
    }
    return true
  }

  async compareTime() {
    let oldTime = new Date( await AsyncStorage.getItem('Time'))
    let newTime = new Date()
    oldTime.setMinutes( oldTime.getMinutes() + 5 );
    if(Date.parse(newTime) > Date.parse(oldTime)) {
      return true
    }
    return false
  }

  async getStorageCurrent() {
    this.location.latitude = await AsyncStorage.getItem('Lat');
    this.location.longitude = await AsyncStorage.getItem('Lon');

    let data = JSON.parse(await AsyncStorage.getItem('current'))
    this.currentWeather.city = data.name
    this.currentWeather.isLoading = false
    this.currentWeather.tempeture = data.main.temp
    this.currentWeather.icon = this.getIcon(data.weather[0].icon)
    this.currentWeather.isLoading = false
  }

  async getStorageForecast() {
    let data = JSON.parse(await AsyncStorage.getItem('forecast'))
    this.forecast = data
  }

  async getLocation() {
    this.currentWeather.isLoading = false
    await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    this.location.latitude = location.coords.latitude;
    this.location.longitude = location.coords.longitude;
    await AsyncStorage.multiSet([['Lat', '' + location.coords.latitude], ['Lon', '' + location.coords.longitude], ['Time', '' + new Date()]], (error) => {
      if(error) {
        console.log(error)
      }
    })
  }

  async saveData(func,data) {
    try {
      await AsyncStorage.setItem(func, JSON.stringify(data))
    } catch (error) {
      console.log(error)
    }
  }

  async getCurrentWeather() {
    try {
      return fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ this.location.latitude + '&lon=' + this.location.longitude + '&units=metric&APPID=63dba0881a9c7a2ab8dd3666fe61c42c&')
      .then((responce) => responce.json())
      .then((data) => {
        this.currentWeather.city = data.name
        this.currentWeather.isLoading = false
        this.currentWeather.tempeture = data.main.temp + " C"
        this.currentWeather.icon = this.getIcon(data.weather[0].icon)
        this.saveData('current',data)
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getForecast() {
    try {
      return await fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+ this.location.latitude + '&lon=' + this.location.longitude + '&units=metric&APPID=63dba0881a9c7a2ab8dd3666fe61c42c&')
      .then((responce) => responce.json())
      .then((data) => {
        this.forecast = data.list
        this.saveData('forecast', data.list)
      });
    } catch (error) {
      console.error(error);
    }
  }
}