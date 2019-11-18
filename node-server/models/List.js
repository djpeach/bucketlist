const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  title: {type: String},
  userId: {type: String}
})

module.exports = mongoose.model('List', ListSchema)
