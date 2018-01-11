var Post = require('../models/post');

module.exports = (app) => {

  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    var post = new Post(req.body);
    console.log("------------------------")
    console.log(post);
    post.save().then((post) => {
      console.log("Post saved!")
      res.redirect(`/`);
    }).catch((err) => {
      console.log(err.message)
    })
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
