const mongoose = require('mongoose')

const { serverLog } = require('../conf/loggers')

module.exports.reset = (req, res, next) => {
  serverLog(`Resetting database ...`)
  mongoose.connection.db.dropCollection('users')
  mongoose.connection.db.dropCollection('items')
  mongoose.connection.db.dropCollection('lists')
  res.send('Database has been reset')
}
