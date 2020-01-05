import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Icon, ListItem} from 'react-native-elements';
import PcD from './assets/weather-partly-cloudy.svg';
import PcN from "./assets/weather-night-partly-cloudy.svg";

export default class PredictionItem extends Component {

  beatifyDate() {
    var options = { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    var date = new Date(this.props.date)
    var result = date.toLocaleDateString("en-US", options)
    if(result == "invalid date") {
      return this.props.date
    }
    return result
  }

  render() {
    const size = 32
    if(this.props.icon === 'weather-night-partly-cloudy') {
      return (
        <ListItem
          containerStyle= {this.props.bg}
          rightElement= {
            <Text style={this.props.txt}>{this.props.temp} C</Text>
          }
          rightAvatar={
            <Text style={{color:'#039dfc'}}>{this.props.humid} %</Text>
          }
          rightIcon={
            <PcN fill="tomato" width={size} height={size} />
          }
          title={this.beatifyDate()}
          titleStyle={this.props.txt}
          subtitle={this.props.descr}
          subtitleStyle={[this.props.txt, {textTransform:'capitalize'}]}
          bottomDivider
        />
      );
    } else if (this.props.icon === 'weather-partly-cloudy') {
      return (
        <ListItem
          containerStyle= {this.props.bg}
          rightElement= {
            <Text style={this.props.txt}>{this.props.temp} C</Text>
          }
          rightAvatar={
            <Text style={{color:'#039dfc'}}>{this.props.humid} %</Text>
          }
          rightIcon={
            <PcD fill="tomato" width={size} height={size} />
          }
          title={this.beatifyDate()}
          titleStyle={this.props.txt}
          subtitle={this.props.descr}
          subtitleStyle={[this.props.txt, {textTransform:'capitalize'}]}
          bottomDivider
        />
      );
    }
    return(
      <ListItem
        containerStyle= {this.props.bg}
        rightElement= {
          <Text style={this.props.txt}>{this.props.temp} C</Text>
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
        titleStyle={this.props.txt}
        subtitle={this.props.descr}
        subtitleStyle={[this.props.txt, {textTransform:'capitalize'}]}
        bottomDivider
      />
    )
  }
}
