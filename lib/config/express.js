const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const bodyParser = require('body-parser')
const logger = require('./logger')
const env = require('./env')
const routes = require('../routes/index')

module.exports = (app) => {
  mongoose.connect(`mongodb://${env.mongo.domain}/${env.mongo.database}`, { useMongoClient: true })
  mongoose.Promise = Promise
  app.use(morgan('tiny'))
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(passport.initialize())
  const MongoStore = connectMongo(expressSession)
  app.use(expressSession({
    secret: 'That\'s not a secret if everyone knows it',
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }));
  app.use('/static', express.static(env.assets.static))
  routes(app)

  app.listen(env.server.port, () => {
    logger.info(`Server started at localhost:${env.server.port}`)
  })
}
