window.addEventListener('load',function(){
    document.querySelector('form').addEventListener('submit', function(e){
        let errorsList = [];
        
        let name = document.querySelector('input#name').value
        if (name == "") {
            errorsList.push('el campo de "Nombre Completo" incompleto')
        } else {
            if(name.length < 2) {
                errorsList.push('el campo "Nombre Completo" deberá tener al menos 2 caracteres')
            }
        }

        let email = document.querySelector('input#email').value
        if (email == "") {
            errorsList.push('el campo de "Correo Electronico" incompleto')
        }

        let password = document.querySelector('input#password').value
        if (password == "") {
            errorsList.push('el campo de "Contraseña" incompleto')
        }

        let fileInput = document.getElementById('file');
        let filePath = fileInput.value;
        let allowedExtensions = /(.jpg|.jpeg|.png)$/i;
        if (!filePath) {
            errorsList.push('El campo "Imagen de perfil" incompleto')
        } else {
            if(!allowedExtensions.exec(filePath)){
                errorsList.push('Ingresar un formato de archivo válido: .jpeg/.jpg/.png/');
            } else {
                //Image preview
                if (fileInput.files && fileInput.files[0]) {
                    let reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById('imagePreview')
                            .innerHTML = '<img src="'+e.target.result+'"/>';
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                }
            }
            
        }
        
        //Lista de errores
        if(errorsList.length > 0){
            e.preventDefault();
        }

        let ulErrors = document.querySelector('div.errors ul')
        for (let i = 0; i < errorsList.length; i++) {
            ulErrors.innerHTML += '<li>' + errorsList[i] + '</li>'
        }
    })
})
