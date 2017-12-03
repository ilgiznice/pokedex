const passport = require('passport')
const Strategy = require('passport-facebook').Strategy
const secrets = require('../../etc/secrets')

passport.use(new Strategy({
  clientID: secrets.facebook.clientId,
  clientSecret: secrets.facebook.clientSecret,
  callbackURL: secrets.facebook.callbackURL
}, function (accessToken, refreshToken, profile, cb) {
  console.log(profile)
  return cb(null, profile)
}))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})


