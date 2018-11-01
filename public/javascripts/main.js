function checkSelect(bool){
    
    console.log(bool)

    var content = "";
    var div = document.getElementById('innerDrive');

        content += '  <div class="col-md-9 mb-3">';
        content += '    <label for="drive_2">Какой у вас стаж?</label>';
        content += '    <input class="form-control" id="drive_2" type="number" placeholder="2" />';
        content += '    <div class="invalid-feedback">Not Valid.</div>';
        content += '  </div>';
        content += '  <div class="col-md-9 mb-3">';
        content += '    <label for="drive_3">Укажите катигорию вашего водительского удостоверения</label>';
        content += '    <input class="form-control" id="drive_3" type="text" placeholder="А – мотоциклы" />';
        content += '    <div class="invalid-feedback">Not Valid.</div>';
        content += '  </div>';
        content += '  <div class="col-md-9 mb-3">';
        content += '    <label for="drive_4">Укажите катигорию вашего автомобиля</label>'
        content += '    <input class="form-control" id="drive_4" type="text" placeholder="легковой автомобиль" />';
        content += '    <div class="invalid-feedback">Not Valid.</div>';
        content += '  </div>';

    
    if(bool == "Да"){

        div.innerHTML = content;

    }else if(bool == "Нет"){

        div.innerHTML = "";

    }
}