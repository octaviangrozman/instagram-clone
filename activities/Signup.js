import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Signin extends Component {
  state = {
    email: '',
    password: '',
    repeatPassword: '',
    isSigningUp: false,
    error: null
  };

  goToSignIn = () => {
    Actions.signin();
  }

  signUp = async () => {
    try {
      const { email, password } = this.state;
        this.setState({ isSigningUp: true, error: null });
        const data = { email, password };
        let response = await axios.post('/signup', data);
        let responseJson = await response.data;
        if (responseJson.error) {
          this.setState({ error: responseJson.error, isSigningUp: false });
        } else {
          this.goToSignIn();
          this.setState({ isSigningUp: false, error: null });
        }
      }
    catch(error) {
      this.setState({ error: error.response.data.error, isSigningUp: false });
    }
  }

  invalid = () => {
    const { email, password, repeatPassword } = this.state;
    return email === '' || password === '' || repeatPassword === '';
  }

  passwordsMatching = () => {
    const { password, repeatPassword } = this.state;
    return password === repeatPassword;
  }

  setEmail = (email) => this.setState({email});
  setPassword = (password) => this.setState({password});
  setRepeatPassword = (repeatPassword) => this.setState({repeatPassword});

  render() {
    const { disabled, error, isSigningUp } = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/640px-Instagram_logo.svg.png' }}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          onChangeText={this.setEmail}
          placeholder='Email'
          placeholderTextColor='rgba(0,0,0,.5)'
          underlineColorAndroid='transparent'
          keyboardType='email-address'
          returnKeyType='next'
          onSubmitEditing={() => this.password.focus()}
        />
        <TextInput
          style={styles.input}
          onChangeText={this.setPassword}
          placeholder='Password'
          placeholderTextColor='rgba(0,0,0,.5)'
          underlineColorAndroid='transparent'
          secureTextEntry
          returnKeyType='next'
          ref={password => { this.password = password; } }
          onSubmitEditing={() => this.repeatPassword.focus()}
        />
        <TextInput
          style={styles.input}
          onChangeText={this.setPassword}
          placeholder='Repeat password'
          placeholderTextColor='rgba(0,0,0,.5)'
          underlineColorAndroid='transparent'
          secureTextEntry
          ref={password => { this.repeatPassword = password; } }
          onSubmitEditing={this.signUp}
        />
        <TouchableOpacity onPress={this.signUp}>
          <Text style={styles.loginButtonText}>
            {isSigningUp ? 'Signing up...' : 'Sign up'}
          </Text>
        </TouchableOpacity>
        {error && <Text style={styles.error}>
          <Text style={styles.bold}>Error: </Text> {error}
        </Text>}
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  logo: {
    height: 80,
    width: 250,
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  input: {
    height: 60,
    marginTop: 15,
    fontSize: 18,
    color: '#222',
    textAlign: 'center',
    borderColor: '#222',
    borderWidth: 1,
    borderRadius: 4,
  },
  loginButtonText: {
    height: 60,
    lineHeight: 43,
    marginTop: 35,
    borderColor: '#4385ef',
    color: '#4385ef',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 18,
    fontWeight: 'bold'
  },
  bold: {
    fontWeight: '600'
  },
  error: {
    color: '#d8574e',
    padding: 10,
    fontSize: 17,
    textAlign: 'center'
  }
});

export default Signin;
