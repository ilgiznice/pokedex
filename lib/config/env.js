//  @flow

const path = require('path')

type Env = {
  server: {
    domain: string,
    port: number
  },
  assets: {
    static: string
  },
  logs: {
    combined: string,
    error: string
  },
  mongo: {
    domain: string,
    database: string
  }
}

const env: Env = {
  server: {
    domain: 'localhost',
    port: 3000
  },
  assets: {
    static: path.join(__dirname, '../../public')
  },
  logs: {
    combined: path.join(__dirname, '../../logs', 'combined.log'),
    error: path.join(__dirname, '../../logs', 'error.log')
  },
  mongo: {
    domain: 'localhost',
    database: 'pokedex'
  }
}

module.exports = env
