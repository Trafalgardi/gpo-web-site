/*
const element = document.getElementById('progress-bar');
let procent = 0;
let lowerCaseLetters = /[a-z]/g;
let upperCaseLetters = /[A-Z]/g;
let numbers = /[0-9]/g;
let lowerCaseLettersBool = false;
let upperCaseLettersBool = false;
let numbersBool = false;
let lengthBool = false;

function checkPassword(params) {
    
    
    
    console.log(params.length)
    
    if(params.length >= 8){
        lengthBool = true;
        element.classList.add("mystyle");
    }else{
        document.getElementById('progress').style.display = "";
        lengthBool = false;
    }
    if(params.match(lowerCaseLetters)){
        lowerCaseLettersBool = true;
    }else{
        lowerCaseLettersBool = false;
    }
    if(params.match(upperCaseLetters)){
        upperCaseLettersBool = true;
    }else{
        upperCaseLettersBool = false;
    }
    if(params.match(numbers)){
        numbersBool = true;
    }else{
        numbersBool = false;
    }
}*/
function checkPassword(){
    const pass1 = document.getElementById('inputPassword1').value
    const pass2 = document.getElementById('inputPassword2').value
    const email = document.getElementById('inputEmail').value
    let validation = false;
    document.getElementById('btn').classList.add( "disabled" );
    if(pass1 === pass2){
        validation = true;
        document.getElementById('message').innerHTML = ''
        if(email != null && pass1 != null && pass2 != null || email != '' && pass1 != '' && pass2 != ''){
            document.getElementById('btn').classList.remove( "disabled" );
        }
    }else {
        validation = false;
        document.getElementById('message').innerText = 'Пароли не совподают!'
        document.getElementById('btn').classList.add( "disabled" );
    }
    console.log(validation)
    
}
function signin(){
    const email = document.getElementById('inputEmail').value
    const pass = document.getElementById('inputPassword').value
    if(email != null && pass != null && pass != '' && email != ''){
        let xhr = new XMLHttpRequest();
        let json = JSON.stringify({
            'email': email,
            'password': pass
        });
        xhr.open("POST", '/api/signin', true)
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        // Отсылаем объект в формате JSON и с Content-Type application/json
        xhr.send(json);
    }


}

