var Post = require('../models/post');
var Comment = require('../models/comment');
var User = require('../models/user');

module.exports = (app) => {
  // NEW REPLY
  app.get('/posts/:postId/comments/:commentId/replies/new', (req, res) => {
    console.log("We got here");
    let post;

    const postId = req.params.postId;
    const commentId = req.params.commentId;

    Post.findById(postId).then((p) => {
      post = p
      Comment.findById(commentId)
    }).then((comment) => {
      console.log("Here's post id: " + postId)
      res.render('replies-new.handlebars', {post, comment});
    }).catch((err) => {
      console.log(err.message);
    });
});

// CREATE REPLY
app.post('/posts/:postId/comments/:commentId/replies', (req, res) => {
  // LOOKUP THE PARENT POST
  Post.findById(req.params.postId).then((post) => {
    // FIND THE CHILD COMMENT
    var comment = post.comments.id(req.params.commentId);
    // ADD THE REPLY
    comment.comments.unshift(req.body);
    // SAVE THE CHANGE TO THE PARENT DOCUMENT
    return post.save();
  }).then((post) => {
    // REDIRECT TO THE PARENT POST#SHOW ROUTE
    res.redirect('/posts/' + post._id);
  }).catch((err) => {
    console.log(err.message);
  });
});


}
