const passport = require('passport')
const Strategy = require('passport-twitter').Strategy
const { twitter } = require('../../../etc/secrets')

passport.use(new Strategy({
  consumerKey: twitter.consumerKey,
  consumerSecret: twitter.consumerSecret,
  callbackURL: twitter.callbackURL
}, function (accessToken, refreshToken, profile, cb) {
  console.log(profile)
  return cb(null, profile)
}))
