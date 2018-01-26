var Post = require('../models/post');

module.exports = (app) => {

  // CREATE
app.post('/posts/new', function(req,res) {
    // INSTANTIATE INSTANCE OF POST MODEL
    console.log(req.user)
    var post = new Post(req.body);
    //post.url = "/posts/" + post._id;
    //post.url = req.post.user
    post.posturl = "/posts/" + post._id;
    post.username = req.user.username;
    post.save( (err, post) => {
        if(err){console.log(err)};
        console.log(post);
        res.redirect(post.posturl);
    });
  });
};
