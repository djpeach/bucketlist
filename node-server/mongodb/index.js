module.exports.UserModel = require('./models/User')
module.exports.ItemModel = require('./models/Item')
module.exports.ListModel = require('./models/List')

const dbLogger = require('easy-log')('app:db')
const mongoose = require('mongoose')

module.exports.getConnectionString = function() {
  return `mongodb://${ process.env.DB_USER }:${ process.env.DB_PW }@ds235401.mlab.com:35401/node-bucketlist`
}
