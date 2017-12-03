const api = require('./api')
const auth = require('./auth')
const indexController = require('../controllers/index_controller')

module.exports = (app) => {
  app.use('/api', api)
  app.use('/auth', auth)
  app.get('*', async (req, res) => {
    await indexController.getIndexRequest({ req, res })
  })
}
