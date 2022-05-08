const express = require ('express');
const app = express();
const cors = require('cors');

const cookies = require('cookie-parser')
const session = require('express-session')
const recordameMiddleware = require('./middlewares/recordameMiddleware')
const userLoggedMiddelware = require('./middlewares/userLoggedMiddleware')
app.use(cors());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const rutasMain = require('./routes/main');
const rutasProduct = require('./routes/product');
const rutasUser = require('./routes/user');

const apiRouter = require('./routes/api')

app.use(session({
    secret:'Secreto !!!',
    resave: false,
    saveUninitialized: false,
}));
app.use(cookies());
app.use(recordameMiddleware);
app.use(userLoggedMiddelware);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');


app.use(express.static('./public'));

app.use('/',rutasMain);
app.use('/product',rutasProduct);
app.use('/user',rutasUser);
app.use('/api', apiRouter)


const port = 4000;
app.listen(port, () => {
    console.log('El servidor esta funcionando en el puerto:',port)
})


const req = require('express/lib/request');
