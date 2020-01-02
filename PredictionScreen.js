import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, View, ActivityIndicator} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PredictionItem from "./PredictionItem.js";


export default class PredictionScreen extends Component {

  constructor(props) {
    super(props)
    this.data = props.screenProps.data
  }

  state = {
    isLoading: true,
    list: null,
  };

  async componentDidFocus(load) {
    this.setState({
      isLoading: true
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
    if (this.state.isLoading) {
      return(
        <SafeAreaView  style={styles.droidSafeArea}>
          <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
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
                                      />}
            keyExtractor={(item, index) => 'key'+index}
          />
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0
  }
});
