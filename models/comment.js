const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
   content: { type: String, required: true },
   comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
   author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Comment', CommentSchema)
