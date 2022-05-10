function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var imagePreview = document.createElement('img');
            imagePreview.id = 'image-preview';
            imagePreview.src = e.target.result;

            var previewArea = document.getElementById('preview-avatar');
                            while(previewArea.firstChild) {
                                    previewArea.removeChild(previewArea.firstChild);
                                }                
            previewArea.appendChild(imagePreview);
        }

        reader.readAsDataURL(input.files[0]);
    }
}


window.addEventListener('load',function(){
    var imageUpload = document.getElementById('file');
    imageUpload.onchange = function (e) {
        readFile(e.target);
    }    
});