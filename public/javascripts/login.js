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

        };
    });
}

function checkForCookie(){
    var cookie = document.cookie;
    if(cookie != ""){
        console.log(cookie);
        $('#login-btn').html('<i class=\"fa-solid fa-user\" style=\"color: #ffffff;\"></i>');
        $('#login-btn').attr('href', 'user.html?' + cookie);
        //window.location.href = "user.html?" + cookie;
    }
    else{
        console.log("no cookie");
        $('#login-btn').html('Login');
        window.location.href = "login.html";
    }
}


$(document).ready(function(){
    //check for login cookie
    var cookie = document.cookie;
    console.log(cookie);
})