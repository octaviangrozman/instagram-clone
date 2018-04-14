import React, { Component, PropTypes } from 'react'
import axios from 'axios'
import {
    Text,
    View,
    Button,
    Image,
    TextInput,
    StyleSheet,
    ScrollView
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import styled from 'styled-components/native'

const ContainerView = styled.ScrollView`
    padding-top: 55px;
`

const UserContainer = styled.View`
    flex: 1;
    flex-direction: row;
    height: 60;
    padding: 5px 10px;
    align-items: center;
    margin-bottom: 10;
    border: 1px solid ${({ theme }) => theme.borderColor};
` 

const UserAvatar = styled.Image`
    width: 50;
    height: 50;
    border-radius: 30;
    border-width: 1px;
    border-color: ${({ theme }) => theme.borderColor};
`

const UserInfo = styled.View`
    flex: 2;
`

const Username = styled.Text`
    font-size: 18;
    font-weight: bold;
`

const FollowButtonView = styled.View`
    flex: 1;
    height: 20;
    borderRadius: 10;
`

const FollowButton = styled.Button`
    background: ${({theme}) => theme.brandBlue};
`

const FollowButtonText = styled.Text`
    flex: 1;
    padding: 0 20px;
    font-size: 14;
    font-weight: bold;
    color: #fff;
`

class Likes extends Component {
    state = {
        
    }

    users = this.props.users.map(user => <UserContainer key={user.id}>
        <UserAvatar source={{ uri: user.imageSrc }} />
        <UserInfo>
            <Username>{user.username}</Username>
        </UserInfo>
        <View>
            <Button title="Follow" onPress={() => {}}/>
        </View>
    </UserContainer>)

    render() {
        return (
            <ContainerView>
                {this.users}
            </ContainerView>
        )
    }
}

Likes.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
}

Likes.defaultProps = {
    users : [
        {
          id: 1,
          imageSrc: 'https://appsftw.com/im/is2.mzstatic.com/image/thumb/Purple111/v4/1e/06/4c/1e064cdf-6812-8584-8aa1-0c069f2d5e0f/source/512x512bb.jpg',
          username: 'Tabby'
        },
        {
          id: 2,
          imageSrc: 'https://appsftw.com/im/is2.mzstatic.com/image/thumb/Purple111/v4/1e/06/4c/1e064cdf-6812-8584-8aa1-0c069f2d5e0f/source/512x512bb.jpg',
          username: 'Tabby'
        },
        {
          id: 3,
          imageSrc: 'https://appsftw.com/im/is2.mzstatic.com/image/thumb/Purple111/v4/1e/06/4c/1e064cdf-6812-8584-8aa1-0c069f2d5e0f/source/512x512bb.jpg',
          username: 'Tabby'
        }
      ]
}

export default Likes

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF'
    },
    buttonContainer: {
      backgroundColor: '#2E9298',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 10,
      shadowOpacity: 0.25
    }
  })