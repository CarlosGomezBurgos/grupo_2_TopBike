window.addEventListener('load',function(){
    document.querySelector('form').addEventListener('submit', function(e){
        let errorsList = [];

        let email = document.querySelector('input#email').value
        if (email == "") {
            errorsList.push('el campo de "Usuario" tiene que estar completo')
        }

        let password = document.querySelector('input#password').value
        if (password == "") {
            errorsList.push('el campo de "Contraseña" tiene que estar completo')
        }

        if(errorsList.length > 0){
            e.preventDefault();
        }
        
        let ulErrors = document.querySelector('div.errors ul')
        for (let i = 0; i < errorsList.length; i++) {
            ulErrors.innerHTML += '<li>' + errorsList[i] + '</li>'
        }
    })
})