const mongoose = require('mongoose')

module.exports.reset = (req, res, next) => {
  mongoose.connection.db.dropCollection('users')
  mongoose.connection.db.dropCollection('items')
  mongoose.connection.db.dropCollection('lists')
  mongoose.connection.db.dropCollection('suggestions')
  res.send('Database has been reset')
}
