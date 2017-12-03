const express = require('express')
const expressConfig = require('./config/express')

const app = express()

expressConfig(app)
