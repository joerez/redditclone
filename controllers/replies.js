var Post = require('../models/post');
var Comment = require('../models/comment');
var User = require('../models/user');

module.exports = (app) => {
  // NEW REPLY
  app.get('/posts/:postId/comments/:commentId/replies/new', (req, res) => {
  let post
  Post.findById(req.params.postId).then((p) => {
    post = p
    Comment.findById(req.params.commentId)
  }).then((comment) => {
    res.render('replies-new.handlebars', { post, comment });
  }).catch((err) => {
    console.log(err.message);
  });
});

  // CREATE REPLY
  app.post('/posts/:postId/comments/:commentId/replies', (req, res) => {
    console.log(req.body);
  });

}
