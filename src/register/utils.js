'use strict';

const validationSchema = {
  'name': (value) => {
    const u = value !== undefined
    const b = /\w+( +\w+)*$/.test(value);
    return u && b;
  },
  'email': (value) => {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    .test(value);
  },
  'password': (value) => {
    return /^(?=.*[0-9])(?=.{3,}[a-zA-Z])([\S]+)$/.test(value)
  }
}

module.exports = {
  validationSchema
}
