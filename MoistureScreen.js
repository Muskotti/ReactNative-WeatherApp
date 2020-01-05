import React, { Component } from 'react';
import { StyleSheet, Platform, SafeAreaView, View, Text } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default class MoistureScreen extends Component {

  constructor(props) {
    super(props)
    humidity = []
    dates = []
    var i = 0
    for (var item of this.props.data.forecast) {
      if(i < 6) {
        humidity.push(item.main.humidity)
        dates.push(this.getTime(item.dt_txt))
      }
      i++
    }
  }

  getTime = (item) => {
    var date = new Date(item)
    if(date.getHours()) {
      return date.getHours() + ':00'
    } else {
      return '00:00'
    }
  }

  render() {
    const color = this.props.value ? '#393E42' : 'white'
    const txtcolr = this.props.value ? '#86939E' : 'black'
    const colorbg = this.props.value ? styles.darkbg : styles.lightbg

    return (
        <View style={[styles.fixed, colorbg]}>
          <LineChart
            data={{
              labels:dates,
              datasets: [
                {
                  data: humidity,
                  strokeWidth: 2,
                },
              ],
            }}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').height / 1.5}
            chartConfig={{
              backgroundGradientFrom: color,
              backgroundGradientTo: color,
              labelColor: () => txtcolr,
              color: (opacity = 1) => `rgba(3, 157, 252, ${opacity})`,
            }}
            bezier
          />
        </View>
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
    alignItems: 'center',
  },
  darkbg: {
    backgroundColor: '#393E42',
  },
  lightbg: {
    backgroundColor: 'white'
  },
});
