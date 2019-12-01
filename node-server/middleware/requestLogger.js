const { requestLog } = require('../conf/loggers')

module.exports = (req, res, next) => {
  let log = `${req.method} - ${req.originalUrl}`
  if ( req.originalUrl.startsWith('/graphql') ) {
    return next()
  }
  requestLog(log)
  return next()
}
