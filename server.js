const express = require('express');
const app = express();



var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));



//index
app.get('/', function (req, res) {
  res.render('reddit-index')
})



app.listen(3000, () => console.log('Listening on port 3000!'));
