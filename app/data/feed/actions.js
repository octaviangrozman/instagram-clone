import axios from 'axios'

import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,

  FETCH_PHOTOS_PENDING,
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_ERROR,

  LIKE_PHOTO_PENDING,
  LIKE_PHOTO_SUCCESS,
  LIKE_PHOTO_ERROR,

  DISLIKE_PHOTO_PENDING,
  DISLIKE_PHOTO_SUCCESS,
  DISLIKE_PHOTO_ERROR
} from './types'


export const fetchUsers = () => async (dispatch) => {
  dispatch({
    type: FETCH_USERS_PENDING
  })
  try {
    let response = await axios.get('/users')
    dispatch({
      type: FETCH_USERS_SUCCESS,
      data: response.data
    })
  }
  catch(error) {
    dispatch({
      type: FETCH_USERS_ERROR,
      data: error.message
    })
  }
}

export const fetchPhotos = () => async (dispatch) => {
  dispatch({
    type: FETCH_PHOTOS_PENDING
  })
  try {
    let response = await axios.get('/photos')
    dispatch({
      type: FETCH_PHOTOS_SUCCESS,
      data: response.data
    })
  }
  catch(error) {
    dispatch({
      type: FETCH_PHOTOS_ERROR,
      data: error.message
    })
  }
}

export const likePhoto = (photoId, userId) => async (dispatch) => {
  dispatch({
    type: LIKE_PHOTO_PENDING,
    payload: {
      userId,
      photoId
    }
  })
  try {
    let response = await axios.put(`/photos/like`, {
      userId,
      photoId
    })
    dispatch({
      type: LIKE_PHOTO_SUCCESS,
      payload: {
        userId,
        photoId
      }
    })
  }
  catch(error) {
    dispatch({
      type: LIKE_PHOTO_ERROR,
      data: error.message
    })
  }
}

export const dislikePhoto = (photoId, userId) => async (dispatch) => {
  dispatch({
    type: DISLIKE_PHOTO_PENDING,
    payload: {
      userId,
      photoId
    }
  })
  try {
    let response = await axios.put(`/photos/dislike`, {
      userId,
      photoId
    })
    dispatch({
      type: DISLIKE_PHOTO_SUCCESS,
      payload: {
        userId,
        photoId
      }
    })
  }
  catch(error) {
    dispatch({
      type: DISLIKE_PHOTO_ERROR,
      data: error.message
    })
  }
}

// async () => {
//     try {
//       this.setState({ isFetchingUsers: true });
//       console.log(axios.defaults.baseURL);
//       let response = await axios.get('/users');
//       let responseJson = await response.data;
//       this.setState({ users: responseJson, isFetchingUsers: false });
//     } catch(error) {
//       console.error(error);
//     }
//   }

//   fetchPhotos = async () => {
//     try {
//       this.setState({ isFetchingPhotos: true });
//       let response = await axios.get('/photos');
//       let responseJson = await response.data;
//       this.setState({ photos: responseJson, isFetchingPhotos: false });
//     } catch(error) {
//       console.error(error);
//     }
//   }

//   likePhoto = async (photoId) => {
//     try {
//       this.setState({ photoBeingLiked: photoId });
//       let response = await axios.put(`/photos/${photoId}/like`, { });
//       let responseJson = await response.data;
//       const photos = this.state.photos;
//       photos.forEach(photo => {
//         if (photo._id === photoId) {
//           photo.likes += 1;
//         }
//       });
//       this.setState({ photoBeingLiked: null, photos });
//     } catch(error) {
//       console.error(error);
//     }
//   }
