// window.addEventListener('load',function(){
//     document.querySelector('form').addEventListener('submit', function(e){
//         let errorsList = [];
        
//         let name = document.querySelector('input#name').value
//         if (name == "") {
//             errorsList.push('el campo de "Nombre del producto" tiene que estar completo')
//         } else {
//             if(name.length < 2) {
//                 errorsList.push('el campo "Nombre del producto" deberá tener al menos 2 caracteres')
//             }
//         }

//         let price = document.querySelector('input#price').value
//         if (price == "") {
//             errorsList.push('el campo de "Precio del producto" tiene que estar completo')
//         }

//         let discount = document.querySelector('input#discount').value
//         if (discount == "") {
//             errorsList.push('el campo de "Descuento" tiene que estar completo')
//         }
        
//         let description = document.querySelector('textarea#description').value
//         if (description == "") {
//             errorsList.push('el campo de "Descripcion" tiene que estar completo')
//         }
        
//         let image = document.querySelector('input#file').value
//         if (image == "") {
//             errorsList.push('el campo de "Imagen del producto" tiene que estar completo')
//         } else {
//             let allowedExtensions = [".jpeg",".jpg",".png"]
//             if(!allowedExtensions.exec(image)){
//                 alert('Formato de archivo no valido. Por favor ingresar: .jpeg, .jpg, .png')
//             }
//         }

//         if(errorsList.length > 0){
//             e.preventDefault();
//         }

//         let ulErrors = document.querySelector('div.errors ul')
//         for (let i = 0; i < errorsList.length; i++) {
//             ulErrors.innerHTML += '<li>' + errorsList[i] + '</li>'
//         }
//     })
// })