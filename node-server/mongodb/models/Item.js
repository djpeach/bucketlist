const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  senderId: { type: String },
  recipientId: { type: String },
  message: { type: String },
  link: { type: String },
  listId: { type: String }
})

module.exports = mongoose.model('Item', ItemSchema)
