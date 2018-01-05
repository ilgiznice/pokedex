const passport = require('passport')
const logger = require('../../config/logger')

const secretsArePresent = (provider) => {
  return provider.clientID && provider.clientSecret
}

try {
  const secrets = require('../../../etc/secrets')
  if (secrets.facebook && secretsArePresent(secrets.facebook)) {
    require('./facebook')(secrets.facebook)
  }
  if (secrets.google && secretsArePresent(secrets.google)) {
    require('./google')(secrets.google)
  }
  if (secrets.vk && secretsArePresent(secrets.vk)) {
    require('./vk')(secrets.vk)
  }
} catch (err) {
  logger.error('Auth services', err)
}

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

module.exports = passport
