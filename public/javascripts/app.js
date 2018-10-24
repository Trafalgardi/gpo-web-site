$(document).ready(function (){
    var firstName, lastName, secondName;
    $("#submit").click(function(){
        firstName = $("#firstName").val();
        lastName = $("#lastName").val();
        secondName = $("#secondName").val();
        $.post("http://localhost:5000/addData", {firstName: firstName, lastName: lastName}, function(data){
            if(data==='done'){
                alert("submit success!");
            }
        });
    });
});
