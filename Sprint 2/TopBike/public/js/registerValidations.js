document.addEventListener("DOMContentLoaded", function() { 
    document.querySelector('form').addEventListener('submit', function(e){

        //let errorsList = [];
        let error_counter = 0
        let name = document.querySelector('input#name').value
        let email = document.querySelector('input#email').value
        let password = document.querySelector('input#password').value
        let filePath = document.getElementById('file').value
        let name_error_container = document.querySelectorAll('.errors')[0]
        let email_error_container = document.querySelectorAll('.errors')[1]
        let password_error_container = document.querySelectorAll('.errors')[2]
        let avatar_error_container = document.querySelectorAll('.errors')[3]
        
        //let name = document.querySelector('input#name').value
        if (name == "") {
            error_counter++;
            name_error_container.innerHTML = 'el campo de NOMBRE COMPLETO está incompleto'
        } else {
            if(name.length < 2) {
                error_counter++;
                name_error_container.innerHTML ='el campo NOMBRE COMPLETO deberá tener al menos 2 caracteres'
            } else {name_error_container.innerHTML = '';}
        }

        //let email = document.querySelector('input#email').value
        if (email == "") {
            error_counter++;
            email_error_container.innerHTML = 'el campo de CORREO ELECTRONICO está incompleto'
        } else {email_error_container.innerHTML = "";
            //deberá ser valido
            //No puede repetirse con los e-mails ya registrados.
        }
        
        //let password = document.querySelector('input#password').value
        if (password == "") {
            error_counter++;
            password_error_container.innerHTML = 'el campo de CONTRASEÑA está incompleto'
        } else {
            if(password.length < 8) {
                error_counter++;
                password_error_container.innerHTML = 'el campo CONTRASEÑA deberá tener al menos 8 caracteres';
            }else {password_error_container.innerHTML = '';}
            //Deberá tener letra mayuscula, minuscula, un numero y un caracter especial.
        }

        let allowedExtensions = /(.jpg|.jpeg|.png)$/i;
        if (!filePath) {
            error_counter++;
            avatar_error_container.innerHTML = 'El campo IMAGEN DE PERFIL está incompleto'
        } else {
            if(!allowedExtensions.exec(filePath)){
                error_counter++;
                avatar_error_container.innerHTML = 'Ingresar un formato de archivo válido: .jpeg/.jpg/.png/';
            }else {avatar_error_container.innerHTML = ""}         
        }
        
        if(error_counter > 0){
            e.preventDefault();
        }

    })
})
