const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
   content: { type: String, required: true },
   comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
   username: { type: String, required: true },
   idpost: [{type: Schema.Types.ObjectId, ref: 'post'}]
})

const BlogPost = new Schema({
  username  : { type: String, required: true },
  title     : String,
  body      : String,
  date      : Date,
  comments  : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  meta      : {
    votes : Number,
    favs  : Number
    }
});


module.exports = mongoose.model('Comment', CommentSchema, 'Blogpost', BlogPost)
