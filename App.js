import CurrentWeatherScreen from './CurrentWeatherScreen.js';
import PredictionScreen from './PredictionScreen.js';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { Component } from 'react';

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
      navigationOptions: { title: 'Prediction' }
    },
  },
  {
    initialRouteName: "CurrentWeatherScreen",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'CurrentWeatherScreen') {
          iconName = `weather-cloudy`;
        } else if (routeName === 'PredictionScreen') {
          iconName = `alarm`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const App = createAppContainer(MainNavigator);

export default App;