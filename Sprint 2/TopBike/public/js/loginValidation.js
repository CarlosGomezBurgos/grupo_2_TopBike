window.addEventListener('load',function(){
    document.querySelector('form').addEventListener('submit', function(e){
        let errorsList = [];

        let email = document.querySelector('input#email').value
        if (email == "") {
            errorsList.push('el campo de "Usuario" --> está incompleto')
        }

        let password = document.querySelector('input#password').value
        if (password == "") {
            errorsList.push('el campo de "Contraseña" --> está incompleto')
        }

        if(errorsList.length > 0){
            e.preventDefault();
        }
        
        let ulErrors = document.querySelector('div.errors ul')
        ulErrors.innerHTML = "";
        for (let i = 0; i < errorsList.length; i++) {
            ulErrors.innerHTML += '<li>' + errorsList[i] + '</li>'
        }
    })
})