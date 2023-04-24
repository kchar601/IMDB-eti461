function tabSelect(selector){
    $("#" + selector).addClass('selected');
    $("#" + selector).siblings().removeClass('selected');
    switch(selector){
        case 'account-sidebar-btn':
            $('#account-content').show();
            $('#account-content').siblings().hide();
            break;
        case 'password-sidebar-btn':
            $('#password-content').show();
            $('#password-content').siblings().hide();
            break;
        case 'notification-sidebar-btn':
            $('#notification-content').show();
            $('#notification-content').siblings().hide();
            break;
        case 'delete-btn':
            $('#delete-content').show();
            $('#delete-content').siblings().hide();
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

function deleteAccount(){
    $.post('/deleteUser', {"username": document.cookie.split('=')[1].split(';')[0]}, function(data){
        if(data.success=true){
            logout();
        }
        else{
            alert("Something went wrong");
        }
    })
}

$(document).ready(function(){
    checkForCookie();
    const username = document.cookie.split('=')[1].split(';')[0];
    console.log(username);
    $.get('/getUser', {"username": username}, addUserData);
});