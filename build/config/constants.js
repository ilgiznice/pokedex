const path = require('path')

module.exports = {
  server: {
    port: 3000
  },
  assets: {
    static: path.join(__dirname, '../../public'),
    'index.html': path.join(__dirname, '../../public', 'index.html')
  },
  logs: {
    combined: path.join(__dirname, '../../logs', 'combined.log'),
    error: path.join(__dirname, '../../logs', 'error.log')
  }
}
