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


const posts = require('./controllers/posts.js')(app);



mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/redditclone', { useMongoClient : true });
console.log("You are connected to the db")

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



//index
app.get('/', function (req, res) {
  res.render('reddit-index')
})

//Create a post
app.get('/posts/new', function (req, res) {
  res.render('posts-new.handlebars')
})


app.listen(3000, () => console.log('Listening on port 3000!'));
