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
    $('#Fname').keyup(function(){
        if ($('#Fname').val().length < 1) {
            addDanger('#Fname');
            return false;
          } else {
            addSuccess('#Fname');
          }
    });
    $('#Lname').keyup(function(){
        if ($('#Lname').val().length < 1) {
            addDanger('#Lname');
            return false;
          } else {
            addSuccess('#Lname');
          }    });
    $('#email').keyup(function(){
        if(!($('#email').val().includes('@') && $('#email').val().includes('.'))){
            addDanger('#email');
            $('#emailCheck').html('Email must be valid');
            $('#emailCheck').show();
            return false;
        }
        else{
            $('#emailCheck').hide();
            addSuccess('#email');
        }
    });
    $('#username').keyup(function(){
        if ($('#username').val().length < 5) {
            addDanger('#username');
            $('#userCheck').html('Username must be at least 5 characters long');
            $('#userCheck').show();
            return false;
        }
        else{
            $('#userCheck').hide();
            addSuccess('#username');
        }
    });
    $('#password').keyup(function(){
        if($('#password').val().length < 8){
            addDanger('#password');
            $('#passCheck').html('Password must be at least 8 characters long');
            $('#passCheck').show();
            return false;
        }
        if(!hasNumber($('#password').val())){
            addDanger('#password');
            $('#passCheck').html('Password must contain at least one number');
            $('#passCheck').show();
            return false;
        }
        if(!hasUpper($('#password').val())){
            addDanger('#password');
            $('#passCheck').html('Password must contain at least one uppercase letter');
            $('#passCheck').show();
            return false;
        }
        if(!hasLower($('#password').val())){
            addDanger('#password');
            $('#passCheck').html('Password must contain at least one lowercase letter');
            $('#passCheck').show();
            return false;
        }
        if(!hasSpecial($('#password').val())){
            addDanger('#password');
            $('#passCheck').html('Password must contain at least one special character');
            $('#passCheck').show();
            return false;
        }
        if($('#password').val() == $('#username').val()){
            addDanger('#password');
            $('#passCheck').html('Password cannot be the same as username');
            $('#passCheck').show();
            return false;
        }
        if($('#password').val() == $('#email').val()){
            addDanger('#password');
            $('#passCheck').html('Password cannot be the same as email');
            $('#passCheck').show();
            return false;
        }
        if($('#password').val() == $('#Fname').val()){
            addDanger('#password');
            $('#passCheck').html('Password cannot be the same as first name');
            $('#passCheck').show();
            return false;
        }
        if($('#password').val() == $('#Lname').val()){
            addDanger('#password');
            $('#passCheck').html('Password cannot be the same as last name');
            $('#passCheck').show();
            return false;
        }
        else{
            $('#passCheck').hide();
            addSuccess('#password');
        }
    });
    $('#confirmPassword').keyup(function(){
        if($('#password').val() != $('#confirmPassword').val()){
            addDanger('#confirmPassword');
            $('#matchCheck').show();
            return false;
        }
        else{
            $('#matchCheck').hide();
            addSuccess('#confirmPassword');
        }
    });
    return true;
}
  
function addDanger(id) {
    if ($(id).hasClass('border-success')) {
        $(id).removeClass('border-success');
    }
    $(id).addClass('border-danger');
}

function addSuccess(id) {
    if ($(id).hasClass('border-danger')) {
        $(id).removeClass('border-danger');
    }
    $(id).addClass('border-success');
}

function checkForm() {
    console.log('hello');
    const Fname = $('#Fname').val();
    const Lname = $('#Lname').val();
    const email = $('#email').val().toLowerCase();
    const username = $('#username').val().toLowerCase();
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    
    if ($('#Fname').hasClass('border-success') && $('#Lname').hasClass('border-success') && $('#email').hasClass('border-success') && $('#username').hasClass('border-success') && $('#password').hasClass('border-success') && $('#confirmPassword').hasClass('border-success')) {
      if (password !== confirmPassword) {
        console.log('Passwords do not match');
        return false;
      }
      console.log('Attempting to register...')
      try {
        $.post("/attemptRegister", {'Fname' : Fname, 'Lname' : Lname, 'email' : email, 'username' : username, 'password' : password}, function(data){
          if(data.success == true){
            window.location.href = "login.html";
          }
          else{
            if(data[0] == false && data[1] == "Username already exists"){
              $('#userCheck').html('Username already exists');
              $('#userCheck').show();
            }
            if(data[0] == false && data[1] == "Email already exists"){
              $('#emailCheck').html('Email already exists');
              $('#emailCheck').show();
            }
          }
          console.log(data);
        });
      }
      catch(err){
        console.log(err);
      }
    } 
    else {
      console.log('false');
      return false;
    }
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
})