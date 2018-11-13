function checkSelect(bool){
    
    console.log(bool)

    var content = "";
    var div = document.getElementById('innerDrive');

        content += '  <div class="col-md-9 mb-3">';
        content += '    <label for="drive_2">Какой у вас стаж?</label>';
        content += '    <input name="drive_1" class="form-control" id="drive_2" type="number" placeholder="2" />';
        content += '    <div class="invalid-feedback">Not Valid.</div>';
        content += '  </div>';
        content += '  <div class="col-md-9 mb-3">';
        content += '    <label for="drive_3">Укажите катигорию вашего водительского удостоверения</label>';
        content += '    <input name="drive_2" class="form-control" id="drive_3" type="text" placeholder="А – мотоциклы" />';
        content += '    <div class="invalid-feedback">Not Valid.</div>';
        content += '  </div>';
        content += '  <div class="col-md-9 mb-3">';
        content += '    <label for="drive_4">Укажите катигорию вашего автомобиля</label>'
        content += '    <input name="drive_3" class="form-control" id="drive_4" type="text" placeholder="легковой автомобиль" />';
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

function checkBox(value, bool, input){
    console.log(value + "\n" + bool)
    if (bool) {
        document.getElementById(value).style.display = "";
    }else if(!bool){
        document.getElementById(value).style.display = "none";
        document.getElementById(input).value = "";
    }
}

function check(temp){
    if(temp === 'Да'){
        document.getElementById("hide").style.display = "";
    }else if(temp === 'Нет') {
        
        document.getElementById("hide").style.display = "none";
        for (let index = 0; index <= 4; index++) {
            document.getElementById("prof_" + index).checked = false; 
        }
        
        
    }
}


function military(value){
    if(value === 'Невоеннообязанный'){
        document.getElementById("notMilitary").style.display = '';
        document.getElementById("yesMilitary").style.display = 'none';
        document.getElementById("yesMilitaryRankId").style.display = 'none';
        document.getElementById("yesMilitarySelectId").selectedIndex = 0;
        document.getElementById("yesMilitaryRankSelectId").selectedIndex = 0;
    }else if(value === 'Военнообязанный'){
        document.getElementById("notMilitary").style.display = 'none';
        document.getElementById("notMilitarySelectId").selectedIndex = 0;
        document.getElementById("yesMilitary").style.display = '';
        document.getElementById("yesMilitaryRankId").style.display = '';
        
    }
    if(value === "призывного возраста" || value === 'Невоеннообязанный'){
        document.getElementById("yesMilitaryRankId").style.display = 'none';
        document.getElementById("yesMilitaryRankSelectId").selectedIndex = 0;
        
    }else {
        document.getElementById("yesMilitaryRankId").style.display = '';
    }

    document.getElementById("notMilitary")
}
function militaryAge(value){
    if(value === "призывного возраста"){
        document.getElementById("yesMilitaryRankId").style.display = 'none';
        document.getElementById("yesMilitaryRankSelectId").selectedIndex = 0;
        
    }else {
        document.getElementById("yesMilitaryRankId").style.display = '';
    }
}

function languageAdd(){
    let languageJson = {
        id: '1'
    }
    console.log(languageJson.id)
}
//document.getElementById("myBtn").addEventListener("click", displayDate);