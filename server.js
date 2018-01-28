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
  //  console.log(req.user)
  }

  next()
}

app.use(cookieParser()); // Add this after you initialize express.

app.use(checkAuth);

const Posts = require('./controllers/posts.js')(app);
const Post = require('./models/post.js');

const Comments = require('./controllers/comments-controller.js')(app);
const Comment = require('./models/comment');
require('./controllers/replies.js');
const Replies = require('./controllers/replies.js');

//index
app.get('/', (req, res) => {

  Post.find({}).then((posts) => {
    res.render('posts-index.handlebars', { posts, currentUser : req.user })
  }).catch((err) => {
    console.log(err.message);
  })
})





app.listen(3000, () => console.log('Listening on port 3000!'));
