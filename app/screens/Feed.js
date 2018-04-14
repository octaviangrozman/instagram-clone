import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView, 
  Image, 
  TouchableWithoutFeedback
} from 'react-native'
// import NavBar from '../components/layout/NavBar'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Actions } from 'react-native-router-flux'

import { feedActions, feedSelectors } from '../data/feed'

// https://maxcdn.icons8.com/windows10/PNG/512/Logos/instagram_new-512.png
// https://scontent-arn2-1.cdninstagram.com/t51.2885-15/e35/22427595_344207865991116_37724329848340480_n.jpg

const PhotoActionsContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10;
`

const fakeUsers = [
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

class Feed extends React.Component {

  state = {
    users: [],
    photos: [],
    isFetchingUsers: false,
    isFetchingPhotos: false,
    photoBeingLiked: null,
    userId: '59e8e57f45ace13968dc5f9e'
  }

  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchPhotos()
  }

  goToLikes = (users) => {
    Actions.likes({users});
  }

  likePhoto = (photoId) => {
    this.setState({ photoBeingLiked: photoId })
    this.props.likePhoto(photoId, this.state.userId)
    setTimeout(() => this.setState({ photoBeingLiked: null }), 50)
  }

  dislikePhoto = (photoId) => {
    this.setState({ photoBeingLiked: photoId })
    this.props.dislikePhoto(photoId, this.state.userId)
    setTimeout(() => this.setState({ photoBeingLiked: null }), 50)
  }
  
  handlePhotoTap = (photoId) => {
    const { likesByPhotoId } = this.props
    if (!likesByPhotoId(photoId).includes(this.state.userId)) {
      this.likePhoto(photoId)
    } else {
      this.dislikePhoto(photoId)
    }
  }

  isPhotoLikedByCurrentUser = (photoId) => {
    return this.props.likesByPhotoId(photoId).includes(this.state.userId)
  }

  renderUserPhotos = (user) => {
    const { photoBeingLiked } = this.state
    const { photos, likesByPhotoId } = this.props
    const userPhotos = photos.filter(photo => photo.userId === user._id);
    return userPhotos.map(({ _id, uri, likes, description }) => <View style={styles.photoContainer}>
      <View style={styles.details}>
        <Icon name='person-outline' />
        <Text style={styles.username}>{user.email}</Text>
      </View>
      <TouchableWithoutFeedback style={styles.photoButtonContainer} onPress={() => this.handlePhotoTap(_id)}>
        <Image style={styles.photo} source={{ uri }}
          style={[{height: 400}, _id === photoBeingLiked ? styles.photoBeingLiked : null]}
        >
          <Icon name="favorite" style={[styles.likeIcon, _id === photoBeingLiked && styles.visible]} size={170} />
        </Image>
      </TouchableWithoutFeedback>
      <View style={styles.photoActionsContainer}>
        {/* md-heart */}
        {!this.isPhotoLikedByCurrentUser(_id) ? <Icon 
            name='md-heart-outline' 
            type='ionicon' 
            style={[styles.heartIcon]} 
            size={30} 
            onPress={() => this.handlePhotoTap(_id)}
          /> : 
          <Icon
            name='md-heart'
            type='ionicon'
            style={[styles.heartIcon]} 
            size={30} 
            color={'red'}
            onPress={() => this.handlePhotoTap(_id)}
          />
        }
        <Icon name='ios-text-outline' type='ionicon' size={32} />
      </View>
      <Text 
        style={[styles.photoDescription, styles.bold]}
        onPress={() => this.goToLikes(fakeUsers)}
      >
        {likesByPhotoId(_id).length} likes
      </Text>
      <Text style={styles.photoDescription}>
        <Text style={styles.bold}>{user.email.split('@')[0]}: </Text>
        {description}
      </Text>
    </View>);
  }

  renderUsers = () => this.props.users.map(user => this.renderUserPhotos(user));

  render() {
    const { isFetchingUsers, isFetchingPhotos } = this.state;
    return (
      <ScrollView>
        {/* <NavBar /> */}
        {(isFetchingUsers || isFetchingPhotos) && <Text>Loading...</Text>}
        {this.renderUsers()}
        <Text style={styles.copyright}>Created with love by <Text style={styles.bold}>Octavian</Text></Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  photoContainer: {
    marginBottom: 50
  },
  photoBeingLiked: {
    opacity: .5,
    zIndex: 1
  },
  visible: {
    opacity: 1
  },
  details: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  username: {
    marginLeft: 5
  },
  photoDescription: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: 14
  },
  photo: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  likeIcon: {
    opacity: 0,
    zIndex: -1,
    marginLeft: 120,
    marginTop: 100
  },
  bold: {
    fontWeight: "600"
  },
  copyright: {
    borderColor: '#333',
    borderTopWidth: 2,
    paddingTop: 15,
    paddingBottom: 40,
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  photoActionsContainer: {
    flexDirection: 'row',
    padding: 10
  },
  heartIcon: {
    marginRight: 15
  }
});

const mapStateToProps = state => ({
  users: feedSelectors.usersSelector(state),
  photos: feedSelectors.photosSelector(state),
  photoBeingLiked: feedSelectors.photoBeingLikedSelector(state),
  likesByPhotoId: photoId => feedSelectors.likesSelector(state, photoId),
  isFetchingUsers: feedSelectors.usersFetchingSelector(state),
  isFetchingPhotos: feedSelectors.photosFetchingSelector(state),
  isLikingPhoto: feedSelectors.photoLikingSelector(state),
  error: feedSelectors.errorSelector(state)
})

const mapDispatchToProps = {
  ...feedActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
