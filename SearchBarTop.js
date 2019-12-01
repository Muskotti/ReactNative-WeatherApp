import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';

export default class SearchBarTop extends Component {

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="City"
        onChangeText={this.updateSearch}
        value={search}
        lightTheme={true}
      />
    );
  }
}
