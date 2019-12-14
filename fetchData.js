import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

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

  async setLocation() {
    this.currentWeather.isLoading = false
    await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    this.location.latitude = location.coords.latitude;
    this.location.longitude = location.coords.longitude;
    await this.getCurrentWeather()
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
      });
    } catch (error) {
      console.error(error);
    }
  }
}