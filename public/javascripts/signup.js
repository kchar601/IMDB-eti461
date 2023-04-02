function submitSignup(){

}

function showPassword() {
    var x = $('#password')[0];
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

function clearErrors(){
    $('#emailCheck').hide();
    $('#userCheck').hide();
    $('#passCheck').hide();
    $('#matchCheck').hide();
}

function addErrorListener(){

    //need to replace jquery selectors to appropriate ones
    //then connect form to app.post('/signup', function(req, res){})

    $('#Fname').keyup(function(){
        if($('#Fname').val().length < 1){
            if($('#Fname').hasClass('border-success')){
                $('#Fname').removeClass('border-success');}
            $('#Fname').addClass('border-danger');
            return false;
        }
        else{
            if($('#Fname').hasClass('border-danger')){
                $('#Fname').removeClass('border-danger');
            }
            $('#Fname').addClass('border-success');
        }
    });
    $('#Lname').keyup(function(){
        if($('#Lname').val().length < 1){
            if($('#Lname').hasClass('border-success')){
                $('#Lname').removeClass('border-success');}
            $('#Lname').addClass('border-danger');
            return false;
        }
        else{
            $('#Lname').css('border-color', 'green');
        }
    });
    $('#email').keyup(function(){
        if(!($('#email').val().includes('@') && $('#email').val().includes('.'))){
            if($('#Fname').hasClass('border-success')){
                $('#Fname').removeClass('border-success');}
            $('#Fname').addClass('border-danger');
            $('#emailCheck').html('Email must be valid');
            $('#emailCheck').show();
            return false;
        }
        else{
            $('#emailCheck').hide();
            $('#email').css('border-color', 'green');
        }
    });
    $('#username').keyup(function(){
        if ($('#username').val().length < 5) {
            if($('#Fname').hasClass('border-success')){
                $('#Fname').removeClass('border-success');}
            $('#Fname').addClass('border-danger');
            $('#userCheck').html('Username must be at least 5 characters long');
            $('#userCheck').show();
            return false;
        }
        else{
            $('#userCheck').hide();
            $('#username').css('border-color', 'green');
        }
    });
    $('#password').keyup(function(){
        if($('#password').val().length < 8){
            if($('#Fname').hasClass('border-success')){
                $('#Fname').removeClass('border-success');}
            $('#Fname').addClass('border-danger');
            $('#passCheck').html('Password must be at least 8 characters long');
            $('#passCheck').show();
            return false;
        }
        if(!hasNumber($('#password').val())){
            if($('#Fname').hasClass('border-success')){
                $('#Fname').removeClass('border-success');}
            $('#Fname').addClass('border-danger');
            $('#passCheck').html('Password must contain at least one number');
            $('#passCheck').show();
            return false;
        }
        if(!hasUpper($('#password').val())){
            if($('#Fname').hasClass('border-success')){
                $('#Fname').removeClass('border-success');}
            $('#Fname').addClass('border-danger');
            $('#passCheck').html('Password must contain at least one uppercase letter');
            $('#passCheck').show();
            return false;
        }
        if(!hasLower($('#password').val())){
            if($('#Fname').hasClass('border-success')){
                $('#Fname').removeClass('border-success');}
            $('#Fname').addClass('border-danger');
            $('#passCheck').html('Password must contain at least one lowercase letter');
            $('#passCheck').show();
            return false;
        }
        if(!hasSpecial($('#password').val())){
            if($('#Fname').hasClass('border-success')){
                $('#Fname').removeClass('border-success');}
            $('#Fname').addClass('border-danger');
            $('#passCheck').html('Password must contain at least one special character');
            $('#passCheck').show();
            return false;
        }
        if($('#password').val() == $('#username').val()){
            if($('#Fname').hasClass('border-success')){
                $('#Fname').removeClass('border-success');}
            $('#Fname').addClass('border-danger');
            $('#passCheck').html('Password cannot be the same as username');
            $('#passCheck').show();
            return false;
        }
        if($('#password').val() == $('#email').val()){
            if($('#Fname').hasClass('border-success')){
                $('#Fname').removeClass('border-success');}
            $('#Fname').addClass('border-danger');
            $('#passCheck').html('Password cannot be the same as email');
            $('#passCheck').show();
            return false;
        }
        if($('#password').val() == $('#Fname').val()){
            if($('#Fname').hasClass('border-success')){
                $('#Fname').removeClass('border-success');}
            $('#Fname').addClass('border-danger');
            $('#passCheck').html('Password cannot be the same as first name');
            $('#passCheck').show();
            return false;
        }
        if($('#password').val() == $('#Lname').val()){
            if($('#Fname').hasClass('border-success')){
                $('#Fname').removeClass('border-success');}
            $('#Fname').addClass('border-danger');
            $('#passCheck').html('Password cannot be the same as last name');
            $('#passCheck').show();
            return false;
        }
        else{
            $('#passCheck').hide();
            $('#password').css('border-color', 'green');
        }
    });
    $('#confirmPassword').keyup(function(){
        if($('#password').val() != $('#confirmPassword').val()){
            if($('#Fname').hasClass('border-success')){
                $('#Fname').removeClass('border-success');}
            $('#Fname').addClass('border-danger');
            $('#matchCheck').show();
            return false;
        }
        else{
            $('#matchCheck').hide();
            $('#confirmPassword').css('border-color', 'green');
        }
    });
    return true;
}

// function checkForm(){
//     if ($('#Fname').val().length < 1) {
//         return false;
//     }
        
//     }
// }

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

function hasNumber(myString) {
    return /\d/.test(myString);
  }

function hasSpecial(str){
    var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	return regex.test(str);
}

function hasUpper(str){
    return (/[A-Z]/.test(str));
}

function hasLower(str){
    return (/[a-z]/.test(str));
}

$(document).ready(function(){
    //check for login cookie
    checkForCookie();
    clearErrors();
    addErrorListener();
    $('#signupForm').keyup(function(){
        if(checkForm()){
            $('#signup-btn').attr('disabled', false);
        }
        else{
            $('#signup-btn').attr('disabled', true);
        }
    });
})