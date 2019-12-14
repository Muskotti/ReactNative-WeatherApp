import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, View, ActivityIndicator, Text} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import fetchData from "./fetchData.js"
import PredictionItem from "./PredictionItem.js";

const data = new fetchData();

export default class PredictionScreen extends Component {

  state = {
    isLoading: true,
    list: null,
  };

  async componentDidMount(){
    await data.setLocation();
    await data.getForecast().then(()=> {
      this.setState({
        isLoading: false,
        list: data.forecast
      })
    });
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
                                      icon={data.getIcon(item.weather[0].icon)} 
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
