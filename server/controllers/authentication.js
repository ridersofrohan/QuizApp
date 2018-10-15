const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportService = require('../controllers/passport.js');

const bcrypt = require('bcryptjs');

const config = require('../config.js');

const User = require('../models/user.js');

function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds
  });
}

// Set user info from request
function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email,
  };
}

exports.login = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ success: false, error: 'You must enter an email address.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ success: false, error: 'You must enter a password.' });
  }

  User.findOne({email: email}).then((user) => {
    if(!user) {
      return res.status(404).json({ error: 'Your login details could not be verified. Please try again.' });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if(isMatch) {
        let userInfo = setUserInfo(user);
        return res.status(200).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
      }
      return res.status(404).json({ error: 'Your login details could not be verified. Please try again.' });
    });
  });
}

exports.register = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ success: false, error: 'You must enter an email address.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ success: false, error: 'You must enter a password.' });
  }

  User.findOne({ email: email}).then((user) => {
    if (user) {
      return res.status(400).json({
        email: 'Email already exists'
      });
    }

    const newUser = new User({email: email, password: password});

    bcrypt.genSalt(10, (err, salt) => {
      if(err) console.error('There was an error', err);
      else {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) console.error('There was an error', err);
          else {
            newUser.password = hash;
            newUser.save().then((user) => {
              let userInfo = setUserInfo(user);
              return res.status(200).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
              });
            });
          }
        });
      }
    });
  });
}
