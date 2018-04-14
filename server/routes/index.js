const User = require('./User');
const Photo = require('./Photo');

module.exports = function(app) {
  // User routes
  app.route('/api/signin')
     .post(User.signin);

  app.route('/api/signup')
    .post(User.signup);

  app.route('/api/users')
     .get(User.getUsers)
     .post(User.signup)
     .delete(User.removeAll);

  app.route('/api/users/:id')
     .get(User.getUser);

  app.route('/api/users/:id/photos')
    .get(Photo.getPhotoByUserId);

  // Photo routes
  app.route('/api/photos')
    .get(Photo.getPhotos)
    .post(Photo.addPhoto);

  app.route('/api/photos/:id')
    .get(Photo.getPhoto);

  app.route('/api/photos/like')
    .put(Photo.likePhoto);

  app.route('/api/photos/dislike')
    .put(Photo.dislikePhoto);

  app.route('/api/photos/:id/description')
    .put(Photo.updateDescription);

  app.route('/api/photos/descriptions')
    .put(Photo.updateAllDescriptions);
}
