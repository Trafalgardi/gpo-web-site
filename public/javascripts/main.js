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
$(document).ready(function(){

    //alert("Hello World!");

    

});

function checkBox(value, bool){
    console.log(value + "\n" + bool)
    
        for (let index = 1; index <= 12; index++) {
            
            if(value == "checkbox_"+index && bool == true){
                document.getElementById(value).name = "checkbox_name_"+index;
                if(index == 2){
                    document.getElementById("check_2").name = "check_name_2";
                }else if(index == 3){
                    document.getElementById("check_3").name = "check_name_3";
                }else if(index == 4){
                    document.getElementById("check_4").name = "check_name_4";
                }else if(index == 8){
                    document.getElementById("check_8").name = "check_name_8";
                }else if(index == 9){
                    document.getElementById("check_9").name = "check_name_9";
                }
            }else if(value == "checkbox_"+index && bool == false){
                document.getElementById(value).removeAttribute("name");
                if(index == 2){
                    document.getElementById("check_2").removeAttribute("name");
                }else if(index == 3){
                    document.getElementById("check_3").removeAttribute("name");
                }else if(index == 4){
                    document.getElementById("check_4").removeAttribute("name");
                }else if(index == 8){
                    document.getElementById("check_8").removeAttribute("name");
                }else if(index == 9){
                    document.getElementById("check_9").removeAttribute("name");
                }
            }
            
        }
    
    
}