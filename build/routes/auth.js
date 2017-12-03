const express = require('express')
const passport = require('../services/auth')
const { auth: { logout, facebook, twitter, google, vk } } = require('../../etc/endpoints')

const router = express.Router()

router.post(logout.backend, (req, res) => {
  req.session.destroy()
  res.sendStatus(200)
})

router.get(facebook.request, passport.authenticate('facebook', { authType: 'rerequest' }))
router.get(facebook.response,
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = req.user
    res.redirect('/')
  }
)

router.get(google.request, passport.authenticate('google', { scope: ['profile'] }))
router.get(google.response,
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = req.user
    res.redirect('/')
  }
)

router.get(vk.request, passport.authenticate('vkontakte'))
router.get(vk.response,
  passport.authenticate('vkontakte'),
  (req, res) => {
    req.session.user = req.user
    res.redirect('/')
  }
)

module.exports = router
