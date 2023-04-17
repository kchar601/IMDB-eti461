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
            window.location = "index.html";
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
        window.location.href = "user.html"; 
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

