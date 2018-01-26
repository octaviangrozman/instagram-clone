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
    isSigningIn: false,
    error: null
  };

  goToFeed = () => {
    Actions.feed();
  }

  goToSingUp = () => {
    Actions.signup();
  }

  signIn = async () => {
    if (this.invalid()) {
      this.setState({ error: 'You must enter Email and Password!' });
    } else {
      try {
        const { email, password } = this.state;
        this.setState({ isSigningIn: true, error: null });
        const data = { email, password };
        let response = await axios.post('/signin', data);
        console.log(response);
        let responseJson = await response.data;
        if (responseJson.error) {
          this.setState({ error: responseJson.error, isSigningIn: false });
        } else {
          Actions.feed();
          this.setState({ isSigningIn: false, error: null });
        }
      } catch(error) {
        this.setState({ isSigningIn: false, error: error.response.data.error });
      }
    }
  }

  setEmail = (email) => this.setState({email});
  setPassword = (password) => this.setState({password});

  invalid = () => {
    const { email, password } = this.state;
    return email === '' || password === '';
  }

  render() {
    const { error, isSigningIn } = this.state;
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
          ref={password => { this.password = password; } }
          onSubmitEditing={this.signIn}
        />
        <TouchableOpacity onPress={this.signIn}>
          <Text style={styles.loginButtonText}>
            {isSigningIn ? 'Signing in...' : 'Sign in'}
          </Text>
        </TouchableOpacity>
        <View style={styles.signUpSection}>
          <TouchableOpacity style={styles.forgotPass}>
            <Text style={styles.forgotPassText}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToSingUp}>
            <Text style={styles.signUpText}>
              Or, <Text style={styles.bold}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
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
  signUpSection: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  forgotPassText: {
    fontSize: 16,
    marginRight: 10
  },
  signUpText: {
    fontSize: 16,
    alignItems: 'center',
    alignSelf: 'center'
  },
  bold: {
    fontWeight: '600',
    fontSize: 17,
  },
  error: {
    color: '#d8574e',
    padding: 10,
    fontSize: 17,
    textAlign: 'center'
  }
});

export default Signin;
