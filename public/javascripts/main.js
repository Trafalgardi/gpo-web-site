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


//document.getElementById("myBtn").addEventListener("click", displayDate);
function changed(isThis){
    
    if(isThis.checked == true){
        document.getElementById(isThis.id + '_1').style.display = '';
    }else if(isThis.checked == false){
        document.getElementById(isThis.id + '_1').style.display = 'none';
        document.getElementById(isThis.id + '_2').value = '';
    }
}
function show(bool, element) {
    if(bool === "Да" || bool == "true"){
        document.getElementById(element).style.display = ''
    }else if(bool === "Нет" || bool == "false"){
        document.getElementById(element).style.display = 'none'
    }
}


let number = 0;

function languageAdd(isThis) {
    
    if(document.querySelectorAll('.language-item').length < 6){
        isThis.style.display = 'none';
        let content = '';
        content += '<div class="language-item col-md-6" id="language_item_'+ number +'">';
        content += '    <div class="row">';
        content += '        <div class="form-group langInput">';
        content += '            <label for="language_name_id_'+ number +'">Язык</label>';
        content += '            <select class="form-control puddingInput" id="language_name_id_'+ number +'" name="language_name_'+ number +'">';
        content += '                <option value="">---</option>';
        content += '                <option value="Английский язык">Английский язык</option>';
        content += '                <option value="Китайский язык">Китайский язык</option>';
        content += '                <option value="Немецкий язык">Немецкий язык</option>';
        content += '                <option value="Французский язык">Французский язык</option>';
        content += '                <option value="other">Другой</option>';
        content += '            </select>';
        content += '        </div>';
        content += '        <div class="form-group langInput" style="display: none;">';
        content += '            <label for="language_id_other_'+ number +'">Свой вариант</label>';
        content += '            <input class="form-control" id="language_id_other_'+ number +'" maxlength="191" type="text" name="language_name_other_'+ number +'" value="" />';
        content += '        </div>';
        content += '    </div>';
        content += '    <div class="row">';
        content += '        <div class="form-group langInput">';
        content += '            <label for="language_level_id_'+ number +'">Уровень владения языком</label>';
        content += '            <select class="form-control puddingInput" name="language_level_'+ number +'">';
        content += '                <option value="">---</option>';
        content += '                <option value="Начальный">Начальный</option>';
        content += '                <option value="Средний">Средний</option>';
        content += '                <option value="Продвинутый">Продвинутый</option>';
        content += '                <option value="Свободно владею">Свободно владею</option>';
        content += '            </select>';
        content += '        </div>';
        content += '    </div>';
        content += '    <div class="row">';
        content += '        <div class="form-group langInput">';
        content += '            <label for="language_CEFR_id_'+ number +'">Шкала уровней владения иностранными языками по системе CEFR</label>';
        content += '            <select class="form-control puddingInput" name="language_CEFR_'+ number +'">';
        content += '                <option value="">---</option>';
        content += '                <option value="С2">С2</option>';
        content += '                <option value="С1">С1</option>';
        content += '                <option value="B2">B2</option>';
        content += '                <option value="B1">B1</option>';
        content += '                <option value="A2">A2</option>';
        content += '                <option value="A1">A1</option>';
        content += '            </select>';
        content += '        </div>';
        content += '    </div>';
        content += '    <button class="btn btn-outline-danger" type="button" onclick=languageDel(this)>';
        content += '        <i class="fa fa-trash" aria-hidden="true"></i> Удалить';
        content += '    </button>';
        content += '    <button class="btn btn-primary" id="language_item_'+ number +'_btn" type="button" onclick="languageAdd(this)">';
        content += '        <i class="fa fa-plus" aria-hidden="true"></i> Добавить язык';
        content += '    </button>';
        content += '</div>';
        document.getElementById('innerNumber').value = number;
        $('#innerLanguage').append(content); 
    }
    number++;
}
function languageDel(params) {
    let parent = params.parentElement;
    document.getElementById(parent.id).remove();
    if(document.querySelectorAll('.language-item').length == 0){
        document.getElementById('firstbtn').style.display = '';
    }else {
        document.getElementById(document.getElementById('innerLanguage').lastChild.id + '_btn').style.display = '';
    }
}

function child(number) {
    
    let content = '';
    for (let index = 1; index <= number; index++) {
        content += '<div class="row"  id="children' + index + '">'
        content += '  <div class="col-md-6">'
        content += '    <label for="ageChildrenName' + index + '">Возраст</label>'
        content += '    <input class="form-control" id="ageChildrenId_' + index + '" name="ageChildrenName_' + index + '" type="number" />'
        content += '  </div>'
        content += '  <div class="col-md-6">'
        content += '    <label for="genderChildrenName' + index + '">Пол</label>'
        content += '    <select class="custom-select d-block w-100" id="genderChildrenId_' + index + '" name="genderChildrenName_' + index + '" required="">'
        content += '      <option value="Мужской">Мужской</option>'
        content += '      <option value="Женский">Женский</option>'
        content += '    </select>'
        content += '  </div>'
        content += '</div>'
    }
    if(number == undefined || number == 0) return document.getElementById('innerChildren').innerHTML = '';
    document.getElementById('innerChildren').innerHTML = content;

}