const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
})

module.exports = mongoose.model('User', UserSchema)
