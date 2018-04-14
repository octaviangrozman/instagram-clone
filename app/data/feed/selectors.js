
// users
export const usersSelector = state => state.feed.users
export const usersFetchingSelector = state => state.feed.isFetchingUsers

// photos
export const photosSelector = state => state.feed.photos
export const photosFetchingSelector = state => state.feed.isFetchingPhotos

// photo's likes
export const likesSelector = (state, photoId) => state.feed.photos
    .find(photo => photo._id === photoId).likes

// like photo
export const photoLikingSelector = state => state.feed.isLikingPhoto
export const photoDislikingSelector = state => state.feed.isDislikingPhoto
export const photoBeingLikedSelector = state => state.feed.photoBeingLiked

//error
export const errorSelector = state => state.feed.error