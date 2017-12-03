//  

const path = require('path')


const env = {
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
