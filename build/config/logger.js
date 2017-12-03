const winston = require('winston')
const env = require('./env')

const level = process.env.NODE_ENV === 'development' ? 'debug' : 'info'

const logger = winston.createLogger({
  level,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: env.logs.error, level: 'error' }),
    new winston.transports.File({ filename: env.logs.combined })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

module.exports = logger
