const {requestLog} = require('../conf/loggers')

module.exports = (req, res, next) => {
  requestLog(`${req.method} - ${req.originalUrl}`)
  next()
}