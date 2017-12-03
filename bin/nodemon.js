const path = require('path')
const exec = require('child-process-promise').exec

exec('npm run flow:build')
  .then(function () {
    require(path.join(__dirname, '../build/'))
  })
  .fail(function (err) {
    console.error('ERROR: ', err)
  })
