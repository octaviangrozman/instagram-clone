import { isFetching, errorMessage, isFetched } from '../utils'
import { combineReducers } from 'redux'

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

const users = (state = [], action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESS: return action.data
        default: return state
    }
}

const photos = (state = [], action) => {
    switch (action.type) {
        case FETCH_PHOTOS_SUCCESS: return action.data
        case LIKE_PHOTO_SUCCESS: return state.map(photo => {
            if (photo._id === action.payload.photoId) return {...photo, likes: [...photo.likes, action.payload.userId]}
            return photo
        })
        case DISLIKE_PHOTO_SUCCESS: return state.map(photo => {
            if (photo._id === action.payload.photoId) return {...photo, likes: photo.likes
                .filter(userId => userId !== action.payload.userId)
            }
            return photo
        })
        default: return state
    }
}

const photoBeingLiked = (state = null, action) => {
    switch (action.type) {
        case LIKE_PHOTO_PENDING: return action.payload.photoId
        case LIKE_PHOTO_SUCCESS:
        case LIKE_PHOTO_ERROR: return null;
        default: return state;
    } 
} 

export default combineReducers({
    users,
    photos,
    photoBeingLiked,
    isFetchingUsers: isFetching({ types: [
        FETCH_USERS_PENDING,
        FETCH_USERS_SUCCESS,
        FETCH_USERS_ERROR
    ]}),
    isFetchingPhotos: isFetching({ types: [
        FETCH_PHOTOS_PENDING,
        FETCH_PHOTOS_SUCCESS,
        FETCH_PHOTOS_ERROR
    ]}),
    isLikingPhoto: isFetching({ types: [
        LIKE_PHOTO_PENDING,
        LIKE_PHOTO_SUCCESS,
        LIKE_PHOTO_ERROR
    ]}),
    isDislikingPhoto: isFetching({ types: [
        DISLIKE_PHOTO_PENDING,
        DISLIKE_PHOTO_SUCCESS,
        DISLIKE_PHOTO_ERROR
    ]}),
    error: errorMessage
  });