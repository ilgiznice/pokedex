const passport = require('passport')
const Strategy = require('passport-vkontakte').Strategy
const { save } = require('../../models/user')

module.exports = (vk) => {
  passport.use(new Strategy({
    clientID: vk.clientID,
    clientSecret: vk.clientSecret,
    callbackURL: vk.callbackURL
  }, async (accessToken, refreshToken, profile, cb) => {
    try {
      const params = {
        id: profile.id,
        name: profile.displayName,
        photo: profile.photos && profile.photos[0].value,
        provider: 'vk'
      }
      await save(params)
      return cb(null, params)
    } catch (err) {
      return cb(err)
    }
  }))
}
