const mongoose = require('mongoose')

const { serverLog } = require('../conf/loggers')

module.exports.reset = (req, res, next) => {
  serverLog(`Resetting database ...`)
  mongoose.connection.db.dropCollection('users').catch(() => {})
  mongoose.connection.db.dropCollection('items').catch(() => {})
  mongoose.connection.db.dropCollection('lists').catch(() => {})
  res.send('Database has been reset')
}
