window.addEventListener('load',function(){
    document.querySelector('form').addEventListener('submit', function(e){
        //let errorsList = [];
        let error_counter = 0
        let email = document.querySelector('input#email').value
        let password = document.querySelector('input#password').value
        let email_error_container = document.querySelectorAll('.errors')[0]
        let password_error_container = document.querySelectorAll('.errors')[1]

        if (email == "") {
            error_counter++;
            email_error_container.innerHTML = "El campo de EMAIL está incompleto"
            //errorsList.push('El campo de USUARIO está incompleto')
        } else {email_error_container.innerHTML = "";}
        
        if (password == "") {
            password_error_container.innerHTML = "El campo de PASSWORD está incompleto"
            error_counter++;
            //errorsList.push('El campo de CONTRASEÑA está incompleto')
        }else{password_error_container.innerHTML = "";}

        if(error_counter > 0){
            console.log(error_counter)
            e.preventDefault();
        }

        /* let ulErrors = document.querySelector('div.errors ul')
        ulErrors.innerHTML = "";
        for (let i = 0; i < errorsList.length; i++) {
            ulErrors.innerHTML += '<li>' + errorsList[i] + '</li>'
        } */
    })
})