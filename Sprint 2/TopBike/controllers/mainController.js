const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    index: (req,res) => {
         res.render('index',{productos: products});

    },
    register: (req,res) => {
         res.render('index');

    },
    login: (req,res) => {
         res.render('index');

    },
}

module.exports = mainController;