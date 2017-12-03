const passport = require('passport')
const Strategy = require('passport-google-oauth20').Strategy
const { save } = require('../../models/user')
const { google } = require('../../../etc/secrets')

passport.use(new Strategy({
  clientID: google.clientID,
  clientSecret: google.clientSecret,
  callbackURL: google.callbackURL
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    const params = {
      id: profile.id,
      name: profile.displayName,
      photo: profile.photos && profile.photos[0].value,
      provider: 'google'
    }
    await save(params)
    return cb(null, params)
  } catch (err) {
    return cb(err)
  }
}))
