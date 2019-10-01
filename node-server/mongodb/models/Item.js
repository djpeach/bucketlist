const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
  link: { type: String },
  accepted: { type: Boolean }
})

module.exports = mongoose.model('Item', ItemSchema)
