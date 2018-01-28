var Post = require('../models/post');

module.exports = (app) => {

  //Create a post
  app.get('/posts/new', function(req,res){
      res.render('posts-new.handlebars' , {currentUser : req.user});
  });

  //Show a post
  app.get('/posts/:id', (req, res) => {
    var currentUser = req.user;

   // LOOK UP THE POST
  Post.findById(req.params.id).populate('comments').then((post) => {
    res.render('post-show.handlebars', { post, currentUser })
  }).catch((err) => {
    console.log(err.message)
      })
  })

  // SUBREDDIT
  app.get('/n/:subreddit', function(req, res) {
    var currentUser = req.user;

    Post.find({ subreddit: req.params.subreddit }).then((posts) => {
      res.render('posts-index.handlebars', { posts, currentUser })
    }).catch((err) => {
      console.log(err)
    })
  });


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
