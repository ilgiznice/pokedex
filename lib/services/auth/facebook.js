const passport = require('passport')
const Strategy = require('passport-facebook').Strategy
const { save } = require('../../models/user')

module.exports = (facebook) => {
  passport.use(new Strategy({
    clientID: facebook.clientID,
    clientSecret: facebook.clientSecret,
    callbackURL: facebook.callbackURL
  }, async (accessToken, refreshToken, profile, cb) => {
    try {
      const params = {
        id: profile.id,
        name: profile.displayName,
        photo: profile.photos && profile.photos[0].value,
        provider: 'facebook'
      }
      await save(params)
      return cb(null, params)
    } catch (err) {
      return cb(err)
    }
  }))
}
