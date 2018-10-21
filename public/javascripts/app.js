$(document).on('change', '.language_name', function(){
    if($(this).val() == 'other'){
        $(this).parent('div').next('div').css('display', 'block');
    }else{
        $(this).parent('div').next('div').css('display', 'none');
        $(this).parent('div').next('div').find('input').val('');
    }
});
