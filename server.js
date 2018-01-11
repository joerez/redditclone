const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



var exphbs = require('express-handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Controller and model exports

const Posts = require('./controllers/posts.js')(app);
const Post = require('./models/post.js');

const Comments = require('./controllers/comments-controller.js')(app);
const Comment = require('./models/comment')



mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/redditclone', { useMongoClient : true });
console.log("You are connected to the db")

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



//index
app.get('/', function (req, res) {
  Post.find({}).then((posts) => {
    res.render('posts-index.handlebars', { posts: posts })
  }).catch((err) => {
    console.log(err.message);
  })
})

//Create a post
app.get('/posts/new', function (req, res) {
  res.render('posts-new.handlebars')
})

//Show a post
app.get('/posts/:id', (req, res) => {
 // LOOK UP THE POST
Post.findById(req.params.id).populate('comments').then((post) => {
  res.render('post-show.handlebars', { post })
}).catch((err) => {
  console.log(err.message)
})

})

// SUBREDDIT
app.get('/n/:subreddit', function(req, res) {
  Post.find({ subreddit: req.params.subreddit }).then((posts) => {
    res.render('posts-index.handlebars', { posts })
  }).catch((err) => {
    console.log(err)
  })
});

// CREATE Comment
app.post('/posts/:postId/comments', function (req, res) {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment(req.body)

  // SAVE INSTANCE OF Comment MODEL TO DB
  comment.save().then((comment) => {
    return Post.findById(req.params.postId)
  }).then((post) => {
    post.comments.unshift(comment)
    return post.save()
  }).then((post) => {
    res.redirect(`/`)
  }).catch((err) => {
    console.log(err)
  })
})




app.listen(3000, () => console.log('Listening on port 3000!'));
