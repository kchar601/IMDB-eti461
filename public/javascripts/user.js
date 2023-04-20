function tabSelect(selector){
    $("#" + selector).addClass('selected');
    $("#" + selector).siblings().removeClass('selected');
    switch(selector){
        case 'account-sidebar-btn':
            $('#account-content').show();
            $('#password-content').hide();
            $('#notification-content').hide();
            break;
        case 'password-sidebar-btn':
            $('#account-content').hide();
            $('#password-content').show();
            $('#notification-content').hide();
            break;
        case 'notification-sidebar-btn':
            $('#account-content').hide();
            $('#password-content').hide();
            $('#notification-content').show();
            break;
    }
}

function addUserData(data){
    const user = data[0];
    console.log(user);
    if(user.role=="admin"){
        $('#admin-link-btn').show();
    }
    $('#welcome').append(user.Fname);
    $('#fName-input').attr('placeholder', user.Fname);
    $('#lName-input').attr('placeholder', user.Lname);
    $('#email-input').attr('placeholder', user.email);
}

function logout(){
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "pass=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    window.location.href = "index.html";
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
    const username = document.cookie.split('=')[1].split(';')[0];
    console.log(username);
    $.get('/getUser', {"username": username}, addUserData);
});