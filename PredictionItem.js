import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon, ListItem} from 'react-native-elements';
import PcD from './assets/weather-partly-cloudy.svg';
import PcN from "./assets/weather-night-partly-cloudy.svg";

export default class PredictionItem extends Component {

  beatifyDate() {
    var options = { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    var result = new Date(this.props.date)
    return result.toLocaleDateString("en-US", options)
  }

  render() {
    const size = 32
    if(this.props.icon === 'weather-night-partly-cloudy') {
      return (
        <ListItem
          rightElement= {
            <Text>{this.props.temp} C</Text>
          }
          rightAvatar={
            <Text style={{color:'#039dfc'}}>{this.props.humid} %</Text>
          }
          rightIcon={
            <PcN fill="tomato" width={size} height={size} />
          }
          title={this.beatifyDate()}
          subtitle={this.props.descr}
          subtitleStyle={{textTransform:'capitalize'}}
          bottomDivider
        />
      );
    } else if (this.props.icon === 'weather-partly-cloudy') {
      return (
        <ListItem
          rightElement= {
            <Text>{this.props.temp} C</Text>
          }
          rightAvatar={
            <Text style={{color:'#039dfc'}}>{this.props.humid} %</Text>
          }
          rightIcon={
            <PcD fill="tomato" width={size} height={size} />
          }
          title={this.beatifyDate()}
          subtitle={this.props.descr}
          subtitleStyle={{textTransform:'capitalize'}}
          bottomDivider
        />
      );
    }
    return(
      <ListItem
        rightElement= {
          <Text>{this.props.temp} C</Text>
        }
        rightAvatar={
          <Text style={{color:'#039dfc'}}>{this.props.humid} %</Text>
        }
        rightIcon={
          <Icon
            name={this.props.icon}
            type='material-community'
            color='tomato'
            size={size}
          />
        }
        title={this.beatifyDate()}
        subtitle={this.props.descr}
        subtitleStyle={{textTransform:'capitalize'}}
        bottomDivider
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  }
});
