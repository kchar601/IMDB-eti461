function checkForCookie(){
    var cookie = document.cookie;
    if(cookie != ""){
        $('#login-btn').html('<i class=\"fa-solid fa-user\" style=\"color: #ffffff;\"></i>');
        $('#login-btn').attr('onclick', 'window.location = \'user.html\'');
        $('#login-btn').removeClass('login-btn');

    }
    else{
        //console.log("no cookie");
        $('#login-btn').html('Login');
        $('#login-btn').attr('onclick', 'window.location = \'login.html\'');
    }
}

$(document).ready(function(){
    checkForCookie();
});