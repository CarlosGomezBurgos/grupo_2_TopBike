 window.addEventListener('load',function(){
    document.querySelector('form').addEventListener('submit', function(e){
        //let errorsList = [];
        let error_counter = 0
        
        let name = document.querySelector('input#name').value;
        let name_error_container = document.querySelectorAll('.errors')[0]
        if (name == "") {
            error_counter++;
            name_error_container.innerHTML = 'el campo de NOMBRE DEL PRODUCTO está incompleto'
        } else {
            if(name.length < 2) {
                error_counter++;
                name_error_container.innerHTML = 'el campo NOMBRE DEL PRODUCTO deberá tener al menos 2 caracteres'
            }else{name_error_container.innerHTML = ''}
        }

        let price = document.querySelector('input#price').value
        let price_error_container = document.querySelectorAll('.errors')[1]
        if (price == "") {
            error_counter++;
            price_error_container.innerHTML = 'el campo de PRECIO DEL PRODUCTO está incompleto'
        }else{price_error_container.innerHTM = ''}

        let discount = document.querySelector('input#discount').value
        let discount_error_container = document.querySelectorAll('.errors')[2]
        if (discount == "") {
            error_counter++;
            discount_error_container.innerHTML = 'el campo de DESCUENTO está incompleto'
        }else{discount_error_container.innerHTM = ''}
        
        let description = document.querySelector('textarea#description').value
        let description_error_container = document.querySelectorAll('.errors')[3]
        if (description == "") {
            error_counter++;
            description_error_container.innerHTML = 'el campo de DESCRIPCION está incompleto'
        } else {
            if(description.length < 50) {
                error_counter++;
                description_error_container.innerHTML = 'el campo DESCRIPCION deberá tener al menos 20 caracteres'
            }else{description_error_containe.innerHTM = ''}
        }
        
        let fileInput = document.querySelector('input#file');
        let fileInput_error_container = document.querySelectorAll('.errors')[4]
        let filePath = fileInput.value;
        let allowedExtensions = /(.jpg|.jpeg|.png)$/i;
        if (!filePath) {
            error_counter++;
            fileInput_error_container.innerHTML = 'El campo IMAGEN DE PERFIL incompleto'
        } else {
            if(!allowedExtensions.exec(filePath)){
                error_counter++;
                fileInput_error_container.innerHTML = 'Ingresar un formato de archivo válido: .jpeg/.jpg/.png/';
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