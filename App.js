import CurrentWeatherScreen from './CurrentWeatherScreen.js';
import PredictionScreen from './PredictionScreen.js';
import settingsScreen from './settingsScreen.js'

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { Component } from 'react';
import fetchData from "./fetchData.js"

const MainNavigator = createBottomTabNavigator (
  {
    CurrentWeatherScreen: {
      screen: CurrentWeatherScreen,
      navigationOptions: { 
        title: 'Current Weather',
      }
    },
    PredictionScreen: {
      screen: PredictionScreen,
      navigationOptions: { 
        title: 'Forecast',
      }
    },
    settingsScreen: {
      screen: settingsScreen,
      navigationOptions: {
        title: 'Settings',
      }
    }
  },
  {
    initialRouteName: "CurrentWeatherScreen",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'CurrentWeatherScreen') {
          iconName = 'weather-cloudy';
        } else if (routeName === 'PredictionScreen') {
          iconName = 'alarm';
        } else if(routeName === 'settingsScreen') {
          iconName = 'settings'
        }
        return <IconComponent name={iconName} size={25} color={tintColor}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#393E42'
      }
    },
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {

  constructor(props) {
    super(props)
    this.data = new fetchData();
    this.state = {
      value: false
    }
  }

  async componentDidMount(){
    var result = await this.data.getTheme()
    this.setState({
      value: result
    })
  }

  theme = (value) => {
    this.setState({
      value: value
    }, () => {
      this.data.changeTheme(value)
    })
  }

  render() {
    return <AppContainer screenProps={{data: this.data, changeTheme: this.theme, value: this.state.value}}/>
  }
};