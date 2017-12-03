const { auth: { facebook, twitter, google, vk } } = require('./endpoints')

const domain = 'http://localhost:3000'
const url = `${domain}/auth`

module.exports = {
  facebook: {
    clientID: '',
    clientSecret: '',
    callbackURL: `${url}${facebook.response}`
  },
  google: {
    clientID: '',
    clientSecret: '',
    callbackURL: `${url}${google.response}`
  },
  vk: {
    clientID: '',
    clientSecret: '',
    callbackURL: `${url}${vk.response}`
  }
}
