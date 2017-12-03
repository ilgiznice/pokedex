const passport = require('passport')

require('./facebook')
require('./google')
// require('./twitter')
require('./vk')

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

module.exports = passport
