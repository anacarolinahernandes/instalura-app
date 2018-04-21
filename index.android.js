import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  FlatList
} from 'react-native';

import Post from './src/components/Post';

export default class InstaluraMobile extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(response => response.json())
      .then(json => this.setState({ fotos: json }))
  }

  render() {
    return (
      <FlatList style={styles.container}
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <Post foto={item} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },

});

AppRegistry.registerComponent('InstaluraMobile', () => InstaluraMobile);
