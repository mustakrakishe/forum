function handleCreate(){
    let url = $('#create').attr('action');

    $.get(url)
    .done(response => {
        $('body').append(response);
    })
}

function handleStore(){
    let form = $('#store');

    $(form).find('.error').remove();

    let url = $(form).attr('action');
    let data = getFormData(form);

    console.log(data);

    // $.post({
    //     url: url,
    //     data: data,
    // })
    // .done(response => {
    //     if(!response){
    //         $(form).trigger('submit');
    //     }
    //     else{
    //         $.each(response, (fieldName, fieldErrors) => {
    //             let ul = $.parseHTML('<ul class="errors mt-3 list-disc list-inside text-sm text-red-600"></ul>');
    //             fieldErrors.forEach(fieldError => {
    //                 $(ul).append('<li>' + fieldError + '</li>');
    //             });
                
    //             $('#' + fieldName).after(ul);
    //         });
    //     }
    // });
}