function check_user(){
    const user = $('#username')[0].value;;
    const pswd = $('#pswd')[0].value;
    console.log(user + " " + pswd);
    if(user == ""){
        alert("Please enter a valid username"); 
        return false;
    };
    if(pswd == ""){
        alert("Please enter a valid password"); 
        return false;
    }
    
    $.post("/checkLogin", {'username': user, 'password': pswd}, function(data){ 
        console.log(data); 
        if(data[0]){
            console.log("user exist")
            window.location.href = "user.html?" + data[1]; 
        }
        else{
            console.log("user dont exist");
            alert("Username and password combination does not exist");
            $('#pswd')[0].value = "";
            $('#error').html("Username and password combination does not exist");
        };
    });
}

function checkForCookie(){
    var cookie = document.cookie;
    if(cookie != ""){
        console.log(cookie);
        window.location.href = "user.html?" + cookie; //redirect bc user is already logged in and shouldn't be able to access login page
        // $('#login-btn').html('<i class=\"fa-solid fa-user\" style=\"color: #ffffff;\"></i>');
        // $('#login-btn').attr('onclick', 'window.location = \'user.html?' + cookie + '\'');
        // $('#login-btn').css("background-color", "#0d6efd");
    }
    else{
        console.log("no cookie");
        $('#login-btn').html('Login');
        $('#login-btn').attr('onclick', 'window.location = \'login.html\'');
    }
}


$(document).ready(function(){
    //check for login cookie
    checkForCookie();
})

