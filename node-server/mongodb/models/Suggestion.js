const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SuggestionSchema = new Schema({
  message: { type: String }
})

module.exports = mongoose.model('Suggestion', SuggestionSchema)