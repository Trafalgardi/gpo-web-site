let qJSON = "";
function printTest(params, id) {
    let temp = params.replace(/&quot;/g, '"');
    
    let json = JSON.parse(temp.substring(1,temp.length-1))
    
    console.log(json); // this will show the info it in firebug console

    qJSON = json;
    let content = '';
    for (let i = 0; i < qJSON.questions.length; i++) {
        content += '<div class="form-group">';
        content += '    <label>'+(i+1)+'. '+qJSON.questions[i].question +'</label>';
        for (let x = 0; x < qJSON.questions[i].answers.length; x++) {
            content += '    <div class="radio">'
            content += '        <label>'
            content += '            <input type="radio" name="optionsRadios_'+i+'" value="'+qJSON.questions[i].answers[x]+'" >'+qJSON.questions[i].answers[x] // добавить защиту от дурака
            content += '        </label>'
            content += '    </div>'
        }
        content += '</div>';
    };
    //content += '<input type="text" id="answerInput" name="quantity" value="'+qJSON.questions.length+'">';
    content += '<div class="box-footer">';
    content += '    <input type="submit" class="btn btn-primary" value="Отправить ответы"></input>';
    content += '</div>';

    content += '<div class="box-footer">';
    content += '    <input style="display:none" name="id" type="text" value="'+ id +'"></input>';
    content += '</div>';

    content += '<div class="box-footer">';
    content += '    <input style="display:none" name="size" type="text" value="'+ qJSON.questions.length +'"></input>';
    content += '</div>';

    document.getElementById('testName').innerHTML = '<h1>'+qJSON.testName+'</h1>';
    document.getElementById('questions').innerHTML = content;
    

}
window.addEventListener("load", function() {
    //let button = document.querySelector("button");
    //button.addEventListener("click", function() {
    //    for (let index = 0; index < qJSON.questions.length; index++) {
    //        console.log(window.getElementByName("optionsRadios_"+index).value)
    //        
    //    }
    //    console.log("Кнопка нажата.");
    //});
});



