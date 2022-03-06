const express = require ('express');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');
const session = require('express-session')
const recordameMiddleware = require('./middlewares/recordameMiddleware')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('./public'));
app.use(session({
    secret:'Secreto !!!',
    resave: false,
    saveUninitialized: false,
}));
app.use(recordameMiddleware);

app.set('view engine', 'ejs');

const port = 4000;
app.listen(port, () => {
    console.log('El servidor esta funcionando en el puerto:',port)
})

const rutasMain = require('./routes/main');
const rutasProduct = require('./routes/product');
const rutasUser = require('./routes/user');

app.use('/',rutasMain);
app.use('/product',rutasProduct);
app.use('/user',rutasUser);