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
        if ($('#Fname').val().length < 1) {
            if ($('#Fname').hasClass('border-success')) {
                $('#Fname').removeClass('border-success');
            }
            $('#Fname').addClass('border-danger');
            return false;
          } else {
            if ($('#Fname').hasClass('border-danger')) {
                $('#Fname').removeClass('border-danger');
            }
            $('#Fname').addClass('border-success');
          }
    });
    $('#Lname').keyup(function(){
        if ($('#Lname').val().length < 1) {
            if ($('#Lname').hasClass('border-success')) {
                $('#Lname').removeClass('border-success');
            }
            $('#Lname').addClass('border-danger');
            return false;
          } else {
            if ($('#Lname').hasClass('border-danger')) {
                $('#Lname').removeClass('border-danger');
            }
            $('#Lname').addClass('border-success');
          }    });
    $('#email').keyup(function(){
        if(!($('#email').val().includes('@') && $('#email').val().includes('.'))){
            if($('#email').hasClass('border-success')){
                $('#email').removeClass('border-success');}
            $('#email').addClass('border-danger');
            $('#emailCheck').html('Email must be valid');
            $('#emailCheck').show();
            return false;
        }
        else{
            $('#emailCheck').hide();
            if($('#email').hasClass('border-danger')){
                $('#email').removeClass('border-danger');
            }
            $('#email').addClass('border-success');
        }
    });
    $('#username').keyup(function(){
        if ($('#username').val().length < 5) {
            if($('#username').hasClass('border-success')){
                $('#username').removeClass('border-success');}
            $('#username').addClass('border-danger');
            $('#userCheck').html('Username must be at least 5 characters long');
            $('#userCheck').show();
            return false;
        }
        else{
            $('#userCheck').hide();
            if($('#username').hasClass('border-danger')){
                $('#username').removeClass('border-danger');
            }
            $('#username').addClass('border-success');
        }
    });
    $('#password').keyup(function(){
        if($('#password').val().length < 8){
            if($('#password').hasClass('border-success')){
                $('#password').removeClass('border-success');}
            $('#password').addClass('border-danger');
            $('#passCheck').html('Password must be at least 8 characters long');
            $('#passCheck').show();
            return false;
        }
        if(!hasNumber($('#password').val())){
            if($('#password').hasClass('border-success')){
                $('#password').removeClass('border-success');}
            $('#password').addClass('border-danger');
            $('#passCheck').html('Password must contain at least one number');
            $('#passCheck').show();
            return false;
        }
        if(!hasUpper($('#password').val())){
            if($('#password').hasClass('border-success')){
                $('#password').removeClass('border-success');}
            $('#password').addClass('border-danger');
            $('#passCheck').html('Password must contain at least one uppercase letter');
            $('#passCheck').show();
            return false;
        }
        if(!hasLower($('#password').val())){
            if($('#password').hasClass('border-success')){
                $('#password').removeClass('border-success');}
            $('#password').addClass('border-danger');
            $('#passCheck').html('Password must contain at least one lowercase letter');
            $('#passCheck').show();
            return false;
        }
        if(!hasSpecial($('#password').val())){
            if($('#password').hasClass('border-success')){
                $('#password').removeClass('border-success');}
            $('#password').addClass('border-danger');
            $('#passCheck').html('Password must contain at least one special character');
            $('#passCheck').show();
            return false;
        }
        if($('#password').val() == $('#username').val()){
            if($('#password').hasClass('border-success')){
                $('#password').removeClass('border-success');}
            $('#password').addClass('border-danger');
            $('#passCheck').html('Password cannot be the same as username');
            $('#passCheck').show();
            return false;
        }
        if($('#password').val() == $('#email').val()){
            if($('#password').hasClass('border-success')){
                $('#password').removeClass('border-success');}
            $('#password').addClass('border-danger');
            $('#passCheck').html('Password cannot be the same as email');
            $('#passCheck').show();
            return false;
        }
        if($('#password').val() == $('#Fname').val()){
            if($('#password').hasClass('border-success')){
                $('#password').removeClass('border-success');}
            $('#password').addClass('border-danger');
            $('#passCheck').html('Password cannot be the same as first name');
            $('#passCheck').show();
            return false;
        }
        if($('#password').val() == $('#Lname').val()){
            if($('#password').hasClass('border-success')){
                $('#password').removeClass('border-success');}
            $('#password').addClass('border-danger');
            $('#passCheck').html('Password cannot be the same as last name');
            $('#passCheck').show();
            return false;
        }
        else{
            $('#passCheck').hide();
            if($('#password').hasClass('border-danger')){
                $('#password').removeClass('border-danger');
            }
            $('#password').addClass('border-success');
        }
    });
    $('#confirmPassword').keyup(function(){
        if($('#password').val() != $('#confirmPassword').val()){
            if($('#confirmPassword').hasClass('border-success')){
                $('#confirmPassword').removeClass('border-success');}
            $('#confirmPassword').addClass('border-danger');
            $('#matchCheck').show();
            return false;
        }
        else{
            $('#matchCheck').hide();
            if($('#confirmPassword').hasClass('border-danger')){
                $('#confirmPassword').removeClass('border-danger');
            }
            $('#confirmPassword').addClass('border-success');
        }
    });
    return true;
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