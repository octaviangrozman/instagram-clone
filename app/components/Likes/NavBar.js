// ios-arrow-round-back
// md-arrow-back Ionicons

import React from 'react'
import styled from "styled-components/native"
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

const Container = styled.View`
  justify-content: center;
  align-items: flex-start;
  padding-left: 50px;
  height: 100%;
  background: #fff;
`

const StyledText = styled.Text`
  line-height: 20;
  font-size: 18; 
  font-weight: bold;
`

const StyledIcon = styled(Icon)`
  padding: 5px;
  justify-content: center;
  align-items: center;
  flex: 1;
`

const onLeft = () => Actions.pop() 

const BackButton = () => <StyledIcon type='ionicon' name='md-arrow-back' size={25} onPress={() => Actions.pop()}/>

const Title = () => {
  return (
    <Container>
      <StyledText>Likes</StyledText>
    </Container>
  )
}

const NavBar = () => <View />

NavBar.BackButton = BackButton
NavBar.onLeft = onLeft
NavBar.Title = Title

export default NavBar
