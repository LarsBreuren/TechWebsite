$(document).ready(function(){
    $('.deleteUser').on('click', deleteUser);
});

function deleteUser(){
    let confirmation = confirm('Weet je het zeker?');
    
    if(confirmation){
        $.ajax({
            type:'DELETE',
            url: '/users/delete/'+$(this).data('id')
        }).done(function(response){
            window.location.replace('/home.html');
        });
    } else{
         return false;
    }
}