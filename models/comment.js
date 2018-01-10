const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
   content: { type: String, required: true },
   comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

module.exports = mongoose.model('Comment', CommentSchema)