const express = require('express');

require('dotenv').config();

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

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

const Auth = require('./controllers/auth.js')(app);
const User = require('./models/user');


mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/redditclone', { useMongoClient : true });
console.log("You are connected to the db")

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//checkAuth middleware
var checkAuth = (req, res, next) => {
  //console.log("Checking authentication");
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
    console.log(req.user)
  }

  next()
}

app.use(cookieParser()); // Add this after you initialize express.

app.use(checkAuth);

const Posts = require('./controllers/posts.js')(app);
const Post = require('./models/post.js');

const Comments = require('./controllers/comments-controller.js')(app);
const Comment = require('./models/comment');

//index
app.get('/', (req, res) => {

  const currentUser = req.user;


  Post.find({}).then((posts) => {
    res.render('posts-index.handlebars', { posts, currentUser })
  }).catch((err) => {
    console.log(err.message);
  })
})

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

// LOGOUT
app.get('/logout', (req, res) => {
  res.clearCookie('nToken');
  res.redirect('/');
});

// LOGIN FORM
app.get('/login', (req, res) => {
  var currentUser = req.user;

  res.render('login.handlebars', { currentUser });
});

// LOGIN
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Find this user name
  User.findOne({ username }, 'username password').then((user) => {

    if (!user) {
      // User not found

      return res.status(401).send({ message: 'Wrong Username or Password *' });
    }
    // Check the password
    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch) {
        // Password does not match
        return res.status(401).send({ message: "Wrong Username or password ?"});
      }
      // Create a token
      const token = jwt.sign(
        { _id: user._id, username: user.username }, process.env.SECRET);
      //  { expiresIn: "60 days" }

      // Set a cookie and redirect to root
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.redirect('/');
    });
  }).catch((err) => {
    console.log(err);
  });
});



app.listen(3000, () => console.log('Listening on port 3000!'));
