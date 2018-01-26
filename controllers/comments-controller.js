const Comment = require('../models/comment')

const Post = require('../models/post');

module.exports = function(app) {




  // CREATE
  app.post('/post/:postId/comments', (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
      return res.redirect('/login');
    }
    const postId = req.params.postId;
    Post.findById(postId).then((post) => {
      const content = req.body.postContent;

      const comment = new Comment({
        content : content,
        username : req.user.username
      });
      comment.save();
      post.comments.unshift(comment);
      post.save();
      return res.redirect('/post/'+postId);
    }).catch((err) => {

    });
  });

};
