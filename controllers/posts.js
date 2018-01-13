var Post = require('../models/post');

module.exports = (app) => {




  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    if (req.user) {

    var post = new Post(req.body);
    post.author = req.user._id

    console.log("------------------------")
    console.log(post);
    post.save().then((post) => {
  return User.findById(req.user._id)
}).then((user) => {
  user.posts.unshift(post);
  user.save();
  // REDIRECT TO THE NEW POST
  res.redirect('/posts/'+ post._id)
}).catch((err) => {
  console.log(err.message);
});

  } else {
  return res.status(401); // UNAUTHORIZED
}
    // SAVE INSTANCE OF POST MODEL TO DB
    // Post.create((err, post) => {
    //   if (err) {
    //     return(err)
    //   }
    //
    //   // REDIRECT TO THE ROOT
    //    res.redirect(`/`);
    // })





  });





};
