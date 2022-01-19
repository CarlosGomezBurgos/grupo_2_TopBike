const express = require ('express');

const app = express();

const path = require('path');

app.use(express.static('public'));
app.set('view engine', 'ejs');

const port = 4000;
app.listen(port, () => {
    console.log('El servidor esta funcionando en el puerto:',port)
})

const rutasMain = require('./routes/main');
const rutasProduct = require('./routes/product');

app.use('/',rutasMain);
app.use('/product',rutasProduct);

