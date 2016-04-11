'use strict';

var Joi = require('joi');

var login = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = {
  login: login,
};
