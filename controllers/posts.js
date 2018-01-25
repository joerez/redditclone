var Post = require('../models/post');

module.exports = (app) => {




  // CREATE
app.post('/posts/new', function(req,res) {
    // INSTANTIATE INSTANCE OF POST MODEL
    var post = new Post(req.body);
    post.url = "/posts/" + post._id;
    post.author = req.user.username;
    post.save(function (err) {
        if(err){console.log(err)};
        res.redirect(post.url)
    });
});






};
