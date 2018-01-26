import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import NavBar from '../components/layout/NavBar';
import { Icon } from 'react-native-elements';
import axios from 'axios';

// https://maxcdn.icons8.com/windows10/PNG/512/Logos/instagram_new-512.png
// https://scontent-arn2-1.cdninstagram.com/t51.2885-15/e35/22427595_344207865991116_37724329848340480_n.jpg
class Feed extends React.Component {

  state = {
    users: [],
    photos: [],
    isFetchingUsers: false,
    isFetchingPhotos: false,
    photoBeingLiked: null
  }

  componentDidMount() {
    this.fetchUsers();
    this.fetchPhotos();
  }

  fetchUsers = async () => {
    try {
      this.setState({ isFetchingUsers: true });
      console.log(axios.defaults.baseURL);
      let response = await axios.get('/users');
      let responseJson = await response.data;
      this.setState({ users: responseJson, isFetchingUsers: false });
    } catch(error) {
      console.error(error);
    }
  }

  fetchPhotos = async () => {
    try {
      this.setState({ isFetchingPhotos: true });
      let response = await axios.get('/photos');
      let responseJson = await response.data;
      this.setState({ photos: responseJson, isFetchingPhotos: false });
    } catch(error) {
      console.error(error);
    }
  }

  likePhoto = async (photoId) => {
    try {
      this.setState({ photoBeingLiked: photoId });
      let response = await axios.put(`/photos/${photoId}/like`, { });
      let responseJson = await response.data;
      const photos = this.state.photos;
      photos.forEach(photo => {
        if (photo._id === photoId) {
          photo.likes += 1;
        }
      });
      this.setState({ photoBeingLiked: null, photos });
    } catch(error) {
      console.error(error);
    }
  }

  renderUserPhotos = (user) => {
    const { photos, photoBeingLiked } = this.state;
    const userPhotos = photos.filter(photo => photo.userId === user._id);
    return userPhotos.map(({ _id, uri, likes, description }) => <View style={styles.photoContainer}>
      <View style={styles.details}>
        <Icon name='person-outline' />
        <Text style={styles.username}>{user.email}</Text>
      </View>
      <TouchableWithoutFeedback style={styles.photoButtonContainer} onPress={() => this.likePhoto(_id)}>
        <Image style={styles.photo} source={{ uri }}
          style={[{height: 400}, _id === photoBeingLiked ? styles.photoBeingLiked : null]}
        >
          <Icon name="favorite" style={[styles.likeIcon, _id === photoBeingLiked && styles.visible]} size={170} />
        </Image>
      </TouchableWithoutFeedback>
      <Text style={[styles.photoDescription, styles.bold]}>Likes: {likes}</Text>
      <Text style={styles.photoDescription}>
        <Text style={styles.bold}>{user.email.split('@')[0]}: </Text>
        {description}
      </Text>
    </View>);
  }

  renderUsers = () => this.state.users.map(user => this.renderUserPhotos(user));

  render() {
    const { users, photos, isFetchingUsers, isFetchingPhotos } = this.state;
    return (
      <ScrollView>
        <NavBar />
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
  }
});

export default Feed;
