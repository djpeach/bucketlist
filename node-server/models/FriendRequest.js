const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendRequestSchema = new Schema({
  senderId: { type: String },
  recipientId: { type: String },
})

module.exports = mongoose.model('FriendRequest', FriendRequestSchema)
