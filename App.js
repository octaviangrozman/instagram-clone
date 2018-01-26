import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Feed from './activities/Feed';
import Signin from './activities/Signin';
import Signup from './activities/Signup';
import axios from 'axios';
import SERVER_URL from './utils/serverUrl';

axios.defaults.baseURL = SERVER_URL + '/api/';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Scene key="signin" component={Signin} hideNavBar/>
          <Scene key="signup" component={Signup} hideNavBar/>
          <Scene key="feed" component={Feed} initial={true} title="Feed" hideNavBar/>
        </Router>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    top: 24
  }
});
