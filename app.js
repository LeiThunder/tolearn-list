const express = require('express');
const tolearnControler = require('./controlers/tolearnControlers');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

tolearnControler(app);

app.listen(3000);

console.log('server is running');