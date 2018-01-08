const express = require('express');
const app = express();

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));



app.get('/', (req, res) => res.send('Hello World!'));




app.listen(3000, () => console.log('Listening on port 3000!'));
