const User = require('../models/user');

exports.getUsers = function(req, res, next) {
  User.find({}, '_id email', function(err, users){
    if (err) { return next(err); }

    if (users) {
      res.send(users);
    }
  });
}

exports.getUser = function(req, res, next) {
  const id = req.params.id;

  User.find({ _id: id }, function(err, user){
    if (err) { return next(err); }

    if (user) {
      res.send(user);
    }
  });
}

exports.removeAll = function(req, res, next) {
  User.remove({}, function(err){
    if (err) { return next(err); }
    res.status(200).send({ Message: 'All users succesfully deleted from database' });
  });
}

exports.signin = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  User.findOne({ email: email }, function(err, user) {
    if (err) { return next(err); }
    if (!user) { return res.status(422).send({ error: 'No such a user'}); }

    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return res.status(422).send({ error: 'Incorrect credentials'}); }

      return res.status(200).send({ message: 'logged in succesfully' });
    });
  });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  User.findOne({ email: email }, function(err, existingUser){
    if (err) { return next(err); }

    if (existingUser) { res.status(422).send({ error: 'Email is in use' }); }
    else {
      const user = new User({
        email: email,
        password: password
      });
      console.log('New user to register');
      user.save(function(err) {
        if (err) { return next(err); }

        res.json(user);
      });
    }
  });
}
