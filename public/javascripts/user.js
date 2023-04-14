function tabSelect(selector){
    $("#" + selector).addClass('selected');
    $("#" + selector).siblings().removeClass('selected');
    switch(selector){
        case 'account-sidebar-btn':
            $('#account-content').show();
            $('#password-content').hide();
            $('#notifications-content').hide();
            break;
        case 'password-sidebar-btn':
            $('#account-content').hide();
            $('#password-content').show();
            $('#notifications-content').hide();
            break;
        case 'notifications-sidebar-btn':
            $('#account-content').hide();
            $('#password-content').hide();
            $('#notifications-content').show();
            break;
    }
}

function addUserData(user){
    $('#welcome').append(user.Fname);
    $('#fName-input').attr('placeholder', user.Fname);
    $('#lName-input').attr('placeholder', user.lName);

}


function checkForCookie(){
    var cookie = document.cookie;
    if(cookie != ""){
        console.log(cookie);
    }
    else{
        console.log("no cookie");
        window.location.href = "login.html"; 
    }
}

$(document).ready(function(){
    checkForCookie();
    //$.get('/getUser', addUserData)
});