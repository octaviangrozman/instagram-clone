import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'
import routeConfig from './routeConfig'

// feed
import Feed from '../screens/Feed'
import FeedNavBar from '../components/Feed/NavBar'

import Signin from '../screens/Signin'

import Signup from '../screens/Signup'

// Likes
import Likes from '../screens/Likes'
import LikesNavBar from '../components/Likes/NavBar'

const Routes = () => (<Router>
    <Scene 
      key={routeConfig.signin.key} 
      component={Signin} 
      initial={true}       
    />
    <Scene 
      key={routeConfig.signup.key} 
      component={Signup} 
    />
    <Scene 
      key={routeConfig.feed.key} 
      component={Feed} 
      renderLeftButton={FeedNavBar.LeftButton}
      renderRightButton={FeedNavBar.RightButton}
      renderTitle={FeedNavBar.Title} 
    />
    <Scene 
      key={routeConfig.likes.key}
      component={Likes}       
      // title={routeConfig.likes.title} 
      renderBackButton={LikesNavBar.BackButton}
      renderTitle={LikesNavBar.Title}
    />
  </Router>)

export default Routes