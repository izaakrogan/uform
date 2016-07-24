const validationSchema = {
  'name': (value) => {
    return /\w+( +\w+)*$/.test(value);
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
