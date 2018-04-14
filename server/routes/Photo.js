const Photo = require('../models/photo');

exports.getPhotos = function(req, res, next) {
  Photo.find({}, function(err, photos){
    if (err) { return next(err); }

    if (!photos) { return res.status(422).send({ error: 'No photos'}); }

    if (photos) {
      res.send(photos);
    }
  });
}

exports.getPhoto = function(req, res, next) {
  const id = req.params.id;

  Photo.findOne({ _id: id }, function(err, photo){
    if (err) { return next(err); }

    if (!photo) { return res.status(422).send({ error: 'No such photo'}); }

    if (photo) {
      res.send(photo);
    }
  });
}

exports.getPhotoByUserId = function(req, res, next) {
  const userId = req.params.userId;

  Photo.findOne({ userId: userId }, function(err, photo){
    if (err) { return next(err); }

    if (!photo) { return res.status(422).send({ error: 'No such photo'}); }

    if (photo) {
      res.send(photo);
    }
  });
}

exports.addPhoto = function(req, res, next) {
  const userId = req.body.userId;
  const uri = req.body.uri;

  if (!userId || !uri) {
    return res.status(422).send({ error: 'You must provide userId and uri'});
  }

  const photo = new Photo({
    userId: userId,
    uri: uri
  });
  console.log('New photo added to user ' + userId + ', uri: ' + uri);
  photo.save(function(err) {
    if (err) { return next(err); }

    res.json(photo);
  });
}

exports.updateDescription = function(req, res, next) {
  const id = req.params.id;
  const description = req.body.description;
  const updateAll = req.body.updateAll;

  Photo.findById(id, function(err, photo){
    if (err) { return next(err); }

    if (!photo) { return res.status(422).send({ error: 'No such photo'}); }

    if (photo) {
      photo.description = description || photo.description;
      photo.save(function (err, updatedPhoto) {
        if (err) return next(err);
        res.send({ message: 'Succesfully updated photo description.', updatedPhoto });
      });
    }
  });
}

exports.updateAllDescriptions = function(req, res, next) {
  const description = req.body.description;

  Photo.find({}, function(err, photos){
    if (err) { return next(err); }

    photos.forEach(photo => {
      photo.description = description || photo.description;
      photo.save(function (err, updatedPhoto) {
        if (err) return handleError(err);
      });
    })
    res.send({ message: 'Succesfully updated all photos descriptions.' });
  });
}

exports.likePhoto = function(req, res, next) {
  const { photoId, userId } = req.body;

  Photo.findById(photoId, function(err, photo){
    if (err) { return next(err); }

    if (!photo) { return res.status(422).send({ error: 'No such photo'}); }

    if (photo) {
      photo.likes = !photo.likes.includes(userId) ? [...photo.likes, userId] : photo.likes;
      photo.save(function (err, updatedPhoto) {
        if (err) return next(err);
        res.send({ message: 'Succesfully liked photo.', updatedPhoto });
      });
    }
  });
}

exports.dislikePhoto = function(req, res, next) {
  const photoId = req.body.photoId;
  const userId = req.body.userId;

  Photo.findById(photoId, function(err, photo){
    if (err) { return next(err); }

    if (!photo) { return res.status(422).send({ error: 'No such photo'}); }

    if (photo) {
      photo.likes = photo.likes.includes(userId) ? photo.likes.filter(p => p !== userId) : photo.likes;
      photo.save(function (err, updatedPhoto) {
        if (err) return next(err);
        res.send({ message: 'Succesfully disliked photo.', updatedPhoto });
      });
    }
  });
}
