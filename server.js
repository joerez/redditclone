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


const Posts = require('./controllers/posts.js')(app);
const Post = require('./models/post.js');


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
app.get('/posts/:id', function (req, res) {
 // LOOK UP THE POST
 Post.findById(req.params.id).then((post) => {
   res.render('post-show.handlebars', { post })
 }).catch((err) => {
   console.log(err.message)
 })
})



app.listen(3000, () => console.log('Listening on port 3000!'));
