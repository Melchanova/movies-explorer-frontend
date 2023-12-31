const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const { errorText } = require('../utils/constants');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: errorText.EMAILVALIDATIONERROR,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findOne(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(errorText.AUTHETIFICATIONERROR));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(errorText.AUTHETIFICATIONERROR));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
