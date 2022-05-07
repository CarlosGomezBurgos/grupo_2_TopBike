window.addEventListener('load',function(){
    document.querySelector('form').addEventListener('submit', function(e){
        let errorsList = [];
        
        let name = document.querySelector('input#name').value
        if (name == "") {
            errorsList.push('el campo de "Nombre del producto" --> está incompleto')
        } else {
            if(name.length < 2) {
                errorsList.push('el campo "Nombre del producto" deberá tener al menos 2 caracteres')
            }
        }

        let price = document.querySelector('input#price').value
        if (price == "") {
            errorsList.push('el campo de "Precio del producto" --> está incompleto')
        }

        let discount = document.querySelector('input#discount').value
        if (discount == "") {
            errorsList.push('el campo de "Descuento" --> está incompleto')
        }
        
        let description = document.querySelector('textarea#description').value
        if (description == "") {
            errorsList.push('el campo de "Descripcion" --> está incompleto')
        } else {
            if(description.length < 50) {
                errorsList.push('el campo "Descripcion" deberá tener al menos 20 caracteres')
            }
        }
        
        let fileInput = document.querySelector('input#file');
        let filePath = fileInput.value;
        let allowedExtensions = /(.jpg|.jpeg|.png)$/i;
        if (filePath) {
        //     errorsList.push('El campo "Imagen de perfil" --> está incompleto')
        // } else {
            if(!allowedExtensions.exec(filePath)){
                errorsList.push('Ingresar un formato de archivo válido: .jpeg/.jpg/.png/');
            }             
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