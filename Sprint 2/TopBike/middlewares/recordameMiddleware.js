const path = require('path')
const fs = require('fs')

function recordameMiddleware(req, res, next){
    next();

    if(req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined){

        const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        let userEmails = users.map(user => user.email);
        const reqUser = users[userEmails.lastIndexOf(req.cookies.recordame)];
        if(reqUser != -1){
            console.log('encontrado')
            req.session.usuarioLogueado = reqUser;
        }
    }

}

module.exports = recordameMiddleware;