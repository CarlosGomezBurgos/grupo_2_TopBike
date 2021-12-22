const express = require ('express');
const app = express();
const path = require('path');
app.use(express.static('public'))
const port = 4000;
app.listen(port, () => {
    console.log('El servidor esta funcionando en el puerto:',port)
})

app.get('/', (req, res)=>{ //analiza la ruta ./ para saber que hacer ahi.
   res.sendFile(path.resolve('./views/index.html'))
})
app.get('/productDetail', (req, res)=>{ //analiza la ruta ./ para saber que hacer ahi.
    res.sendFile(path.resolve('./views/productDetail.html'))
})
app.get('/productCart', (req, res)=>{ //analiza la ruta ./ para saber que hacer ahi.
    res.sendFile(path.resolve('./views/productCart.html'))
})