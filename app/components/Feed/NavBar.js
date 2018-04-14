import React from 'react'
import styled from "styled-components/native"
import { View, Image } from 'react-native'
import { Icon } from 'react-native-elements'


const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #fff;
`
const InstagramLogo = styled(Image)`
  width: 100;
  height: 30;
`

const LeftButton = () => <Icon name='camera-alt' size={25} />
const RightButton = () => <Icon type='entypo' name='direction' size={25}/>

const Title = () => {
  return (
    <Container>
      <InstagramLogo source={require('../../assets/instagram_logo.png')} />
    </Container>
  )
}

const NavBar = () => <View />

NavBar.LeftButton = LeftButton
NavBar.RightButton = RightButton
NavBar.Title = Title

export default NavBar
