import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, View, ActivityIndicator, Button} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PredictionItem from "./PredictionItem.js";
import MoistureScreen from './MoistureScreen.js';

export default class PredictionScreen extends Component {

  constructor(props) {
    super(props)
    this.data = props.screenProps.data
  }

  state = {
    isLoading: true,
    list: null,
    moisture: false,
  };

  async componentDidFocus(load) {
    this.setState({
      isLoading: true,
      moisture: false,
    })
    if(await this.data.compareTime('forecast') || await this.data.cheackKey('forecast') || this.data.newCity) {
      await this.data.getLocation();
      await this.data.getForecast().then(()=> {
        this.setState({
          isLoading: false,
          list: this.data.forecast
        }, () => {
          this.data.newCity = false
        })
      });
    } else {
      await this.data.getStorageForecast().then(()=> {
        this.setState({
          isLoading: false,
          list: this.data.forecast
        })
      })
    }
  }

  async componentDidMount(){
    this.subs = [
      this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  render() {
    const color = this.props.screenProps.value ? styles.dark : styles.light
    const bg = this.props.screenProps.value ? styles.darkbg : styles.lightbg
    const txt = this.props.screenProps.value ? styles.darktxt : styles.lighttxt

    if (this.state.isLoading) {
      return(
        <SafeAreaView  style={styles.droidSafeArea}>
          <View style={[styles.fixed, color]}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
      </SafeAreaView >
      )
    }

    if(this.state.moisture) {
      return(
        <SafeAreaView  style={styles.droidSafeArea}>
          <MoistureScreen data={this.data} value={this.props.screenProps.value}/>
          <Button color='tomato' title='Moisture chart' onPress={() => this.setState({moisture: false})}/>
        </SafeAreaView >
      )
    }

    return (
      <SafeAreaView  style={styles.droidSafeArea}>
          <FlatList
            data={this.state.list}
            renderItem={({item}) => <PredictionItem 
                                      date={item.dt_txt} 
                                      temp={item.main.temp} 
                                      descr={item.weather[0].description} 
                                      icon={this.data.getIcon(item.weather[0].icon)} 
                                      humid={item.main.humidity}
                                      bg={bg}
                                      txt={txt}
                                      />}
            keyExtractor={(item, index) => 'key'+index}
          />
          <Button color='tomato' title='Moisture chart' onPress={() => this.setState({moisture: true})}/>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0
  },
  fixed: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dark: {
    backgroundColor: '#393E42',
    color: '#86939E'
  },
  light: {
    backgroundColor: 'white'
  },
  darkbg: {
    backgroundColor: '#393E42',
  },
  lightbg: {
    backgroundColor: 'white'
  },
  darktxt: {
    color: '#86939E'
  },
  lighttxt: {
    color: 'black'
  }
});
