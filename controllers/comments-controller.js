const Comment = require('../models/comment')

const Post = require('../models/post');

module.exports = function(app) {

  // CREATE
  app.post('/post/:postId/comments', (req, res) => {

    Post.findById(req.params.postId).then((post) => {
      const comment = new Comment({
        content : req.body.content,
        username : req.user.username
      });
      comment.save((err, comment) => {
        post.comments.unshift(comment);
        post.save((err, post) =>{
          res.redirect('/posts/' + post._id);
        });
      });
    }).catch((err) => {

    });
  });

};
