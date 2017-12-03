const Pokedex = require('pokedex-promise-v2')

const env = require('./env')

const options = {
  protocol: 'https',
  hostName: `${env.server.domain}:${env.server.port}`,
  versionPath: env.pokedex.version,
  cacheLimit: env.pokedex.cache,
  timeout: env.pokedex.timeout
}
var P = new Pokedex(options)

module.exports = P
