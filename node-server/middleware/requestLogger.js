const { requestLog } = require('../conf/loggers')

module.exports = (req, res, next) => {
  let log = `${req.method} - ${req.originalUrl}`
  if (
    req.originalUrl.startsWith('/graphql') &&
    req.body.query &&
    !req.body.query.includes('IntrospectionQuery')
  ) {
    log += req.body.query.replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s+/g, ' ')
  }
  requestLog(log)
  next()
}
