'use strict';

const validationSchema = {
  'oneLetter': (value) => {
    const u = value !== undefined;
    const r = /\D/.test(value);
    return u && r
  },
  'start_time': (value) => {
    const t = new Date(value).toISOString() > new Date().toISOString();
    console.log(t);
    return t;
  },
  'end_time': (endTime, startTime) => {
    console.log('called validate endTime');
    const t = new Date(endTime).toISOString() > new Date(startTime).toISOString();
    console.log(t);
    return t;
  }
}

module.exports = {
  validationSchema
}
