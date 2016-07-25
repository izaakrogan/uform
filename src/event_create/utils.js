'use strict';

const validationSchema = {
  'oneLetter': (value) => {
    const u = value !== undefined;
    const r = /\D/.test(value);
    return u && r
  }
}

module.exports = {
  validationSchema
}
